import React, { Component } from "react";
import { render } from "react-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      window.console.log('[Console] It works properly! :) 2');
  }

  render() {
    return (
      <div>
        <h1>It works! :)</h1>
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);