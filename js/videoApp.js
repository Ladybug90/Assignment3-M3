import { SETTINGS } from "./config.js";

//@params {string} query - this is the search term for the youtube video
//@return {promise<void>} - fetches top 5 videos and then updats the list
// description - uses the youtube data api to find the videos and injects the results

export async function searchVideos(query) {
    const videoList = document.querySelector('#videoResult');
    const apiKey = SETTINGS.YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(query)}&type=video&key=${apiKey}`;

    try {
        const response = await fetch(url)
        const data = await response.json();
        const videos = data.items;

        renderVideoThumbnails(videos);
    } catch (error) {
        console.error('YouTube Fetch Error:', error);
        videoList.innerHTML  = `<p class="text-danger small p-2">Error loading videos.</p>`;
    }
    
}


//@param {array} videos  - array of video objects from youtube api
//@return {void} 
//@description Renders thumbnails and add a click event to update the central iframe
function renderVideoThumbnails(videos) {
    const videoList = document.querySelector('#videoResult');

    videoList.innerHTML = videos.map(video => `
            <button class="list-group-item list-group-item-action d-flex align-items-center border-0 mb-2 rounded bg-transparent" 
                    onclick="updatePlayer('${video.id.videoId}')">
                <img src="${video.snippet.thumbnails.default.url}" class="rounded me-3" style="width: 100px;">
                <div class="text-start">
                    <h6 class="mb-1 fw-bold text-truncate" style="max-width: 150px;">${video.snippet.title}</h6>
                   <p class="mb-0 x-small video-channel">${video.snippet.channelTitle}</p>
                </div>
            </button>
        `).join('');
}


//@param {string} videoId - the unique youtube video ID
//@returns {void}
//@description feature: Dynamically updates the central iframe to play the selected video
window.updatePlayer = function(videoId)  {
    const player = document.querySelector('#mainPlayer');
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`
};


