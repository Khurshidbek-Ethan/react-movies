import './row-movies.scss'

import RowMoviesItem from '../row-movies-item/row-movies-item.jsx'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import MovieInfo from '../movie-info/movie-info.jsx'
import React from 'react'
import MovieService from '../../services/movie-service.js'
import Error from '../error/error.jsx'
import Spinner from '../spinner/spinner.jsx'
import PropTypes from 'prop-types';


class RowMovies extends React.Component {
	state = {
		open: false,
		movies: [],
		loading: true,
		error: false,
		movieId: null,
		page: 2,
		newItemLoading: false,
	}
	movieService = new MovieService()

	componentDidMount() {
		this.getTrendingMovies()
	}

	

	onClose = () => this.setState({open: false})
	onOpen = id => this.setState({ open: true, movieId: id })

	// 1 variyati
	// onToggleOpen = () => {
	// 	this.setState(({ open }) => ({ open: !open }))
	// }

	getTrendingMovies = page => {
		this.movieService
			.getTrandingMovies(page)
			.then(res =>
				this.setState(({ movies }) => ({ movies: [...movies, ...res] }))
			)
			.catch(() => this.setState({ error: true }))
			.finally(() =>
				this.setState({ loading: false, newItemLoading: false })
			)
	}

	getMoreMovies = () => {
		this.setState(({ page }) => ({ page: page + 1, newItemLoading: true }))
		// console.log(this.state.page)
		this.getTrendingMovies(this.state.page)
	}

	render() {
		const { open, movies, error, loading, movieId, newItemLoading } =
			this.state
		const errData = error ? <Error /> : null
		const loadinfData = loading ? <Spinner /> : null
		const contentData = !(error || loading) ? (
			<ContentData movies={movies} onOpen={this.onOpen} />
		) : null

		return (
			<div className='rowmovie'>
				<div className='rowmovie-top'>
					<div className='rowmovie-top__title'>
						<img src='/tranding.svg' alt='' />
						<h1>Trending</h1>
					</div>
					<div className='hr' />
					<a href='#'>See more</a>
				</div>
				{errData}
				{loadinfData}
				{contentData}
				<div className='rowmovie__loadmore'>
					<button
						className='btn btn__secondary'
						onClick={this.getMoreMovies}
						disabled={newItemLoading}
					>
						Load More
					</button>
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
		<div className='rowmovie-lists'>
			{movies.map(movie => (
				<RowMoviesItem key={movie.id} movie={movie} onOpen={onOpen} />
			))}
		</div>
	)
}
ContentData.prototypes = {
	movies: PropTypes.array,
	onOpen:PropTypes.func
}