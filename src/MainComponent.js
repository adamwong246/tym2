import { Component } from 'react'
import moment from 'moment'
import {stratify} from 'd3-hierarchy';
import Datetime from 'react-datetime';
import { Flat1dExpanded, Flat1dCondensed } from './Flat1dComponent';
import { Flat2dExpanded, Flat2dCondensed } from './Flat2dComponent';
import { Fold1dExpanded, Fold1dCondensed} from './Fold1dComponent';
import { Fold2dExpanded, Fold2dCondensed} from './Fold2dComponent';
import { DbEvents, yScale, sorter } from './data.js'
import {scaleTime} from 'd3-scale';

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

 getEvents = () => {

  

 }

 render() {
  // console.log(this.state)

  const highlighted   = this.state.highlighted;
  const filtered      = this.state.filter.id
  const setHighlight  = this.setHighlight
  const setFilteredId = this.setFilteredId
  const minTime       = this.state.filter.minTime;
  const maxTime       = this.state.filter.maxTime;

  var xScale = scaleTime().domain([minTime, maxTime])

  let leftComponent, rightComponent, events;

  let childProps = {
   highlighted:highlighted, onHighlight: setHighlight,
   onEventClick: setFilteredId, setSchemaEditing: this.setSchemaEditing, schemaEditing: this.state.schemaEditing,
   filtered: filtered
  }



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
  
  const subtree = (tree, id) => {
   var toReturn;
   tree.each( (lmnt, ndx) => {
    if(lmnt.data.id === id){
     toReturn = lmnt.copy()
    }
   })
   return toReturn
  }

  const state = this.state;
  const filter = state.filter;
 
  const listOfEvents = state.DB.filter((e) => {
   if (filter.minTime != null && e.start != null && e.start < filter.minTime){
    return false
   }
 
   if (filter.maxTime != null && e.end != null && e.end > filter.maxTime){
    return false
   }
 
   return true
  });
 
  var eventsTree;
  if (!state.expandedRecurrences){

   const recurringEvents = listOfEvents.filter((e) => e.recursionParentId != null)

   const groupedRecursives = Array.from(
    groupBy(recurringEvents, e => {
     return e.recursionParentId + "/" + e.name
     // return {
     //  name: e.name,
     //  recursionParentId: e.recursionParentId
     // }
     // return [e.name, e.recursionParentId]
    })
   )

   const eventsWithRecurssions = listOfEvents
   .filter((e) => e.recursionParentId == null)
   .map((e) => {
    groupedRecursives.filter((gr) => gr[0].split('/')[0] == e.id)
    .forEach((gr) => {
     e.recursions = e.recursions || {}
     e.recursions[gr[0].split('/')[1]] = gr[1]
    })
    return e;
   })
   
   eventsTree = stratify().parentId((d) => d.recursionParentId || d.parentId)(eventsWithRecurssions);
  } else {
   eventsTree = stratify().parentId((d) => d.recursionParentId || d.parentId)(listOfEvents);
  }
 
  var eventsPayload
  if (filter.id === null){
   eventsPayload =  eventsTree
  } else {
   eventsPayload =  subtree(eventsTree, filter.id) || eventsTree
  }
  
  // FLAT
  if (this.state.groupingMode === 'flat'){
   
   // FLAT AND EXPANDED
   if (this.state.expandedRecurrences){
    events = eventsPayload.descendants().sort(sorter(this.state.sort))
    leftComponent = <Flat1dExpanded {...childProps} events={events} />
    rightComponent = <Flat2dExpanded {...childProps} events={events} xScale={xScale} />
   
   // FLAT AND CONDENSED
   } else { 
    events = eventsPayload.descendants().sort(sorter(this.state.sort))
    leftComponent = <Flat1dCondensed {...childProps} events={events} />
    rightComponent = <Flat2dCondensed {...childProps} events={events} xScale={xScale} />
   }

  // FOLD
  } else {

   // FOLD AND EXPANDED
   if (this.state.expandedRecurrences){
    events = eventsPayload.sort(sorter(this.state.sort))
    leftComponent = <Fold1dExpanded {...childProps} events={events} />
    rightComponent = <Fold2dExpanded {...childProps} events={events} xScale={xScale} />
   
   // FOLD AND CONDENSED
   } else {
    events = eventsPayload.sort(sorter(this.state.sort))
    leftComponent = <Fold1dCondensed {...childProps} events={events} />
    rightComponent = <Fold2dCondensed {...childProps} events={events} xScale={xScale} />
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

 }

}
