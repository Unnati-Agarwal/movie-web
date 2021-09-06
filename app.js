
const API_KEY = 'k_j4o5lvmz';

const search = document.querySelector("#search");
const movie = document.querySelector("#movie");
const movieCatalogue = document.querySelector("#movie-catalogue");
const movieConatiner = document.querySelector("#movie-container");


function videoURL(path){
    const url = `https://imdb-api.com/en/API/${path}`
    return url;
}

function searchmovies(value){
    const path = 'SearchMovie/k_j4o5lvmz';
    const newurl = videoURL(path) + '/' + value;
    requestMovies(newurl, renderSearchMovies);
}

function getUpcoming(){
    const path = 'ComingSoon/k_j4o5lvmz';
    const newurl = videoURL(path);
    const render = renderMovies.bind({title: 'Upcoming Movies'});
    requestMovies(newurl, render);
}

function getTopRated(){
    const path = 'Top250Movies/k_j4o5lvmz';
    const newurl = videoURL(path);
    const render = renderMovies.bind({title: 'Top Rated Movies'});
    requestMovies(newurl, render);
}

function getPopular(){
    const path = 'MostPopularMovies/k_j4o5lvmz';
    const newurl = videoURL(path);
    const render = renderMovies.bind({title: 'Popular Movies'});
    requestMovies(newurl, render);
}

function moviesection(movies){
    const section = document.createElement('section');
    section.classList = 'section';

    movies.map((movie) => {
        if(movie.image !== 'https://imdb-api.com/images/original/nopicture.jpg')
        {
            const img = document.createElement('img');
            img.src= movie.image;
            img.setAttribute('data-id', movie.id);

            section.appendChild(img);
        }    
    });
    return section;
}

function renderSearchMovies(data){
    movieCatalogue.innerHTML = '';
    const movies = data.results;
    const movieBlock = moviesearch(movies);
    movieCatalogue.appendChild(movieBlock);

}
function renderMovies(data){
    const movies = data.items;
    const movieBlock = moviesearch(movies,this.title);
    movieConatiner.appendChild(movieBlock);
}


function requestMovies(url,onComplete)
{
    fetch(url)
         .then((res) => res.json())
         .then(onComplete)
         .catch((err) =>{
             console.log(err);
         });
}


function moviesearch(movies,title=''){
    
    const moviediv=document.createElement('div');
    moviediv.setAttribute('class','movie');

    const header = document.createElement('h2');
    header.innerHTML=title;

    const content = document.createElement('div');
    content.classList = 'content';

    const contentClose = `<button id="content-close"><i class="fa fa-times-circle"></i></button>`;
    content.innerHTML = contentClose;
    
    const section = moviesection(movies);
    moviediv.appendChild(header);
    moviediv.appendChild(section);
    moviediv.appendChild(content);
    return moviediv;
}

search.onclick = function(event){
    event.preventDefault();
    const val = movie.value ;

    if(val)
    {
      searchmovies(val);
     
    }

    console.log(val);
    console.log("Clicked button");
}

function createvideo(video){
    console.log("Video ID",video.videoId);
    if(video.videoId !== ""){
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${video.videoId}` ;
        iframe.width = 360;
        iframe.height = 315;
        iframe.allowFullscreen = true;
        return iframe;
    }
    
}
function videotemplate(data,content){
    content.innerHTML = '<button id="content-close" class="fa fa-times-circle"></button>'
    console.log('Videos',data)
    const iframeContainer = document.createElement('div');
    iframeContainer.classList = 'removal';
    const iframe = createvideo(data);
    iframeContainer.appendChild(iframe);
    content.appendChild(iframeContainer);
}

document.onclick = function(event){

    if(event.target.tagName.toLowerCase() === 'img'){
       const movieId = event.target.dataset.id;
       const section = event.target.parentElement;
       const content = section.nextElementSibling;
       content.classList.add('content-display');

       const path = `YouTubeTrailer/k_j4o5lvmz/${movieId}`;
       const url = videoURL(path)
       fetch(url)
        .then((res) => res.json())
        .then((data) => videotemplate(data,content))
        .catch((err) => {
            console.log(err);
        })
    }  
    if(event.target.id === 'content-close'){
        const content = event.target.parentElement;
        content.classList.remove('content-display');
    }
} 

getPopular();
getTopRated();
getUpcoming();
