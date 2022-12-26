
import {key} from './apiKey.js'

const filmeM = document.querySelector('.movie-name')
const container = document.querySelector('.container')
const main = document.querySelector('main')
const showFavMovie = document.querySelector('.fav-movies')
const containerFilme = document.createElement('div')
let movieJson

 

//Chamada da API
async function getpopularMovies(){

  let req = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${key}`)
  let filme = await req.json()
  let  movies =  filme.results
       
       movies.forEach(movieListShow =>{
           createElementsMovies(movieListShow) 
       })
      
  }

//função para busca dos filmes
async function searchMovie(movieName){

    let req = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${movieName}`)
    let callMovie = await req.json()
    let catchMovie = callMovie.results

      catchMovie.forEach(movieCall => {
      createElementsMovies(movieCall)
    });
}

// função que vai realizar o evento de clique para pesquisa dos filmes
function movieSearch(){
  filmeM.addEventListener('keyup', function(event){
    //Quando a tecla enter for clicada é limpado o container dos filmes e a função de 
    //procura o nome do filme é chamada
     if(event.keyCode == 13){
         containerFilme.innerHTML = ' ' 
         searchMovie(filmeM.value)
 }
})
}

//Evento que irá mostrar os filmes favoritaso pelo usuário
 showFavMovie.addEventListener('click', ()=>{
      if(showFavMovie.checked ){
        containerFilme.innerHTML = ''
        movieJson =  localStorage.getItem('favoriteMovies')
       const dataMoviesShow = JSON.parse(movieJson)
        dataMoviesShow.forEach(movieData =>{

          createElementsMovies(movieData)
        })
 
  }else{
    containerFilme.innerHTML = ''
    getpopularMovies()
  }

})

function getFavoriteMovies() {
  return JSON.parse(localStorage.getItem('favoriteMovies'))
}


//função que irá salvar filmes
function saveToLocalStorage(movie){
  const movies =  getFavoriteMovies() || []
  movies.push(movie) 
   movieJson = JSON.stringify(movies)// transforma o json em texto para ser salvo no localStore
  localStorage.setItem('favoriteMovies', movieJson )

}

function removeMovieFromLocalStorage(id){
  //a variavel moviesSaved recebe a lista que filmes que está salva no localStorage.
  const moviesSaved = getFavoriteMovies() || []

  //moviesFind verifica se tem algum filme que está no banco com o mesmo id dos filmes que estão sendo 
  //listados na tela principal , e então vai retornar para a variável.
  const movieFind = moviesSaved.find(movieSaved =>  movieSaved.id == id)
  
  //newList irá filtrar todos os filmes do localStore que tem o id diferente do movieFind e vai armazenar
  //essa nova lista na variável.
 const newList = moviesSaved.filter(movieSave => movieSave.id !== movieFind.id)
 localStorage.setItem('favoriteMovies', JSON.stringify(newList))
}



 //função que verifica o clique na imagem para favoritar o filme
 function favoriteButtonPressed(event, movie){
  const favoriteState = {
    favorited: '../assets/full-heart.svg',
    notFavorited: '../assets/Heart.svg'
  }
  //verifica se a imagem esta como notfavorited e adiciona a outra imagem
  if(event.target.src.includes(favoriteState.notFavorited)){
    event.target.src = favoriteState.favorited
    saveToLocalStorage(movie) // executa a função de salvar
  } else{
    event.target.src = favoriteState.notFavorited
    removeMovieFromLocalStorage(movie.id) //executa a função de remover 
  }
 }

 //checa se o filme que está no localStore é o mesmo que está na tela de início
 //se estiver ele retorna true, que significa que o filme está favoritado
   function checkMovieIsFavorite(id){
    const movies = getFavoriteMovies() || []
    return movies.find(movie => movie.id == id)
  }

       function createElementsMovies(movie){

        // passa o id do filme e executa a função no qual retorna 
        // true ou false 
        const isfavorite = checkMovieIsFavorite(movie.id) 

        const imagem = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
        const movieList = document.createElement('div')
        const  movieInformation = document.createElement('div')
        const  img = document.createElement('img')
        const  movieTitle= document.createElement('div')
        const  movieName = document.createElement('h2')
        const  icones = document.createElement('div')
        const  rate = document.createElement('img')
        const  favorite = document.createElement('img')
        const  spanRate = document.createElement('span')
        const spanFavorite = document.createElement('span')
        const description = document.createElement('div')
        const p = document.createElement('p')
        
        containerFilme.classList.add('container-filmes')
        movieList.classList.add('movies-list')
        movieInformation.classList.add('movie-information')
        img.classList.add('movie-img')
        movieTitle.classList.add('movie-title')
        icones.classList.add('icones')
        rate.classList.add('star')
        favorite.classList.add('heart')
        
        // Dependendo do retorno a imagem será trocada
        favorite.src = isfavorite ? '../assets/full-heart.svg' : '../assets/Heart.svg' 

        //É passado um evento de click para a imagem, onde será realizado a troca de imagem 
        favorite.addEventListener('click', (event)=> favoriteButtonPressed(event, movie))
          

        spanFavorite.classList.add('span-favorite')
        description.classList.add('movie-description')
        
        rate.setAttribute('src', '../assets/Star.svg')
        img.src =  imagem

        movieName.textContent = `${movie.title} (${movie.release_date})`
        p.textContent = movie.overview 
        
        main.appendChild(containerFilme)
        containerFilme.appendChild(movieList)
        movieList.appendChild(movieInformation)
        movieList.appendChild(description)
        description.appendChild(p)
        movieInformation.appendChild(img)
        movieInformation.appendChild(movieTitle)
        movieTitle.appendChild(movieName)
        movieTitle.appendChild(icones)
        icones.appendChild(spanRate)
        spanRate.textContent = `${movie.vote_average}`
        spanRate.appendChild(rate)
        icones.appendChild(spanFavorite)
        spanFavorite.textContent = 'Favoritar' 
        spanFavorite.appendChild(favorite)
      }

getpopularMovies()
movieSearch()




