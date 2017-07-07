import Form from "react-jsonschema-form";
import D1Component from './D1Component';
import {todoSchema} from './data.js'
import moment from 'moment'
const log = (type) => console.log.bind(console, type);

const latestJournal = (journals) => {

}
export default function Flat1dComponent(props) {
 const topEvent = props.events[0];

	return (
		<div>
   <h3>
   <D1Component lmnt={topEvent} onMouseEnter={props.onHighlight} highlighted={props.highlighted === topEvent.id} onClickEvent={props.onEventClick}/>
   </h3>

			<h4>
			<span> {topEvent.data.start.toString()}</span>
			</h4>

			<h4>
			<span> {topEvent.data.end.toString()}</span>
			</h4>

			{
				topEvent.data.formSchema ?
							<Form schema={topEvent.data.formSchema}
            formData={(topEvent.data.journals || []).filter((lmnt)=>lmnt.time < moment()).sort((a, b) => b.time - a.time)[0].blob}
	           onChange={log("changed")}
	           onSubmit={log("submitted")}
	           onError={log("errors")} /> : <span></span>

			}


   <a href='#' onClick={(e) => {props.setSchemaEditing(topEvent.data.id)}}> edit schema </a>
   <br></br>
   <a href='#'>previous edit </a> <a href='#'> later edit</a>
			<ul>
				{ (props.events.slice(1).map(function(lmnt, ndx){
							return (
								<li key={`Flat1dComponent-${lmnt.data.id}`}>
								 <D1Component lmnt={lmnt} onMouseEnter={props.onHighlight} highlighted={props.highlighted === lmnt.id} onClickEvent={props.onEventClick}/>
								</li>
							)
						}))
				}
			</ul>
			</div>
	);
}
