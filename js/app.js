import { initCLock } from "./clockApp.js";
import { goToLocation, Fetch_Coordinates } from "./mapApp.js";
import { searchNews } from "./newsApp.js";
import { searchVideos } from "./videoApp.js";

// Theme toggle
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.querySelector("#themeToggle");
    const body = document.body;
    const modeIconContainer = themeBtn.querySelector('.mode-icon');


    themeBtn.addEventListener('click', () => {
        //Dark mode
        if (body.classList.contains('day-mode')) {
            body.classList.replace('day-mode', 'night-mode');
            modeIconContainer.innerHTML = '<i class="bi bi-brightness-low-fill"></i>';
            themeBtn.classList.replace('btn-dark', 'btn-light');
        }
        else
            //light mode
        {   
            body.classList.replace('night-mode','day-mode');
            modeIconContainer.innerHTML = '<i class="bi bi-moon-fill"></i>'
            themeBtn.classList.replace('btn-light', 'btn-dark')
        }
    });
});

// Search
document.querySelector('#searchLocation').addEventListener('click', async () => {
    const userMapInput = document.querySelector('#locationInput').value;
    if (!userMapInput) return

    const cordinates = await Fetch_Coordinates(userMapInput);
    if (cordinates) {
        goToLocation(cordinates)
    }
    else {
        alert('No Location found');
    }
});

// Search with enter
document.querySelector('#locationInput').addEventListener('keypress', async (e) => {
    if(e.key === 'Enter'){
    const userMapInput = e.target.value;
    if (!userMapInput) return

    const cordinates = await Fetch_Coordinates(userMapInput);
    if (cordinates) {
        goToLocation(cordinates)
    }
    else {
        alert('No Location found');
    }}
});


// news search
searchNews('business');

document.querySelector('#search-btn').addEventListener('click', () => {
    const query = document.querySelector('#news-query').value;
    if (query.trim()) {
        searchNews(query);
    }
});


// event listner for the search button YouTube
document.querySelector('#videoSearchBtn').addEventListener('click', () => {
    const query = document.querySelector('#videoSearch').value;
    if (query.trim()) {
        searchVideos(query)
    }
})

// for clock
initCLock();