import React from 'react'
import './navbar.scss'
import logo from '/logo.svg'
import logoText from '/logo-text.svg'
import { Link, NavLink } from 'react-router-dom'
const Navbar = () => {
	return (
		<div className='navbar'>
			<div className='navbar__logo'>
				<Link to={'/'}>
					<img src={logo} alt='Logo' />
					<img src={logoText} alt='Logo Text' />
				</Link>
			</div>
			<nav className='navbar__menu'>
				<ul>
					<li>
						<NavLink
							to={'/'}
							className={({ isActive }) =>
								isActive ? 'active' : ''
							}
						>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to={'/tv'}>Tv Shows</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default Navbar
