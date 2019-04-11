import { svgWidth, svgHeight } from '../configs';
import D1Component from './D1Component';
import JournalEditor from './JournalEditor';

export const Flat1dExpanded = (props) => {
 return(
  // <div style={{width: `${svgWidth}px`, height: `${svgHeight}px`, overflow: 'auto'}} >
  <div>
   <ul>
    { (props.events.map(function(lmnt, ndx){
     return (
      <li key = { `Flat1dComponent-${lmnt.data.id}` } >
       <D1Component
        filtered         = { props.filtered }
        highlighted      = { props.highlighted === lmnt.id }
        lmnt             = { lmnt.data }
        onClickEvent     = { props.onEventClick }
        onMouseEnter     = { props.onHighlight }
        setSchemaEditing = { props.setSchemaEditing }
        submitJournal    = { props.submitJournal }
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
  // <div style={{width: `${svgWidth}px`, height: `${svgHeight}px`, overflow: 'auto'}} >
  <div>
   <ul>
    { events.map(function(lmnt, ndx){
     return (
      <li key = { `Flat1dCondensed-${lmnt.data.id}` } >
       <D1Component
        filtered         = { props.filtered }
        highlighted      = { props.highlighted === lmnt.id }
        lmnt             = { lmnt.data }
        onClickEvent     = { props.onEventClick }
        onMouseEnter     = { props.onHighlight }
        setSchemaEditing = { props.setSchemaEditing }
        submitJournal    = { props.submitJournal }
       />

       {lmnt.data.recursions ? <ul> {
        Object.keys(lmnt.data.recursions).map((recurssionKey) => {
         return (
          <li key = { `Flat1dCondensed-${recurssionKey}-${lmnt.data.id}` } >
           <span>{lmnt.data.recursions[recurssionKey].length} X</span>

           <D1Component
            filtered         = { props.filtered }
            highlighted      = { props.highlighted === lmnt.id }
            lmnt             = { lmnt.data.recursions[recurssionKey][0] }
            onClickEvent     = { props.onEventClick }
            onMouseEnter     = { props.onHighlight }
            setSchemaEditing = { props.setSchemaEditing }
            submitJournal    = { props.submitJournal }
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
