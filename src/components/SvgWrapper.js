import moment from 'moment'
import {svgWidth, svgHeight} from '../configs';

export const SvgWrapper = (props) => {
 const scale = props.scale;
 
 return (
  <svg height={svgHeight} width={svgWidth}>
   <rect x="0" y="0" width={svgWidth} height={svgHeight} fill="lightgray"/>
   
   { props.children height={height} width={width}}

   <line
     x1={scale(moment())}
     y1="0"
     x2={scale(moment())}
     y2={svgHeight}
     stroke="red" strokeOpacity="0.5" strokeWidth="3" />
    <rect
     x="0" y="0"
     width={svgWidth} height={svgHeight}
     stroke="red" strokeWidth="2" fill="transparent"/>

  </svg>
 )
}