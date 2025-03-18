import { useState, useEffect } from 'react'
import './movie-info.scss'
import MovieService from '../../services/movie-service'
import Error from '../error/error'
import Spinner from '../spinner/spinner'
import PropTypes from 'prop-types'
import useMovieService from '../../services/movie-service'
import { useNavigate } from 'react-router-dom'

const MovieInfo = ({ movieId }) => {
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
	// console.log("content",content);

	return (
		<div className='movieinfo'>
			{initialContent}
			{errorContent}
			{loadingContent}
			{content}
		</div>
	)
}
MovieInfo.prevProps = {
	movieId: PropTypes.number,
}
export default MovieInfo

const Content = ({ movie }) => {
	const navigate = useNavigate()
	return (
		<>
			<img src={movie.backdrop_path} alt='img' />
			<div className='movieinfo__descr'>
				<div>
					<h2>{movie.name}</h2>
					<p>{movie.description}</p>
					<div className='movieinfo__descr-item'>
						<img src='/date.svg' alt='' />
						<p>{movie.release_date}</p>
						<div className='dot' />
						<p>{movie.vote_average.toFixed(1)}</p>
						<img src='/star.svg' alt='' />
					</div>
					<div>
						<button
							className='btn btn-light'
							onClick={() => navigate(`/movie/${movie.id}`)}
						>
							Details
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

Content.prototypes = {
	movie: PropTypes.object,
}
