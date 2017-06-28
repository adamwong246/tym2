import moment from 'moment'

export const DB = [
 {id: 0, name: 'root', start: moment(), end:moment().add(1, 'hour')},
 {id: 1, name: 'charmander', start: moment(), end:moment().add(2, 'hour'), parentId:0},
 {id: 2, name: 'charmeleon', start: moment().add(1, 'hours'), end:moment().add(3, 'hour'), parentId:1},
 {id: 2, name: 'charizard', start: moment().add(1, 'hours'), end:moment().add(3, 'hour'), parentId:1},
 {id: 2, name: 'squirtle', start: moment().add(1, 'hours'), end:moment().add(3, 'hour'), parentId:0},
 {id: 2, name: 'wartortle', start: moment().add(1, 'hours'), end:moment().add(3, 'hour'), parentId:0}
]
