import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './detailed-movie.scss'
import useMovieService from '../../services/movie-service'
import Error from '../error/error'
import Spinner from '../spinner/spinner'
import PropTypes from 'prop-types'

const DetailedMovie = () => {
	// useParamsda objectni olvolamiz bu bizga browserdagi paramsni qolga olib beradi
	const { movieId } = useParams()
	const [movie, setMovie] = useState(null)

	const { error, loading, getDetailedMovie } = useMovieService()

	useEffect(() => {
		updateMovie()
	}, [movieId])

	const updateMovie = () => {
		if (!movieId) {
			return
		}
		getDetailedMovie(movieId).then(res => setMovie(res))
	}

	const initialContent = movie || loading || error ? null : <Spinner />
	const errorContent = error ? <Error /> : null
	const loadingContent = loading ? <Spinner /> : null
	const content = !(error || loading || !movie) ? (
		<Content movie={movie} />
	) : null

	return (
		<>
			{initialContent}, {errorContent}, {loadingContent}, {content}
		</>
	)
}

const Content = ({ movie }) => {
	return (
		<div className='detailedMovie'>
			<div className='detailedMovie__image'>
				<img src={movie.poster_path} alt={movie.name} />
			</div>
			<div className='detailedMovie__descr'>
				<h1>{movie.name}</h1>
				<p>{movie.description}</p>
				<div className='detailedMovie__descr-info'>
					<img src='/date.svg' alt='' />
					<p>{movie.release_date}</p>
					<div className='dot' />
					<p>{movie.vote_average.toFixed(1)}</p>
					<img src='/star.svg' alt='' />
				</div>
			</div>
		</div>
	)
}

Content.prototypes = {
	movie: PropTypes.object,
}

export default DetailedMovie
