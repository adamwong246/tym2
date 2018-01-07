import D1Component from './D1Component';
import JournalEditor from './JournalEditor';
import {svgWidth, svgHeight} from './configs';

function Fold1dRecursiveComponent(props) {
 console.log(props.filtered);
 return (
  <div key = { `Fold1dRecursiveComponent-${props.events.data.id}` } > 
   <D1Component
    lmnt         = {props.events}
    onMouseEnter = {props.onD1Hover}
    highlighted  = {props.highlighted === props.events.data.id}
    onClickEvent = {props.onClickEvent}
    filtered     = {props.filtered}
   />
   <ul> {
    ( props.events.children || [] ).map( function (lmnt, ndx) {
     return ( <li key = {`Fold1dRecursiveComponen-li-${lmnt.data.id}`} >
      <Fold1dRecursiveComponent
       events       ={lmnt}
       onD1Hover    ={props.onD1Hover}
       highlighted  ={props.highlighted}
       onClickEvent ={props.onClickEvent}
       filtered     ={props.filtered}
      />
     </li>)
    })
   }</ul>
  </div>
 )
}

export default function Fold1dComponent(props) {
 const topEvent = props.events;
 return (
  <div style={
   {width: `${svgWidth}px`, height: `${svgHeight}px`, overflow: 'auto'}
  }> 
   <Fold1dRecursiveComponent
    events={props.events}
    onD1Hover={props.onHighlight}
    highlighted={props.highlighted}
    onClickEvent={props.onEventClick}
    filtered    ={props.filtered}
   />
  </div>
 );
}
