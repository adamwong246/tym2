import Fold1dComponent from './Fold1dComponent';
import Fold2dComponent from './Fold2dComponent';

export default function Fold(props) {
 const events = props.eventsTree
	return (
		<div>
   <table>
    <tbody>
     <tr>
     <td>
      <Fold1dComponent events={events} highlighted={props.highlighted} onHighlight={props.onHighlight} onClickEvent={props.onEventClick}/>
     </td>
     <td>
      <Fold2dComponent events={events} highlighted={props.highlighted} onHighlight={props.onHighlight} yScale={props.yScale} />
     </td>
     </tr>
    </tbody>
   </table>
		</div>
	);
}
