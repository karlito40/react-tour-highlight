This component allows you to create a customizable guide on your site. It exports ```TourStep``` which provide a way to encapsulate any component into a simple step/highlight for your walkthrough.



```TourStep```accept any component as a ```tooltip```propertie but you can use ```TourTooltip``` as a default behaviour.

### Warning

You have to handle the state of the guide yourself. It is usefull if you want to create a complexe manager which show a step by step walkthrough between multiple pages.


It comes with a basic stylesheet to show you the possibilities but you'll have to create your own to create something attractive.

### Demo

```javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import  { TourStep, TourTooltip } from 'react-tour-highlight';

class App extends Component {
  state = { step: 0 };

  goToNextStep() {
    this.setState({
      step: this.state.step + 1
    });
  }

  createTooltip() {
    return (
      <TourTooltip dir="top">
        <div className="tooltip-content">
          Tooltip content
        </div>
      </TourTooltip>
    );
  }

  render() {
    let { step } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <TourStep
            active={step === 0}
            tooltip={this.createTooltip()}
            onClick={this.goToNextStep.bind(this)}
          >
            <div>
              To get started, edit <code>src/App.js</code> and save to reload.
            </div>
            <div>
              Step 0
            </div>
          </TourStep>
        </div>
        <TourStep
          active={step === 1}
          tooltip={this.createTooltip()}
          onClick={this.goToNextStep.bind(this)}
        >
          <section className="step-1" style={{height: 200, width: 150}}>
            Step 1
          </section>
        </TourStep>

        <TourStep
          active={step === 2}
          tooltip={this.createTooltip()}
          onClick={this.goToNextStep.bind(this)}
        >
          <section style={{height: 100, width: 300}}>
            Step 2
          </section>
        </TourStep>

        <TourStep
          active={step === 1}
          tooltip={this.createTooltip()}
          onClick={this.goToNextStep.bind(this)}
        >
          <section style={{height: 100, width: 300}}>
            Step 1
          </section>
        </TourStep>
      </div>
    );
  }
}

```
