import {svgWidth, svgHeight} from '../configs';
import {SvgWrapper, SvgJournals} from './SvgWrapper.js'
import moment from 'moment'

const FlatSvgJournals = (props) => {
 return (
  <SvgJournals
   journals = { props.journals || [] }
   r        = { props.rowHeight / 6 }
   scale    = { props.scale }
   y        = { ( props.ndx * props.rowHeight ) + ( props.rowHeight / 2 ) }
  />
 )
}

export const Flat2dExpanded = (props) => {
 const rowHeight = svgHeight / props.events.length;
 const xScale = props.xScale.range([0, svgWidth])

 return (
  <SvgWrapper height={svgHeight} width={svgWidth} scale={xScale}>
   {
    props.events.map( (event, ndx) => {
     const start = event.data.start;
     const end   = event.data.end;
     const id    = event.data.id;

     return (
      <g key={ `Flat2dComponent-g-${event.data.id}` }>
       <rect
        fill        = "pink"
        fillOpacity = { props.highlighted === id ? 1 : 0.1 }
        height      = { rowHeight }
        onMouseOver = { (e) => props.onHighlight(id) }
        stroke      = { props.highlighted === id ? 'red' : 'black' }
        width       = { end ? xScale(end) - xScale(start) : xScale(xScale.domain()[1]) }
        x           = { start ? xScale(start) : xScale(xScale.domain()[0]) }
        y           = { ndx * rowHeight }
       > </rect>

       <FlatSvgJournals
        journals  = { event.data.journals }
        ndx       = { ndx }
        rowHeight = { rowHeight }
        scale     = { xScale }
       />
        
       </g>)})}</SvgWrapper>);}

export const Flat2dCondensed = (props) => {
 const rowHeight = svgHeight / (Array.from(props.events)).length;
 const xScale = props.xScale.range([0, svgWidth]);
 const events = props.events;

 return (
  <SvgWrapper height={svgHeight} width={svgWidth} scale={xScale}>
  
   { events.map( (event, ndx) => {
    const data = event.data
    const start = data.start;
    const end = data.end;
    const id = data.id;
    const recursions = data.recursions;
    const yCoord = ndx * rowHeight

    return (
     <g key = { `Flat1dCondensed-${id}` } >
      <rect
       fill        = "pink"
       fillOpacity = { props.highlighted === id ? 1 : 0.1 }
       height      = { rowHeight }
       stroke      = { props.highlighted === id ? 'red' : 'black' }
       width       = { end ? xScale(end) - xScale(start) : xScale(xScale.domain()[1]) }
       x           = { start ? xScale(start) : xScale(xScale.domain()[0]) }
       y           = { yCoord }
      />

      <FlatSvgJournals
        journals  = { event.data.journals }
        ndx       = { ndx }
        rowHeight = { rowHeight }
        scale     = { xScale }
       />

      {recursions ? <g> { 
       Object.keys(recursions).map((recurssionKey, ndx2) => {
        
        const rowHeightRecursion = rowHeight / (Object.keys(recursions).length + 1)

        return (
         <g key={`Flat1dCondensed-${recurssionKey}-${id}`} >
          <text>{recurssionKey}</text>

          {recursions[recurssionKey].map((e, ndx3) => {
           const startRecursion = e.start;
           const endRecursion = e.end;
           
           return (
            <rect key={ `Flat1dCondensed-${recurssionKey}-${id}-${e.id}` }
             fill   = "blue"
             height = { rowHeightRecursion }
             stroke = "blue"
             width  = { endRecursion ? xScale(endRecursion) - xScale(startRecursion) : xScale(xScale.domain()[1]) }
             x      = { (startRecursion ? xScale(startRecursion) : xScale(xScale.domain()[0])) }
             y      = { yCoord + (rowHeightRecursion * (ndx2 + 1)) }
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
  
  </SvgWrapper>
  
 );
}
