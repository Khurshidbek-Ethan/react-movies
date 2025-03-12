import './row-movies.scss'
import { movies } from '../../constants/index.js'
import RowMoviesItem from '../row-movies-item/row-movies-item'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import MovieInfo from '../movie-info/movie-info.jsx'
import { Component } from 'react'

class RowMovies extends Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false,
		}
	}

	onToggleOpen = () => {
		this.setState(({ open }) => ({ open: !open }))
	}

	render() {
		const { open } = this.state
		return (
			<div className='app__rowmovie'>
				<div className='app__rowmovie-top'>
					<div className='app__rowmovie-top__title'>
						<img src='/tranding.svg' alt='' />
						<h1>Trending</h1>
					</div>
					<div className='hr' />
					<a href='#'>See more</a>
				</div>
				<div className='app__rowmovie-lists'>
					{movies.map((movie, index) => (
						<RowMoviesItem
							key={index}
							movie={{ ...movie, index: index }}
							onToggleOpen={this.onToggleOpen}
						/>
					))}
				</div>
				<Modal open={open} onClose={this.onToggleOpen}>
					<MovieInfo />
				</Modal>
			</div>
		)
	}
}

export default RowMovies
