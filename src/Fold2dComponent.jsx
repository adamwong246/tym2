import moment from 'moment'

import {svgHeight, svgWidth} from './configs.js'
import {tym2Time} from './data.js'

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
  const y = ndx*height+buffer + (props.y || 0);
  
  const xScale = props.xScale.range([0, svgWidth])
  const start = node.start;
  const end = node.end;

  const xCoord = start ? xScale(start) : xScale(xScale.domain()[0])
  const width = end ? xScale(end) - xScale(start) : xScale(xScale.domain()[1])

  return (
    <g key={`Fold2dRecursiveComponent-1-${props.root.data.id}`}>
     <rect
      x={xCoord}
      width={width}
      y={y}
      height={height-buffer}
      fill="pink"
      fillOpacity={props.highlight ? 1 : 0.1}
      stroke={props.highlighted === props.root.data.id ? 'red' : 'black'}
      onMouseOver={(e) => props.onHighlight(props.root.data.id)}></rect>


    <g key={`Fold2dCondensedRecursive-2-${props.root.data.id}`}>{
     (props.root.children || []).map(function(child, ndx2){
      return(
       <Fold2dCondensedRecursive
        key={`Fold2dCondensedRecursive-3-${child.data.id}`}
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