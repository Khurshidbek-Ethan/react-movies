import { Component } from 'react'
import Error from '../error/error';
import PropTypes from 'prop-types';


class ErrorBoundary extends Component{
	state = {
		error:false
	}

	componentDidCatch() {
		this.setState({error:true})
		
	}

	render() {
		if (this.state.error) {
			return <Error/>
		}
		return this.props.children
	}
}
ErrorBoundary.prototypes = {
	children:PropTypes.element
}
export default ErrorBoundary