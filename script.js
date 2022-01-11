//variables
const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");

const apiURL= "https://api.lyrics.ovh";





//get the input value
form.addEventListener("submit", e => {
    e.preventDefault();
   let searchValue = search.value.trim();

if (!searchValue){
    alert("null")
} else{
    beginSearch(searchValue);
}
})





//create search funtion
async function beginSearch(searchValue){
const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`);
const data = await searchResult.json();

displayData(data);
}



//search result
function displayData(data) {
    result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(song=> `<li>
                    <div>
                        <strong>${song.artist.name}</strong> -${song.title} 
                    </div>
                    <span data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</span>
                </li>`
        )
        .join('')}
    </ul>
  `;
}

//event listener in lyrics button
result.addEventListener('click', e=>{
    const clickedElement = e.target;

    
    //checking clicked elemet is button or not
    if (clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        
        getLyrics(artist, songTitle)
    }
})

// Get lyrics
async function getLyrics(artist, songTitle) {
    const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await response.json();
  
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
  
    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <p>${lyrics}</p>`;
  
  }
