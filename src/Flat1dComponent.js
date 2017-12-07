import D1Component from './D1Component';
import JournalEditor from './JournalEditor';

export default function Flat1dComponent(props) {
 const topEvent = props.events[0];

	return (
		<div>

			<JournalEditor event={topEvent}/>

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
