import moment from 'moment'

import {tym2Time, stratifiedDB, svgDimension} from './data.js'

const svgHeight = svgDimension;
const svgWidth = svgDimension;
const yScale = tym2Time.range([0, svgWidth]);

function Fold2dRecursiveComponent(props) {
  const node = props.root.data
  const ndx = props.ndx || 0;
  const height = props.height

  return (
    <g>
     <rect x={yScale(node.start)} y={ndx*height} height={height} width={yScale(node.end) - yScale(node.start)} fill="pink" fillOpacity={props.highlight ? 1 : 0.1} stroke="black" onMouseOver={(e) => props.onHighlight(props.root.data.id)}></rect>
    <g>{
     (props.root.children || []).map(function(lmnt, ndx2){
      return(<Fold2dRecursiveComponent root={lmnt} ndx={ndx2} height={height / props.root.children.length} highlighted={props.highlighted} highlight={props.highlighted === lmnt.data.id} onHighlight={props.onHighlight} />)
     })}
					</g>

    </g>
  )
}

export default function Fold2dComponent(props) {
	return (
		<div>
			<svg height={svgHeight} width={svgWidth}>
    <rect x="0" y="0" width={svgWidth} height={svgHeight} fill="lightgray"/>
			 <Fold2dRecursiveComponent root={stratifiedDB} height={svgHeight} highlighted={props.highlighted} onHighlight={props.onHighlight}/>
    <line x1={yScale(moment())} y1="0" x2={yScale(moment())} y2={svgHeight} stroke="red"/>
    <rect x="0" y="0" width={svgWidth} height={svgHeight} stroke="red" strokeWidth="2px" fill="transparent"/>
			</svg>
		</div>
	);
}
