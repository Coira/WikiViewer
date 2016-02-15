import React from 'react';

class Result extends React.Component {
    constructor(props) {
	super(props);
    }
    
    render() {
	return (
	    <div>
		<a href={this.props.url}>{this.props.title}</a>
		{this.props.description}
	    </div>);
    }
}

export default Result;
	    
	    
