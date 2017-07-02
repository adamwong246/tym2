// const _ = require('underscore');

import moment from 'moment'
import {scaleOrdinal, scaleTime} from 'd3-scale';
import {stratify} from 'd3-hierarchy';

export const DB = [
 {id: 0, name: 'a', start: moment(), end:moment().add(10, 'hour')},
 {id: 1, name: 'a.a', start: moment(), end:moment().add(3, 'hour'), parentId:0},
 {id: 2, name: 'a.b', start: moment(), end:moment().add(1, 'hour'), parentId:0},
 {id: 3, name: 'a.c', start: moment().add(3, 'hours'), end:moment().add(8, 'hour'), parentId:0},
 {id: 4, name: 'a.d', start: moment().add(1, 'hours'), end:moment().add(6, 'hour'), parentId:0},
 {id: 5, name: 'a.b.a', start: moment().add(0.5, 'hours'), end:moment().add(3, 'hour'), parentId:1},
 {id: 6, name: 'a.b.b', start: moment().add(0.5, 'hours'), end:moment().add(2, 'hour'), parentId:1},
 {id: 7, name: 'a.b.a.a', start: moment().add(0.75, 'hours'), end:moment().add(1, 'hour'), parentId:5},
 {id: 8, name: 'a.b.a.b', start: moment().add(0.75, 'hours'), end:moment().add(2.2, 'hour'), parentId:5}
]

export const tym2Ordinal = scaleOrdinal()
.domain(DB.map(function(lmnt){return lmnt.id}))
.range(DB.map(function(lmnt){return lmnt.id}))

export const tym2OrdinalSorter = function(a,b){
    return a.name.localeCompare(b.name);
}

export const tym2Time = scaleTime()
.domain([moment().subtract(1, 'hour'), moment().add(11, 'hour')])
// .range([0, 100])

export const stratifiedDB = stratify()(DB)
