import moment from 'moment'
import {scaleOrdinal} from 'd3-scale';
import {stratify} from 'd3-hierarchy';

export const DbEvents = [
 {id: 0, name: 'saving the day', start: moment().subtract(3, 'hours'), end:moment().add(10, 'hour')},
 {id: 1, name: 'reticulating the splines', start: moment(), end:moment().add(3, 'hour'), parentId:0},
 {id: 2, name: 'squaring the chroma', start: moment().subtract(1, 'hour'), end:moment().add(1, 'hour'), parentId:0},
 {id: 3, name: 'inverting the manifolds', start: moment().add(3, 'hours'), end:moment().add(8, 'hour'), parentId:0},
 {id: 4, name: 'ingesting the topologies', start: moment().add(1, 'hours'), end:moment().add(6, 'hour'), parentId:0},
 {id: 5, name: 'parsing the monads', start: moment().add(0.5, 'hours'), end:moment().add(3, 'hour'), parentId:1},
 {id: 6, name: 'inducing the phylums', start: moment().add(0.5, 'hours'), end:moment().add(2, 'hour'), parentId:1},
 {id: 7, name: 'crystalizing the qubits', start: moment().add(0.75, 'hours'), end:moment().add(1, 'hour'), parentId:5},
 {id: 8, name: 'reversing the plasma coils', start: moment().add(0.75, 'hours'), end:moment().add(2.2, 'hour'), parentId:5},
 {id: 9, name: 'accelerating the dendrites', start: moment().subtract(2, 'hours'), end:moment().subtract(1, 'hour'), parentId:0},
 {id: 10, name: 'lasing the alloys', start: moment().subtract(2.5, 'hours'), end:moment().subtract(2, 'hour'), parentId:0},
 {id: 11, name: 'synchrnozing tachyons', start: moment().add(3.1, 'hours'), end:moment().add(4, 'hour'), parentId:3},
 {id: 12, name: 'compensating for heisenburg uncertainty', start: moment().add(4, 'hours'), end:moment().add(5, 'hour'), parentId:3},
 {id: 13, name: 'deriving the nebula', start: moment().add(5, 'hours'), end:moment().add(6, 'hour'), parentId:3, formSchema: {
   title: "an auspicious opening",
   type: "object",
   properties: {
     someBoolean: {type: "boolean", title: "a box for checks?"},
     someString: {type: "string", title: "series of characters"},
     someNumber: {type: "number", title: "integers and maybe more!"}
   }},
   journals: [
     {id: 0, blob: {
      someBoolean: true,
      someNumber: 9,
      someString: 'foobar'
    }, time: moment()},
    {id: 1, blob: {
     someBoolean: true,
     someNumber: 8,
     someString: 'foobarz'
   }, time: moment().subtract(0.5, 'hours')}
]
 }
]

export const DbJournals = [

]

export const tym2Ordinal = scaleOrdinal()
.domain(DbEvents.map(function(lmnt){return lmnt.id}))
.range(DbEvents.map(function(lmnt){return lmnt.id}))

export const tym2OrdinalSorter = (a,b) => {return a.data.id - b.data.id}
export const tym2OrdinalSorterName = (a,b) => {return a.data.name.localeCompare(b.data.name)}
export const tym2OrdinalSorterStart = (a,b) => {return a.data.start > b.data.start}
export const tym2OrdinalSorterPriority = (aEvent, bEvent) => {
  let a = aEvent.data;
  let b = bEvent.data;

  const now = moment()

  const aIsCurrent = (a.start < now && now < a.end) ? 1 : 0
  const bIsCurrent = (b.start < now && now < b.end) ? 1 : 0

  if (aIsCurrent && !bIsCurrent){
    return -1
  }else if (bIsCurrent && !aIsCurrent){
    return 1
  }else if(aIsCurrent && bIsCurrent){
    return a.end - b.end
  }else{
    const aIsAhead = (a.start > now) ? 1 : 0
    const bIsAhead = (b.start > now) ? 1 : 0

    if(aIsAhead !== bIsAhead){
      return bIsAhead - aIsAhead
    } else {
      const aNearestToNow = Math.min(Math.abs(a.start - now), Math.abs(a.end - now))
      const bNearestToNow = Math.min(Math.abs(b.start - now), Math.abs(b.end - now))

      return aNearestToNow - bNearestToNow
    }
  }
}

export const stratifiedDbEvents = stratify()(DbEvents)

const subtree= (tree, id) => {
    var toReturn;
    tree.each( (lmnt, ndx) => {
      if(lmnt.data.id === id){
        toReturn = lmnt.copy()
      }
    })
    return toReturn
}

export const getEvents = (filter) => {
  var eventsTree = stratifiedDbEvents;
  var subTree;

  if (filter.id === null){
    subTree = eventsTree
  } else {
    subTree = subtree(eventsTree, filter.id) || eventsTree
  }

  return subTree
}

export const svgWidth = 500
export const svgHeight = 500

export const todoSchema = {
  title: "",
  type: "object",
  required: ["done"],
  properties: {
    done: {type: "boolean", title: "Done?", default: false}
  }
};
