import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component{
	
	constructor(){
			super();
	}
	
	render(){
		return(
			<div>
				<ul className="nav navbar-nav">
					<li className="link">
						<Link to={{ pathname: "/" }}><span>Home</span></Link>
					</li>
					<li className="link">
						<Link to={{ pathname: "/Content" }}><span>Issues</span></Link>
					</li>
					<li className="link">
						<Link to={{ pathname: "/Create" }}><span>Create Issue</span></Link>
					</li>
				</ul>
			</div>
		);
	}
}