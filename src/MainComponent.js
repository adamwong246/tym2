import Component from 'inferno-component';

import Flat from './Flat';
import Fold from './Fold';

import {tym2OrdinalSorterName, tym2OrdinalSorter, tym2OrdinalSorterStart, tym2OrdinalSorterPriority} from './data.js'

export default class MainComponent extends Component {
 constructor(props) {
  super(props);
  this.state = {
		 flat: true,
			sort: 'id',
      highlighted: null,
      filteredParentId: null
		};
}

setFlat = (e) => {this.setState({flat: true})}
setFold = (e) => {this.setState({flat: false})}
setSort = (e) => {this.setState({sort: e.target.value})}

setHighlight = (id) => {this.setState({highlighted: id})}
setFilteredParentId = (id) => {
 this.setState({filteredParentId: id})}

sorter = () => {
	if (this.state.sort === 'id'){ return tym2OrdinalSorter}
	if (this.state.sort === 'name'){ return tym2OrdinalSorterName}
 if (this.state.sort === 'startTime'){ return tym2OrdinalSorterStart}
 if (this.state.sort === 'priority'){ return tym2OrdinalSorterPriority}
}
render() {

  const filter = {
    parentId: this.state.filteredParentId
  }

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
      parentId: <input type="number" name="parentIdSort" value="" />
    </td>

    <td>
     state
     <pre>{JSON.stringify(this.state, null, 2)}</pre>
    </td>
    </tr>
   </tbody>
  </table>
			{this.state.flat ?
        <Flat sorter={this.sorter()} highlighted={this.state.highlighted} onHighlight={this.setHighlight} filter={filter} onEventClick={this.setFilteredParentId}/> :
        <Fold sorter={this.sorter()} highlighted={this.state.highlighted} onHighlight={this.setHighlight} filter={filter} onEventClick={this.setFilteredParentId}/>}
		</div>
	);
}

}
