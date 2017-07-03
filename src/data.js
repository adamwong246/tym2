import moment from 'moment'
import {scaleOrdinal, scaleTime} from 'd3-scale';
import {stratify} from 'd3-hierarchy';

export const DB = [
 {id: 0, name: 'saving the day', start: moment().subtract(1, 'hours'), end:moment().add(10, 'hour')},
 {id: 1, name: 'reticulating the splines', start: moment(), end:moment().add(3, 'hour'), parentId:0},
 {id: 2, name: 'squaring the chroma', start: moment(), end:moment().add(1, 'hour'), parentId:0},
 {id: 3, name: 'inverting the manifolds', start: moment().add(3, 'hours'), end:moment().add(8, 'hour'), parentId:0},
 {id: 4, name: 'ingesting the topologies', start: moment().add(1, 'hours'), end:moment().add(6, 'hour'), parentId:0},
 {id: 5, name: 'parsing the monads', start: moment().add(0.5, 'hours'), end:moment().add(3, 'hour'), parentId:1},
 {id: 6, name: 'inducing the phylums', start: moment().add(0.5, 'hours'), end:moment().add(2, 'hour'), parentId:1},
 {id: 7, name: 'crystalizing the qubits', start: moment().add(0.75, 'hours'), end:moment().add(1, 'hour'), parentId:5},
 {id: 8, name: 'reversing the plasma coils', start: moment().add(0.75, 'hours'), end:moment().add(2.2, 'hour'), parentId:5}
]

export const tym2Ordinal = scaleOrdinal()
.domain(DB.map(function(lmnt){return lmnt.id}))
.range(DB.map(function(lmnt){return lmnt.id}))

export const tym2OrdinalSorter = (a,b) => {return a.id - b.id}
export const tym2OrdinalSorterName = (a,b) => {return a.name.localeCompare(b.name)}
export const tym2OrdinalSorterStart = (a,b) => {return a.start > b.start}

export const tym2Time = scaleTime()
.domain([moment().subtract(2, 'hour'), moment().add(11, 'hour')])

export const stratifiedDB = stratify()(DB)
