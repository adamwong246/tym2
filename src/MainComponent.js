import { Component } from 'react'
import moment from 'moment'
import Flat from './Flat';
import Fold from './Fold';

import {getEvents,
        yScale,
        tym2OrdinalSorterName, tym2OrdinalSorter, tym2OrdinalSorterStart, tym2OrdinalSorterPriority} from './data.js'

import {scaleTime} from 'd3-scale';

export default class MainComponent extends Component {
 constructor(props) {
  super(props);
  this.state = {
		 flat: true,
			sort: 'id',
   highlighted: null,
   filter: {
    parentId: null
   }
		};

}

setFlat = (e) => {this.setState({flat: true})}
setFold = (e) => {this.setState({flat: false})}
setSort = (e) => {this.setState({sort: e.target.value})}

setHighlight = (id) => {this.setState({highlighted: id})}
setFilteredParentId = (id) => {
 this.setState({filter: {parentId: id}})}

sorter = () => {
	if (this.state.sort === 'id'){ return tym2OrdinalSorter}
	if (this.state.sort === 'name'){ return tym2OrdinalSorterName}
 if (this.state.sort === 'startTime'){ return tym2OrdinalSorterStart}
 if (this.state.sort === 'priority'){ return tym2OrdinalSorterPriority}
}
render() {
 var eventsTree = getEvents(this.state.filter);
 var descendants = eventsTree.descendants()
 var yScale=scaleTime()
 .domain([
   descendants.reduce((mm, lmnt) => lmnt.data.start > mm ? mm : lmnt.data.start),
   descendants.reduce((mm, lmnt) => lmnt.data.end < mm ? mm : lmnt.data.end),
 ])

	return (
		<div>
  <table>
   <tbody>
    <tr>

    <td>
      treeishness<br></br>
      <input type="radio" name="flatOrFold" value="flat" onChange={this.setFlat} /> flat
      <input type="radio" name="flatOrFold" value="fold" onChange={this.setFold}  /> fold
    </td><td>
      sort<br></br>
      <select name="sort" onChange={this.setSort}>
         <option value="id">id</option>
         <option value="name">name</option>
         <option value="startTime">startTime</option>
         <option value="priority">priority</option>
       </select>
    </td>

    <td>
      filter<br></br>
      id: <input type="number" name="idSort" value="" /><br></br>
      name: <input type="text" name="nameSort" value="" /><br></br>
      parentId: <input type="number" name="parentIdSort" value={this.state.filter.parentId} onChange={(e) => this.setFilteredParentId(Number(e.target.value))} />
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

			{this.state.flat ?
        <Flat eventsTree={eventsTree}
              sorter={this.sorter()}
              highlighted={this.state.highlighted} onHighlight={this.setHighlight}
              filter={this.state.filter} onEventClick={this.setFilteredParentId}
              yScale={yScale}/> :
        <Fold eventsTree={eventsTree}
              sorter={this.sorter()}
              highlighted={this.state.highlighted} onHighlight={this.setHighlight}
              filter={this.state.filter} onEventClick={this.setFilteredParentId}
              yScale={yScale}/>}
		</div>
	);
}

}
