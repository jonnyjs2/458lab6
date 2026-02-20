mapboxgl.accessToken = 'pk.eyJ1Ijoiam9ubnlqczIiLCJhIjoiY21oZG83dng0MDU0ODJrcTNjb2xsbTBrOSJ9.zvQmAQ0-9V2POFiHMrWYuA';

const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/light-v11",
    center: [-120.7401, 47.7511],
    zoom: 6
});

let allFeatures = [];

const yearRange = document.getElementById("yearRange");
const yearLabel = document.getElementById("yearLabel");
yearLabel.textContent = yearRange.value;

map.on("load", async () => {
    yearLabel.textContent = "Loading data...";
    const response = await fetch("assets/firedata.geojson");
    const data = await response.json();

    data.features.forEach(f => {
        f.properties.ACRES_BURNED = Number(f.properties.ACRES_BURNED) || 0;
        const date = new Date(f.properties.DSCVR_DT);
        f.properties.YEAR = date.getFullYear() || 0;
    });

    allFeatures = data.features;

    map.addSource("fires", { type: "geojson", data: data });

    map.addLayer({
        id: "fires-circles",
        type: "circle",
        source: "fires",
        paint: {
            "circle-radius": [
                "interpolate",
                ["linear"],
                ["get", "ACRES_BURNED"],
                0, 2,
                1, 4,
                5, 6,
                20, 10,
                100, 18,
                1000, 30
            ],
            "circle-color": [
                "step",
                ["get", "ACRES_BURNED"],
                "#fee5d9",
                1, "#fcae91",
                5, "#fb6a4a",
                20, "#de2d26"
            ],
            "circle-opacity": 0.75
        }
    });

    const initialYear = parseInt(yearRange.value);
    map.setFilter("fires-circles", ["==", ["get", "YEAR"], initialYear]);
    yearLabel.textContent = initialYear;
    populateTable(initialYear);
});

yearRange.addEventListener("input", () => {
    const selectedYear = parseInt(yearRange.value);
    yearLabel.textContent = selectedYear;
    map.setFilter("fires-circles", ["==", ["get", "YEAR"], selectedYear]);
    populateTable(selectedYear);
});

map.on("click", "fires-circles", (e) => {
    const props = e.features[0].properties;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(`
            <strong>${props.INCIDENT_NM}</strong><br>
            County: ${props.COUNTY_LABEL_NM}<br>
            Acres Burned: ${props.ACRES_BURNED}<br>
            Year: ${props.YEAR}
        `)
        .addTo(map);
});

map.on("mouseenter", "fires-circles", () => {
    map.getCanvas().style.cursor = "pointer";
});

map.on("mouseleave", "fires-circles", () => {
    map.getCanvas().style.cursor = "";
});

function populateTable(year) {
    const tbody = document.querySelector("#fireTable tbody");
    tbody.innerHTML = "";
    const filtered = allFeatures.filter(f => f.properties.YEAR === year);
    const limited = filtered.slice(0, 300);
    let rows = "";
    limited.forEach(f => {
        const p = f.properties;
        rows += `
            <tr>
                <td>${p.INCIDENT_NM ?? "N/A"}</td>
                <td>${p.COUNTY_LABEL_NM ?? "N/A"}</td>
                <td>${p.ACRES_BURNED}</td>
                <td>${p.YEAR}</td>
            </tr>
        `;
    });
    tbody.innerHTML = rows;
}