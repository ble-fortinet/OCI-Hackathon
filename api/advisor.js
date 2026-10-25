// OpenPath AI advisor: a Vercel serverless function that explains a career match.
// GET  /api/advisor  -> {enabled: true|false, provider}  (the app shows the AI button only when enabled)
// POST /api/advisor  {title, yes, maybe} -> {text, provider}
//
// The server looks up the career's sourced facts itself (api/_careers.json, written by tools/build.py) and only
// accepts "yes"/"maybe" answers that are real quiz scenarios for that career, so the browser can't change the facts.
// Every number in the AI's answer must appear in the career's facts (see checkNumbers); otherwise it retries once,
// then drops sentences that still contain unverified numbers.
//
// Provider is chosen from environment variables (Vercel project settings):
//   OpenAI (used when OPENAI_API_KEY is set): OPENAI_API_KEY, optional OPENAI_MODEL (default gpt-4o-mini)
//   OCI Generative AI: OCI_TENANCY_OCID, OCI_USER_OCID, OCI_FINGERPRINT, OCI_PRIVATE_KEY (PEM; "\n" escapes are fine),
//     OCI_COMPARTMENT_OCID, optional OCI_REGION (default us-chicago-1), OCI_GENAI_MODEL (default meta.llama-3.3-70b-instruct), OCI_KEY_PASSPHRASE
// Rate limits (optional): AI_LIMIT_PER_IP (default 10 per 10 minutes), AI_LIMIT_GLOBAL (default 300 per hour, per server instance)
const CAREERS = require("./_careers.json");
const OCI_REQUIRED = ["OCI_TENANCY_OCID", "OCI_USER_OCID", "OCI_FINGERPRINT", "OCI_PRIVATE_KEY", "OCI_COMPARTMENT_OCID"];
const provider = () => process.env.OPENAI_API_KEY ? "openai" : OCI_REQUIRED.every(k => process.env[k]) ? "oci" : null;
const LABEL = {openai: "OpenAI", oci: "OCI Generative AI on Oracle Cloud"};

const SYSTEM = `You help students explore careers. Use ONLY the facts in the CAREER DATA. Never invent pay, requirements, statistics or school names.
Only use numbers that appear in the CAREER DATA, written the same way.
Write plain language for a high school or college student, under 150 words, with three short parts:
1. Why this could fit: connect two or three of the student's "yes" answers to the work.
2. Try it this semester: three low-cost steps taken from the data.
3. Ask a counselor or someone in the job: two specific questions.
No markdown headings or bold. This is a starting point to explore, not a prediction.`;

/* ---------- rate limit (in memory, per server instance) ---------- */
const hits = new Map(); let globalHits = [];
function limited(ip, now = Date.now()){
  const perIp = +process.env.AI_LIMIT_PER_IP || 10, global = +process.env.AI_LIMIT_GLOBAL || 300;
  globalHits = globalHits.filter(t => now - t < 3600e3);
  const mine = (hits.get(ip) || []).filter(t => now - t < 600e3);
  if (mine.length >= perIp) return "You've asked for a lot of explanations in a short time. Try again in a few minutes.";
  if (globalHits.length >= global) return "The AI advisor is busy right now. Try again later.";
  mine.push(now); hits.set(ip, mine); globalHits.push(now);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some(t => now - t < 600e3)) hits.delete(k);
  return null;
}

/* ---------- number check ---------- */
// Every number in the answer must match a number in the career's facts ("$60k" and "$60,000" count as the same).
// List markers ("1.") and the small counts the prompt asks for (up to 5) are allowed.
const NUM = /\$?\d[\d,]*(?:\.\d+)?\s*(?:k\b|%)?/gi;
const value = s => { const k = /k$/i.test(s.trim()); const n = parseFloat(s.replace(/[$,%\sk]/gi, "")); return k ? n * 1000 : n; };
function checkNumbers(text, facts){
  const allowed = new Set((JSON.stringify(facts).match(NUM) || []).map(value));
  const bad = (text.replace(/^\s*\d+[.)]\s/gm, "").match(NUM) || []).filter(s => { const v = value(s); return !(v <= 5 && Number.isInteger(v)) && !allowed.has(v); });
  return [...new Set(bad.map(s => s.trim()))];
}
const dropSentences = (text, bad) => text.split(/(?<=[.!?])\s+/).filter(s => !bad.some(b => s.includes(b))).join(" ").replace(/ (\d[.)]) /g, "\n\n$1 ");

/* ---------- providers ---------- */
async function askOpenAI(messages){
  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`},
    body: JSON.stringify({model: process.env.OPENAI_MODEL || "gpt-4o-mini", max_completion_tokens: 600, messages})
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) { const e = new Error((j.error && j.error.message) || `HTTP ${r.status}`); e.statusCode = r.status; e.serviceCode = j.error && (j.error.code || j.error.type); throw e; }
  return (j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content || "").trim();
}

async function askOCI(messages){
  const common = require("oci-common");
  const genai = require("oci-generativeaiinference");
  const region = process.env.OCI_REGION || "us-chicago-1";
  const auth = new common.SimpleAuthenticationDetailsProvider(
    process.env.OCI_TENANCY_OCID, process.env.OCI_USER_OCID, process.env.OCI_FINGERPRINT,
    process.env.OCI_PRIVATE_KEY.replace(/\\n/g, "\n"), process.env.OCI_KEY_PASSPHRASE || null,
    common.Region.fromRegionId(region));
  const client = new genai.GenerativeAiInferenceClient({authenticationDetailsProvider: auth});
  client.endpoint = `https://inference.generativeai.${region}.oci.oraclecloud.com`;
  const out = await client.chat({chatDetails: {
    compartmentId: process.env.OCI_COMPARTMENT_OCID,
    servingMode: {servingType: "ON_DEMAND", modelId: process.env.OCI_GENAI_MODEL || "meta.llama-3.3-70b-instruct"},
    chatRequest: {apiFormat: "GENERIC", maxTokens: 600, temperature: 0.3,
      messages: messages.map(m => ({role: m.role.toUpperCase(), content: [{type: "TEXT", text: m.content}]}))}
  }});
  const msg = out.chatResult.chatResponse.choices[0].message;
  return (msg.content || []).map(p => p.text || "").join("").trim();
}

module.exports = async (req, res) => {
  const p = provider();
  if (req.method === "GET") return res.status(200).json({enabled: !!p, provider: p ? LABEL[p] : null});
  if (req.method !== "POST") return res.status(405).json({error: "Use GET or POST."});
  if (!p) return res.status(503).json({error: "The AI advisor isn't configured."});

  let body;
  try { body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {}); } catch (e) { return res.status(400).json({error: "Invalid request."}); }
  const facts = CAREERS[String(body.title || "")];
  if (!facts) return res.status(400).json({error: "Unknown career."});
  const pick = a => [...new Set((Array.isArray(a) ? a : []).filter(s => facts.scenarios.includes(s)))].slice(0, 6);
  const yes = pick(body.yes), maybe = pick(body.maybe);

  const ip = String((req.headers && (req.headers["x-forwarded-for"] || req.headers["x-real-ip"])) || "local").split(",")[0].trim();
  const busy = limited(ip);
  if (busy) return res.status(429).json({error: busy});

  const {scenarios, ...data} = facts;
  const user = `CAREER DATA:\n${JSON.stringify(data, null, 1)}\n\nThe student said YES to: ${yes.join("; ") || "(none)"}\nThe student said MAYBE to: ${maybe.join("; ") || "(none)"}`;
  const ask = p === "openai" ? askOpenAI : askOCI;
  try {
    const messages = [{role: "system", content: SYSTEM}, {role: "user", content: user}];
    let text = await ask(messages), bad = checkNumbers(text, data), retried = false;
    if (bad.length) {
      retried = true;
      messages.push({role: "assistant", content: text}, {role: "user", content: `These numbers aren't in the CAREER DATA: ${bad.join(", ")}. Rewrite the answer using only numbers that appear in the CAREER DATA, or no numbers.`});
      text = await ask(messages); bad = checkNumbers(text, data);
      if (bad.length) text = dropSentences(text, bad);
    }
    console.log("advisor ok:", p, facts.title, retried ? `retried; dropped=${bad.length}` : "numbers verified");
    return res.status(200).json({text: text || "The advisor didn't return an answer. Try again.", provider: LABEL[p], numbersChecked: true});
  } catch (e) {
    console.error("advisor error:", p, e && e.statusCode, e && e.serviceCode, e && (e.message || e));
    return res.status(502).json({error: "The AI service didn't respond."});
  }
};
module.exports.checkNumbers = checkNumbers;
module.exports.limited = limited;
