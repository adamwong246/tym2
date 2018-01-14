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
        lmnt             = {lmnt.data}
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
 const events = props.events
 
 return (
  <div style={{width: `${svgWidth}px`, height: `${svgHeight}px`, overflow: 'auto'}} >
   <ul>
    { events.map(function(lmnt, ndx){
     return (
      <li key = { `Flat1dCondensed-${lmnt.data.id}` } >
       <D1Component
        lmnt             = {lmnt.data}
        onMouseEnter     = {props.onHighlight}
        highlighted      = {props.highlighted === lmnt.id}
        onClickEvent     = {props.onEventClick}
        setSchemaEditing = {props.setSchemaEditing}
        filtered         = {props.filtered}        
       />

       {lmnt.data.recursions ? <ul> { 
        Object.keys(lmnt.data.recursions).map((recurssionKey) => {
         return (
          <li key = { `Flat1dCondensed-${recurssionKey}-${lmnt.data.id}` } >
           <span>{lmnt.data.recursions[recurssionKey].length} X</span>

           <D1Component
            lmnt             = {lmnt.data.recursions[recurssionKey][0]}
            onMouseEnter     = {props.onHighlight}
            highlighted      = {props.highlighted === lmnt.id}
            onClickEvent     = {props.onEventClick}
            setSchemaEditing = {props.setSchemaEditing}
            filtered         = {props.filtered}        
           />

          </li>
         )
        }) 
       } </ul> : <div> </div> }

      </li>
     )
    })}
   </ul>
  </div>
 );
}
