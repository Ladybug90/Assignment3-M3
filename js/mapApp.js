import { SETTINGS } from "./config.js";

//@description: initialization of the map using the settings imported from ./settings.js
const map = L.map('map').setView(SETTINGS.MAP_INFO.PRIMARY_CENTER,SETTINGS.MAP_INFO.PRIMARY_ZOOM);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

setTimeout(() => map.invalidateSize(),200)

let Marker = null;

// @param {string} data - string value of what the user entered 
// @return {Promise<Object|null>} - returns the lattiude and longtitue or null
// @description fetch and asyn/await use in order to get the cordinates
export async function Fetch_Coordinates(data) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(data)}`);
        const info = await response.json();
        if (info.length > 0)
        {
            return {lat: info[0].lat, lon: info[0].lon};
        }
        return null
    } catch (error)
    {
        console.error("Fetching Error:", error);
        return null
    }
}

// @param {objec} pin has the lattiude and longtitue
// @description - relocate the map and drop marker
export function goToLocation(pin) {
    map.flyTo([pin.lat, pin.lon], 14);
    if (Marker) map.removeLayer(Marker);
    Marker = L.marker([pin.lat, pin.lon]).addTo(map)
}