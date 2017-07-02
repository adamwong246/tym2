import D1Component from './D1Component';
import {DB, tym2Ordinal, tym2OrdinalSorter} from './data.js'

export default function Flat1dComponent() {

 const mapped = DB.sort(tym2OrdinalSorter)

	return (
		<div>
			<ul>
				{ (mapped.map(function(lmnt, ndx){
							return (
								<li key="Flat2dComponent-{lmnt.id}">
								 <D1Component lmnt={lmnt} />
								</li>
							)
						}))
				}
			</ul>
			</div>
	);
}
