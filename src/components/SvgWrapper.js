import moment from 'moment'

export const SvgWrapper = (props) => {
 const scale = props.scale;
 const height = props.height;
 const width = props.width;

 return (
  <svg height={height} width={width}>
   <rect x="0" y="0" width={width} height={height} fill="lightgray"/>

   { props.children }

   <line
     x1={scale(moment())}
     y1="0"
     x2={scale(moment())}
     y2={height}
     stroke="white"
     strokeDasharray="5, 5"
     strokeOpacity="0.5" strokeWidth="3" />

    <rect
     x="0" y="0"
     width={width} height={height}
     stroke="red" strokeWidth="2" fill="transparent"/>

  </svg>
 )
}

export const SvgJournals = (props) => {
 const journals = props.journals
 const scale = props.scale

 return (
  journals.map((journal) => {
   return <circle key={`Flat2dComponent-circle-${journal.id}`}
    cx     = { scale(journal.time) }
    cy     = { props.y }
    fill   = "transparent"
    r      = { props.r }
    stroke = "green"
   />})
 )
}
