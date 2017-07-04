import D1Component from './D1Component';

function Fold1dRecursiveComponent(props) {
  return (
    <div>
      <D1Component lmnt={props.events} onMouseEnter={props.onD1Hover} highlighted={props.highlighted === props.events.data.id} onClickEvent={props.onClickEvent}/>
      <ul>{
       (props.events.children || []).map(function(lmnt, ndx){
        return(<li><Fold1dRecursiveComponent events={lmnt} onD1Hover={props.onD1Hover}  highlighted={props.highlighted} onClickEvent={props.onClickEvent}/></li>)
       })}</ul>
     </div>
  )
}

export default function Fold1dComponent(props) {
	return (
		<div>
		 <Fold1dRecursiveComponent events={props.events} onD1Hover={props.onHighlight} highlighted={props.highlighted} onClickEvent={props.onClickEvent}/>
			</div>
	);
}
