import React, { Component } from 'react';
import Slider from 'react-dynamic-time-slider'
import { container, install } from './Style'


class App extends Component {
  constructor() {
    super()
    this.state = {
      days: [
        {
          name: 'Sunday (disabled)',
          start: "9:00 AM", // set your start time to be the minimum value of the day
          end: "5:00 PM", // set your end time to be the maximum value of the day
          closed: true, // dynamically set to on or off to disable slider
          step: 1,
          id: 1,
        },
        {
          name: 'Monday',
          start: "9:00 AM", // set your start time to be the minimum value of the day
          end: "5:00 PM", // set your end time to be the maximum value of the day
          closed: false, // dynamically set to on or off to disable slider
          step: 1,
          id: 2,
        },
        {
          name: 'Tuesday',
          start: "5:00 AM", // set your start time to be the minimum value of the day
          end: "2:00 PM", // set your end time to be the maximum value of the day
          closed: false, // dynamically set to on or off to disable slider
          step: 10,
          id: 3,
        },
        {
          name: 'Wednesday',
          start: "2:00 AM", // set your start time to be the minimum value of the day
          end: "5:00 PM", // set your end time to be the maximum value of the day
          closed: false, // dynamically set to on or off to disable slider
          step: 15,
          id: 4,
        },
        {
          name: 'Thursday',
          start: "9:00 AM", // set your start time to be the minimum value of the day
          end: "10:00 PM", // set your end time to be the maximum value of the day
          closed: false, // dynamically set to on or off to disable slider
          step: 30,
          id: 5,
        },
        {
          name: 'Friday',
          start: "4:00 AM", // set your start time to be the minimum value of the day
          end: "1:00 PM", // set your end time to be the maximum value of the day
          closed: false, // dynamically set to on or off to disable slider
          step: 35,
          id: 6,
        },
        {
          name: 'Saturday',
          start: "9:00 AM", // set your start time to be the minimum value of the day
          end: "5:00 PM", // set your end time to be the maximum value of the day
          closed: false, // dynamically set to on or off to disable slider
          step: 25,
          id: 7,
        }
      ]
    }
    this.submitHandler = this.submitHandler.bind(this)
    this.timeChangeHandler = this.timeChangeHandler.bind(this)
  }

  // for submitting all of the hours
  submitHandler() {
    this.state.days.forEach(day => alert(
      [
        day.name,
        day.start,
        day.end,
        day.closed,
        day.id
      ]
    ))
  }

  // the application will take in a
  timeChangeHandler(time, targetDay) {
    this.setState(prevState => {
      return {
        days: prevState.days.map(day => {
          if (day.name === targetDay.name) {
            return { ...day, start: time.start, end: time.end, updated: true }
          } else {
            return day
          }
        })
      }
    })
  }

  render() {
    return (
      <div style={container}>
        <h1>React-Dynamic-Time-Slider</h1>
        <p style={install}>npm install react-dynamic-time-slider</p>
        <p style={install}>yarn add react-dynamic-time-slider</p>
        <p>A simple library that helps you set the daily time schedule. All examples below are set to step at different increments.</p>
        {
          this.state.days.map((day, i) => {
            return (
              <div key={i}>
                <h3>{day.name}</h3>
                <Slider
                  // disable slider, this could be set to state
                  disabled={day.closed}
                  // let's you drag the actual slider (not just the balls)
                  draggableTrack={true}
                  // start time for the slider (left ball)
                  start={day.start}
                  // end time for the slider (right ball)
                  end={day.end}
                  // name of this particular slider
                  name={day.name} // name of the day
                  // change handler for the slider
                  // takes in a time object and you pass in the day
                  onChangeComplete={time => this.onChangeComplete(time, day)} // records where the slider ends at (currently only one firing)
                  onChange={time => this.timeChangeHandler(time, day)} //handles when the slider moves
                  onChangeStart={this.changeStartHandler} // records the time in which the slider is started at
                  step={day.step} // **optional** step the timer forward by n digits
                />
                <p>{day.start} {day.end}</p>
              </div>
            )
          })
        }
        <button onClick={this.submitHandler}>Submit</button>
      </div >
    )
  }
}

export default App;
