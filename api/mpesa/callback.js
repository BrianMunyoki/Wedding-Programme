export default function handler(req, res) {
  const cb = req.body?.Body?.stkCallback;
  console.log("M-Pesa callback:", JSON.stringify(cb));
  res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" });
}
