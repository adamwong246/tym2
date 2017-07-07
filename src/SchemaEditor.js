import { Component } from 'react'

export default class SchemaEditor extends Component{

	render () {
		return (
		<pre>{JSON.stringify(this.props.event.formSchema, null, 2)}</pre>
	);
}
}
