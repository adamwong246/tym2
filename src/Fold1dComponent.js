import D1Component from './D1Component';

import {stratifiedDB} from './data.js'

function Fold1dRecursiveComponent(props) {
  return (
    <div>
      <D1Component lmnt={props.events.data} onMouseEnter={props.onD1Hover} highlighted={props.highlighted === props.events.data.id}/>
      <ul>{
       (props.events.children || []).map(function(lmnt, ndx){
        return(<li><Fold1dRecursiveComponent events={lmnt} onD1Hover={props.onD1Hover}  highlighted={props.highlighted} /></li>)
       })}</ul>
     </div>
  )
}

export default function Fold1dComponent(props) {
	return (
		<div>
		 <Fold1dRecursiveComponent events={stratifiedDB} onD1Hover={props.onHighlight} highlighted={props.highlighted}/>
			</div>
	);
}
