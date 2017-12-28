import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './List.jsx';
import ItemEntry from  './ItemEntry.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      crossed: []
    }
    this.post = this.post.bind(this)
    this.crossout = this.crossout.bind(this)
    this.updateCrossed = this.updateCrossed.bind(this)
  }



  get(bool, bool2){
    $.ajax({
      url: '/items', 
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('fetching err', err);
      }, 
      complete: () => {
        if(bool){
          var arr = []
          this.state.items.forEach(function(item){
            if(item.done === true){
              arr.push(item._id)
            }
          })
          this.setState({
            crossed: arr.slice()
          })
        }
        if(bool2){
          this.setState({
            crossed: []
          })
        }

        }
    })
  }

  componentDidMount() {
   this.get(true)
  }

  post(event, string){
    $.ajax({
      url: '/items', 
      method: 'POST', 
      data: string, 
      contentType: 'text/plain',
      success: () => {
        this.get()
      },
      error: (err) => {
        console.log('posting err', err);
      }
    });
  }

  crossout(id, bool){
    $.ajax({
      url: '/crossout', 
      method: 'POST', 
      data: JSON.stringify({id: id, bool: bool}),
      contentType: 'application/json', 
      success: () => {
      },
      error: (err) => {
        console.log('posting err', err);
      }
    });
  }

  //check this
  del(){
    $.ajax({
      url: '/delete', 
      method: 'POST', 
      data: JSON.stringify(this.state.crossed),
      contentType: 'application/json', 
      success: () => {
        this.get(false, true)
      },
      error: (err) => {
        console.log('posting err', err);
      }
    });
  }

  updateCrossed(id){
    var copy = this.state.crossed.slice()
    if (this.state.crossed.includes(id)){
      var ind = copy.indexOf(id)
      copy.splice(ind, 1)
    } else {
      copy.push(id)
    }
    this.setState({
      crossed: copy.slice()
    })
  }

  render () {
    return (<div>
      <h1>Item List</h1>
      <button onClick={() => this.del()}>Delete Completed</button>
      <ItemEntry post={this.post} />
      <List items={this.state.items} post={this.crossout} cross={this.updateCrossed}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));