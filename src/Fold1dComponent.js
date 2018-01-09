import D1Component from './D1Component';
import JournalEditor from './JournalEditor';
import {svgWidth, svgHeight} from './configs';

const Fold1dExpandedRecursive = (props) => {
 return (
  <div key = { `Fold1dExpandedRecursive-${props.events.data.id}` } > 
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
      <Fold1dExpandedRecursive
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

export const Fold1dExpanded = (props) => {
 const topEvent = props.events;
 return (
  <div style={
   {width: `${svgWidth}px`, height: `${svgHeight}px`, overflow: 'auto'}
  }> 
   <Fold1dExpandedRecursive
    events={props.events}
    onD1Hover={props.onHighlight}
    highlighted={props.highlighted}
    onClickEvent={props.onEventClick}
    filtered    ={props.filtered}
   />
  </div>
 );
}








const Fold1dCondensedRecursive = (props) => {
 return (
  <div key = { `Fold1dCondensedRecursive-div-${props.events.data.id}` } > 
   <D1Component
    lmnt         = {props.events }
    onMouseEnter = {props.onD1Hover }
    highlighted  = {props.highlighted === props.events.data.id }
    onClickEvent = {props.onClickEvent }
    filtered     = {props.filtered } />
   <ul> {
    ( props.events.children || [] ).map( function (lmnt, ndx) {
     return ( <li key = {`Fold1dCondensedRecursive-li-${lmnt.data.id}`} >
      <Fold1dCondensedRecursive
       events       = { lmnt }
       onD1Hover    = { props.onD1Hover }
       highlighted  = { props.highlighted }
       onClickEvent = { props.onClickEvent }
       filtered     = { props.filtered } />
     </li>)
    })
   }</ul>
  </div>
 )
}

export const Fold1dCondensed = (props) => {
 //const topGroupedEvents = props.groupedEvents;
 return (
  <div style={ { width: `${svgWidth}px`, height: `${svgHeight}px`, overflow: 'auto' } }> 
   <Fold1dCondensedRecursive
    groupedEvents = { props.groupedEvents }
    onD1Hover     = { props.onHighlight }
    highlighted   = { props.highlighted }
    onClickEvent  = { props.onEventClick }
    filtered      = { props.filtered } />
  </div>
 );
}
