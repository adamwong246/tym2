import Component from 'inferno-component';

// export default function D1Component(props) {
export default class D1Component extends Component {

	render (props) {
		return (
		<a style={ {color: props.highlighted ? 'red' : 'black'} } onMouseEnter={(e) => props.onMouseEnter(props.lmnt.id)} onClick={(e) => props.onClickEvent(props.lmnt.id)} href="#">{props.lmnt.name}</a>
	);
}
}
