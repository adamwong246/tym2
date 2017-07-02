import {DB, tym2Time, tym2OrdinalSorter} from './data.js'

export default function Flat2dComponent() {
 const mapped = DB.sort(tym2OrdinalSorter)
	const svgHeight = 400;
	const svgWidth = 400;
	const rowHeight = svgHeight / mapped.length;

 const yScale = tym2Time.range([0, svgWidth])

	return (
		<div>
			<svg height={svgHeight} width={svgWidth}>
			 {
					mapped.map(function(lmnt, ndx){
						return (
							<g>
							  <rect x={yScale(lmnt.start)} y={ndx*rowHeight} height={rowHeight} width={yScale(lmnt.end) - yScale(lmnt.start)} fill="pink" stroke="black"></rect>
							</g>
						)
					})
				}
			</svg>
		</div>
	);
}
