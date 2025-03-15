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
	constructor(props) {
		super(props)
		this.state = {
			open: false,
			movies: [],
			loading: true,
			error: false,
		}
		this.movieService = new MovieService()
	}
	componentDidMount() {
		this.getTrendingMovies()
	}

	onToggleOpen = () => {
		this.setState(({ open }) => ({ open: !open }))
	}

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
		const { open, movies, error, loading } = this.state
		const errData = error ? <Error /> : null
		const loadinfData = loading ? <Spinner /> : null
		const contentData = !(error || loading) ? 
			<ContentData movies={movies} onToggleOpen={this.onToggleOpen} />
		 : null

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
				
				<Modal open={open} onClose={this.onToggleOpen}>
					<MovieInfo />
				</Modal>
			</div>
		)
	}
}

export default RowMovies

const ContentData = ({ movies, onToggleOpen }) => {
	return (
		<>
					{movies.map((movie) => (
						<RowMoviesItem 
							key={movie.id} 
							movie={movie} 
							onToggleOpen={onToggleOpen}
						/>
					))}
		</>
	)
}
