import React, { Component } from 'react';

export default class DropSort extends Component {
	constructor(props){
		super(props);
		//fix reference for bound method
		this.selectSort = this.selectSort.bind(this);
	}
	
	selectSort(e){
		this.props.onSort(e.target.value);
	}
	
	render() {
		
		return(
			<div>
				<select onChange={this.selectSort.bind(this)}>
					<option ref="firstOption" value="Sort By">No Sort</option>
					<option value="id">id</option>
					<option value="issueId">Issue Id</option>
					<option value="dateCreated">Date Created</option>
					<option value="highPriority">Priority</option>
					<option value="severity">Severity</option>
					<option value="status">Status</option>
					
				</select>
			</div>
		);
	}
}