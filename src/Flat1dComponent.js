import D1Component from './D1Component';

export default function Flat1dComponent(props) {
	return (
		<div>
			<ul>
				{ (props.events.map(function(lmnt, ndx){
							return (
								<li key={`Flat1dComponent-${lmnt.data.id}`}>
								 <D1Component lmnt={lmnt} onMouseEnter={props.onHighlight} highlighted={props.highlighted === lmnt.id} onClickEvent={props.onEventClick}/>
								</li>
							)
						}))
				}
			</ul>
			</div>
	);
}
