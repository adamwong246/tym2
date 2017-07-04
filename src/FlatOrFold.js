import D1Component from './D1Component';
import D2Component from './D2Component';

import {DB} from './data.js'

export default function FlatOrFold(props) {
 const events = DB.sort(props.sorter)
	return (
		<div>
   <table>
    <tbody>
     <tr>
     <td>
      <D1Component events={events} highlighted={props.highlighted} onHighlight={props.onHighlight} onEventClick={props.onEventClick} flatMode={props.flatMode} />
     </td>
     <td>
      <D2Component events={events} highlighted={props.highlighted} onHighlight={props.onHighlight} onEventClick={props.onEventClick} flatMode={props.flatMode} />
     </td>
     </tr>
    </tbody>
   </table>
		</div>
	);
}
