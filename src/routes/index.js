import { createRouter } from '../core/donghae.js'
import Home from '../routes//Home.js'
import Movie from '../routes/Movie.js'
import About from '../routes/About.js'

export default createRouter([
  {
    path: '#/',
    component: Home
  },
  {
    path: '#/movie',
    component: Movie
  },
  {
    path: '#/about',
    component: About
  }
])
