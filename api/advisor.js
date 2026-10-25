// OpenPath AI advisor: a Vercel serverless function that calls OCI Generative AI.
// GET  /api/advisor  -> {enabled: true|false}  (the app shows the AI button only when enabled)
// POST /api/advisor  {career, yes, maybe} -> {text}
//
// Required environment variables (Vercel project settings):
//   OCI_TENANCY_OCID, OCI_USER_OCID, OCI_FINGERPRINT, OCI_PRIVATE_KEY (PEM; "\n" escapes are fine), OCI_COMPARTMENT_OCID
// Optional: OCI_REGION (default us-chicago-1), OCI_GENAI_MODEL (default meta.llama-3.3-70b-instruct), OCI_KEY_PASSPHRASE
const REQUIRED = ["OCI_TENANCY_OCID", "OCI_USER_OCID", "OCI_FINGERPRINT", "OCI_PRIVATE_KEY", "OCI_COMPARTMENT_OCID"];
const enabled = () => REQUIRED.every(k => process.env[k]);

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

module.exports = async (req, res) => {
  if (req.method === "GET") return res.status(200).json({enabled: enabled()});
  if (req.method !== "POST") return res.status(405).json({error: "Use GET or POST."});
  if (!enabled()) return res.status(503).json({error: "The AI advisor isn't configured."});
  try {
    const common = require("oci-common");
    const genai = require("oci-generativeaiinference");
    const region = process.env.OCI_REGION || "us-chicago-1";
    const provider = new common.SimpleAuthenticationDetailsProvider(
      process.env.OCI_TENANCY_OCID, process.env.OCI_USER_OCID, process.env.OCI_FINGERPRINT,
      process.env.OCI_PRIVATE_KEY.replace(/\\n/g, "\n"), process.env.OCI_KEY_PASSPHRASE || null,
      common.Region.fromRegionId(region));
    const client = new genai.GenerativeAiInferenceClient({authenticationDetailsProvider: provider});
    client.endpoint = `https://inference.generativeai.${region}.oci.oraclecloud.com`;
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const out = await client.chat({chatDetails: {
      compartmentId: process.env.OCI_COMPARTMENT_OCID,
      servingMode: {servingType: "ON_DEMAND", modelId: process.env.OCI_GENAI_MODEL || "meta.llama-3.3-70b-instruct"},
      chatRequest: {apiFormat: "GENERIC", maxTokens: 400, temperature: 0.3, messages: [
        {role: "SYSTEM", content: [{type: "TEXT", text: SYSTEM}]},
        {role: "USER", content: [{type: "TEXT", text: prompt(body)}]}
      ]}
    }});
    const msg = out.chatResult.chatResponse.choices[0].message;
    const text = (msg.content || []).map(p => p.text || "").join("").trim();
    return res.status(200).json({text: text || "The advisor didn't return an answer. Try again."});
  } catch (e) {
    console.error("advisor error:", e && (e.message || e));
    return res.status(502).json({error: "The AI service didn't respond."});
  }
};
