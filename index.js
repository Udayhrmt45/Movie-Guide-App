const formSearch =  document.querySelector('form');
const movieContianer =  document.querySelector('.movie-container');
const inputBox =  document.querySelector('.inputBox');

const getMovieInfo= async (movie)=>{
 try{
    const myAPIkey = "a03ebb40";
    const url = `http://www.omdbapi.com/?apikey=${myAPIkey}&t=${movie}`;

    const response = await fetch(url);

    if(!response.ok){
        throw new Error("Unable to fetch movie details!");
    }
    const data = await response.json();

    // console.log(data);   
    showMovieData(data);
  }
  catch(error){
    showErrorMessage("No movie found!");
  }
}

//function to show movie detials on screen
const showMovieData = (data)=>{
    
    movieContianer.innerHTML="";
    movieContianer.classList.remove('noBackground');

    const {Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster} = data;
    


    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');

    

    movieElement.innerHTML = `<h2>${Title}</h2>
                              <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(Element =>{
        const p = document.createElement('p');
        p.innerText = Element;
        movieGenreElement.appendChild(p);

    });
    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `<p><strong>Release Date: </strong>${Released}</p>
                               <p><strong>Duration: </strong>${Runtime}</p>
                               <p><strong>Actors: </strong>${Actors}</p>
                               <p><strong>Plot: </strong>${Plot}</p>`;

    //creating div for movie poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src="${Poster}"/>`;

    movieContianer.appendChild(moviePosterElement);
    
    movieContianer.appendChild(movieElement);
    
    
}
//function to display error message
const showErrorMessage = (message)=>{
    movieContianer.innerHTML = `<h2>${message}</h2>`; 
    movieContianer.classList.add('noBackground'); 
}

//function to handle form submission
const handleFormSubmission=(e)=>{
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if(movieName !== ''){
        showErrorMessage("Fetching User information...");
        getMovieInfo(movieName);
    }
    else{
      showErrorMessage("Enter the movie name to get the movie details!");
    }
}

// adding event listener to search form
formSearch.addEventListener('submit', handleFormSubmission);