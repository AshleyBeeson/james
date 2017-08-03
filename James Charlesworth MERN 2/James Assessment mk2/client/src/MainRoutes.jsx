import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Create from './pages/create/Create';
import Home from "./pages/home/Home";
import Content from './pages/content/Content';

export default class MainRoutes extends Component {
	constructor(props) {
		super(props);
	}
	
	//routing enabled for expansion of site if neccessary
	//issue tracker takes prop of all data
	render(props) {
		return (
		<div id="content">
		  <main>
			<Switch>
			  <Route exact path='/' component={() => <Home />} />
			  <Route path="/Content" component={() => <Content bugs={this.props.bugs}/>} />
			  <Route path="/Create" component={() => <Create bugs={this.props.bugs}/>} />
			</Switch>
		  </main>
		</div>
		);
	}
}