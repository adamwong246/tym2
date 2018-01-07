import { Component } from 'react'
import moment from 'moment'

import {stratify} from 'd3-hierarchy';

import Datetime from 'react-datetime';

import Flat1dComponent from './Flat1dComponent';
import Flat2dComponent from './Flat2dComponent';
import Fold1dComponent from './Fold1dComponent';
import Fold2dComponent from './Fold2dComponent';

import {
 DbEvents,
 yScale,
 tym2OrdinalSorterName,
 tym2OrdinalSorter,
 tym2OrdinalSorterStart,
 tym2OrdinalSorterPriority
} from './data.js'

import {scaleTime} from 'd3-scale';

const subtree= (tree, id) => {
 var toReturn;
 tree.each( (lmnt, ndx) => {
  if(lmnt.data.id === id){
   toReturn = lmnt.copy()
  }
 })
 return toReturn
}

const getEvents = (filter) => {
 console.log(filter)
 var eventsTree = stratify()(
  DbEvents.filter((e) => {
   if (filter.minTime != null && e.start > filter.minTime){
    return false
   }

   if (filter.maxTime != null && e.end < filter.maxTime){
    return false
   }

   return true

  })
 );
 var subTree;

 if (filter.id === null){
  subTree = eventsTree
 } else {
  subTree = subtree(eventsTree, filter.id) || eventsTree
 }

 return subTree
}

export default class MainComponent extends Component {
 
 constructor(props) {
  super(props);
  this.state = {
   groupingMode: 'flat',
   sort: 'id',
   highlighted: null,
   filter: {
    id: null,
    minTime: null,
    maxTime: null
   },
   schemaEditing: null,
   DB: DbEvents
 };
}

setGroupingModel = (e) => this.setState({groupingMode: e.target.value})
setSort          = (e) => this.setState({sort: e.target.value})

setHighlight  = (v) => this.setState({highlighted: v})

setFilteredId      = (v) => this.setState({ filter: { ...this.state.filter, id: v} });
setFilteredMinTime = (v) => this.setState({ filter: { ...this.state.filter, minTime: v} }); 
setFilteredMaxTime = (v) => this.setState({ filter: { ...this.state.filter, maxTime: v} }); 

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
 // console.log(this.state)

 var eventsTree = getEvents(this.state.filter);
 var descendants = eventsTree.descendants()

 const highlighted   = this.state.highlighted;
 const filtered      = this.state.filter.id
 const setHighlight  = this.setHighlight
 const setFilteredId = this.setFilteredId

 const computedMinTime = descendants.reduce((mm, lmnt) => {
  return Math.min(
   lmnt.data.end,
   (lmnt.data.journals || []).reduce((mm2, lmnt2) => { return lmnt2.time < mm2 ? mm2 : lmnt2.time }, 0)
  ) < mm ? mm : lmnt.data.end}
 )

 const computedMaxTime = descendants.reduce((mm, lmnt) => {
  return Math.max(
   lmnt.data.start,
   (lmnt.data.journals || []).reduce((mm2, lmnt2) => { return lmnt2.time > mm2 ? mm2 : lmnt2.time }, 0)
  ) > mm ? mm : lmnt.data.start}
 )

 const filteredMinTime = this.state.filter.minTime
 const filteredMaxTime = this.state.filter.maxTime

 const minTime = filteredMinTime || computedMinTime
 const maxTime = filteredMaxTime || computedMaxTime

 var yScale = scaleTime().domain([maxTime, minTime])

 let leftComponent, rightComponent, events;

 if (this.state.groupingMode === 'flat'){
    events = eventsTree.descendants().sort(this.sorter())
    leftComponent = <Flat1dComponent events={events}
                                      highlighted={highlighted} onHighlight={setHighlight}
                                      onEventClick={setFilteredId}
                                      setSchemaEditing={this.setSchemaEditing}
                                      schemaEditing={this.state.schemaEditing}
                                      filtered={filtered}
                     />
    rightComponent = <Flat2dComponent events={events}
                                      highlighted={highlighted} onHighlight={setHighlight}
                                      yScale={yScale}
                                      filtered={filtered}
                     />
 }else {
  events = eventsTree
  leftComponent = <Fold1dComponent events={events}
                                    highlighted={highlighted} onHighlight={setHighlight}
                                    onEventClick={setFilteredId}
                                    setSchemaEditing={this.setSchemaEditing}
                                    schemaEditing={this.state.schemaEditing}
                                    filtered={filtered}
                  />
  rightComponent = <Fold2dComponent events={events}
                                    highlighted={highlighted} onHighlight={setHighlight}
                                    yScale={yScale}
                                    filtered={filtered}
                  /> 
}

	return (
		<div>

     <Datetime className="maxTimeSetter"
      onChange={this.setFilteredMaxTime}
      value={maxTime} />

     <Datetime className="minTimeSetter"
      onChange={this.setFilteredMinTime}
      value={minTime} />
     
      org mode: 
      <select name="flatOrFoldSelect" onChange={this.setGroupingModel}>
         <option value="flat">flat</option>
         <option value="fold">fold</option>
       </select>

      sort: 
      <select name="sort" onChange={this.setSort}>
         <option value="id">id</option>
         <option value="name">name</option>
         <option value="startTime">startTime</option>
         <option value="priority">priority</option>
       </select>

     id: <input type="number" name="isSort" onChange={(e) => setFilteredId(Number(e.target.value))} value={this.state.filter.id} />


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
