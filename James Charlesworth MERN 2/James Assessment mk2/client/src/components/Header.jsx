import React, { Component } from 'react';
import Nav from './Nav';

export default class Header extends Component {
	constructor(props){
		super(props);
	}

	
	render() {
		return(
			<div>
				<Nav />
			</div>
		);
	}
}