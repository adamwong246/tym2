import moment from 'moment'

import {tym2Time, svgHeight, svgWidth} from './data.js'

const buffer = 5;

export default function Flat2dComponent(props) {
	const rowHeight = svgHeight / props.events.length;
 const yScale = props.yScale.range([0, svgWidth])

	return (
		<div>
			<svg height={svgHeight} width={svgWidth}>
    <rect x="0" y="0" width={svgWidth} height={svgHeight}fill="lightgray"/>
			 {
					props.events.map(function(lmnt, ndx){
      const start = lmnt.data.start;
      const end = lmnt.data.end;
						const id = lmnt.data.id;

						return (
							<g>
							  <rect x={yScale(start)} y={ndx*rowHeight+buffer} height={rowHeight-buffer} width={yScale(end) - yScale(start)} fillOpacity={props.highlighted === id ? 1 : 0.1} fill="pink" stroke="black" onMouseOver={(e) => props.onHighlight(id)} ></rect>
							</g>
						)
					})
				}
    <line x1={yScale(moment())} y1="0" x2={yScale(moment())} y2={svgHeight} stroke="red" strokeOpacity="0.5" strokeWidth="3"/>
    <rect x="0" y="0" width={svgWidth} height={svgHeight} stroke="red" strokeWidth="2" fill="transparent"/>
			</svg>
		</div>
	);
}
