
/*
movielist = [  
    {title:'Avengers Endgame', img:'vingadores.svg', year:2021, rate:'9.3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Duis aute irure dolor in reprehenderit in voluptate veliDuis aute irure dolor in reprehenderit in voluptate veli Duis aute irure dolor in reprehenderit in voluptate veli'}, 
    {title: 'Avatar- a lenda de aang', img:'vingadores.svg', year:2016, rate:'10.0', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Duis aute irure dolor in reprehenderit in voluptate veliDuis aute irure dolor in reprehenderit in voluptate veli Duis aute irure dolor in reprehenderit in voluptate veli' }

]*/


/*async function getpopularMovies(){
    fetch('https://api.themoviedb.org/3/movie/76341?api_key=cb35b229f134f593da02fa9ded6da8ca')
    .then(async res => {

        if(!res.ok){
            throw new Error(res.status)
        }

        const movie = await res.json()

        console.log(movie)

        movie.map((item)=>{

            const movieList = document.createElement('div')
            const  movieInformation = document.createElement('div')
            const  container = document.querySelector('.container')
            const  img = document.createElement('img')
            const  movieTitle= document.createElement('div')
            const  movieName = document.createElement('h2')
            const  icones = document.createElement('div')
            const rate = document.createElement('img')
            const favorite = document.createElement('img')
            const  spanRate = document.createElement('span')
            const spanFavorite = document.createElement('span')
            const description = document.createElement('div')
            
            
            movieList.classList.add('movies-list')
            movieInformation.classList.add('movie-information')
            img.classList.add('movie-img')
            movieTitle.classList.add('movie-title')
            icones.classList.add('icones')
            rate.classList.add('star')
            favorite.classList.add('heart')
            description.classList.add('movie-description')
            
             rate.setAttribute('src', 'Star.svg')
            favorite.setAttribute('src', 'Heart.svg')
            img.setAttribute('src', item.backdrop_path)
            
            movieName.innerHTML = `${item.original_title} (${item.release_date})`
            description.textContent = item.overview 
            
            
            container.appendChild(movieList)
            movieList.appendChild(movieInformation)
            movieList.appendChild(description)
            movieInformation.appendChild(img)
            movieInformation.appendChild(movieTitle)
            movieTitle.appendChild(movieName)
            movieTitle.appendChild(icones)
            icones.appendChild(spanRate)
            spanRate.textContent = `${item.popularity}`
            spanRate.appendChild(rate)
            icones.appendChild(spanFavorite)
            spanFavorite.textContent = 'Favoritar' 
            spanFavorite.appendChild(favorite)
            
            })
        

    })
    
    .catch(error => console.log(error))
}

*/

function getpopularMovies(){
    fetch('https://api.themoviedb.org/3/trending/all/day?api_key=cb35b229f134f593da02fa9ded6da8ca')
   .then(  res => {
    return res.json()
   })
   .then(filme =>{
    
      movie =   filme.results

      console.log(movie)

  for(let i in movie){

    const imagem = `https://image.tmdb.org/t/p/w500${movie[i].backdrop_path}`


        const movieList = document.createElement('div')
        const  movieInformation = document.createElement('div')
        const  container = document.querySelector('.container')
        const  img = document.createElement('img')
        const  movieTitle= document.createElement('div')
        const  movieName = document.createElement('h2')
        const  icones = document.createElement('div')
        const rate = document.createElement('img')
        const favorite = document.createElement('img')
        const  spanRate = document.createElement('span')
        const spanFavorite = document.createElement('span')
        const description = document.createElement('div')
        
        
        movieList.classList.add('movies-list')
        movieInformation.classList.add('movie-information')
        img.classList.add('movie-img')
        movieTitle.classList.add('movie-title')
        icones.classList.add('icones')
        rate.classList.add('star')
        favorite.classList.add('heart')
        description.classList.add('movie-description')
        
         rate.setAttribute('src', 'assets/Star.svg')
        favorite.setAttribute('src', 'assets/Heart.svg')
        img.src =  imagem
        
        movieName.textContent = `${movie[i].title} (${movie[i].release_date})`
        description.textContent = movie[i].overview 
        
        
        container.appendChild(movieList)
        movieList.appendChild(movieInformation)
        movieList.appendChild(description)
        movieInformation.appendChild(img)
        movieInformation.appendChild(movieTitle)
        movieTitle.appendChild(movieName)
        movieTitle.appendChild(icones)
        icones.appendChild(spanRate)
        spanRate.textContent = `${movie[i].vote_average}`
        spanRate.appendChild(rate)
        icones.appendChild(spanFavorite)
        spanFavorite.textContent = 'Favoritar' 
        spanFavorite.appendChild(favorite)
  }

        })
    
  

   .catch(error => console.log(error))
}

getpopularMovies()




