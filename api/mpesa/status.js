import { BASE, getToken, getPassword } from "../_mpesa.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  try {
    const token = await getToken();
    const { timestamp, password } = getPassword();
    const r = await fetch(`${BASE}/mpesa/stkpushquery/v1/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: req.body.checkoutRequestId,
      }),
    });
    res.status(200).json(await r.json());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
