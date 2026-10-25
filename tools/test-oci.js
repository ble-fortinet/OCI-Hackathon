// Tests the AI advisor locally with the keys in .env.local (OpenAI or OCI Generative AI).
// Usage (from the repository root):  npm install  then  node --use-system-ca tools/test-oci.js
// --use-system-ca lets Node trust certificates installed in Windows (needed behind corporate SSL inspection).
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const envFile = path.join(ROOT, ".env.local");
if (!fs.existsSync(envFile)) { console.error("Missing .env.local. Copy .env.example to .env.local and fill it in."); process.exit(1); }

for (const line of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
  if (!m) continue;
  const v = m[2].replace(/\s+#.*$/, "").trim().replace(/^(['"])(.*)\1$/, "$2");
  if (v) process.env[m[1]] = v;
}
if (process.env.OCI_PRIVATE_KEY_PATH && !process.env.OCI_PRIVATE_KEY) {
  const p = path.resolve(ROOT, process.env.OCI_PRIVATE_KEY_PATH);
  if (fs.existsSync(p)) process.env.OCI_PRIVATE_KEY = fs.readFileSync(p, "utf8");
  else console.log(`(OCI key file not found at ${p}; skipping OCI)`);
}

const tail = v => v ? "…" + v.slice(-4) : "(not set)";
console.log("Config (secrets hidden):");
console.log(`  OPENAI_API_KEY: ${tail(process.env.OPENAI_API_KEY)}   OPENAI_MODEL: ${process.env.OPENAI_MODEL || "gpt-4o-mini (default)"}`);
for (const k of ["OCI_TENANCY_OCID", "OCI_USER_OCID", "OCI_COMPARTMENT_OCID", "OCI_FINGERPRINT"]) if (process.env[k]) console.log(`  ${k}: ${tail(process.env[k])}`);
if (process.env.OCI_PRIVATE_KEY) console.log(`  OCI_PRIVATE_KEY: ${/BEGIN [A-Z ]*PRIVATE KEY/.test(process.env.OCI_PRIVATE_KEY.replace(/\\n/g, "\n")) ? "looks like a PEM key" : "set, but doesn't look like a PEM key"}`);
console.log("");

const handler = require(path.join(ROOT, "api", "advisor.js"));
const call = (method, body) => new Promise(resolve => {
  const res = {code: 200, status(c) { this.code = c; return this; }, json(j) { resolve({code: this.code, body: j}); }};
  handler({method, body}, res);
});

(async () => {
  const g = await call("GET");
  console.log(`1. Provider: ${g.body.enabled ? g.body.provider : "NONE - set OPENAI_API_KEY (or all OCI values) in .env.local"}`);
  if (!g.body.enabled) { process.exitCode = 1; return; }
  console.log("2. Asking the AI about a sample match (UX Writer)…");
  const t = Date.now();
  const r = await call("POST", {
    career: {title: "UX Writer", family: "Writing and communication",
      description: "Writes the small words in apps, like buttons, error messages and onboarding screens.",
      path: ["Start (0–2 yrs): Junior UX Writer. Write and edit app text with guidance."], pay: "Entry $60k–$75k; mid career $85k–$105k; senior $120k–$145k+",
      majors: ["English", "Human-Computer Interaction", "Cognitive Science"],
      tryIt: ["Rewrite confusing screens from apps you use and explain why", "Volunteer to improve a nonprofit's website wording", "Join a design or app-building club"]},
    yes: ["Writing ads or posts that make people act", "Building an app people use every day"], maybe: ["Writing the story and dialogue for a video game"]
  });
  console.log(`   HTTP ${r.code} in ${((Date.now() - t) / 1000).toFixed(1)}s\n`);
  if (r.body.text) { console.log(`SUCCESS. Your key works (${r.body.provider}). The advisor said:\n`); console.log(r.body.text); }
  else { console.log("FAILED:", r.body.error, "\nSee the 'advisor error' line above for the status and reason (401 = bad key, 429 = quota/billing, 404 = model not available)."); process.exitCode = 1; }
})();
