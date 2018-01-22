import moment from 'moment'
import {svgWidth, svgHeight} from '../configs';
import {tym2Time} from '../data.js'

const buffer = 0;

function Fold2dExpandedRecursive(props) {
  const node = props.root.data
  const ndx = props.ndx || 0;
  const height = props.height
  const y = ndx*height+buffer + (props.y || 0);
  
  const xScale = props.xScale.range([0, svgWidth])
  const start = node.start;
  const end = node.end;

  const xCoord = start ? xScale(start) : xScale(xScale.domain()[0])
  const width = end ? xScale(end) - xScale(start) : xScale(xScale.domain()[1])

  return (
    <g key={`Fold2dExpandedRecursive-1-${props.root.data.id}`}>
     <rect
      x={xCoord}
      width={width}
      y={y}
      height={height-buffer}
      fill="pink"
      fillOpacity={props.highlight ? 1 : 0.1}
      stroke={props.highlighted === props.root.data.id ? 'red' : 'black'}
      onMouseOver={(e) => props.onHighlight(props.root.data.id)}></rect>


    <g key={`Fold2dExpandedRecursive-2-${props.root.data.id}`}>{
     (props.root.children || []).map(function(child, ndx2){
      return(
       <Fold2dExpandedRecursive
        key={`Fold2dExpandedRecursive-3-${child.data.id}`}
        root={child}
        ndx={ndx2}
        height={(height-buffer) / (props.root.children.length +1 )}
        highlighted={props.highlighted} highlight={props.highlighted === child.data.id}
        onHighlight={props.onHighlight}
        y={y + ((height-buffer) / (props.root.children.length +1 ))}
        xScale={props.xScale}/>)
     })}
					</g>

    </g>
  )
}

export const Fold2dExpanded = (props) => {
 const xScale = props.xScale.range([0, svgWidth])

	return (
		<div>
			<svg height={svgHeight} width={svgWidth}>
    
    <rect x="0" y="0" width={svgWidth} height={svgHeight} fill="lightgray"/>
	   
    <Fold2dExpandedRecursive
     root={props.events}
     height={svgHeight}
     highlighted={props.highlighted}
     onHighlight={props.onHighlight}
     xScale={props.xScale}/>

    <line
     y1="0" stroke="red" strokeOpacity="0.5" strokeWidth="3"
     x1={xScale(moment())} x2={xScale(moment())} y2={svgHeight} />
    
    <rect
     x="0" y="0" stroke="red" strokeWidth="2px" fill="transparent"
     width={svgWidth} height={svgHeight} />
			</svg>
		</div>
	);
}

function Fold2dCondensedRecursive(props) {
 const node = props.root.data
 const ndx = props.ndx || 0;
 const height = props.height
 const y = ndx * height + (props.y || 0); 
 const xScale = props.xScale.range([0, svgWidth])
 const start = node.start;
 const end = node.end;
 const x = start ? xScale(start) : xScale(xScale.domain()[0])
 const width = end ? xScale(end) - xScale(start) : xScale(xScale.domain()[1])
 const id = props.root.data.id
 const children = props.root.children || []
 const recursions = node.recursions || {}
 const numberOfTypesOfRecusions = Object.keys(recursions).length
 const numberOfRows = numberOfTypesOfRecusions + children.length + 1
 const rowHeight = height / numberOfRows
 const childY = y + rowHeight

 return (
  <g key={`Fold2dRecursiveComponent-1-${id}`}>
   <rect
    x={x} width={width} y={y} height={height}
    fill="pink"
    fillOpacity={props.highlight ? 1 : 0.1}
    stroke={props.highlighted === id ? 'red' : 'black'}
    onMouseOver={(e) => props.onHighlight(id)}></rect>

   <g key={`Fold2dCondensedRecursive-2-${id}`}>
    {
     children.map(function(child, childNdx){
      const childDataId = child.data.id;
      
      return (
       <g key={`Fold2dCondensedRecursive-3-${childDataId}`} >
        
        <Fold2dCondensedRecursive
         key={`Fold2dCondensedRecursive-4-${childDataId}`}
         root={child}
         ndx={childNdx}
         y={childY}
         height={rowHeight}
         highlighted={props.highlighted}
         highlight={props.highlighted === childDataId}
         onHighlight={props.onHighlight}
         xScale={props.xScale}/>

        </g>
      )
     })
    }

    { 
     Object.keys(recursions).map((recurssionKey, recurssionKeyNdx) => {
      const recursionY = rowHeight * (children.length + recurssionKeyNdx+1) + y
      
      return (
       <g key = { `Fold2dCondensedRecursive-5-${recurssionKey}` } >
        <text>{recurssionKey}</text>
        {recursions[recurssionKey].map((e, recursionNdx) => {
         const startRecursion = e.start;
         const endRecursion = e.end;
         const xCoordRecursion = (startRecursion ? xScale(startRecursion) : xScale(xScale.domain()[0])) 
         const widthRecursion = endRecursion ? xScale(endRecursion) - xScale(startRecursion) : xScale(xScale.domain()[1])
       
         return (
          <rect
           key = { `Fold2dCondensedRecursive-6-${recurssionKey}-${e.id}` }
           x={xCoordRecursion} width={widthRecursion} y={recursionY} height={rowHeight}
           fill="blue" stroke="blue"
          >
           <text> {e.id} </text>
          </rect>
         )
        })}
       </g>
      )
     }) 
    }

   </g>
  </g>
  )
}

export const Fold2dCondensed = (props) => {
 const xScale = props.xScale.range([0, svgWidth])

 return (
  <div>
   <svg height={svgHeight} width={svgWidth}>
    
    <rect x="0" y="0" width={svgWidth} height={svgHeight} fill="lightgray"/>
    
    <Fold2dCondensedRecursive
     root={props.events}
     height={svgHeight}
     highlighted={props.highlighted}
     onHighlight={props.onHighlight}
     xScale={props.xScale}/>

    <line
     y1="0" stroke="red" strokeOpacity="0.5" strokeWidth="3"
     x1={xScale(moment())} x2={xScale(moment())} y2={svgHeight} />
    
    <rect
     x="0" y="0" stroke="red" strokeWidth="2px" fill="transparent"
     width={svgWidth} height={svgHeight} />
   </svg>
  </div>
 );
}