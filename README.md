# Smart_waste_managment_system

## ♻️ SMART WASTE: AI-Powered Smart Waste Management Web Application

**SMART WASTE** is an AI-driven web application designed to help governments and city authorities monitor, analyze, and optimize waste management using intelligent insights. The platform combines interactive dashboards, thermal heat mapping, and Google Gemini–powered AI analysis to support data-driven decision-making for sustainable smart cities.

---

## 🚀 Key Features

### 🗺️ Interactive Logistics & Heat Mapping
* **Thermal Heatmap Visualization:** Toggle a "Heat Area" layer to identify high-density waste accumulation hotspots across different zones.
* **Citizen Overflow Reporting:** A real-time emergency portal allowing community members to pin manual overflow reports (Red Alerts) directly on the map for priority collection.
* **Live Logistics Optimization:** Automated route generation between high-fill sensor points to reduce fuel consumption and collection time.

### 📊 Waste Analytics Dashboard
* **Waste Severity Index (WSI):** A calculated risk score (0-100) indicating the health and environmental urgency of each sector.
* **Dynamic Waste Trends:** Historical data visualization using multi-point timeline graphs to track accumulation patterns.
* **Zone-wise Comparison:** Detailed bar chart breakdowns comparing specific urban wards or sectors.

### 🤖 AI Insights & Forecasting
* **🔮 Future Outlook (Linear Forecasting):** Predictive algorithm that calculates waste levels for the coming week. Clicking "Forecast" automatically scrolls the user to the AI analysis section.
* **AI-Generated Advice:** Contextual recommendations based on current data for pickup priority and resource allocation.
* **Sustainability Impact Tracker:** Real-time calculation of projected CO2 savings through organic waste diversion.

### 📄 Government Report Generator
* **Official Branding:** Generates a professional briefing document with "Government of India" formatting for official policy review.
* **Mobile-First Graph Alignment:** Unique CSS logic that forces the **Waste Trend** and **Zonal Comparison** graphs to stay side-by-side even on small phone screens for quick mobile briefings.
* **Snapshots:** Includes all visual charts (Line, Bar, Doughnut) in a print-ready PDF-style layout.

### 🔄 State Comparison Tool
* **Regional Benchmarking:** Compare two Indian states side-by-side to identify high-performance vs. high-risk regions.
* **Composition Analysis:** Unified doughnut charts showing the distribution of Organic, Plastic, C&D, and E-Waste.

---

## 🎯 Why SMART WASTE?
* **Mobile Optimized:** Full-featured experience on smartphones with adaptive menus and touch-pinch map gestures.
* **Actionable Data:** Translates raw sensor data into human-readable priority lists for municipal workers.
* **Community Centric:** Bridges the gap between citizens and authorities through the "Report Overflow" feature.
* **Hackathon-Ready:** Single-file frontend architecture optimized for low-latency demos and high visual impact.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | HTML5, CSS3 (Flexbox/Grid), JavaScript (Vanilla ES6+) |
| **Mapping** | Leaflet.js, Leaflet Routing Machine, Leaflet Heat |
| **AI Integration** | Google Gemini (Backend Logic) |
| **Visualization** | Chart.js (Line, Bar, Doughnut) |
| **Animation** | Smooth-scroll CSS and Leaflet transition logic |

---

## 🎨 UI & Theme
The application uses a high-contrast **Dark Theme** with **Sustainability Green** accents to ensure authority and clarity.

* **Primary:** `#22c55e` (Green)
* **Background:** `#000000` (Deep Black)
* **Alert/Overflow:** `#ef4444` (Emergency Red)
* **Forecast/Link:** `#3b82f6` (Projected Blue)

---

## 📂 Project Structure
```text
Smart_waste_managment_system/
├── index.html         # Unified Frontend (HTML/CSS/JS Logic)
├── README.md          # Project documentation
└── assets/            # UI icons and official logos
