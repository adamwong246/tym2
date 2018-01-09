import Form from "react-jsonschema-form";
import moment from 'moment'
import { Component } from 'react'
import { Tab, Tabs } from 'react-bootstrap';

import {todoSchema, todoUiSchema, todoVisSchema, metaSchema} from './schemas.js'

const log = (type) => console.log.bind(console, type);

export default class JournalEditor extends Component {
 
 constructor(props){
  super(props);
  this.state = {open: false}
 }

 render () {
  const props = this.props
  const event = props.event
  const schema = event.data.formSchema || todoSchema
  const uiSchema = event.data.uiFormSchema || todoUiSchema
  const visSchema = event.data.visFormSchema || todoVisSchema
  const journal = (event.data.journals || []).filter((lmnt)=>lmnt.time < moment()).sort((a, b) => b.time - a.time)[0]
  const formData = journal ? journal.blob : {}
  
  return (
   <div>
    { (props.filtered != event.data.id) &&
     <div>
     </div>
    }

    { (props.filtered == event.data.id) &&
     <div>
      <span>{ event.data.start ? event.data.start.toString() : '' } - {event.data.end ? event.data.end.toString() : '' }</span>
      <br></br>
      <a href='#'
       onClick={(e) => this.props.setFiltered(event.data.parentId)}
      > parent </a>
         
      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
       <Tab eventKey={1} title="form">
        <Form
            schema   ={schema}
            formData ={formData}
            uiSchema ={uiSchema}
            onChange ={() => console.log("changed")}
            onSubmit ={() => console.log("submitted")}
            onError  ={() => console.log("errors")}
           />
           <a href='#'>previous edit </a> <a href='#'> later edit</a>
       </Tab>
       <Tab eventKey={2} title="schema">
        <Form className="form-inline"
         schema={metaSchema}
        />
        <textarea style={{height: '400px',width: '100%'}}
         value={JSON.stringify(schema, null, 2)} /> 
       </Tab>
       <Tab eventKey={3} title="ui">
        <textarea style={{height: '400px', width: '100%'}}
         value={JSON.stringify(uiSchema, null, 2)} /> 
       </Tab>
       <Tab eventKey={4} title="vis">
        <ul>
         <li>first lens</li>
         <li>second lens</li>
        </ul>
        <textarea
         value={JSON.stringify(visSchema, null, 2)} /> 
       </Tab>
      </Tabs>
      </div>
    }
   </div>
  );
}
}

