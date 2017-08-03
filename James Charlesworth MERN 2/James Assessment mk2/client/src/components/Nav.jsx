import React, { Component } from 'react';
import Navbar from './Navbar';

export default class Nav extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
		return(
			<div id="navbar-container">
				<Navbar />
			</div>
		);
	}
}
