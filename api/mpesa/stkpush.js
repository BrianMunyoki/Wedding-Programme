import { BASE, getToken, getPassword } from "../_mpesa.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  try {
    let { phone, amount } = req.body;
    phone = String(phone).replace(/\D/g, "").replace(/^0/, "254");
    const token = await getToken();
    const { timestamp, password } = getPassword();

    const r = await fetch(`${BASE}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerBuyGoodsOnline",
        Amount: Math.round(Number(amount)),
        PartyA: phone,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: "Gift",
        TransactionDesc: "Wedding gift",
      }),
    });
    res.status(200).json(await r.json());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
