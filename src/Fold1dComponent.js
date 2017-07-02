import D1Component from './D1Component';

import {stratifiedDB} from './data.js'

function Fold1dRecursiveComponent(root) {
  return (
    <div>
      <D1Component lmnt={root.data.data} />
      <ul>{
       (root.data.children || []).map(function(lmnt, ndx){
        return(<li><Fold1dRecursiveComponent data={lmnt} /></li>)
       })}</ul>
     </div>
  )
}

export default function Fold1dComponent() {
	return (
		<div>
		 <Fold1dRecursiveComponent data={stratifiedDB} />
			</div>
	);
}
