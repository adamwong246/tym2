import { addJournal } from '../actionsAndReducers.js'
import { Component } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import {todoSchema, todoUiSchema, todoVisSchema, metaSchema, lensSchema} from '../schemas.js'
import Form from "react-jsonschema-form";
import moment from 'moment'
import { toJs } from 'immutable';

const log = (type) => console.log.bind(console, type);

export default class JournalEditor extends Component {
 
 constructor(props){
  super(props);
  this.state = {open: false}
 }

 render () {
  const props     = this.props
  const event     = props.event
  const schema    = event.formSchema || todoSchema
  const uiSchema  = event.uiFormSchema || todoUiSchema
  const visSchema = event.visFormSchema || todoVisSchema
  const journals  = event.journals
  const journal   = (journals || []).filter( (lmnt) => lmnt.time < moment()).sort((a, b) => b.time - a.time)[0]
  const formData  = journal ? journal.blob : {}

  return (
   <div>
    {/* { (props.filtered != event.id) &&
     <div>
     </div>
    } */}

    { (props.filtered == event.id) &&
     <div>
      <span>{ event.start ? event.start.toString() : '' } - {event.end ? event.end.toString() : '' }</span>
      <br></br>
      <a href='#' onClick={ (e) => this.props.setFiltered(event.parentId) } > parent </a>
         
      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">

       <Tab eventKey={1} title="form">
        <span> @ {moment().toString()} </span>
        <Form
         schema   = { schema }
         formData = { formData }
         uiSchema = { uiSchema }
         onChange = { () => console.log("changed") }
         onSubmit = { (form) => {
          return store.dispatch({ type:"ADD_JOURNAL", eventId: event.id, formData: form.formData}) }
         }
         onError  = { () => console.log("errors") }
        />
        <a href='#'>previous edit </a> <a href='#'> later edit</a>
       </Tab>

       <Tab eventKey={2} title="schema">
        <Form 
         formData = { schema }
         schema   = { metaSchema }
        />
       </Tab>

       <Tab eventKey={5} title='dump'>
        <pre><code>
         {JSON.stringify(schema, null, 2)} 
        </code></pre>
        <pre><code>
          {JSON.stringify(journals, null, 2)} 
          </code></pre>
        </Tab>

        {/* <Tab eventKey={6} title='lenses'>
         <Form
          schema = { lensSchema } />
         </Tab> */}

      </Tabs>
      <hr/>
      </div>
    }
   </div>
  );
}
}

