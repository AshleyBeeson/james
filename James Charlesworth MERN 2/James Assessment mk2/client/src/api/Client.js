//Connection to server

//unused search function
function search(query, cb) {
  return fetch('/api/bugs?q=${query}', {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

//bring in all data from bugs collection
function fetchBugs(cb) {
  return fetch('/api/bugs', {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

//add new bug to database collection via POST (calls method in server)(unused)
function addBug(id, issueId, date, priority, summary, severity, description, reporter, assignedUser, status){
	//console.log(JSON.stringify(data));
	return fetch('/api/Bugs',{
		method: 'POST',
		headers:{
			'Accept': "application/json",
			'Content-Type': 'application/json'
			},
		body: JSON.stringify({
			id: id,
			issueId: issueId,
			dateCreated: date,
			summary: summary,
			description: description,
			highPriority: priority,
			severity: severity,
			reporter: reporter,
			assignedUser: assignedUser,
			status: status
		}) 
		
	}).then( (res) => {
		console.log(res);
	});
}

//update existing bugs in database via 'put' (calls method in server)(not working-maybe server side?)
function editBugs(dbId, issueId, date, priority, summary, severity, description, reporter, assignedUser, status){
	return fetch('/api/Bugs',{
		method:'PUT',
		headers:{
			'Accept': "application/json",
			'Content-Type': 'application/json'
			},
		body: JSON.stringify({
			id: dbId,
			issueId: issueId,
			date:date, 
			priority:priority, 
			summary:summary, 
			severity:severity, 
			description:description, 
			reporter:reporter, 
			assignedUser:assignedUser, 
			status:status
		})
	}).then( (res) => {
	console.log(res)})
}

//log error when database not found
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error('HTTP Error ${response.statusText}');
  error.status = response.statusText;
  error.response = response;
  console.log(error);
  throw error;
}

//turn promised response into usable json format
function parseJSON(response) {
  return response.json();
}

//export functions
const Client = { fetchBugs, addBug, editBugs, search };
export default Client;
