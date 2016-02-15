import React from 'react';
import ReactDOM from 'react-dom';

import Result from './Result';

class Search extends React.Component {
    
    constructor(props) {
	super(props);
	this.state = { value: "Richard",
		       results: [] };
	this.handleChange = this.handleChange.bind(this);
	this.search = this.search.bind(this);
    }
    
    
    search() {
	var searchResult = $.ajax({
	    data: {
		action: 'opensearch',
		search: this.state.value,
		format: 'json',
		limit: 5
	    },
	    dataType: 'jsonp',
	    jsonp: 'callback',
	    url: 'https://en.wikipedia.org/w/api.php',

	    error : function(data) {
		console.log("error" + data.status);
	    },
	    success: function(data) {
		let results = [];
		
		data[1].map((title, index) => {
		    let result = {};
		    result.title = title;
		    result.description = data[2][index];
		    result.url = data[3][index];
		    results.push(result);
		});
		
		this.setState({results});
		
	    }.bind(this)
	});
    }

    handleChange(event) {
	this.setState({value: event.target.value});
    }

    render() {
	return (

	    <div>
		<div className="searchOuter">
		    
		    <input className="searchBox"
			   type="text"
			   value={this.state.value}
			   onChange={this.handleChange} />
		    
		    <div className="searchButtonOuter">
			<button className="searchButton"
				onClick={this.search}>
			    <i className="fa fa-search"></i>
			</button>
		    </div>
		    
		</div>

    		{
		    this.state.results.map((result, index) => {
			return (
			    <Result key={index}
				    url={result.url}
				    title={result.title}
				    description={result.description}>
			    </Result>
			);
		    })
		}

	    </div>
	);
    }
}

ReactDOM.render(
    <Search/>,
    document.getElementById('app')
);

