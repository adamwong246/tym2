import moment from 'moment'

import {tym2Time} from './data.js'

export default function Flat2dComponent(props) {
	const svgHeight = 400;
	const svgWidth = 400;
	const rowHeight = svgHeight / props.events.length;

 const yScale = tym2Time.range([0, svgWidth])

	return (
		<div>
			<svg height={svgHeight} width={svgWidth}>
    <rect x="0" y="0" width={svgWidth} height={svgHeight} stroke="red" strokeWidth="2px" fill="lightgray"/>
			 {
					props.events.map(function(lmnt, ndx){
						return (
							<g>
							  <rect x={yScale(lmnt.start)} y={ndx*rowHeight} height={rowHeight} width={yScale(lmnt.end) - yScale(lmnt.start)} fillOpacity="0.1" fill="pink" stroke="black"></rect>
							</g>
						)
					})
				}
    <line x1={yScale(moment())} y1="0" x2={yScale(moment())} y2={svgHeight} stroke="red"/>
			</svg>
		</div>
	);
}
