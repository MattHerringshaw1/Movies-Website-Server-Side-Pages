const cors = require("cors")
const express = require("express")
const mustacheExpress = require("mustache-express")
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.engine("mustache", mustacheExpress())
app.set("views", "./views")
app.set("view engine", "mustache")

app.listen(8080, function() {
    console.log("server is running ...")
})

let movies = [{id: 1, title: "Ironman", description: "enter description", genre:"action"}, {id: 2, title: "Superman", description: "enter description", genre:"action"}]

app.get("/movies", (req, res) => {
    res.render("index", {allMovies: movies})
})

app.post("/movies/create", (req, res) => {
    let movie = {id: movies.length + 1, title: req.body.movieName, description: req.body.movieDescription, genre: req.body.movieGenre}
    movies.push(movie)
    res.redirect("/movies")
})

app.post("/movies/delete", (req, res) => {
    const movieId = parseInt(req.body.movieId) 
    movies = movies.filter(movie => movie.id != movieId)
    res.redirect('/movies')
})

app.get ("/movies/:movieId", (req, res) => {
    const movieId = parseInt(req.params.movieId)
    movies = movies.filter(movie => movie.id == movieId)
    res.render("movie", {oneMovie: movies})
})

