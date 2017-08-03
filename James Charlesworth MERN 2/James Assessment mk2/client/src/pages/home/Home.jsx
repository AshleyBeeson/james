import React, { Component } from 'react';

//home page
export default class Home extends Component {
	render() {
		return(
		<div className="homeP" >
			<h1 ref="title">Bug Tracker</h1>
			<br/><br/>
			<p>This site uses the MERN stack to implement an issue tracking appliction</p>
			<br/><br/>
			<p>This site uses a locally hosted mongo database</p>
			<br/><br/>
			<p>Made by James Charlesworth</p>
			<br/><br/>
			<p>Not yet finished</p>
		</div>
		);
	}
}
