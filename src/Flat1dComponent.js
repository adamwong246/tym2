import D1Component from './D1Component';
import {DB} from './data.js'

export default function Flat1dComponent() {
	return (
		<div>
	  <h2>Flat, 1 dimension</h2>
			<ul>
				{ (DB.map(function(lmnt, ndx){
							return (
								<li key="Flat1dComponent-{lmnt.id}">
								 <D1Component lmnt={lmnt} />
								</li>
							)
						}))
				}
			</ul>
			</div>
	);
}
