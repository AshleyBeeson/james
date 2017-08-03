import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import App from "./App";

//replaces the div of id="app" in the html file with the entire react app
ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>, document.querySelector('#app')
);