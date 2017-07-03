import Fold1dComponent from './Fold1dComponent';
import Fold2dComponent from './Fold2dComponent';

import {DB} from './data.js'

export default function Fold(props) {
 const events = DB.sort(props.sorter)
	return (
		<div>
   <table>
    <tbody>
     <tr>
     <td>
      <Fold1dComponent events={events}/>
     </td>
     <td>
      <Fold2dComponent events={events}/>
     </td>
     </tr>
    </tbody>
   </table>



		</div>
	);
}
