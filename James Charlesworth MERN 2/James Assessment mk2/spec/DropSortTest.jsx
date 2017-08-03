import TestUtils from 'react-dom/test-utils';
import Content from '../client/src/pages/content/DropSort';
import ReactDOM from 'react-dom';
import React from 'react';

describe("Dropdown for sort ", function() {
  var drop = TestUtils.renderIntoDocument(
	<DropSort />
  );

  it("should have a first option", function() {
    let first = drop.refs.firstOption;
    expect(ReactDOM.findDomNode(first).nodeValue).toEqual("No Sort");
  });
});
