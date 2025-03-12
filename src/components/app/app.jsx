import Navbar from '../navbar/navbar'
import Hero from '../hero/hero'
import RowMovies from '../row-movies/row-movies'
import MovieService from '../../services/movie-service'
const App = () => {
	const movieService = new MovieService()

	movieService.getDetailedMovie(950396).then(data => console.log(data))

	return (
		<div className='app'>
			<Navbar />
			<Hero />
			<RowMovies />
		</div>
	)
}

export default App
