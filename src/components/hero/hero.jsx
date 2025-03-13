import { Component } from 'react'
import './hero.scss'
import MovieService from '../../services/movie-service'

class Hero extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: null,
			description: null,
			thumbnail: null,
			backdrop_path: null,
			id: null,
		}
		this.movieService = new MovieService()
		this.getMovie()
	}

	getMovie = () => {
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
		this.movieService.getRandomMovie().then(res => this.setState(res))
	}

	render() {
		const { name, description, backdrop_path } = this.state
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
					<button className='btn btn__primary'>DETAILS</button>
				</div>
				<div className='app__hero-moive'>
					<img src={backdrop_path} alt='img' />
					<div className='app__hero-moive__descr'>
						<h2>{name}</h2>
						<p>
							{description && description.length > 100
								? `${description.slice(0, 100)}...`
								: description}
						</p>
						<div>
							<button className='btn btn__secondary'>
								RANDOM MOVIE
							</button>
							<button className='btn btn__primary'>
								DETAILS
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Hero
