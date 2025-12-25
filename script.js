
let map;
let markers = [];
let barChart = null;
let lineChart = null;
let trendData = {};


function toggleSidebar(){ document.getElementById("sidebar").classList.toggle("closed"); }
function toggleTheme(){
    const body = document.getElementById("body");
    const btn = document.getElementById("themeBtn");
    body.classList.toggle("dark");
    body.classList.toggle("light");
    btn.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
}


map = L.map("map").setView([20.5937, 78.9629], 5);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

function toggleMap(){
    const card = document.getElementById("mapCard");
    card.classList.toggle("map-full");
    setTimeout(()=>map.invalidateSize(), 300);
}


document.getElementById("fileInput").addEventListener("change", e => {
    const reader = new FileReader();
    reader.onload = () => processCSV(reader.result);
    reader.readAsText(e.target.files[0]);
});


async function processCSV(text) {
    clearMap();
    document.getElementById("alerts").innerHTML = "";
    trendData = {};
    
    const rows = text.trim().split("\n").slice(1);
    const labels = [];
    const values = [];

    for (const row of rows) {
        const parts = row.split(",");
        if (parts.length < 3) continue;
        
        const city = parts[0].trim();
        const area = parts[1].trim();
        const waste = Number(parts[2].trim());

        
        const loc = await geocode(city, area);
        
        if (loc) {
            labels.push(`${city}-${area}`);
            values.push(waste);
            trendData[city] = waste; 

            addMarker(city, area, waste, loc);

            if (waste >= 85) {
                document.getElementById("alerts").innerHTML +=
                    `<div class="alert">⚠️ ${city} (${area}) critical: ${waste}%</div>`;
            }
        }
       
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    
    buildBarChart(labels, values);
    buildTrendChart();
}


async function geocode(city, area) {
    try {
        const q = encodeURIComponent(`${area}, ${city}, India`);
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${q}`);
        const data = await res.json();
        if (data && data.length > 0) {
            return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        }
        return null;
    } catch (err) {
        console.error("Geocoding error:", err);
        return null;
    }
}


function addMarker(city, area, waste, loc) {
    const m = L.marker([loc.lat, loc.lng])
        .addTo(map)
        .bindPopup(`<b>${city}</b><br>${area}<br>Waste: ${waste}%`);
    markers.push(m);
}

function clearMap() {
    markers.forEach(m => map.removeLayer(m));
    markers = [];
}


function buildBarChart(labels, values) {
    if (barChart) barChart.destroy();
    const ctx = document.getElementById("barChart").getContext("2d");

    barChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Waste Level (%)",
                data: values,
                backgroundColor: "#ef4444"
            }]
        },
        options: {
            responsive: true,
            scales: { y: { min: 0, max: 100 } },
            plugins: { legend: { display: false } }
        }
    });
}


function buildTrendChart() {
    if (lineChart) lineChart.destroy();
    const ctx = document.getElementById("lineChart").getContext("2d");

    const labels = ["T1", "T2", "T3", "T4", "Now"];
    const datasets = Object.keys(trendData).map(city => {
        const current = trendData[city];
        return {
            label: city,
            data: [current - 18, current - 12, current - 7, current - 3, current],
            borderColor: '#' + Math.floor(Math.random()*16777215).toString(16), 
            borderWidth: 3,
            tension: 0.4,
            fill: false
        };
    });

    lineChart = new Chart(ctx, {
        type: "line",
        data: { labels, datasets },
        options: {
            responsive: true,
            scales: { y: { min: 0, max: 100 } }
        }
    });
}