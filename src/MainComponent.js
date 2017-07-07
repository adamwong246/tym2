import { Component } from 'react'
import moment from 'moment'

import Flat1dComponent from './Flat1dComponent';
import Flat2dComponent from './Flat2dComponent';
import Fold1dComponent from './Fold1dComponent';
import Fold2dComponent from './Fold2dComponent';
import SchemaEditor from './SchemaEditor';

import {DbEvents, getEvents,
        yScale,
        tym2OrdinalSorterName, tym2OrdinalSorter, tym2OrdinalSorterStart, tym2OrdinalSorterPriority} from './data.js'

import {scaleTime} from 'd3-scale';

export default class MainComponent extends Component {
 constructor(props) {
  super(props);
  this.state = {
		  groupingMode: 'flat',
			sort: 'id',
   highlighted: null,
   filter: {
    id: null
   }, schemaEditing: null
		};

}

// setFlat = (e) => {
//    console.log('setFlat')
//   return this.setState({groupingMode: 'flat'})}
// setFold = (e) => {
//    console.log('setFold')
//   return this.setState({groupingMode: 'fold'})}

setGroupingModel = (e) => {
  this.setState({groupingMode: e.target.value})
}
setSort = (e) => {this.setState({sort: e.target.value})}

setHighlight = (id) => {this.setState({highlighted: id})}
setFilteredId = (id) => {this.setState({filter: {id: id}})}
setSchemaEditing = (id) => {
 if(id !== this.state.schemaEditing){
   this.setState({schemaEditing: id})
 } else {
  this.setState({schemaEditing: null})}
 }


sorter = () => {
	if (this.state.sort === 'id'){ return tym2OrdinalSorter}
	if (this.state.sort === 'name'){ return tym2OrdinalSorterName}
 if (this.state.sort === 'startTime'){ return tym2OrdinalSorterStart}
 if (this.state.sort === 'priority'){ return tym2OrdinalSorterPriority}
}
render() {
 var eventsTree = getEvents(this.state.filter);
 var descendants = eventsTree.descendants()

 const highlighted = this.state.highlighted;
 const setHighlight = this.setHighlight
 const setFilteredId= this.setFilteredId

 var yScale=scaleTime()
 .domain([
   descendants.reduce((mm, lmnt) => lmnt.data.start > mm ? mm : lmnt.data.start),
   descendants.reduce((mm, lmnt) => lmnt.data.end < mm ? mm : lmnt.data.end),
 ])

 let leftComponent, rightComponent, events;
 if (this.state.groupingMode === 'flat'){
    events = eventsTree.descendants().sort(this.sorter())
    leftComponent = <Flat1dComponent events={events}
                                      highlighted={highlighted} onHighlight={setHighlight}
                                      onEventClick={setFilteredId}
                                      setSchemaEditing={this.setSchemaEditing}/>
    rightComponent = <Flat2dComponent events={events}
                                      highlighted={highlighted} onHighlight={setHighlight}
                                      yScale={yScale} />
 }else {
  events = eventsTree
  leftComponent = <Fold1dComponent events={events}
                                    highlighted={highlighted} onHighlight={setHighlight}
                                    onEventClick={setFilteredId}
                                    setSchemaEditing={this.setSchemaEditing}/>
  rightComponent = <Fold2dComponent events={events}
                                    highlighted={highlighted} onHighlight={setHighlight}
                                    yScale={yScale} />
 }

 if (this.state.schemaEditing != null){
   rightComponent = <SchemaEditor event={DbEvents.filter( (lmnt) => this.state.schemaEditing === lmnt.id)[0]}/>
 }

	return (
		<div>
  <table>
   <tbody>
    <tr>

    <td>
      treeishness<br></br>
      <select name="flatOrFoldSelect" onChange={this.setGroupingModel}>
         <option value="flat">flat</option>
         <option value="fold">fold</option>
       </select>

       <br></br>
      sort<br></br>
      <select name="sort" onChange={this.setSort}>
         <option value="id">id</option>
         <option value="name">name</option>
         <option value="startTime">startTime</option>
         <option value="priority">priority</option>
       </select>

       <br></br>
      filter<br></br>
     id: <input type="number" name="isSort" onChange={(e) => setFilteredId(Number(e.target.value))} value={this.state.filter.id} />
    </td>

    <td>
     state
     <pre>{JSON.stringify(this.state, null, 2)}</pre>
    </td>

    <td>
    <p>{yScale.domain()[0].toString()}</p>
    <p>{yScale.domain()[1].toString()}</p>
    </td>
    </tr>
   </tbody>
  </table>

   <table>
   <tbody>
    <tr>
    <td>
     {leftComponent}
    </td>
    <td>
     {rightComponent}
    </td>
    </tr>
   </tbody>
 </table>

		</div>
	);
}

}
