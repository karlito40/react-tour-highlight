import React from 'react';
import ReactDOM from 'react-dom';
import style from './TourStep.css';
import deepmerge from 'deepmerge';
import { getDimension } from '../utils';
import { diff } from 'deep-object-diff';


export default class TourStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        step: {
          left: 0,
          top: 0,
          width: 0,
          position: 'absolute'
        }
      }
    };

    this.el = document.createElement('div');
  }

  componentWillMount() {
    this.root = document.getElementById('reacttour-root')
    if(!this.root) {
      this.root = document.createElement('div');
      this.root.setAttribute('id', 'reacttour-root');
      document.body.appendChild(this.root);
    }
  }

  componentDidMount() {
    this.root.appendChild(this.el);
    this.updateStepDimension();

  }

  updateStepDimension() {
    if(!this.childRefs || !this.props.active) {
      return;
    }

    let dimension = getDimension(this.childRefs);
    if(this.currentDimesion
      && !Object.keys(diff(dimension, this.currentDimesion)).length
    ) {
      return;
    }
    this.currentDimesion = dimension;

    let style = deepmerge(this.state.style, {step: this.currentDimesion});
    this.setState({ style });
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateStepDimension();
  }

  componentWillUnmount() {
    this.root.removeChild(this.el);
  }

  renderStep() {
    return (
      <div onClick={this.props.onClick}
        className={`reacttour-step ${style.reacttour_step}`}
        style={this.state.style.step}>
        {this.renderTooltip()}
      </div>
    );
  }

  renderTooltip() {
    if(this.props.tooltip) {
      return (
        <React.Fragment>
          <div className={`reacttour-mask-layer ${style.reacttour_mask_layer}`}></div>
          {this.props.tooltip}
        </React.Fragment>
      );
    }

    return null;
  }

  render() {
    if(!this.props.active) {
      return this.props.children;
    }

    return <React.Fragment>
      {this._createPortal()}
      {this._childrenWithRefs()}
    </React.Fragment>;
  }

  _createPortal() {
    return ReactDOM.createPortal(this.renderStep(), this.el);
  }

  _childrenWithRefs() {
    this.childRefs = {};
    return React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, { ref: (input) => {
        this.childRefs[index] = input;
        if (typeof child.ref === 'function') {
          child.ref(input);
        }
      }});
    });
  }
}
