import { Component } from 'react'
import {connect} from 'react-redux'

class DebugComponent extends Component {
 
 constructor(props) {
  super(props);   
 }

 render() {
  console.log("rendering DebugComponent...")
  
  return (
   <div>
     DebugComponent
     <p>{JSON.stringify(this.props.events)}</p>
   </div>
  );

 }

}

const mapStateToProps = state => {
 
 return {
   events : state.get('events')
 }
}

const mapDispatchToProps = dispatch => {
 return {
   destroyTodo : () => dispatch({
     type : 'DESTROY_TODO'
   })
 }
}

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(DebugComponent)