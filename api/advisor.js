// OpenPath AI advisor: a Vercel serverless function that explains a career match.
// GET  /api/advisor  -> {enabled: true|false, provider}  (the app shows the AI button only when enabled)
// POST /api/advisor  {career, yes, maybe} -> {text, provider}
//
// Provider is chosen from environment variables (Vercel project settings):
//   OpenAI (used when OPENAI_API_KEY is set): OPENAI_API_KEY, optional OPENAI_MODEL (default gpt-4o-mini)
//   OCI Generative AI: OCI_TENANCY_OCID, OCI_USER_OCID, OCI_FINGERPRINT, OCI_PRIVATE_KEY (PEM; "\n" escapes are fine),
//     OCI_COMPARTMENT_OCID, optional OCI_REGION (default us-chicago-1), OCI_GENAI_MODEL (default meta.llama-3.3-70b-instruct), OCI_KEY_PASSPHRASE
const OCI_REQUIRED = ["OCI_TENANCY_OCID", "OCI_USER_OCID", "OCI_FINGERPRINT", "OCI_PRIVATE_KEY", "OCI_COMPARTMENT_OCID"];
const provider = () => process.env.OPENAI_API_KEY ? "openai" : OCI_REQUIRED.every(k => process.env[k]) ? "oci" : null;
const LABEL = {openai: "OpenAI", oci: "OCI Generative AI on Oracle Cloud"};

const SYSTEM = `You help students explore careers. Use ONLY the facts in the CAREER DATA. Never invent pay, requirements, statistics or school names.
Write plain language for a high school or college student, under 150 words, with three short parts:
1. Why this could fit: connect two or three of the student's "yes" answers to the work.
2. Try it this semester: three low-cost steps taken from the data.
3. Ask a counselor or someone in the job: two specific questions.
No markdown headings or bold. This is a starting point to explore, not a prediction.`;

const clip = (v, n) => String(v == null ? "" : v).slice(0, n);
const list = (a, items, n) => (Array.isArray(a) ? a : []).slice(0, items).map(x => clip(x, n));

function prompt(body){
  const c = body.career || {};
  const data = {
    title: clip(c.title, 120), family: clip(c.family, 120), description: clip(c.description, 400),
    path: list(c.path, 6, 220), pay: clip(c.pay, 200), majors: list(c.majors, 6, 80), tryIt: list(c.tryIt, 6, 200), tasks: list(c.tasks, 4, 220)
  };
  return `CAREER DATA:\n${JSON.stringify(data, null, 1)}\n\nThe student said YES to: ${list(body.yes, 6, 160).join("; ") || "(none)"}\nThe student said MAYBE to: ${list(body.maybe, 6, 160).join("; ") || "(none)"}`;
}

async function askOpenAI(user){
  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`},
    body: JSON.stringify({model: process.env.OPENAI_MODEL || "gpt-4o-mini", max_completion_tokens: 600,
      messages: [{role: "system", content: SYSTEM}, {role: "user", content: user}]})
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) { const e = new Error((j.error && j.error.message) || `HTTP ${r.status}`); e.statusCode = r.status; e.serviceCode = j.error && (j.error.code || j.error.type); throw e; }
  return (j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content || "").trim();
}

async function askOCI(user){
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
    chatRequest: {apiFormat: "GENERIC", maxTokens: 400, temperature: 0.3, messages: [
      {role: "SYSTEM", content: [{type: "TEXT", text: SYSTEM}]},
      {role: "USER", content: [{type: "TEXT", text: user}]}
    ]}
  }});
  const msg = out.chatResult.chatResponse.choices[0].message;
  return (msg.content || []).map(p => p.text || "").join("").trim();
}

module.exports = async (req, res) => {
  const p = provider();
  if (req.method === "GET") return res.status(200).json({enabled: !!p, provider: p ? LABEL[p] : null});
  if (req.method !== "POST") return res.status(405).json({error: "Use GET or POST."});
  if (!p) return res.status(503).json({error: "The AI advisor isn't configured."});
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const text = p === "openai" ? await askOpenAI(prompt(body)) : await askOCI(prompt(body));
    return res.status(200).json({text: text || "The advisor didn't return an answer. Try again.", provider: LABEL[p]});
  } catch (e) {
    console.error("advisor error:", p, e && e.statusCode, e && e.serviceCode, e && (e.message || e));
    return res.status(502).json({error: "The AI service didn't respond."});
  }
};
