import React, { Component } from 'react';

export default class Content extends Component {
	constructor(props){
		super(props);
		//fix reference for bound method
		this.searchChange = this.searchChange.bind(this);
	}
	
	searchChange(e){
		//lift state to make text visible
		this.props.onSearch(e.target.value);
	}
	
	render() {
		//simple editible bar for handling search parameter
		//ref for grabbing value of element
		return(
			<div>
				<form>
					<input 
						type='text'
						placeholder='Search Bar'
						value={this.props.searchText}
						ref="search"
						onChange = {this.searchChange}
						/>
				</form>
			</div>
		);
	}
}