import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    { props.items.map((item, id) => <ListItem post={props.post}item={item} key={item._id} cross={props.cross}/>)}
  </div>
)

export default List;