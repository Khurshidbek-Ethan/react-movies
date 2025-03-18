import { useHttp } from '../hooks/use-http'

const useMovieService = () => {
	const { request, loading, error, clearError } = useHttp()

	//  mendan keyin pragramizgasignal qoldiramiz _apiBase _ ogohlantirish oylab ozgartirgin deymiz
	const _apiBase = 'https://api.themoviedb.org/3',
		_apiLng = 'language=en-US',
		_apiKey = 'api_key=9d4711400aef902f165781879f7edc2a',
		_apiImg = 'https://image.tmdb.org/t/p/original',
		_apiPage = 1

	// getRecource = async url => {
	// 	const response = await fetch(url)

	// 	if (!response.ok) {
	// 		throw new Error(`Could not fetch${url},status:${response.status}`)
	// 	}
	// 	return await response.json()
	// }

	const getPopularMovies = async () => {
		return await request(`${_apiBase}/movie/popular?${_apiLng}&${_apiKey}`)
	}

	const getTrandingMovies = async (page = _apiPage) => {
		const response = await request(
			`${_apiBase}/movie/top_rated?${_apiLng}&${page}&${_apiKey}`
		)
		const movies = response.results
		// console.log(movies)

		return movies && movies.map(movie => _transformMovie(movie))
	}

	const getDetailedMovie = async id => {
		const movie = await request(
			`${_apiBase}/movie/${id}?${_apiLng}&${_apiKey}`
		)
		return _transformMovie(movie)
	}

	const getRandomMovie = async () => {
		const res = await getPopularMovies()
		const movie =
			res.results[Math.floor(Math.random() * res.results.length)]
		return _transformMovie(movie)
	}

	const _transformMovie = movie => {
		return {
			name: movie.original_title,
			description: movie.overview,
			backdrop_path: `${_apiImg}${movie.backdrop_path}`,
			poster_path: `${_apiImg}${movie.poster_path}`,
			id: movie.id,
			release_date: movie.release_date,
			vote_average: movie.vote_average,
		}
	}
	return {
		getTrandingMovies,
		getRandomMovie,
		getDetailedMovie,
		loading,
		error,
		clearError,
	}
}

export default useMovieService
