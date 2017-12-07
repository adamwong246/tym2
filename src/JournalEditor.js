import {todoSchema} from './data.js'
import Form from "react-jsonschema-form";
import moment from 'moment'

const log = (type) => console.log.bind(console, type);

export default function JournalEditor(props) {
 const event = props.event
 const schema = event.data.formSchema || todoSchema
 const journal = (event.data.journals || []).filter((lmnt)=>lmnt.time < moment()).sort((a, b) => b.time - a.time)[0]
 const formData = journal ? journal.blob : {}

 console.log(event)
 return (
  <div>
	<h3> {event.data.id} - {event.data.name} </h3>
   <h4>
  <span> {event.data.start.toString()}</span>
  </h4>

  <h4>
  <span> {event.data.end.toString()}</span>
  </h4>

  {
   <Form schema={schema}
           formData={formData}
           onChange={log("changed")}
           onSubmit={log("submitted")}
           onError={log("errors")} />

  }


  <a href='#' onClick={(e) => {props.setSchemaEditing(event.data.id)}}> edit schema </a>
  <br></br>
  <a href='#'>previous edit </a> <a href='#'> later edit</a>
 </div>
);

}
