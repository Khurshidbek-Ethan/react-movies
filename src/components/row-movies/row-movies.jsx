import './row-movies.scss'

import RowMoviesItem from '../row-movies-item/row-movies-item.jsx'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import MovieInfo from '../movie-info/movie-info.jsx'
import { useState, useEffect } from 'react'
import MovieService from '../../services/movie-service.js'
import Error from '../error/error.jsx'
import Spinner from '../spinner/spinner.jsx'
import PropTypes from 'prop-types'
import useMovieService from '../../services/movie-service.js'

const RowMovies = () => {
	const [open, setOpen] = useState(false)
	const [movies, setMovies] = useState([])
	const [movieId, setMovieId] = useState(null)
	const [page, setPage] = useState(2)
	const [newItemLoading, setNewItemLoading] = useState(false)

	const { error, loading, getTrandingMovies } = useMovieService()

	useEffect(() => {
		getMovies()
	}, [])

	const onClose = () => setOpen(false)
	const onOpen = id => {
		setMovieId(id)
		setOpen(true)
	}

	const getMovies = (page) => {
		getTrandingMovies(page)
			.then(res => setMovies(movies => [...movies, ...res]))
			.finally(() => setNewItemLoading(false))
	}

	const getMoreMovies = () => {
		setNewItemLoading(true)
		setPage(page => page + 1)

		getMovies(page)
	}

	const errData = error ? <Error /> : null
	const loadinfData = loading ? <Spinner /> : null
	


	
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
			<ContentData movies={movies} onOpen={onOpen} />
			<div className='rowmovie__loadmore'>
				<button
					className='btn btn-secondary'
					onClick={getMoreMovies}
					disabled={newItemLoading}
				>
					Load More
				</button>
			</div>

			<Modal open={open} onClose={onClose}>
				<MovieInfo movieId={movieId} />
			</Modal>
		</div>
	)
}

export default RowMovies

const ContentData = ({ movies, onOpen }) => {
	return (
		<div className='rowmovie-lists'>
			{movies.map(movie => (
				<RowMoviesItem movie={movie} onOpen={onOpen} />
			))}
		</div>
	)
}
ContentData.prototypes = {
	movies: PropTypes.array,
	onOpen: PropTypes.func,
}
