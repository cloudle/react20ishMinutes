import React, { Component } from 'react';

export default class Counter extends Component {
  render() {
    return <div>
      <button>Hey!! {localStorage.getItem("name")}</button>
   </div>
  }
}

