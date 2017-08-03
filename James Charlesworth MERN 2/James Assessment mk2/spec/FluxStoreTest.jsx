import TestUtils from 'react-dom/test-utils';
import appStore from '../client/src/stores/AppStore';
import AppDispatcher from '../client/src/dispatcher/dispatcher';
import ReactDOM from 'react-dom';
import React from 'react';

beforeEach(function () {
	const MyDispatcher = require('../client/src/dispatcher/dispatcher');
	spyOn(MyDispatcher, "register");
	this.MyStore = require('../client/src/stores/AppStore');
	this.registeredCallback = MyDispatcher.register.calls.mostRecent().args[0];
});

describe("AppStore ", function () {
  
  it("search ", function () {
    this.registeredCallback({
      actionType: 'OUTPUT',
      filter: "ALL",
	  searchText: "ASHLEY",
	  sort: 'NONE' 
    });
	expected
    const array = this.MyStore.getOutput();
    expect(array.length).toBe(1);
  });
  
  it("filter ", function () {
    this.registeredCallback({
      actionType: 'OUTPUT',
      filter: "IN PROGRESS",
	  searchText: "",
	  sort: 'NONE' 
    });
	expected
    const array = this.MyStore.getOutput();
    expect(array.length).toBe(1);
  });
  
  it("sort ", function () {
    this.registeredCallback({
      actionType: 'OUTPUT',
      filter: "ALL",
	  searchText: "",
	  sort: 'dateCreated' 
    });
	expected
    const array = this.MyStore.getOutput();
    expect(array.length).toBe(16);
  });
  
  it("filter, searches and sorts", function () {
    this.registeredCallback({
      actionType: 'OUTPUT',
      filter: "TO DO",
	  searchText: "a",
	  sort: 'dateCreated' 
    });
	expected
    const array = this.MyStore.getOutput();
    expect(array.length).toBe(3);
  });
});
