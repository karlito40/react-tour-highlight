import React from 'react';
import style from './TourTooltip.css';

export default class TourTooltip extends React.Component {
  render() {
    let { dir, children } = this.props;

    return (
      <div className={`reacttour-tooltip
        ${style.reacttour_tooltip}
        ${style[dir] ? style[dir] : ''}`
      }>
        {children}
      </div>
    );
  }
}
