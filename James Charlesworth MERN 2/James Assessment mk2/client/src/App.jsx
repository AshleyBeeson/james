import React, { Component } from 'react';
import Header from './components/Header';
import MainRoutes from './MainRoutes';


export default class App extends Component {
	constructor() {
		super();
		
	}
	
	//render a header for navigation and mainRoutes for routing/main content
	render(props) {
		return(
			<div>
				<Header />
				<MainRoutes />
			</div>
		);
	}
}