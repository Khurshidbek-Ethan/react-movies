import './row-movies.scss'

import RowMoviesItem from '../row-movies-item/row-movies-item.jsx'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import MovieInfo from '../movie-info/movie-info.jsx'
import { Component } from 'react'
import MovieService from '../../services/movie-service.js'
import Error from '../error/error.jsx'
import Spinner from '../spinner/spinner.jsx'

class RowMovies extends Component {
	state = {
		open: false,
		movies: [],
		loading: true,
		error: false,
		movieId: null,
	}
	movieService = new MovieService()

	componentDidMount() {
		this.getTrendingMovies()
	}

	onClose = () => this.setState({ open: false })
	onOpen = id => this.setState({ open: true, movieId: id })

	// 1 variyati
	// onToggleOpen = () => {
	// 	this.setState(({ open }) => ({ open: !open }))
	// }

	getTrendingMovies = () => {
		this.movieService
			.getTrandingMovies()
			.then(res => {
				this.setState({ movies: res })
			})
			.catch(() => this.setState({ error: true }))
			.finally(() => this.setState({ loading: false }))
	}

	render() {
		const { open, movies, error, loading, movieId } = this.state
		const errData = error ? <Error /> : null
		const loadinfData = loading ? <Spinner /> : null
		const contentData = !(error || loading) ? (
			<ContentData movies={movies} onOpen={this.onOpen} />
		) : null

		return (
			<div className='app__rowmovie'>
				<div className='app__rowmovie-top'>
					<div className='app__rowmovie-top__title'>
						<img src='/tranding.svg' alt='' />
						<h1>Trending</h1>
					</div>
					<div className='hr' />
					<a href='#'>See more</a>
				</div>
				<div className='app__rowmovie-lists'>
					{errData}
					{loadinfData}
					{contentData}
				</div>

				<Modal open={open} onClose={this.onClose}>
					<MovieInfo movieId={movieId} />
				</Modal>
			</div>
		)
	}
}

export default RowMovies

const ContentData = ({ movies, onOpen }) => {
	return (
		<>
			{movies.map(movie => (
				<RowMoviesItem key={movie.id} movie={movie} onOpen={onOpen} />
			))}
		</>
	)
}
