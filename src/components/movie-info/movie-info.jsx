import { Component } from 'react'
import './movie-info.scss'
import MovieService from '../../services/movie-service'
import Error from '../error/error'
import Spinner from '../spinner/spinner'
import PropTypes from 'prop-types';

class MovieInfo extends Component {
	state = {
		movie: null,
		loading: false,
		error: false,
	}

	movieService = new MovieService()

	componentDidMount() {
		this.updateMovie()
	}

	componentDidUpdate(prevProps) {
		if (this.props.movieId !== prevProps.movieId) {
			this.updateMovie()
		}
	}

	updateMovie = () => {
		const { movieId } = this.props
		if (!movieId) {
			return
		}

		this.setState({ loading: true })

		this.movieService
			.getDetailedMovie(movieId)
			.then(res => this.setState({ movie: res }))
			.catch(() => this.setState({ error: true }))
			.finally(() => this.setState({ loading: false }))
	}

	render() {
		const { movie, loading, error } = this.state

		const initialContent = movie || loading || error ? null : <Spinner />
		const errorContent = error ? <Error /> : null
		const loadingContent = loading ? <Spinner /> : null
		const content = !(error || loading || !movie) ? 
			<Content movie={movie} />
		 : null
		return (
			<div className='movieinfo'>
				{initialContent}
				{errorContent}
				{loadingContent}
				{content}
			</div>
		)
	}
}
MovieInfo.prevProps = {
	movieId:PropTypes.number
}
export default MovieInfo

const Content = ({ movie }) => {
	return (
		<>
			<img src={movie.backdrop_path} alt='img' />
			
			<div className='movieinfo__descr'>
				<h2>{movie.name}</h2>
				<p>{movie.description}</p>
				<div className='movieinfo__descr-item'>
					<img src='/date.svg' alt='' />
					<p>{movie.release_date}</p>
					<div className='dot' />
					<p>{movie.vote_average.toFixed(1)}</p>
					<img src='/star.svg' alt='' />
				</div>
			</div>
		</>
	)
}

Content.prototypes = {
	movie:PropTypes.object
}