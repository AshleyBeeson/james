import React, { Component } from 'react';
import Action from './Action';

export default class Bug extends Component {
	constructor(props){
		super(props);
		//allow state for if actions need to be displayed and any issue fields that can be changed
		this.state = {
			isActive: true,
			issueId: '',
			date: '',
			priority: '',
			severity: '',
			summary: '',
			description: '',
			assignedUser: '',
			reporter: '',
			status: '',
		}
		//handle refs for bound methods
		this.toggleActions = this.toggleActions.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleIdChange = this.handleIdChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handlePriorityChange = this.handlePriorityChange.bind(this);
		this.handleSummaryChange = this.handleSummaryChange.bind(this);
		this.handleSeverityChange = this.handleSeverityChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleReporterChange = this.handleReporterChange.bind(this);
		this.handleAssignedUserChange = this.handleAssignedUserChange.bind(this);
		this.handleStatusChange = this.handleStatusChange.bind(this);
	}
	
	//map each bug's action to a component before rendering using props
	mapActions(){
		if(this.props.actions){
			return this.props.actions.map((action, index) => {
				if (!this.state.isActive){
					return (
						<Action 
							key={index}
							actionUser={action.user}
							actionDate={action.dateCreated}
							actionAction={action.action}
							/>
					);
				}
			});
		}else{
			return null;
		}
	}
	
	//set the state of the issueID before update occurs
	handleIdChange(e){
		this.setState({issueId: e.target.value});
	}
	handleDateChange(e){
		this.setState({date: e.target.value});
	}
	handlePriorityChange(e){
		this.setState({priority: e.target.value});
	}
	handleSummaryChange(e){
		this.setState({summary: e.target.value});
	}
	handleSeverityChange(e){
		this.setState({severity: e.target.value});
	}
	handleDescriptionChange(e){
		this.setState({description: e.target.value});
	}
	handleReporterChange(e){
		this.setState({reporter: e.target.value});
	}
	handleAssignedUserChange(e){
		this.setState({assignedUser: e.target.value});
	}
	handleStatusChange(e){
		this.setState({status: e.target.value});
	}
	
	//invert the isActive state so that on each click it changes
	toggleActions(){
		this.setState({isActive: !this.state.isActive});
	}
	
	//lift state with the details to change in the database
	handleUpdate(e){
		e.preventDefault();
		//console.log(this.props.id);
		let dbId = this.props.id;
		let issueId = (this.state.issueId) ? this.state.issueId : null;
		let date = (this.state.date) ? this.state.date : null;
		let priority = (this.state.priority) ? this.state.priority : null;
		let summary = (this.state.summary) ? this.state.summary : null;
		let severity = (this.state.severity) ? this.state.severity : null;
		let description = (this.state.description) ? this.state.description : null;
		let reporter = (this.state.reporter) ? this.state.reporter : null;
		let assignedUser = (this.state.assignedUser) ? this.state.assignedUser : null;
		let status = (this.state.status) ? this.state.status : null;
		console.log(dbId + "  "+ issueId)
		this.props.onBugUpdate(dbId, issueId, date, priority, summary, severity, description, reporter, assignedUser, status);
	}
	
	render(props){
		//render the bug as a form so it can be edited, onSubmit lift state to 'put' via mongoose
		return(
			<div className="bug">
				<div className="basicDetails">
				<form onSubmit={this.handleUpdate}>
					<input type="text" placeholder="ID" defaultValue={this.props.id} className="id"></input>
					<input type="text" placeholder="issueID" defaultValue={this.props.issueId} className="issueId" onChange={this.handleIdChange}></input>
					<input type="text" placeholder="Date" defaultValue={this.props.date} className="date" onChange={this.handleDateChange}></input>
					<input type="text" placeholder="High Priority" defaultValue={this.props.priority} className="priority" onChange={this.handlePriorityChange}></input>
					<input type="text" placeholder="Summary" defaultValue={this.props.summary} className="summary" onChange={this.handleSummaryChange}></input>
					<input type="text" placeholder="Severity" defaultValue={this.props.severity} className="severity" onChange={this.handleSeverityChange}></input>
					<input type="text" placeholder="Description" defaultValue={this.props.description} className="description" onChange={this.handleDescriptionChange}></input>
					<input type="text" placeholder="Reporter" defaultValue={this.props.reporter} className="reporter" onChange={this.handleReporterChange}></input>
					<input type="text" placeholder="Assigned To" defaultValue={this.props.assignedUser} className="assignedUser" onChange={this.handleAssignedUserChange}></input>
					<input type="text" placeholder="Status" defaultValue={this.props.status} className="status" onChange={this.handleStatusChange}></input>
					<input type="submit" defaultValue='Edit' />
				</form>
				</div>
				<div className="actions">
					{(this.state.isActive) ? 
						<button 
							type="text" 
							className="viewActions"  
							onClick={this.toggleActions} >View Actions</button> : 
						<button 
							type="text" 
							className="viewActions"  
							onClick={this.toggleActions} >Hide Actions</button>}
					{this.mapActions()}
					<br/>
				</div>
				<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			</div>
		);
	}
}