import Navbar from '../navbar/navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../../pages/home-page'
import TvPage from '../../pages/tv-page'
import DetailedPage from '../../pages/detailed-page'
import NotFoundPage from '../../pages/not-found-page'
const App = () => {
	return (
		<div className='app'>
			<Navbar />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/tv' element={<TvPage />} />
				<Route path='/movie/:movieId' element={<DetailedPage />} />
				<Route path='/tv' element={<TvPage />} />
				{/*  pathga * qoyadigon bolsak tepadagi path larga togri kelmasa NotFoundPagega jonatvoradi */}
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
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
