import TestUtils from 'react-dom/test-utils';
import SearchBar from '../client/src/pages/content/SearchBar';
import ReactDOM from 'react-dom';
import React from 'react';

describe('Searchbar ', function(){
	var props = {
		searchText: 'example'
	};
	
	var searchBar = TestUtils.renderIntoDocument(
		<SearchBar params={props}/>
	);
	
	it('displays a value from props', function(){
		let one = searchBar.refs.search;
		expect(ReactDOM.findDOMNode(one).nodeValue).toEqual("example");
	});	
});        

