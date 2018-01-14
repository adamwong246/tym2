import moment from 'moment'
import {scaleOrdinal} from 'd3-scale';

export const DbEvents = [
{id: 0, name: 'life'},
{id: 1, name: 'work', parentId:0,
 formSchema: {
  "definitions": {
   "Thing": {
    "type": "object",
    "properties": {
     "name": {
      "type": "string",
      "default": "Default name"
     }
    }
   }
  },
  "type": "object",
  "properties": {
   "listOfStrings": {
    "type": "array",
    "title": "A list of strings",
    "items": {
     "type": "string",
     "default": "bazinga"
    }
   },
   "multipleChoicesList": {
    "type": "array",
    "title": "A multiple choices list",
    "items": {
     "type": "string",
     "enum": [
     "foo",
     "bar",
     "fuzz",
     "qux"
     ]
    },
    "uniqueItems": true
   },
   "fixedItemsList": {
    "type": "array",
    "title": "A list of fixed items",
    "items": [
    {
     "title": "A string value",
     "type": "string",
     "default": "lorem ipsum"
    },
    {
     "title": "a boolean value",
     "type": "boolean"
    }
    ],
    "additionalItems": {
     "title": "Additional item",
     "type": "number"
    }
   },
   "minItemsList": {
    "type": "array",
    "title": "A list with a minimal number of items",
    "minItems": 3,
    "items": {
     "$ref": "#/definitions/Thing"
    }
   },
   "defaultsAndMinItems": {
    "type": "array",
    "title": "List and item level defaults",
    "minItems": 5,
    "default": [
    "carp",
    "trout",
    "bream"
    ],
    "items": {
     "type": "string",
     "default": "unidentified"
    }
   },
   "nestedList": {
    "type": "array",
    "title": "Nested list",
    "items": {
     "type": "array",
     "title": "Inner list",
     "items": {
      "type": "string",
      "default": "lorem ipsum"
     }
    }
   },
   "unorderable": {
    "title": "Unorderable items",
    "type": "array",
    "items": {
     "type": "string",
     "default": "lorem ipsum"
    }
   },
   "unremovable": {
    "title": "Unremovable items",
    "type": "array",
    "items": {
     "type": "string",
     "default": "lorem ipsum"
    }
   },
   "noToolbar": {
    "title": "No add, remove and order buttons",
    "type": "array",
    "items": {
     "type": "string",
     "default": "lorem ipsum"
    }
   },
   "fixedNoToolbar": {
    "title": "Fixed array without buttons",
    "type": "array",
    "items": [
    {
     "title": "A number",
     "type": "number",
     "default": 42
    },
    {
     "title": "A boolean",
     "type": "boolean",
     "default": false
    }
    ],
    "additionalItems": {
     "title": "A string",
     "type": "string",
     "default": "lorem ipsum"
    }
   }
  }
 },
 uiFormSchema: {
  "listOfStrings": {
   "items": {
    "ui:emptyValue": ""
   }
  },
  "multipleChoicesList": {
   "ui:widget": "checkboxes"
  },
  "fixedItemsList": {
   "items": [
   {
    "ui:widget": "textarea"
   },
   {
    "ui:widget": "select"
   }
   ],
   "additionalItems": {
    "ui:widget": "updown"
   }
  },
  "unorderable": {
   "ui:options": {
    "orderable": false
   }
  },
  "unremovable": {
   "ui:options": {
    "removable": false
   }
  },
  "noToolbar": {
   "ui:options": {
    "addable": false,
    "orderable": false,
    "removable": false
   }
  },
  "fixedNoToolbar": {
   "ui:options": {
    "addable": false,
    "orderable": false,
    "removable": false
   }
  }
 },
},
{id: 2, name: 'rest', parentId:0},
{id: 3, name: 'eating',  parentId:0},
{id: 4, name: 'excercising', parentId:0},
{id: 5, name: 'standup', start: moment().add(0.5, 'hours'), end:moment().add(3, 'hour'), parentId:1},
{id: 6, name: 'meeting', start: moment().add(0.5, 'hours'), end:moment().add(2, 'hour'), parentId:1},
{id: 7, name: 'my update', start: moment().add(0.75, 'hours'), end:moment().add(1, 'hour'), parentId:5},
{id: 8, name: 'bobs update', start: moment().add(0.75, 'hours'), end:moment().add(2.2, 'hour'), parentId:5},

{id: 11, name: 'synchrnozing tachyons', start: moment().add(3.1, 'hours'), end:moment().add(4, 'hour'), parentId:3},

{id: 12, name: 'compensating for heisenburg uncertainty', start: moment().add(4, 'hours'), end:moment().add(5, 'hour'), parentId:3,
 formSchema: {
  "title": "Widgets",
  "type": "object",
  "properties": {
   "stringFormats": {
    "type": "object",
    "title": "String formats",
    "properties": {
     "email": {
      "type": "string",
      "format": "email"
     },
     "uri": {
      "type": "string",
      "format": "uri"
     }
    }
   },
   "boolean": {
    "type": "object",
    "title": "Boolean field",
    "properties": {
     "default": {
      "type": "boolean",
      "title": "checkbox (default)",
      "description": "This is the checkbox-description"
     },
     "radio": {
      "type": "boolean",
      "title": "radio buttons",
      "description": "This is the radio-description"
     },
     "select": {
      "type": "boolean",
      "title": "select box",
      "description": "This is the select-description"
     }
    }
   },
   "string": {
    "type": "object",
    "title": "String field",
    "properties": {
     "default": {
      "type": "string",
      "title": "text input (default)"
     },
     "textarea": {
      "type": "string",
      "title": "textarea"
     },
     "color": {
      "type": "string",
      "title": "color picker",
      "default": "#151ce6"
     }
    }
   },
   "secret": {
    "type": "string",
    "default": "I'm a hidden string."
   },
   "disabled": {
    "type": "string",
    "title": "A disabled field",
    "default": "I am disabled."
   },
   "readonly": {
    "type": "string",
    "title": "A readonly field",
    "default": "I am read-only."
   },
   "widgetOptions": {
    "title": "Custom widget with options",
    "type": "string",
    "default": "I am yellow"
   },
   "selectWidgetOptions": {
    "title": "Custom select widget with options",
    "type": "string",
    "enum": [
    "foo",
    "bar"
    ],
    "enumNames": [
    "Foo",
    "Bar"
    ]
   }
  }
 },
 uiFormSchema: {
  "boolean": {
   "radio": {
    "ui:widget": "radio"
   },
   "select": {
    "ui:widget": "select"
   }
  },
  "string": {
   "textarea": {
    "ui:widget": "textarea",
    "ui:options": {
     "rows": 5
    }
   },
   "color": {
    "ui:widget": "color"
   }
  },
  "secret": {
   "ui:widget": "hidden"
  },
  "disabled": {
   "ui:disabled": true
  },
  "readonly": {
   "ui:readonly": true
  },
  "widgetOptions": {
   "ui:options": {
    "backgroundColor": "yellow"
   }
  },
  "selectWidgetOptions": {
   "ui:options": {
    "backgroundColor": "pink"
   }
  }
 }
},
{id: 13, name: 'deriving the nebula', start: moment().add(5, 'hours'), end:moment().add(6, 'hour'), parentId:3,
 formSchema: {
  title: "an auspicious opening",
  type: "object",
  properties: {
   someBoolean: {type: "boolean", title: "a box for checks?"},
   someString: {type: "string", title: "series of characters"},
   someNumber: {type: "number", title: "integers and maybe more!"}
  }
 },
 uiFormSchema: {
  "someBoolean": {
   "radio": {
    "ui:widget": "radio"
   },
   "select": {
    "ui:widget": "select"
   }
  },
  "someString": {
   "textarea": {
    "ui:widget": "textarea",
    "ui:options": {
     "rows": 5
    }
   },
   "color": {
    "ui:widget": "color"
   }
  },
  "secret": {
   "ui:widget": "hidden"
  },
  "disabled": {
   "ui:disabled": true
  },
  "readonly": {
   "ui:readonly": true
  },
  "widgetOptions": {
   "ui:options": {
    "backgroundColor": "yellow"
   }
  },
  "selectWidgetOptions": {
   "ui:options": {
    "backgroundColor": "pink"
   }
  }
 },
 visFormSchema: {
  "the string option": {
   "vis:graph" : "pie"
  }
 },

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
].concat(
 Array.from(Array(7)).map((x, i) => {
  return [
   {
    id: Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER)),
    name: 'sleep',
    start: moment().add(i, 'days'),
    end: moment().add(i, 'days').add(8, 'hours'),
    recursionParentId: 2
   },
   {
    id: Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER)),
    name: 'sleep',
    start: moment().subtract(i, 'days'),
    end: moment().subtract(i, 'days').add(8, 'hours'),
    recursionParentId: 2
   }
  ]
 }).reduce((a, b) => a.concat(b), [])
).concat(
 Array.from(Array(7)).map((x, i) => {
  return [
   {
    id: Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER)),
    name: 'breakfast',
    start: moment().add(i, 'days'),
    end: moment().add(i, 'days').add(1, 'hours'),
    recursionParentId: 3
   },
   {
    id: Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER)),
    name: 'breakfast',
    start: moment().subtract(i, 'days'),
    end: moment().subtract(i, 'days').add(1, 'hours'),
    recursionParentId: 3
   },
   {
    id: Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER)),
    name: 'lunch',
    start: moment().add(i, 'days').add(8, 'hours'),
    end: moment().add(i, 'days').add(9, 'hours'),
    recursionParentId: 3
   },
   {
    id: Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER)),
    name: 'lunch',
    start: moment().subtract(i, 'days').add(8, 'hours'),
    end: moment().subtract(i, 'days').add(9, 'hours'),
    recursionParentId: 3
   },
   {
    id: Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER)),
    name: 'dinner',
    start: moment().add(i, 'days').add(15, 'hours'),
    end: moment().add(i, 'days').add(16, 'hours'),
    recursionParentId: 3
   },
   {
    id: Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER)),
    name: 'dinner',
    start: moment().subtract(i, 'days').add(15, 'hours'),
    end: moment().subtract(i, 'days').add(16, 'hours'),
    recursionParentId: 3
   }
  ]
 }).reduce((a, b) => a.concat(b), [])
);

export const tym2Ordinal = scaleOrdinal()
.domain(DbEvents.map(function(lmnt){return lmnt.id}))
.range(DbEvents.map(function(lmnt){return lmnt.id}))

export const tym2OrdinalSorter = (a,b) => {return a.data.id - b.data.id}
export const tym2OrdinalSorterName = (a,b) => {return a.data.name.localeCompare(b.data.name)}
export const tym2OrdinalSorterStart = (a,b) => {return a.data.start - b.data.start}
export const tym2OrdinalSorterPriority = (aEvent, bEvent) => {
 let a = aEvent.data;
 let b = bEvent.data;

 const now = moment()

 const aIsCurrent = (a.start < now && now < a.end) ? 1 : 0
 const bIsCurrent = (b.start < now && now < b.end) ? 1 : 0

 if (aIsCurrent && !bIsCurrent) {
  return -1
 } else if ( bIsCurrent && !aIsCurrent ) {
  return 1
 } else if ( aIsCurrent && bIsCurrent ) {
  return a.end - b.end

 } else {
  const aIsAhead = (a.start > now) ? 1 : 0
  const bIsAhead = (b.start > now) ? 1 : 0

  if ( aIsAhead !== bIsAhead ) {
   return bIsAhead - aIsAhead
  } else {
   const aNearestToNow = Math.min(Math.abs(a.start - now), Math.abs(a.end - now))
   const bNearestToNow = Math.min(Math.abs(b.start - now), Math.abs(b.end - now))
   return aNearestToNow - bNearestToNow 

  }
 }
}

export const lenses = [
{
 id: 0,
 where: {'parentId': 1},
} 
]

export const sorter = (stateSort) => {
 if (stateSort === 'id'){ return tym2OrdinalSorter}
 if (stateSort === 'name'){ return tym2OrdinalSorterName}
 if (stateSort === 'startTime'){ return tym2OrdinalSorterStart}
 if (stateSort === 'priority'){ return tym2OrdinalSorterPriority}
}