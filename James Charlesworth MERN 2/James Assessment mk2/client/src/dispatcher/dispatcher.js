import { Dispatcher } from "flux";

//default dispatcher sends actions to AppStore
//can be used to time actions in larger applications
var AppDispatcher = new Dispatcher();

AppDispatcher.handleViewAction = (action) => {
	this.dispatch({
		source: "VIEW_ACTION",
		action
	});
}

export default AppDispatcher;