import { SETTINGS } from "./config.js";

// @param {string} query - which is the search term for the news articules
//@return {promise<void>} - gets the data and update the news grid
// @description - handles the NYTimes API call, toggles the loader
export async function searchNews(query = 'business') {
    const grid = document.querySelector('#newsGrid');
    const loader = document.querySelector('#newsLoader');

    // Spinner
    loader.style.display = 'block';
    grid.innerHTML = '';

    const apiKey = SETTINGS.NYT_API_KEY;
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(query)}&api-key=${apiKey}`;

    try {
        const response = await fetch(url)
        const data = await response.json();
        const articles = data.response.docs;

        // shows result in the grid
        renderNewsCards(articles);
    } catch (error) {
        console.error('News Fetch Error:', error);
        grid.innerHTML = `<div class="col-12"><p class="text-danger">Error loading news. Please try again.</p></div>`;
    } finally {
        loader.style.display = 'none';
    }
}


// @param {Array} articles - list the article object from NYT
// @returns {void}
// @description - loops through articles and inject html card

function renderNewsCards(articles) {
    const grid = document.querySelector('#newsGrid');
    

    grid.innerHTML = articles.map(article => {

        let img = article.multimedia?.default?.url || 'https://placehold.co/600x400?text=News+Thumbnail';

        return `
        <div class="col">
            <div class="card h-100 shadow-sm" style="width: 100%"; >
            <img class="card-img-top"  src="${img}"  alt="News Image" style="height: 180px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title fw-bold" style="font-size: 1.1rem;">${article.headline.main}</h5>
                    <p class="card-text small text-muted flex-grow-1">
                    ${article.snippet}
                    </p>
                    <a href="${article.web_url}" target="_blank" class="btn btn-primary mt-auto">Read More</a>
                </div>
            </div>
        </div>      
         `}).join('');
}