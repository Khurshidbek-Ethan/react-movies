class MovieService {
	//  mendan keyin pragramizgasignal qoldiramiz _apiBase _ ogohlantirish oylab ozgartirgin deymiz
	_apiBase = 'https://api.themoviedb.org/3'
	_apiKey = 'api_key=9d4711400aef902f165781879f7edc2a'
	_apiImg = 'https://image.tmdb.org/t/p/original'

	getRecource = async url => {
		const response = await fetch(url)

		if (!response.ok) {
			throw new Error(`Could not fetch${url},status:${response.status}`)
		}
		return await response.json()
	}
	getPopularMovies = async () => {
		return this.getRecource(
			`${this._apiBase}/movie/popular?language=en-US&${this._apiKey}`
		)
	}

	getTrandingMovies = async () => {
		const response = await this.getRecource(
			`${this._apiBase}/movie/top_rated?language=en-US&${this._apiKey}`
		)
		const movies = response.results
		console.log(movies)

		return movies && movies.map(movie => this._transformMovie(movie))
	}

	getDetailedMovie = async id => {
		return this.getRecource(
			`${this._apiBase}/movie/${id}?language=en-US&${this._apiKey}`
		)
	}

	getRandomMovie = async () => {
		const res = await this.getPopularMovies()
		const movie =
			res.results[Math.floor(Math.random() * res.results.length)]
		return this._transformMovie(movie)
	}

	_transformMovie = movie => {
		return {
			name: movie.original_title,
			description: movie.overview,
			backdrop_path: `${this._apiImg}${movie.backdrop_path}`,
			poster_path: `${this._apiImg}${movie.poster_path}`,
			id: movie.id,
			release_date: movie.release_date,
			vote_average: movie.vote_average,
		}
	}
}

export default MovieService
