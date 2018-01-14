import { Component } from 'react'
import JournalEditor from './JournalEditor';

export default class D1Component extends Component{
 
constructor(props) {
  super(props);
  this.state = {count: props.initialCount};
 }

 render () {
  const lmnt = this.props.lmnt;

  return (
    <div>
      <a 
        style={ {color: this.props.highlighted ? 'red' : 'black'} }
        onMouseEnter={(e) => this.props.onMouseEnter(lmnt.id)}
        onClick={(e) => this.props.onClickEvent(lmnt.id)}
        href="#"
      > 
        {lmnt.name}
      </a>
      
      <JournalEditor event={lmnt} 
       filtered={this.props.filtered}
       setFiltered={this.props.onClickEvent}/>
    </div>
  );
 }
}
