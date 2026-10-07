import React, { useState } from "react";

export default function MpesaGift() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const maroon = "#6b1738";
  const input = {
    width: "100%", padding: "14px 16px", marginBottom: 10,
    border: "1px solid #e5dcd8", borderRadius: 12,
    fontSize: 16, boxSizing: "border-box",
  };

  async function pay() {
    setMsg(""); setBusy(true);
    try {
      const r = await fetch("/api/mpesa/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, amount }),
      });
      const d = await r.json();
      if (d.ResponseCode !== "0") {
        setMsg(d.errorMessage || d.error || "Could not start payment. Try again.");
        setBusy(false);
        return;
      }
      setMsg("Check your phone and enter your M-Pesa PIN...");
      poll(d.CheckoutRequestID, 0);
    } catch {
      setMsg("Network error. Please try again.");
      setBusy(false);
    }
  }

    async function poll(id, tries) {
    if (tries > 20) {
      setMsg("We couldn't confirm it on this page. If you got an M-Pesa SMS, your gift went through. Thank you! 💛");
      setBusy(false);
      return;
    }
    await new Promise((r) => setTimeout(r, 4000));
    try {
      const r = await fetch("/api/mpesa/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkoutRequestId: id }),
      });
      const d = await r.json();
      const code = d.ResultCode !== undefined ? String(d.ResultCode) : null;
      if (code === "0") {
        setMsg("Thank you for your gift! 💛");
        setBusy(false);
      } else if (code !== null && code !== "4999") {
        setMsg(d.ResultDesc || "Payment was not completed.");
        setBusy(false);
      } else {
        poll(id, tries + 1);
      }
    } catch {
      poll(id, tries + 1);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "20px auto 0", padding: "0 4px" }}>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          style={{
            width: "100%", padding: "16px", border: "none", borderRadius: 999,
            background: maroon, color: "#fff", fontSize: 17, fontWeight: 700,
          }}
        >
          Use M-Pesa to send your Gift
        </button>
      ) : (
        <div>
          <input style={input} type="tel" placeholder="Your phone (07XX XXX XXX)"
            value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input style={input} type="number" placeholder="Amount (KES)"
            value={amount} onChange={(e) => setAmount(e.target.value)} />
          <button
            onClick={pay}
            disabled={busy || !phone || !amount}
            style={{
              width: "100%", padding: "16px", border: "none", borderRadius: 999,
              background: maroon, color: "#fff", fontSize: 17, fontWeight: 700,
              opacity: busy || !phone || !amount ? 0.6 : 1,
            }}
          >
            {busy ? "Waiting..." : "Send Gift"}
          </button>
          {msg && <p style={{ textAlign: "center", marginTop: 12 }}>{msg}</p>}
        </div>
      )}
    </div>
  );
}
