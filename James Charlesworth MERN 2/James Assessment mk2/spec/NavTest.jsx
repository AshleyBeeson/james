import TestUtils from 'react-dom/test-utils';
import Home from '../client/src/pages/home/Home';
import Content from '../client/src/pages/content/Content';
import Create from '../client/src/pages/create/Create';
import ReactDOM from 'react-dom';
import React from 'react';

describe("Home page  ", function() {
  var home = TestUtils.renderIntoDocument(
	<Home />
  );

  it("should have a title", function() {
    let homeTitle = home.refs.title;
    expect(ReactDOM.findDomNode(homeTitle).textContent).toEqual("Bug Tracker");

  });
});

describe("Content page  ", function() {
  var content = TestUtils.renderIntoDocument(
	<Content />
  );

  it("should have a title", function() {
    let contentTitle = content.refs.contentTitle;
    expect(ReactDOM.findDomNode(contentTitle).textContent).toEqual("Issues");

  });
});

describe("Create page  ", function() {
  var create = TestUtils.renderIntoDocument(
	<Create />
  );

  it("should have a title", function() {
    let contentTitle = create.refs.createTitle;
    expect(ReactDOM.findDomNode(contentTitle).textContent).toEqual("Create an Issue");

  });
});
