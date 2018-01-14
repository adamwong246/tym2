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
 const rowHeight = svgHeight / (Array.from(props.events)).length;
 const xScale = props.xScale.range([0, svgWidth]);
 const events = props.events;

 return (
  <div>
   <svg height={svgHeight} width={svgWidth}>
    <rect x="0" y="0" width={svgWidth} height={svgHeight} fill="lightgray"/>
   
    <g>
    { events.map(function(lmnt, ndx){

     const start = lmnt.data.start;
     const end = lmnt.data.end;
     const id = lmnt.data.id;
     const xCoord = start ? xScale(start) : xScale(xScale.domain()[0])
     const width = end ? xScale(end) - xScale(start) : xScale(xScale.domain()[1])
     const yCoord = ndx * rowHeight

     return (
      <g key = { `Flat1dCondensed-${lmnt.data.id}` } >
       <rect
        fill="pink"
        stroke={props.highlighted === id ? 'red' : 'black'}
        x={xCoord}
        y={yCoord}
        height={rowHeight}
        width={width}
        fillOpacity={props.highlighted === id ? 1 : 0.1}       
       />

       {lmnt.data.recursions ? <g> { 
        Object.keys(lmnt.data.recursions).map((recurssionKey, ndx2) => {
         
         const rowHeightRecursion = rowHeight / (Object.keys(lmnt.data.recursions).length + 1)

         return (
          <g key = { `Flat1dCondensed-${recurssionKey}-${lmnt.data.id}` } >
           <text>{recurssionKey}</text>

           {lmnt.data.recursions[recurssionKey].map((e, ndx3) => {
            const startRecursion = e.start;
            const endRecursion = e.end;
            const idRecursion = e.id;
            const xCoordRecursion = (startRecursion ? xScale(startRecursion) : xScale(xScale.domain()[0])) 
            const widthRecursion = endRecursion ? xScale(endRecursion) - xScale(startRecursion) : xScale(xScale.domain()[1])
            const yCoordRecursion = yCoord + (rowHeightRecursion * (ndx2 + 1))
            
            return (
             <rect
              key = { `Flat1dCondensed-${recurssionKey}-${lmnt.data.id}-${e.id}` }
              x={xCoordRecursion}
              y={yCoordRecursion }
              height={rowHeightRecursion}
              width={widthRecursion}
              fill="blue"
              stroke="green"
             >
              <text> {e.id} </text>
             </rect>
            )
           })}

          </g>
         )
        }) 
       } </g> : <g> </g> }

      </g>
     )
    })}
   </g>

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
