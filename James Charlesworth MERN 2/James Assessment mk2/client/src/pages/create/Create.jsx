import React, { Component } from 'react';
import * as appActions from '../../action/AppActions';

export default class Create extends Component{
	constructor(){
		super();
		this.state = {
			id: '',
			issueId: '',
			date: '',
			priority: '',
			severity: '',
			summary: '',
			description: '',
			assignedUser: '',
			reporter: '',
			status: '',
			isValid: false
		}
		this.newIssue = this.newIssue.bind(this);
		this.handleIdChange = this.handleIdChange.bind(this);
		this.handleIssueIdChange = this.handleIssueIdChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handlePriorityChange = this.handlePriorityChange.bind(this);
		this.handleSummaryChange = this.handleSummaryChange.bind(this);
		this.handleSeverityChange = this.handleSeverityChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleReporterChange = this.handleReporterChange.bind(this);
		this.handleAssignedUserChange = this.handleAssignedUserChange.bind(this);
		this.handleStatusChange = this.handleStatusChange.bind(this);
		//this.toggleCheck = this.toggleCheck.bind(this);
	}
	
	newIssue(e){
		e.preventDefault();
		//
		let id = this.state.id;
		let issueId = (this.state.issueId) ? this.state.issueId : null;
		let date = (this.state.date) ? this.state.date : null;
		let priority = (this.state.priority) ? this.state.priority : null;
		let summary = (this.state.summary) ? this.state.summary : null;
		let severity = (this.state.severity) ? this.state.severity : null;
		let description = (this.state.description) ? this.state.description : null;
		let reporter = (this.state.reporter) ? this.state.reporter : null;
		let assignedUser = (this.state.assignedUser) ? this.state.assignedUser : null;
		let status = (this.state.status) ? this.state.status : null;
		appActions.newBug(id, issueId, date, priority, summary, severity, description, reporter, assignedUser, status);
	}
	
	handleIdChange(e){
		this.setState({id: e.target.value});
		this.toggleCheck();
	}
	handleIssueIdChange(e){
		this.setState({issueId: e.target.value});
		this.toggleCheck();
	}
	handleDateChange(e){
		this.setState({date: e.target.value});
		this.toggleCheck();
	}
	handlePriorityChange(e){
		this.setState({priority: e.target.value});
		this.toggleCheck();
	}
	handleSummaryChange(e){
		this.setState({summary: e.target.value});
		this.toggleCheck();
	}
	handleSeverityChange(e){
		this.setState({severity: e.target.value});
		this.toggleCheck();
	}
	handleDescriptionChange(e){
		this.setState({description: e.target.value});
		this.toggleCheck();
	}
	handleReporterChange(e){
		this.setState({reporter: e.target.value});
		this.toggleCheck();
	}
	handleAssignedUserChange(e){
		this.setState({assignedUser: e.target.value});
		this.toggleCheck();
	}
	handleStatusChange(e){
		this.setState({status: e.target.value});
		this.toggleCheck();
	}
	
	toggleCheck(){		
		const {id, issueId, date, priority, summary, severity, description, reporter, assignedUser, status} = this.state;
		console.log(priority);
		if(isNaN(id) || id == ''){
			this.setState({isValid: false});
		}else if(id == '' || issueId == '' || date == '' || priority == '' || summary == '' || severity == '' || description == '' || reporter == '' || assignedUser == '' || status == ''){
			this.setState({isValid: false});
		}else{
			this.setState({isValid: true});
		}
	}
	
	message(){
		const {id, issueId, date, priority, summary, severity, description, reporter, assignedUser, status} = this.state;
		console.log(severity.toUpperCase());
		if(isNaN(id) || id == ''){
			return (
				<div>
					Id must be a number
				</div>
			);
		}else if(id == '' || issueId == '' || date == '' || priority == '' || summary == '' || severity == '' || description == '' || reporter == '' || assignedUser == '' || status == ''){
			return (
				<div>
					Null fields are not allowed
				</div>
			);
		}else{
			return null;
		}
	}
	
	
	
	render(){
		return(
			<div className="page">
				<h1 ref="createTitle">Create an Issue</h1>
				<div className="basicDetails">
					<form onSubmit={this.newIssue}>
						<input type="text" placeholder="ID" className="id" onChange={this.handleIdChange}></input>
						<input type="text" placeholder="issueID" className="issueId" onChange={this.handleIssueIdChange}></input>
						<input type="text" placeholder="Date" className="date" onChange={this.handleDateChange}></input>
						<input type="text" placeholder="High Priority" className="priority" onChange={this.handlePriorityChange}></input>
						<input type="text" placeholder="Summary" className="summary" onChange={this.handleSummaryChange}></input>
						<input type="text" placeholder="Severity" className="severity" onChange={this.handleSeverityChange}></input>
						<input type="text" placeholder="Description" className="description" onChange={this.handleDescriptionChange}></input>
						<input type="text" placeholder="Reporter" className="reporter" onChange={this.handleReporterChange}></input>
						<input type="text" placeholder="Assigned To" className="assignedUser" onChange={this.handleAssignedUserChange}></input>
						<input type="text" placeholder="Status" className="status" onChange={this.handleStatusChange}></input>
						{(this.state.isValid) ? 
							<input type="submit" defaultValue='Create' /> :
							null
						}
					</form>
						{this.message()}
				</div>
			</div>
		);
	}
}