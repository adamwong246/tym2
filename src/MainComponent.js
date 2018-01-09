import { Component } from 'react'
import moment from 'moment'

import {stratify} from 'd3-hierarchy';

import Datetime from 'react-datetime';


import { Flat1dExpanded, Flat1dCondensed } from './Flat1dComponent';
import { Flat2dExpanded, Flat2dCondensed } from './Flat2dComponent';
import { Fold1dExpanded, Fold1dCondensed} from './Fold1dComponent';
import { Fold2dExpanded, Fold2dCondensed} from './Fold2dComponent.jsx';

import {
 DbEvents,
 yScale,
 tym2OrdinalSorterName,
 tym2OrdinalSorter,
 tym2OrdinalSorterStart,
 tym2OrdinalSorterPriority
} from './data.js'

import {scaleTime} from 'd3-scale';


const groupBy = (list, keyGetter) => {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

const sorter = (stateSort) => {
 if (stateSort === 'id'){ return tym2OrdinalSorter}
 if (stateSort === 'name'){ return tym2OrdinalSorterName}
 if (stateSort === 'startTime'){ return tym2OrdinalSorterStart}
 if (stateSort === 'priority'){ return tym2OrdinalSorterPriority}
}

const subtree = (tree, id) => {
 var toReturn;
 tree.each( (lmnt, ndx) => {
  if(lmnt.data.id === id){
   toReturn = lmnt.copy()
  }
 })
 return toReturn
}

const getEvents = (state) => {
 const filter = state.filter;
 var eventsTree = stratify()(
  state.DB.filter((e) => {
   if (filter.minTime != null && e.start != null && e.start < filter.minTime){
    return false
   }

   if (filter.maxTime != null && e.end != null && e.end > filter.maxTime){
    return false
   }

   return true

  })
 );
 var st;

 if (filter.id === null){
  st = eventsTree
 } else {
  st = subtree(eventsTree, filter.id) || eventsTree
 }

 return st;
}

export default class MainComponent extends Component {
 
 constructor(props) {
  super(props);
  
  this.state = {
   groupingMode: 'flat',
   sort: 'priority',
   highlighted: null,
   expandedRecurrences: false,
   filter: {
    id: null,
    minTime: moment().subtract(1, 'days'),
    maxTime: moment().add(7, 'days')
   },
   schemaEditing: null,
   DB: DbEvents
  };
 }

 setGroupingModel = (e) => this.setState({groupingMode: e.target.value})
 setSort          = (e) => this.setState({sort: e.target.value})
 
 toggleExpandedRecurrences = (e) => this.setState({expandedRecurrences: !this.state.expandedRecurrences})

 setHighlight = (v) => this.setState({highlighted: v})
 
 setFilteredId      = (v) => this.setState({ filter: { ...this.state.filter, id: v} });
 setFilteredMinTime = (v) => this.setState({ filter: { ...this.state.filter, minTime: v} }); 
 setFilteredMaxTime = (v) => this.setState({ filter: { ...this.state.filter, maxTime: v} }); 

 setSchemaEditing = (id) => {
  if(id !== this.state.schemaEditing){
   this.setState({schemaEditing: id})
  } else {
   this.setState({schemaEditing: null})}
  }

 
 // fitViewToData = () => {
  
 //  const descendants = getEvents(this.state).descendants();

 //  const computedMinTime = descendants.reduce((mm, lmnt) => {
 //   return Math.min(
 //    lmnt.data.start,
 //    (lmnt.data.journals || []).reduce((mm2, lmnt2) => { return lmnt2.time < mm2 ? mm2 : lmnt2.time }, 0)
 //   ) < mm ? mm : lmnt.data.start
 //  })

 //  const computedMaxTime = descendants.reduce((mm, lmnt) => {
 //   return Math.max(
 //    lmnt.data.end,
 //    (lmnt.data.journals || []).reduce((mm2, lmnt2) => { return lmnt2.time > mm2 ? mm2 : lmnt2.time }, 0)
 //   ) > mm ? mm : lmnt.data.end
 //  })

 //  return this.setState({ filter: { ...this.state.filter, minTime: computedMinTime, maxTime: computedMaxTime} })
 // }

render() {
 console.log(this.state)

 const highlighted   = this.state.highlighted;
 const filtered      = this.state.filter.id
 const setHighlight  = this.setHighlight
 const setFilteredId = this.setFilteredId
 const minTime       = this.state.filter.minTime;
 const maxTime       = this.state.filter.maxTime;

 var eventsTree = getEvents(this.state);
 
 var xScale = scaleTime().domain([minTime, maxTime])

 let leftComponent, rightComponent, events;

 let childProps = {
  highlighted:highlighted, onHighlight: setHighlight,
  onEventClick: setFilteredId, setSchemaEditing: this.setSchemaEditing, schemaEditing: this.state.schemaEditing,
  filtered: filtered
 }

 // FLAT
 if (this.state.groupingMode === 'flat'){
  
  // FLAT AND EXPANDED
  if (this.state.expandedRecurrences){
   const events = eventsTree.descendants().sort(sorter(this.state.sort))
   leftComponent = <Flat1dExpanded {...childProps} events={events} />
   rightComponent = <Flat2dExpanded {...childProps} events={events} xScale={xScale} />
  
  // FLAT AND CONDENSED
  } else { 
   const groupedEvents = (Array.from(groupBy(eventsTree.descendants(), e => e.data.name)))
   leftComponent = <Flat1dCondensed {...childProps} groupedEvents={groupedEvents} />
   rightComponent = <Flat2dCondensed {...childProps} groupedEvents={groupedEvents} xScale={xScale} />
  }

 // FOLD
 } else {

  // FOLD AND EXPANDED
  if (this.state.expandedRecurrences){
   const events = eventsTree.sort(sorter(this.state.sort))
   leftComponent = <Fold1dExpanded {...childProps} events={events} />
   rightComponent = <Fold2dExpanded {...childProps} events={events} xScale={xScale} />
  
  // FOLD AND CONDENSED
  } else {
   const groupedEvents = groupBy(eventsTree.descendants(), e => e.data.name) 
   leftComponent = <Fold1dCondensed {...childProps} groupedEvents={groupedEvents} />
   // rightComponent = <Fold2dCondensed {...childProps} groupedEvents={groupedEvents} xScale={xScale} />
   // leftComponent = <span> FIXME </span>
   rightComponent = <span> FIXME </span>
  }
 }

	return (
		<div>
   <form className="form-inline">

    <div className="form-group">
     <label>org:</label>
      <select name="flatOrFoldSelect" onChange={this.setGroupingModel}>
       <option value="flat">flat</option>
       <option value="fold">fold</option>
      </select>
      
     <br/>

     <label>expanded recurrences: </label>
     <input
      type="checkbox"
      className="form-control"
      onChange={this.toggleExpandedRecurrences} />

     <br/>

     <label>sort:</label>
      <select name="sort" onChange={this.setSort}>
         <option value="id">id</option>
         <option value="name">name</option>
         <option value="startTime">startTime</option>
         <option value="priority">priority</option>
       </select>

     <br/>

     <label>id:</label>
     <input type="number" name="isSort" onChange={(e) => setFilteredId(Number(e.target.value))} value={this.state.filter.id} />
    </div>

    <div className="form-group">
     
     <label>minTime</label>
     <Datetime className="minTimeSetter"
      onChange={this.setFilteredMinTime}
      value={minTime}
      isValidDate={(current) => current.isBefore( maxTime )} />

     <label>maxTime</label>
     <Datetime className="maxTimeSetter"
      onChange={this.setFilteredMaxTime}
      value={maxTime}
      isValidDate={(current) => current.isAfter( minTime )} />

    </div>

   </form>

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

}}
