import moment from 'moment'

import {svgHeight, svgWidth} from './configs.js'
import {tym2Time} from './data.js'

// const yScale = tym2Time.range([0, svgWidth]);

const buffer = 5;

function Fold2dRecursiveComponent(props) {
  const node = props.root.data
  const ndx = props.ndx || 0;
  const height = props.height
  const y = ndx*height+buffer + (props.y || 0);
  const yScale = props.yScale;

  return (
    <g key={`Fold2dRecursiveComponent-1-${props.root.data.id}`}>
     <rect
      x={yScale(node.start)}
      y={y}
      height={height-buffer}
      width={yScale(node.end) - yScale(node.start)}
      fill="pink"
      fillOpacity={props.highlight ? 1 : 0.1}
      stroke={props.highlighted === props.root.data.id ? 'red' : 'black'}
      onMouseOver={(e) => props.onHighlight(props.root.data.id)}></rect>


    <g key={`Fold2dRecursiveComponent-2-${props.root.data.id}`}>{
     (props.root.children || []).map(function(child, ndx2){
      return(<Fold2dRecursiveComponent  key={`Fold2dRecursiveComponent-3-${child.data.id}`} root={child} ndx={ndx2} height={(height-buffer) / (props.root.children.length +1 )} highlighted={props.highlighted} highlight={props.highlighted === child.data.id} onHighlight={props.onHighlight} y={y + ((height-buffer) / (props.root.children.length +1 ))} yScale={props.yScale}/>)
     })}
					</g>

    </g>
  )
}

export default function Fold2dComponent(props) {
 const yScale = props.yScale.range([0, svgWidth])
	return (
		<div>
			<svg height={svgHeight} width={svgWidth}>
    <rect x="0" y="0" width={svgWidth} height={svgHeight} fill="lightgray"/>
	  <Fold2dRecursiveComponent root={props.events} height={svgHeight} highlighted={props.highlighted} onHighlight={props.onHighlight} yScale={props.yScale}/>
    <line x1={yScale(moment())} y1="0" x2={yScale(moment())} y2={svgHeight} stroke="red" strokeOpacity="0.5" strokeWidth="3" />
    <rect x="0" y="0" width={svgWidth} height={svgHeight} stroke="red" strokeWidth="2px" fill="transparent" />
			</svg>
		</div>
	);
}
