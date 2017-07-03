import Component from 'inferno-component';

import Flat from './Flat';
import Fold from './Fold';

import {tym2OrdinalSorterName, tym2OrdinalSorter, tym2OrdinalSorterStart} from './data.js'

export default class MainComponent extends Component {
 constructor(props) {
  super(props);
  this.state = {
		 flat: true,
			sort: 'id'
		};
}

setFlat = (e) => {this.setState({flat: true})}
setFold = (e) => {this.setState({flat: false})}

setSort = (e) => {this.setState({sort: e.target.value})}

sorter = () => {
	if (this.state.sort == 'id'){ return tym2OrdinalSorter}
	if (this.state.sort == 'name'){ return tym2OrdinalSorterName}
 if (this.state.sort == 'startTime'){ return tym2OrdinalSorterStart}
}
render() {

	return (
		<div>
		<pre>{JSON.stringify(this.state, null, 2)}</pre>
			<form action="">
					treeishness:
			  <input type="radio" name="flatOrFold" value="flat" onChange={this.setFlat} /> flat
			  <input type="radio" name="flatOrFold" value="fold" onChange={this.setFold}  /> fold
					<br></br>
					Sort by:
     <select name="sort" onChange={this.setSort}>
        <option value="id">id</option>
        <option value="name">name</option>
        <option value="startTime">startTime</option>
      </select>
			</form>

			{this.state.flat ? <Flat sorter={this.sorter()}/> : <Fold sorter={this.sorter()}/>}

		</div>
	);
}

}
