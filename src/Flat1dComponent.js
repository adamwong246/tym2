import D1Component from './D1Component';
import JournalEditor from './JournalEditor';
import {svgWidth, svgHeight} from './configs';

export default function Flat1dComponent(props){
 return(
  <div style={
   {width: `${svgWidth}px`, height: `${svgHeight}px`, overflow: 'auto'}
  } >
   <ul>
    { (props.events.map(function(lmnt, ndx){
     return (
      <li
       key={`Flat1dComponent-${lmnt.data.id}`}
      >
       <D1Component
        lmnt            ={lmnt}
        onMouseEnter    ={props.onHighlight}
        highlighted     ={props.highlighted === lmnt.id}
        onClickEvent    ={props.onEventClick}
        setSchemaEditing={props.setSchemaEditing}
        filtered        ={props.filtered}        
       />
      </li>
     )
    }))}
   </ul>
  </div>
 );
}
