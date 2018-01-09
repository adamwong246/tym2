import D1Component from './D1Component';
import JournalEditor from './JournalEditor';
import {svgWidth, svgHeight} from './configs';

export const Flat1dExpanded = (props) => {
 return(
  <div style={{width: `${svgWidth}px`, height: `${svgHeight}px`, overflow: 'auto'}} >
   <ul>
    { (props.events.map(function(lmnt, ndx){
     return (
      <li key = { `Flat1dComponent-${lmnt.data.id}` } >
       <D1Component
        lmnt             = {lmnt}
        onMouseEnter     = {props.onHighlight}
        highlighted      = {props.highlighted === lmnt.id}
        onClickEvent     = {props.onEventClick}
        setSchemaEditing = {props.setSchemaEditing}
        filtered         = {props.filtered}        
       />
      </li>
     )
    }))}
   </ul>
  </div>
 );
}


export const Flat1dCondensed = (props) => {
 const groupedEvents = props.groupedEvents
 
 return (
  <div style={{width: `${svgWidth}px`, height: `${svgHeight}px`, overflow: 'auto'}} >
   <ul>
    { (Array.from(groupedEvents)).map(function(a, ndx){
     return (
      <li>
       {a[0]} X {a[1].length}
      </li>
     )
    })}
   </ul>
  </div>
 );
}
