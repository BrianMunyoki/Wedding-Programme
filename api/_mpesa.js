export const BASE = "https://api.safaricom.co.ke";

let cached = { token: null, exp: 0 };

export async function getToken() {
  if (cached.token && Date.now() < cached.exp) return cached.token;
  const key = process.env.MPESA_CONSUMER_KEY;
  const secret = process.env.MPESA_CONSUMER_SECRET;
  if (!key || !secret) throw new Error("Missing MPESA_CONSUMER_KEY or MPESA_CONSUMER_SECRET in Vercel");
  const auth = Buffer.from(`${key.trim()}:${secret.trim()}`).toString("base64");
  const r = await fetch(`${BASE}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${auth}` },
  });
  const text = await r.text();
  if (!r.ok || !text) throw new Error(`Token request failed (${r.status}): ${text || "empty response"}`);
  const d = JSON.parse(text);
  cached = { token: d.access_token, exp: Date.now() + 50 * 60 * 1000 };
  return d.access_token;
}

export function getPassword() {
  const t = new Date().toISOString().replace(/\D/g, "").slice(0, 14);
  const pw = Buffer.from(
    `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${t}`
  ).toString("base64");
  return { timestamp: t, password: pw };
}
