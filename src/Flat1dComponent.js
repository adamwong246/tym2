import D1Component from './D1Component';

export default function Flat1dComponent(props) {

	return (
		<div>
			<ul>
				{ (props.events.map(function(lmnt, ndx){
							return (
								<li key={`Flat1dComponent-${lmnt.id}`}>
								 <D1Component lmnt={lmnt} />
								</li>
							)
						}))
				}
			</ul>
			</div>
	);
}
