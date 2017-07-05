import { Component } from 'react'

// export default function D1Component(props) {
export default class D1Component extends Component{

	render () {
		return (
		<a style={ {color: this.props.highlighted ? 'red' : 'black'} } onMouseEnter={(e) => this.props.onMouseEnter(this.props.lmnt.data.id)} onClick={(e) => this.props.onClickEvent(this.props.lmnt.data.id)} href="#">{this.props.lmnt.data.id} - {this.props.lmnt.data.name}</a>
	);
}
}
