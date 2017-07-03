import {DB, tym2Time, tym2OrdinalSorter, stratifiedDB} from './data.js'

const svgHeight = 400;
const svgWidth = 400;
const yScale = tym2Time.range([0, svgWidth]);
const rowHeight = svgHeight / DB.length

function Fold2dRecursiveComponent(props) {
  const node = props.root.data
  const ndx = props.ndx || 0;

  return (
    <g>
     <rect x={yScale(node.start)} y={ndx*rowHeight} height={rowHeight} width={yScale(node.end) - yScale(node.start)} fill="pink" fillOpacity="0.1" stroke="black"></rect>
    <g>{
     (props.root.children || []).map(function(lmnt, ndx2){
      return(<Fold2dRecursiveComponent root={lmnt} ndx={ndx2} />)
     })}
					</g>

    </g>
  )
}

export default function Fold2dComponent2() {
	return (
		<div>
			<svg height={svgHeight} width={svgWidth}>
   
			 <Fold2dRecursiveComponent root={stratifiedDB}/>
			</svg>
		</div>
	);
}
