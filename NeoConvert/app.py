from flask import Flask, render_template, request, redirect, url_for
import requests

app = Flask(__name__)

FALLBACK_RATES = {
    ("BRL","USD"): 0.20,
    ("BRL","EUR"): 0.18,
    ("BRL","GBP"): 0.15,
    ("BRL","JPY"): 30.0,
}

def convert_currency(amount: float, from_cur: str, to_cur: str) -> float:
    # Try API
    try:
        resp = requests.get("https://api.exchangerate.host/convert", params={
            "from": from_cur, "to": to_cur, "amount": amount
        }, timeout=5)
        data = resp.json()
        if resp.status_code == 200 and "result" in data and data["result"] is not None:
            return float(data["result"])
    except Exception:
        pass

    key = (from_cur.upper(), to_cur.upper())
    if key in FALLBACK_RATES:
        return round(amount * FALLBACK_RATES[key], 4)
    rev_key = (to_cur.upper(), from_cur.upper())
    if rev_key in FALLBACK_RATES:
        return round(amount / FALLBACK_RATES[rev_key], 4)
    return amount

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        try:
            amount = float(request.form.get("amount", "0").replace(",", "."))
        except ValueError:
            amount = 0.0
        from_cur = request.form.get("from_currency", "BRL").upper()
        to_cur = request.form.get("to_currency", "USD").upper()
        result = convert_currency(amount, from_cur, to_cur)
        return render_template("result.html",
                            amount=amount,
                            from_cur=from_cur,
                            to_cur=to_cur,
                            result=result)
    
    currencies = ["BRL","USD","EUR","GBP","JPY","AUD","CAD","CHF","CNY"]
    return render_template("index.html", currencies=currencies)

if __name__ == "__main__":
    app.run(debug=True)
