
import React from 'react';

class ListItem extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			done: this.props.item.done
		}
	}

	crossOut(){
		this.props.post(this.props.item._id, !this.state.done)
		this.props.cross(this.props.item._id, !this.state.done)

		this.setState({ 
			done: !this.state.done
		})
	}

	render (){
		var styles = {
			textDecoration: this.state.done ? 'line-through' : 'none'
		}

		return (
		  <div onClick={() => this.crossOut()} style={styles}>
		    { this.props.item.task }
		  </div>
  )
}

}
export default ListItem;