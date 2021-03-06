import { Component } from "react";
import { connect } from "react-redux";
import { Flat1dExpanded, Flat1dCondensed } from "./Flat1dComponent";
import { Flat2dExpanded, Flat2dCondensed } from "./Flat2dComponent";
import { Fold1dExpanded, Fold1dCondensed } from "./Fold1dComponent";
import { Fold2dExpanded, Fold2dCondensed } from "./Fold2dComponent";
import { scaleTime } from "d3-scale";
import { stratify } from "d3-hierarchy";
import { toJS } from "immutable";
import { yScale, sorter } from "../data.js";
import { uiSchema } from "../schemas";
import Datetime from "react-datetime";
import Form from "react-jsonschema-form";
import moment from "moment";

class MainComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupingMode: "flat",
      sort: "priority",
      expandedRecurrences: false,
      selector: "",
      chartMode: "vanilla",
      id: 0,
      highlighted: null,
      minTime: props.events.reduce(
        (mm, lmnt) => (lmnt.end < mm ? lmnt.end : mm),
        moment()
      ),
      maxTime: props.events.reduce(
        (mm, lmnt) => (lmnt.start > mm ? lmnt.start : mm),
        moment()
      )
    };
  }

  setHighlight = v => this.setState({ highlighted: v });
  setFilteredMinTime = v => this.setState({ minTime: v });
  setFilteredMaxTime = v => this.setState({ maxTime: v });
  setFilteredId = v => this.setState({ id: v });

  render() {
    const state = this.state;

    const highlighted = state.highlighted;
    const filtered = state.id;
    const minTime = state.minTime;
    const maxTime = state.maxTime;

    const setHighlight = this.setHighlight;
    const setFilteredId = this.setFilteredId;

    var xScale = scaleTime().domain([minTime, maxTime]);

    let leftComponent, rightComponent, events;

    // this plus eventsPayload is passed to left and right components
    let childProps = {
      highlighted: highlighted,
      onHighlight: setHighlight,
      onEventClick: setFilteredId,
      setSchemaEditing: this.setSchemaEditing,
      schemaEditing: this.state.schemaEditing,
      filtered: filtered,
      xScale: xScale
    };

    // TODO: refactor this with immutable
    ///////////////////////////////////////
    const crunch = (events, state) => {
      const groupBy = (list, keyGetter) => {
        const map = new Map();
        list.forEach(item => {
          const key = keyGetter(item);
          const collection = map.get(key);
          if (!collection) {
            map.set(key, [item]);
          } else {
            collection.push(item);
          }
        });
        return map;
      };

      const subtree = (tree, id) => {
        var toReturn;
        tree.each((lmnt, ndx) => {
          if (lmnt.data.id === id) {
            toReturn = lmnt.copy();
          }
        });
        return toReturn;
      };

      const listOfEvents = events.filter(e => {
        if (
          state.minTime != null &&
          e.start != null &&
          e.start < state.minTime
        ) {
          return false;
        }

        if (state.maxTime != null && e.end != null && e.end > state.maxTime) {
          return false;
        }

        return true;
      });

      const recurringEvents = listOfEvents.filter(
        e => e.recursionParentId != null
      );

      const groupedRecursives = Array.from(
        groupBy(recurringEvents, e => {
          return e.recursionParentId;
        })
      );

      const backfilledEvents = listOfEvents.concat(
        groupedRecursives.map(gr => {
          var toReturn = {}; //gr[1][1]
          toReturn.name = gr[1][0].name;
          toReturn.id = gr[1][0].recursionParentId;
          toReturn.parentId = 1;
          return toReturn;
        })
      );

      var eventsTree;
      if (!state.expandedRecurrences) {
        const eventsWithRecurssions = backfilledEvents
          .filter(e => e.recursionParentId == null)
          .map(e => {
            groupedRecursives
              .filter(gr => gr[0].split("/")[0] == e.id)
              .forEach(gr => {
                e.recursions = e.recursions || {};
                e.recursions[gr[0].split("/")[1]] = gr[1];
              });
            return e;
          });

        // fail
        eventsTree = stratify().parentId(
          d => d.recursionParentId || d.parentId
        )(eventsWithRecurssions);
      } else {
        eventsTree = stratify().parentId(
          d => d.recursionParentId || d.parentId
        )(backfilledEvents);
      }

      if (filtered === null) {
        return eventsTree;
      } else {
        return subtree(eventsTree, filtered) || eventsTree;
      }
    };
    const eventsPayload = crunch(this.props.events, this.state);
    ///////////////////////////////////////

    if (this.state.groupingMode === "flat") {
      if (this.state.expandedRecurrences) {
        events = eventsPayload.descendants().sort(sorter(this.state.sort));
        leftComponent = <Flat1dExpanded {...childProps} events={events} />;
        rightComponent = <Flat2dExpanded {...childProps} events={events} />;
      } else {
        events = eventsPayload.descendants().sort(sorter(this.state.sort));
        leftComponent = <Flat1dCondensed {...childProps} events={events} />;
        rightComponent = <Flat2dCondensed {...childProps} events={events} />;
      }
    } else {
      if (this.state.expandedRecurrences) {
        events = eventsPayload.sort(sorter(this.state.sort));
        leftComponent = <Fold1dExpanded {...childProps} events={events} />;
        rightComponent = <Fold2dExpanded {...childProps} events={events} />;
      } else {
        events = eventsPayload.sort(sorter(this.state.sort));
        leftComponent = <Fold1dCondensed {...childProps} events={events} />;
        rightComponent = <Fold2dCondensed {...childProps} events={events} />;
      }
    }

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <Form
                  className="form"
                  formData={state}
                  schema={uiSchema}
                  onChange={s => this.setState(s.formData)}
                >
                  {" "}
                  <div />{" "}
                </Form>
              </td>
              <td>
                <form className="form">
                  <div className="form-group">
                    <label>minTime</label>
                    <Datetime
                      className="minTimeSetter"
                      onChange={this.setFilteredMinTime}
                      value={minTime}
                      isValidDate={current => current.isBefore(maxTime)}
                    />

                    <label>maxTime</label>
                    <Datetime
                      className="maxTimeSetter"
                      onChange={this.setFilteredMaxTime}
                      value={maxTime}
                      isValidDate={current => current.isAfter(minTime)}
                    />
                  </div>
                </form>
              </td>
            </tr>

            <tr>
              <td>{leftComponent}</td>
              <td>{rightComponent}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.get("events").toJS()
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // destroyTodo : () => dispatch({
    //   type : 'DESTROY_TODO'
    // })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);

{
  /* <div className="form-group">
 <label>org:</label>
  <select name="flatOrFoldSelect" onChange={this.setGroupingModel}>
   <option value="flat">flat</option>
   <option value="fold">fold</option>
  </select>
  
 <br/>

 <label>expanded recurrences: </label>
 <input
  type="checkbox"
  className="form-control"
  onChange={this.toggleExpandedRecurrences} />

 <br/>

 <label>sort:</label>
  <select name="sort" onChange={this.setSort}>
     <option value="id">id</option>
     <option value="name">name</option>
     <option value="startTime">startTime</option>
     <option value="priority">priority</option>
   </select>

 <br/>

 <label>id:</label>
 <input type="number" name="isSort" onChange={(e) => setFilteredId(Number(e.target.value))} value={this.state.filter.id} />
</div> */
}

// fitViewToData = () => {
//  const descendants = getEvents(this.state).descendants();
//  const computedMinTime = descendants.reduce((mm, lmnt) => {
//   return Math.min(
//    lmnt.data.start,
//    (lmnt.data.journals || []).reduce((mm2, lmnt2) => { return lmnt2.time < mm2 ? mm2 : lmnt2.time }, 0)
//   ) < mm ? mm : lmnt.data.start
//  })
//  const computedMaxTime = descendants.reduce((mm, lmnt) => {
//   return Math.max(
//    lmnt.data.end,
//    (lmnt.data.journals || []).reduce((mm2, lmnt2) => { return lmnt2.time > mm2 ? mm2 : lmnt2.time }, 0)
//   ) > mm ? mm : lmnt.data.end
//  })
//  return this.setState({ filter: { ...this.state.filter, minTime: computedMinTime, maxTime: computedMaxTime} })
// }

{
  /* <button>trim</button>
         <button>now</button>
         <br/> */
}

// setSchemaEditing = (id) => {
//  if(id !== this.state.schemaEditing){
//   this.setState({schemaEditing: id})
//  } else {
//   this.setState({schemaEditing: null})}
//  }

// setGroupingModel = (e) => this.setState({groupingMode: e.target.value})
// setSort          = (e) => this.setState({sort: e.target.value})
// toggleExpandedRecurrences = (e) => this.setState({expandedRecurrences: !this.state.expandedRecurrences})
