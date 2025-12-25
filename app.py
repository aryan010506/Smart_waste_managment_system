from flask import Flask, request, jsonify
from flask_cors import CORS
import hashlib
import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})



@app.route("/state-analysis", methods=["OPTIONS"])
def state_analysis_options():
    return "", 200



STATE_CENTERS = {
    "Andhra Pradesh": (15.9129, 79.7400),
    "Arunachal Pradesh": (28.2180, 94.7278),
    "Assam": (26.2006, 92.9376),
    "Bihar": (25.0961, 85.3131),
    "Chhattisgarh": (21.2787, 81.8661),
    "Goa": (15.2993, 74.1240),
    "Gujarat": (22.2587, 71.1924),
    "Haryana": (29.0588, 76.0856),
    "Himachal Pradesh": (31.1048, 77.1734),
    "Jharkhand": (23.6102, 85.2799),
    "Karnataka": (15.3173, 75.7139),
    "Kerala": (10.8505, 76.2711),
    "Madhya Pradesh": (22.9734, 78.6569),
    "Maharashtra": (19.7515, 75.7139),
    "Manipur": (24.6637, 93.9063),
    "Meghalaya": (25.4670, 91.3662),
    "Mizoram": (23.1645, 92.9376),
    "Nagaland": (26.1584, 94.5624),
    "Odisha": (20.9517, 85.0985),
    "Punjab": (31.1471, 75.3412),
    "Rajasthan": (27.0238, 74.2179),
    "Sikkim": (27.5330, 88.5122),
    "Tamil Nadu": (11.1271, 78.6569),
    "Telangana": (18.1124, 79.0193),
    "Tripura": (23.9408, 91.9882),
    "Uttar Pradesh": (26.8467, 80.9462),
    "Uttarakhand": (30.0668, 79.0193),
    "West Bengal": (22.9868, 87.8550),
    "Delhi": (28.7041, 77.1025),
    "Jammu and Kashmir": (33.7782, 76.5762),
    "Ladakh": (34.1526, 77.5770),
    "Chandigarh": (30.7333, 76.7794),
    "Puducherry": (11.9416, 79.8083),
    "Andaman and Nicobar Islands": (11.7401, 92.6586),
    "Lakshadweep": (10.5667, 72.6417),
    "Dadra and Nagar Haveli and Daman and Diu": (20.1809, 73.0169)
}


@app.route("/state-analysis", methods=["POST"])
def analyze():
    data = request.get_json()
    if not data or "state" not in data:
        return jsonify({"success": False})

    state = data["state"]
    if state not in STATE_CENTERS:
        return jsonify({"success": False})

    lat, lng = STATE_CENTERS[state]

    seed = int(hashlib.md5(state.encode()).hexdigest(), 16) % 100
    avg = 55 + seed % 30

    zones = [
        max(40, min(avg - seed % 7, 95)),
        max(40, min(avg + seed % 5, 95)),
        max(40, min(avg + seed % 9, 95))
    ]

    trend = [
        max(40, avg - 18),
        max(40, avg - 12),
        max(40, avg - 7),
        max(40, avg - 3),
        avg
    ]

    advice = (
        f"{state} shows moderate to high waste levels due to population density, "
        "urbanization, and infrastructure challenges. Improvements require better "
        "segregation, decentralized processing, and strong municipal planning."
    )

    return jsonify({
        "success": True,
        "center": {"lat": lat, "lng": lng},
        "avg": avg,
        "zones": zones,
        "trend": trend,
        "advice": advice
    })

if __name__ == "__main__":
    app.run()
