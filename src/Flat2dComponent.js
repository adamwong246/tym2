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
					props.events.map(function(event, ndx){
      const start = event.data.start;
      const end = event.data.end;
						const id = event.data.id;

						return (
							<g key={`Flat2dComponent-g-${event.data.id}`}>
							  <rect x={yScale(start)} y={ndx*rowHeight+buffer} height={rowHeight-buffer} width={yScale(end) - yScale(start)} fillOpacity={props.highlighted === id ? 1 : 0.1} fill="pink" stroke="black" onMouseOver={(e) => props.onHighlight(id)} ></rect>

									{(event.data.journals || []).map((journal) => {
										return <circle key={`Flat2dComponent-circle-${journal.id}`} cx={yScale(journal.time)} cy={(ndx*rowHeight)+(rowHeight/2)} r={3} fill="blue"/>
									})}
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
