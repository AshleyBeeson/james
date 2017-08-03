import AppDispatcher from "../dispatcher/dispatcher";

//handling the database data will be done via flux actions
//any subset of the total data will be filtered by parameters sent through action-dispatch-store

//search by text in multiple fields
export function filterBySearch(searchParameters) {
	AppDispatcher.dispatch({
		type: "FILTER_SEARCH",
		searchParameters
	});
}

//'put' to mongodb
export function updateBugs(dbId, issueId, date, priority, summary, severity, description, reporter, assignedUser, status){
	AppDispatcher.dispatch({
		type: "UPDATE_BUGS",
		dbId, issueId, date, priority, summary, severity, description, reporter, assignedUser, status
	});
}

//filter by common headings
export function filter(filterText){
	AppDispatcher.dispatch({
		type: "FILTER_BUGS",
		filterText
	});
}

//clear filter to show all data
export function clearFilter(){
	AppDispatcher.dispatch({
		type: "CLEAR_FILTER"
	});
}

//add new issue to database
export function newBug(id, issueId, date, priority, summary, severity, description, reporter, assignedUser, status){
	AppDispatcher.dispatch({
		type: "NEW_BUG",
		id, issueId, date, priority, summary, severity, description, reporter, assignedUser, status
	});
}

//sort by a given field
export function sort(field){
	AppDispatcher.dispatch({
		type: "SORT",
		field
	});
}

//sort by a given field
export function output(filter, searchText, sort){
	AppDispatcher.dispatch({
		type: "OUTPUT",
		filter, searchText, sort
	});
}