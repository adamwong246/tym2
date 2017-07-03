import D1Component from './D1Component';

import {stratifiedDB} from './data.js'

function Fold1dRecursiveComponent(props) {
  return (
    <div>
      <D1Component lmnt={props.data.data} onMouseEnter={props.onD1Hover} highlighted={props.highlighted === props.data.data.id}/>
      <ul>{
       (props.data.children || []).map(function(lmnt, ndx){
        return(<li><Fold1dRecursiveComponent data={lmnt} onD1Hover={props.onD1Hover}  highlighted={props.highlighted} /></li>)
       })}</ul>
     </div>
  )
}

export default function Fold1dComponent(props) {
	return (
		<div>
		 <Fold1dRecursiveComponent data={stratifiedDB} onD1Hover={props.onHighlight} highlighted={props.highlighted}/>
			</div>
	);
}
