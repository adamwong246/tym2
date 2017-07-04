import Flat1dComponent from './Flat1dComponent';
import Flat2dComponent from './Flat2dComponent';

export default function Flat(props) {
 const events = props.eventsTree.descendants().sort(props.sorter)
	return (
		<div>
   <table>
    <tbody>
     <tr>
     <td>
      <Flat1dComponent events={events} highlighted={props.highlighted} onHighlight={props.onHighlight} onEventClick={props.onEventClick} />
     </td>
     <td>
      <Flat2dComponent events={events} highlighted={props.highlighted} onHighlight={props.onHighlight} yScale={props.yScale} />
     </td>
     </tr>
    </tbody>
   </table>
		</div>
	);
}
