import React from 'react';
import ReactDOM from 'react-dom';

import Result from './Result';

class Search extends React.Component {
    search() {
	var searchResult = $.ajax({
	    data: {
		action: 'query',
		list: 'search',
		srsearch: 'Richard Feynman',
		format: 'json' },
	    dataType: 'jsonp',
	    jsonp: 'callback',
	    url: 'https://en.wikipedia.org/w/api.php',

	    error : function(data) {
		console.log("error" + data.status);
	    },
	    success: function(data) {
		console.log(data);
	    }
	});
    }
 
    render() {
	return (
	    <div> This is Search
		<button onClick={this.search}>Click me</button>
	    </div>
	);
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('content')
);
    
