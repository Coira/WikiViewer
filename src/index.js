import React from 'react';
import ReactDOM from 'react-dom';

import Result from './Result';

class Search extends React.Component {
    
    constructor(props) {
	super(props);
	this.state = { value: "",
		       results: []};
	this.handleChange = this.handleChange.bind(this);
	this.buttonClicked = this.buttonClicked.bind(this);
	this.clearSearch = this.clearSearch.bind(this);
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

    random() {
	window.open("//en.wikipedia.org/wiki/Special:Random");
    }
    
    handleChange(event) {
	this.setState({value: event.target.value});
    }

    clearSearch(event) {
	this.setState({value: "", results: []});
    }
    
    buttonClicked(event) {
	this.state.value.length === 0 ? this.random() : this.search();
    }

    render() {

	// if the search bar is empty, clicking search button
	// will open a random page, otherwise it searches
	const queryLength = this.state.value.length;
	
	const searchClassName = queryLength > 0
			      ? "searchButton"
			      : "randomButton";
	const searchIcon = queryLength > 0
			 ? "fa fa-search"
			 : "fa fa-rocket";
	
	return (<div>
	    <div className="searchOuter">
		
		<input className="searchBox"
		       type="text"
		       value={this.state.value}
		       onChange={this.handleChange} />

		<div className="clearOuter">
		    <button onClick={this.clearSearch}>
			<i className="fa fa-times"></i>
		    </button>
		</div>

		<div className="searchButtonOuter">
		    <button className={searchClassName}
			    onClick={this.buttonClicked}>
			<i className={searchIcon}></i>
		    </button>
		</div>
		
	    </div>

	    <div className="resultsCont">
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

	</div>
	);
    }
}

ReactDOM.render(
    <Search/>,
    document.getElementById('app')
);

