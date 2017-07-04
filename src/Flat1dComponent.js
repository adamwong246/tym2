import D1Component from './D1Component';

export default function Flat1dComponent(props) {
 const topEvent = props.events[0];

	return (
		<div>
   <h3>
   <D1Component lmnt={topEvent} onMouseEnter={props.onHighlight} highlighted={props.highlighted === topEvent.id} onClickEvent={props.onEventClick}/>
   </h3>

			<h4>
			<span> {topEvent.data.start.toString()}</span>
			</h4>

			<h4>
			<span> {topEvent.data.end.toString()}</span>
			</h4>
			<ul>
				{ (props.events.slice(1).map(function(lmnt, ndx){
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
