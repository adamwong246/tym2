import { fromJS, toJs, setIn, toObject, Map, is } from 'immutable';
import { DbEvents } from './data.js'
import moment from 'moment';
/*
 * action types
 */

export const ADD_EVENT = 'ADD_EVENT'
export const ADD_JOURNAL = 'ADD_JOURNAL'
export const SET_EVENT = 'SET_EVENT'

/*
 * action creators
 */

export function addJournal(eventId) {
 return store.dispatch({ type:"ADD_JOURNAL", eventId} )
}

/*
 * reducers
 */

const initialState = new fromJS({
  events: DbEvents
})

export function tymtuApp(state = initialState, action) {
  switch (action.type) {

    case ADD_EVENT:
      const previousEvents = [
       ...state.events,
       {
        id: Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER)),
        ...action.event
       },
     ]

     const newEvents = previousEvents.map( (e) => {

     })

      return Object.assign({}, state, { events: newEvents })

    case ADD_JOURNAL:

      // console.log(`attempting to find event index for id: ${action.eventId}`)
      const eventInstance = state.get('events').findIndex(e => e.get('id') === action.eventId);
      // console.log(`found event index for id: ${eventInstance}`)

      const newState = state.updateIn(
       ['events', eventInstance, 'journals'], arr => {
        return arr.push(new Map({
         id: Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER)),
         blob: action.formData,
         time: moment()
        }))
       }
      );

      return newState

    case SET_EVENT:
      return Object.assign({}, state, {
      events: [
        ...state.events,
        {
         id: Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER)),
         ...action.event
        },
      ]
    })

    default:
     console.error(`${action.type} is not a known action type! ${JSON.stringify(action)}`)
      return state
  }
}

