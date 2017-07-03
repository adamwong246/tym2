import Flat1dComponent from './Flat1dComponent';
import Flat2dComponent from './Flat2dComponent';

import {DB} from './data.js'

export default function Flat(props) {
 const events = DB.sort(props.sorter)
	return (
		<div>
   <table>
    <tbody>
     <tr>
     <td>
      <Flat1dComponent events={events}/>
     </td>
     <td>
      <Flat2dComponent events={events}/>
     </td>
     </tr>
    </tbody>
   </table>
		</div>
	);
}
