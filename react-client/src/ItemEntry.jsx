
import React from 'react';

class ItemEntry extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			searchTerm: ''
		}
	}

	render(){
		return(
			<form onSubmit={(event) => {event.preventDefault(); this.props.post(event, this.state.searchTerm)}}>
			<input className="entry" onChange={(e) => {this.setState({searchTerm: e.target.value})}}></input>
			</form>
		)
	}
}
export default ItemEntry;