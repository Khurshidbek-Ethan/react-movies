import { Component } from 'react'
import './hero.scss'
import MovieService from '../../services/movie-service'
import Spinner from '../spinner/spinner'
import Error from '../error/error'

class Hero extends Component {
	constructor(props) {
		super(props)
		this.state = {
			movie: {},
			loading: true,
			error: false,
		}
		this.movieService = new MovieService()
	}
	componentDidMount() {
		this.updateMovie()
		// console.log('componentDidMount')
	}

	updateMovie = () => {
		// this.movieService.getPopularMovies().then(res => {
		// 	// console.log(res.results)
		// 	//arraylarni ichidan defaultni olvolishimiz  kerak
		// 	// yanni arraylarni ichidan xarsafar  yangi malumot kelish un
		// 	// console.log(
		// 	// 	res.results[Math.floor(Math.random() * res.results.length)]
		// 	// ) // random 0 dan 1 gacha bolgan sonni chiqarib beradi
		// 	// 0 -1 / 0.1 ,0.2 .... 1 gacha
		// 	// kopaytirishimizni sababi bizga faqat 20ta array kerak shuni chiqarib beradi

		// 	// const movie =
		// 	// 	res.results[Math.floor(Math.random() * res.results.length)]

		// 	// this.setState({
		// 	// 	name: movie.original_title,
		// 	// 	description: movie.overview,
		// 	// 	thumbnail: `${this.movieService._apiImg}${movie.poster_path}`,
		// 	// 	id: movie.id,
		// 	// })

		// })

		this.setState({ laoding: true })
		this.movieService
			.getRandomMovie()
			.then(res => this.setState({ movie: res }))
			.catch(() => this.setState({ error: true }))
			.finally(() => this.setState({ loading: false }))
	}

	render() {
		const { movie, loading, error } = this.state
		const errorContent = error ? <Error /> : null
		const loadingContent = loading ? <Spinner /> : null
		const content = !(error || loading) ? <Content movie={movie} /> : null

		return (
			<div className='app__hero'>
				<div className='app__hero-info'>
					<h2>FIND MOVIES</h2>
					<h1>TV shows and more</h1>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Illum sapiente sit placeat minus dolorum, magnam,
						tempora quas neque quasi, sequi odit doloremque velit
						saepe autem facilis! Laudantium consequatur accusantium
						mollitia.
					</p>
					<div>
						<button className='btn btn__primary'>DETAILS</button>
						<button
							className='btn btn__secondary'
							onClick={this.updateMovie}
						>
							Random Movie
						</button>
					</div>
				</div>
				<div className='app__hero-moive'>
					{errorContent}
					{loadingContent}
					{content}
				</div>
			</div>
		)
	}
}

export default Hero

const Content = ({ movie }) => {
	return (
		<>
			<img src={movie.backdrop_path} alt='img' />
			<div className='app__hero-moive-descr'>
				<h2>{movie.name}</h2>
				<p>
					{movie.description && movie.description.length > 200
						? `${movie.description.slice(0, 200)}...`
						: movie.description}
				</p>
				<button className='btn btn__primary'>DETAILS</button>
			</div>
		</>
	)
}
