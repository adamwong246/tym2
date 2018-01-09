import moment from 'moment'

import {svgHeight, svgWidth} from './configs.js'

const buffer = 0;

export const Flat2dExpanded = (props) => {
 const rowHeight = svgHeight / props.events.length;
 const xScale = props.xScale.range([0, svgWidth])

 return (
  <div>
   <svg height={svgHeight} width={svgWidth}>
   <rect x="0" y="0" width={svgWidth} height={svgHeight} fill="lightgray"/>
    {
     props.events.map(function(event, ndx){
      const start = event.data.start;
      const end = event.data.end;
      const id = event.data.id;

      const xCoord = start ? xScale(start) : xScale(xScale.domain()[0])
      const width = end ? xScale(end) - xScale(start) : xScale(xScale.domain()[1])

      return (
       <g key={ `Flat2dComponent-g-${event.data.id}` }>
        <rect
         fill="pink"
         stroke={props.highlighted === id ? 'red' : 'black'}
         x={xCoord}
         y={ndx*rowHeight+buffer}
         height={rowHeight-buffer}
         width={width}
         fillOpacity={props.highlighted === id ? 1 : 0.1}
         onMouseOver={(e) => props.onHighlight(id)} > </rect>


        {(event.data.journals || []).map((journal) => {
         return <circle 
          key={`Flat2dComponent-circle-${journal.id}`}
          cx={xScale(journal.time)}
          cy={(ndx*rowHeight)+(rowHeight/2)}
          r={3}
          fill="blue"
         /> })} </g> ) }) }
    <line
     x1={xScale(moment())}
     y1="0"
     x2={xScale(moment())}
     y2={svgHeight}
     stroke="red" strokeOpacity="0.5" strokeWidth="3" />
    <rect
     x="0" y="0"
     width={svgWidth} height={svgHeight}
     stroke="red" strokeWidth="2" fill="transparent"/>
   </svg>
  </div>
 );
}

export const Flat2dCondensed = (props) => {
 const rowHeight = svgHeight / (Array.from(props.groupedEvents)).length;
 const xScale = props.xScale.range([0, svgWidth]);
 const groupedEvents = props.groupedEvents;

 return (
  <div>
   <svg height={svgHeight} width={svgWidth}>
    <rect x="0" y="0" width={svgWidth} height={svgHeight} fill="lightgray"/>
   
    { (Array.from(groupedEvents)).map(function(groupedEvent, ndx){
     return groupedEvent[1].map(function(event, ndx2){
      const start = event.data.start;
      const end = event.data.end;
      const id = event.data.id;
      const xCoord = start ? xScale(start) : xScale(xScale.domain()[0])
      const width = end ? xScale(end) - xScale(start) : xScale(xScale.domain()[1])

      return (
       <g key={ `Flat2dCondensed-g-${event.data.id}` }>
        <rect
         fill        = "pink"
         x           = { xCoord}
         height      = { rowHeight }
         width       = { width }
         y           = { ndx*rowHeight }
         stroke      = { props.highlighted === id ? 'red' : 'black' }
         fillOpacity = { props.highlighted === id ? 1 : 0.1}
         onMouseOver = { (e) => props.onHighlight(id)} > </rect>
       </g>
      )
     })
    }) }

    <line
     x1={xScale(moment())}
     y1="0"
     x2={xScale(moment())}
     y2={svgHeight}
     stroke="red" strokeOpacity="0.5" strokeWidth="3" />
    <rect
     x="0" y="0"
     width={svgWidth} height={svgHeight}
     stroke="red" strokeWidth="2" fill="transparent"/>
   </svg>
  </div>
 );
}
