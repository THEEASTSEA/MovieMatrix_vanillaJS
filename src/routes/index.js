import { createRouter } from '../core/donghae.js'
import Home from '../routes//Home.js'
import Movie from '../routes/Movie.js'
import About from '../routes/About.js'
import NotFound from '../routes/NotFound.js'
import MyList from '../routes/MyList.js'

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
    path: '#/mymovie',
    component: MyList
  },
  {
    path: '#/about',
    component: About
  },
  {
    path: '.*',
    component: NotFound
  }
])
