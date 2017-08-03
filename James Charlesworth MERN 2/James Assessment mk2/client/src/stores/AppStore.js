//imports including events for flux
import {EventEmitter} from "events";
import dispatcher from "../dispatcher/dispatcher";
import Client from "../api/Client";

class AppStore extends EventEmitter {
	constructor(){
		super();
		//empty arrays for holding different subsets of filtered data
		this.bugs = [];
		this.output = [];
		this.output2 = [];
		this.output3 = [];
	}
	
	//action handler, matches cases sent from flux actions via the dispatcher
	handleActions(action){
		switch(action.type){
			case "VIEW_ACTION":
				console.log(this.data);
				break;
			case "FILTER_SEARCH":
				this.bugSearch(action.searchParameters);
				break;
			case "UPDATE_BUGS":
				this.update(action.dbId, action.issueId, action.date, action.priority, action.summary, action.severity, action.description, action.reporter, action.assignedUser, action.status);
				break;
			case "FILTER_BUGS":
				this.filter(action.filterText);
				break;
			case "CLEAR_FILTER":
				this.clearFilter();
				break;
			case "NEW_BUG":
				this.newBug(action.id, action.issueId, action.date, action.priority, action.summary, action.severity, action.description, action.reporter, action.assignedUser, action.status);
				break;
			case "SORT":
				this.sort(action.field);
				break;
			case "OUTPUT":
				this.filter(action.filter);
				this.bugSearch(action.searchText);
				this.sort(action.sort);
				break;
			default:
				break;
		}
	}
	
	//sort through the array of remaining bugs after it has been filtered and searched through
	//depending on the sort field selected, the sort will be different
	sort(sort){
		this.output3 = [];
		//order by date
		if(sort == 'dateCreated'){
			this.output3 = this.output2.sort(function(a, b) {
				return new Date(a.dateCreated) - new Date(b.dateCreated);
			});
		//order by id
		}else if(sort == 'id'){
			this.output3 = this.output2.sort(function(a, b) {
				return a.id - b.id;
			});
		//order by issueId
		}else if(sort == 'issueId'){
			this.output3 = this.output2.sort(function(a, b) {
				return a.issueId - b.issueId;
			});
		//order by high priority then low priority
		}else if(sort == 'highPriority'){
			this.output2.forEach((bug) => {
				if(bug.highPriority == 'TRUE'){
					this.output3.push(bug);
				}
			});
			this.output2.forEach((bug) => {
				if(bug.highPriority == 'FALSE'){
					this.output3.push(bug);
				}
			});
		//order by high-med-low severity
		}else if(sort == 'severity'){
			this.output2.forEach((bug) => {
				if(bug.severity == 'HIGH'){
					this.output3.push(bug);
				}
			});
			this.output2.forEach((bug) => {
				if(bug.severity == 'MEDIUM'){
					this.output3.push(bug);
				}
			});
			this.output2.forEach((bug) => {
				if(bug.severity == 'LOW'){
					this.output3.push(bug);
				}
			});
		//order by status, to do-in progress-in review-in test-in demo-done
		}else if(sort == 'status'){
			this.output2.forEach((bug) => {
				if(bug.status == 'TO DO'){
					this.output3.push(bug);
				}
			});
			this.output2.forEach((bug) => {
				if(bug.status == 'IN PROGRESS'){
					this.output3.push(bug);
				}
			});
			this.output2.forEach((bug) => {
				if(bug.status == 'IN REVIEW'){
					this.output3.push(bug);
				}
			});
			this.output2.forEach((bug) => {
				if(bug.status == 'IN TEST'){
					this.output3.push(bug);
				}
			});
			this.output2.forEach((bug) => {
				if(bug.status == 'IN DEMO'){
					this.output3.push(bug);
				}
			});
			this.output2.forEach((bug) => {
				if(bug.status == 'DONE'){
					this.output3.push(bug);
				}
			});
		//if no sort field is selected/passed in to method, leave array of bugs as it is
		}else{
			this.output2.forEach((bug) => {
				this.output3.push(bug);
			});
		}
		//emit signal for listeners
		this.emit("DATA_FINISHED");
	}
	
	//return either a known string if array of filtered bugs is empty
	getOutput(){
		if(this.output3 == ''){
			return 'NO DATA';
		}else{
			return this.output3;
		}
	}
	
	//add a new bug with all neccessary fields by calling the client api
	newBug(id, issueId, date, priority, summary, severity, description, reporter, assignedUser, status){
		Client.addBug(id, issueId, date, priority, summary, severity, description, reporter, assignedUser, status);
	}
	
	//if the text passed in (from a filter button) matches the status of a bug, add it to an array
	filter(filter){
		this.output = [];
		if(filter == 'ALL'){
			this.output = this.bugs;
		}
		else{
			this.bugs.forEach((bug) => {
				if(bug.status == filter){
					//console.log(bug.status);
					this.output.push(bug);
				}
			});
		}
	}
	
	//cancel the ongoing filter to show all data
	clearFilter(){
		this.filtered = [];
	}
	
	//pass data to the api to 'put' into mongodb
	update(dbId, issueId, date, priority, summary, severity, description, reporter, assignedUser, status){
		Client.editBugs(dbId, issueId, date, priority, summary, severity, description, reporter, assignedUser, status);
	}
	
	//pull in all database data and hold permanently in an array
	//other functions can use this array to filter specific content
	loadData(){
		let thisStore = this;
		Client.fetchBugs(bugs => {
			this.bugs = bugs;
			//timeout required upon app loading, but no lag due to listening for data load completing
			//data will be loaded into the state of app.jsx
			setTimeout(function(){thisStore.emit('DATA_LOADED')}, 250);
		});
	}

	//simple return for all data, triggered by app.jsx componentWillMount (early = better)
	getBugs(){
		return this.bugs;
	}
	
	//match text parameter against many different fields within the bugs array
	//any matches are added to an array
	bugSearch(searchText){
		this.output2 = [];
		if(searchText !== ''){
			this.output.forEach((bug) => {
				if(bug.summary != null && bug.summary.toUpperCase().indexOf(searchText) !== -1){
					this.output2.push(bug);
				}else if(bug.description != null && bug.description.toUpperCase().indexOf(searchText) !== -1){
					this.output2.push(bug);
				}else if(bug.assignedUser != null && bug.assignedUser.toUpperCase().indexOf(searchText) !== -1){
					this.output2.push(bug);
				}else if(bug.id != null && bug.id.toString().indexOf(searchText) !== -1){
					this.output2.push(bug);
				}else if(bug.issueId != null && bug.issueId.toUpperCase().indexOf(searchText) !== -1){
					this.output2.push(bug);
				}else if(bug.reporter != null && bug.reporter.toUpperCase().indexOf(searchText) !== -1){
					this.output2.push(bug);
				}
			});
		}else{
			this.output.forEach((bug) => {
				this.output2.push(bug);
			});
		}
	}
	

}
//export store and bind to the dispatcher
const appStore = new AppStore;
dispatcher.register(appStore.handleActions.bind(appStore));
export default appStore;
