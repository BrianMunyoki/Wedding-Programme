export const BASE = "https://sandbox.safaricom.co.ke";

export async function getToken() {
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString("base64");
  const r = await fetch(`${BASE}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${auth}` },
  });
  const d = await r.json();
  return d.access_token;
}

export function getPassword() {
  const t = new Date().toISOString().replace(/\D/g, "").slice(0, 14);
  const pw = Buffer.from(
    `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${t}`
  ).toString("base64");
  return { timestamp: t, password: pw };
}
