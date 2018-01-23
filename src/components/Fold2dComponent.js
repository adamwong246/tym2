import {svgWidth, svgHeight} from '../configs';
import {SvgWrapper, SvgJournals} from './SvgWrapper.js'
import {tym2Time} from '../data.js'
import moment from 'moment'

const FoldSvgJournals = (props) => {
 return (
  <SvgJournals
   scale    = { props.scale }
   y        = { props.y + (props.height / (props.slots * 2)) }
   r        = { (props.height / (props.slots * 2))/2 }
   journals = { props.journals || []}
  />
 )
}

function Fold2dExpandedRecursive(props) {
  const node = props.root.data
  const ndx = props.ndx || 0;
  const height = props.height
  const y = ndx * height + (props.y || 0);
  const xScale = props.xScale.range([0, svgWidth])
  const start = node.start;
  const end = node.end;
  const xCoord = start ? xScale(start) : xScale(xScale.domain()[0])
  const width = end ? xScale(end) - xScale(start) : xScale(xScale.domain()[1])
  const children = props.root.children || []
  const slots = children.length + 1
  const id = node.id;

  return (
    <g key={`Fold2dExpandedRecursive-1-${id}`}>
     <rect
      fill        = "pink"
      fillOpacity = { props.highlight ? 1 : 0.1 }
      height      = { height }
      onMouseOver = { (e) => props.onHighlight(id) }
      stroke      = { props.highlighted === id ? 'red' : 'black' }
      width       = { width }
      x           = { xCoord }
      y           = { y }
     ></rect>

<FoldSvgJournals
    scale    = { xScale }
    y        = { y }
    height   = { height }
    slots    = { slots }
    journals = { node.journals}
   />

    <g key={`Fold2dExpandedRecursive-2-${id}`}>{
     (children || []).map(function(child, ndx2){
      return(
       <Fold2dExpandedRecursive key={`Fold2dExpandedRecursive-3-${child.data.id}`}
        height      = { height / slots }
        highlight   = { props.highlighted === child.data.id }
        highlighted = { props.highlighted }
        ndx         = { ndx2 }
        onHighlight = { props.onHighlight }
        root        = { child }
        xScale      = { xScale }
        y           = { y + (height / slots) }
       />)
     })}
					</g>

    </g>
  )
}

export const Fold2dExpanded = (props) => {
	return (
  <SvgWrapper
   height = { svgHeight }
   scale  = { props.xScale.range([0, svgWidth])}
   width  = { svgWidth }
  >
   <Fold2dExpandedRecursive
    height      = { svgHeight }
    highlighted = { props.highlighted }
    onHighlight = { props.onHighlight }
    root        = { props.events }
    xScale      = { props.xScale }
   />
  </SvgWrapper>
	);
}

function Fold2dCondensedRecursive(props) {
 const node = props.root.data
 const ndx = props.ndx || 0;
 const height = props.height
 const y = ndx * height + (props.y || 0); 
 const xScale = props.xScale.range([0, svgWidth])
 const start = node.start;
 const end = node.end;
 const x = start ? xScale(start) : xScale(xScale.domain()[0])
 const width = end ? xScale(end) - xScale(start) : xScale(xScale.domain()[1])
 const id = props.root.data.id
 const children = props.root.children || []
 const recursions = node.recursions || {}
 const rowHeight = height / (Object.keys(recursions).length + children.length + 1)
 const slots = children.length + 1

 return (
  <g key={`Fold2dRecursiveComponent-1-${id}`}>
   <rect
    fill        = "pink"
    fillOpacity = { props.highlight ? 1 : 0.1 }
    height      = { height }
    onMouseOver = { (e) => props.onHighlight(id) }
    stroke      = { props.highlighted === id ? 'red' : 'black' }
    width       = { width }
    x           = { x }
    y           = { y }
   ></rect>

   <FoldSvgJournals
    scale    = { xScale }
    y        = { y }
    height   = { height }
    slots    = { slots }
    journals = { node.journals}
   />

   {
    children.map(function(child, childNdx){
     const childDataId = child.data.id;
     
     return (
      <Fold2dCondensedRecursive key={`Fold2dCondensedRecursive-4-${childDataId}`}
       height      = { rowHeight }
       highlight   = { props.highlighted === childDataId }
       highlighted = { props.highlighted }
       ndx         = { childNdx }
       onHighlight = { props.onHighlight }
       root        = { child }
       xScale      = { props.xScale }
       y           = { y + rowHeight }
      />      
     )
    })
   }

   { 
    Object.keys(recursions).map((recurssionKey, recurssionKeyNdx) => {
     
     return (
      <g key={`Fold2dCondensedRecursive-5-${recurssionKey}`}>
       
       <text>{recurssionKey}</text>

       {recursions[recurssionKey].map((e, recursionNdx) => {
        const startRecursion = e.start;
        const endRecursion = e.end;
      
        return (
         <rect key={ `Fold2dCondensedRecursive-6-${recurssionKey}-${e.id}` }
          fill   = "blue"
          height = { rowHeight }
          stroke = "blue"
          width  = { endRecursion ? xScale(endRecursion) - xScale(startRecursion) : xScale(xScale.domain()[1]) }
          x      = { (startRecursion ? xScale(startRecursion) : xScale(xScale.domain()[0]))  }
          y      = { rowHeight * (children.length + recurssionKeyNdx+1) + y }
         >
          <text> {e.id} </text>

         </rect>
        )
       })}
      </g>
     )
    }) 
   }
   
  </g>
  )
}

export const Fold2dCondensed = (props) => {
 return (
  <SvgWrapper
   height = { svgHeight }
   scale  = { props.xScale.range([0, svgWidth]) }
   width  = { svgWidth }
  >
   <Fold2dCondensedRecursive
    height      = { svgHeight }
    highlighted = { props.highlighted }
    onHighlight = { props.onHighlight }
    root        = { props.events }
    xScale      = { props.xScale }
   />
  </SvgWrapper>  
 );
}