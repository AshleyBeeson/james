import React, { Component } from 'react';

export default class Bug extends Component {
	constructor(props){
		super(props);
	}
	
	
	//each action within a bug will be rendered with 3 fields
	render(props){
		return(
			<div>
				<h4 className="actionHead">Action</h4>
				<form>
					<input type="text" placeholder="User" value={this.props.actionUser} className="actionUser"></input>
					<input type="text" placeholder="Date" value={this.props.actionDate} className="actionDate"></input>
					<input type="text" placeholder="Action" value={this.props.actionAction} className="actionAction"></input>
				</form>
			</div>
		);
	}
	
}