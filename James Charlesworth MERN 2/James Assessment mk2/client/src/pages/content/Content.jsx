import React, { Component } from 'react';
import Bug from './Bug';
import * as appActions from '../../action/AppActions';
import appStore from '../../stores/AppStore';
import SearchBar from './SearchBar';
import DropSort from './DropSort';

export default class Content extends Component {
	constructor(props){
		super(props);
		//load in all data from mongodb via flux action
		appStore.loadData();
		//temporary states for data pulled after search is entered, or filter is clicked
		this.state = {
			bugs:appStore.getBugs(),
			searchedBugs: '',
			filteredBugs: '',
			sortedBugs: '',
			searchText: '',
			filterText: 'ALL',
			sortText: 'NO SORT',
			output: ''
		}
		//fix refs of bound methods
		this._dataLoaded = this._dataLoaded.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.filter = this.filter.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.clearFilter = this.clearFilter.bind(this);
		this.refresh = this.refresh.bind(this);
		this.handleSort = this.handleSort.bind(this);
		this._onDataFinished = this._onDataFinished.bind(this);
	}
	
	//create listeners for filter or search changing, and data loading in
	componentWillMount(){
		appStore.on('DATA_LOADED', this._dataLoaded);
		appStore.on('DATA_FINISHED', this._onDataFinished);
	}
	
	//remove listeners when component no longer used
	componentWillUnmount(){
		appStore.removeListener('DATA_LOADED', this._dataLoaded);
		appStore.removeListener('DATA_FINISHED', this._onDataFinished);
	}
	
	//data has loaded and is set as state to pass down via props
	_dataLoaded(){
		this.setState({
			bugs: appStore.getBugs()
		});
		//console.log(this.state.bugs);
	}
	
	_onDataFinished(){
		this.setState({output: appStore.getOutput()});
	}
	
	//for each bug in a given array, map to component (output array is used if any filtering/searching/ordering is used)
	mapIssues(){
		if(this.state.output === ''){
			return this.state.bugs.map((bug) => {
				return (
					<Bug 
						key={bug.id}
						dbId={bug._id}
						id={bug.id} 
						issueId={bug.issueId}
						date={bug.dateCreated}
						priority={bug.highPriority}
						summary={bug.summary}
						severity={bug.severity}
						description={bug.description}
						reporter={bug.reporter}
						assignedUser={bug.assignedUser}
						status={bug.status}
						actions={bug.actions}
						onBugUpdate={this.handleUpdate}
						/>	
				);
			});
		}else if(this.state.output === 'NO DATA'){
				return(
					<div><h1>No Matches</h1></div>
				);
		}else{
			return this.state.output.map((bug) => {
				return (
					<Bug 
						key={bug.id}
						dbId={bug._id}
						id={bug.id} 
						issueId={bug.issueId}
						date={bug.dateCreated}
						priority={bug.highPriority}
						summary={bug.summary}
						severity={bug.severity}
						description={bug.description}
						reporter={bug.reporter}
						assignedUser={bug.assignedUser}
						status={bug.status}
						actions={bug.actions}
						onBugUpdate={this.handleUpdate}
						/>	
				);
			});
		}
	}
	
	//call flux action to add data to mongodb, triggered by onBugUpdate in child component <Bug> 
	handleUpdate(dbId, issueId, date, priority, summary, severity, description, reporter, assignedUser, status){
		appActions.updateBugs(dbId, issueId, date, priority, summary, severity, description, reporter, assignedUser, status);
	}
	
	//state is set to the filter field then the output data is re worked via flux
	filter(e){
		this.setState({filterText: e.target.value});
		appActions.output(e.target.value, this.state.searchText, this.state.sortText);
	}
	
	//clearing filter may be dealt with differently, this method although the same as above
	//allows for easier modification in the future
	clearFilter(e){
		this.setState({filterText: e.target.value});
		appActions.output(e.target.value, this.state.searchText, this.state.sortText);
	}
	
	//state is set to the search text field then the output data is re worked via flux
	handleSearch(searchText){
		this.setState({searchText: searchText});
		appActions.output(this.state.filterText, searchText.toUpperCase(), this.state.sortText);
	}
	
	//simplest way to bring in new data is a force refresh, not reactive but incredibly quick
	//button only used if application accessed by multiple users simultaneously
	//switched to repopulating state with a flux action and event listeners
	refresh(){
		//document.location.reload();
		appStore.loadData();
	}
	
	//state is set to the sort field then the output data is re worked via flux
	handleSort(field){
		this.setState({sortText: field});
		appActions.output(this.state.filterText, this.state.searchText, field);
	}
	
	render() {
		//render the filter buttons, searchbar and mapped bug components
		return(
		<div className="page">
			<h1 ref="contentTitle">Issues</h1>
			<button value="ALL" onClick={this.clearFilter}>ALL</button>
			<button value="TO DO" onClick={this.filter}>TO DO</button>
			<button value="IN PROGRESS" onClick={this.filter}>IN PROGRESS</button>
			<button value="IN REVIEW" onClick={this.filter}>IN REVIEW</button>
			<button value="IN TEST" onClick={this.filter}>IN TEST</button>
			<button value="IN DEMO" onClick={this.filter}>IN DEMO</button>
			<button value="DONE" onClick={this.filter}>DONE</button>
			<button value="RESET" onClick={this.refresh}>Load New Issues</button>
				Current Filter: {this.state.filterText}
			<SearchBar searchText={this.state.searchText} onSearch={this.handleSearch}/>
			<DropSort onSort={this.handleSort}/>
			<div className="inner">
				{this.mapIssues()}
			</div>
		</div>
		);
	}
}
