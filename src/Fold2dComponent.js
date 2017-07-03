import moment from 'moment'

import {tym2Time, stratifiedDB} from './data.js'

const svgHeight = 400;
const svgWidth = 400;
const yScale = tym2Time.range([0, svgWidth]);

function Fold2dRecursiveComponent(props) {
  const node = props.root.data
  const ndx = props.ndx || 0;
  const height = props.height

  return (
    <g>
     <rect x={yScale(node.start)} y={ndx*height} height={height} width={yScale(node.end) - yScale(node.start)} fill="pink" fillOpacity="0.1" stroke="black"></rect>
    <g>{
     (props.root.children || []).map(function(lmnt, ndx2){
      return(<Fold2dRecursiveComponent root={lmnt} ndx={ndx2} height={height / props.root.children.length} />)
     })}
					</g>

    </g>
  )
}

export default function Fold2dComponent() {
	return (
		<div>
			<svg height={svgHeight} width={svgWidth}>
    <rect x="0" y="0" width={svgWidth} height={svgHeight} stroke="red" strokeWidth="2px" fill="lightgray"/>
			 <Fold2dRecursiveComponent root={stratifiedDB} height={svgHeight}/>
    <line x1={yScale(moment())} y1="0" x2={yScale(moment())} y2={svgHeight} stroke="red"/>
			</svg>
		</div>
	);
}
