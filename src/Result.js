import React from 'react';

class Result extends React.Component {
    constructor(props) {
	super(props);
    }
    
    render() {
	return (
	    
	    <a target="_blank" href={this.props.url} className="result">
		<h1>{this.props.title}</h1>
		<p>{this.props.description}</p>
	    </a>
	);
    }
}

export default Result;



	    
