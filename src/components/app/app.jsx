import Navbar from '../navbar/navbar'
import Hero from '../hero/hero'
import RowMovies from '../row-movies/row-movies'
import MovieService from '../../services/movie-service'
const App = () => {
	const movieService = new MovieService()

	movieService.getDetailedMovie(950396).then(data => console.log(data))

	return (
		<div className='app'>
			<Navbar />
			<Hero />
			<RowMovies />
		</div>
	)
}

export default App

/// Lifecycle hooks
//class componentda  loyiha ishgatushganda 1chi contructor ishga tushib keyin render ishga tushdi
//Mount -> foydalanuvchi sayitga kirganda 1chi korsatiladigon mount yani componentni foydalanuvchiga chiqishi
// 1chi constructor yasaladi  2chi render ishga tushadi render foydalanuvchiga malumotni korsatib beradi
//undan keyin componentDidMount ishga tushadi yani componentDidMountda bizga kerakli malumotlar boladi state va setState boladi
//componentDidUpdate biz qachonki statelarimizni setState lar bn ozgartirgan payitimiz yoki propslarni ozgartirmoqchi bolsek
//componentDidUpdate hook ishga tushib componentDidUpdate bizga ozgartirmoqchi bolgan componentni  ozgartirib beradi
//yanibiz  boshqatan  copmonentimizni Mountni qilishimiz shart bolmey qoladi
// malumotni ozgartirish un yani ozgartirmoqchi bolgan malumotni componentDidUpdate orqali render qilamiz

// Unmount componentni sayitimizdan ochirib tashlasek componentWillUnmount   ishga tushib render qilib beradi

// componentDidMount -> follow qilish yanni sayitga qoshish
// componentWillUnmount unfollow degani yani sayitdan ochirib yuborish yani componentlarni ochirib qoyish
