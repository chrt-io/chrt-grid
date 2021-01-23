import { createSVG as create } from '~/layout';
import { TICKS_DEFAULT } from '~/constants';
import { isNull } from '~/helpers';
import lineWidth from './lib/lineWidth';
import lineColor from './lib/lineColor';
import lineStyle from './lib/lineStyle';
import minor from './lib/minor';
import {showTicks} from './lib';
import { chrtGeneric } from 'chrt-core';
import {
  firstTick,
  lastTick,
} from './lib';
const DEFAULT_LINE_WIDTH = 1;
const DEAULT_LINE_COLOR = '#000';

function chrtGrid(type, ticksNumber = TICKS_DEFAULT, name) {
  chrtGeneric.call(this);
  this.type = 'grid';
  // ticksNumber *= 2;

  // console.log('GRID', type, ticksNumber, name);
  // this.type = type;
  this.name = name ||type;
  this.strokeWidth = DEFAULT_LINE_WIDTH;
  this.stroke = DEAULT_LINE_COLOR;
  this.showMinorTicks = false;
  this.ticksFilter = null;
  this._interval = null;

  const verticalGridLine = (gridLine, position, y1, y2, visible = true) => {
    gridLine.style.display = visible ? 'block' : 'none';
    gridLine.setAttribute('x1', position);
    gridLine.setAttribute('x2', position);
    gridLine.setAttribute('y1', y1);
    gridLine.setAttribute('y2', y2);
  };

  const horizontalGridLine = (gridLine, position, x1, x2, visible = true) => {
    gridLine.style.display = visible ? 'block' : 'none';
    gridLine.setAttribute('x1', x1);
    gridLine.setAttribute('x2', x2);
    gridLine.setAttribute('y1', position);
    gridLine.setAttribute('y2', position);
  };

  this.draw = () => {
    if (!this.parentNode.scales[type][this.name]) {
      return;
    }
    const _scale = this.parentNode.scales[type][this.name];

    const { _margins, width, height } = this.parentNode;
    const isLog = _scale.isLog();

    let interval = this._interval;
    const axis = this.parentNode.getAxis(type);
    if(axis) {
      interval = axis.interval();
    }

    const ticks = _scale
      .ticks(ticksNumber * 2, interval)
      .map((tick, i , arr) => {
        tick.position = _scale(tick.value);
        let visible =
          tick.position >= _margins.top && tick.position <= (height - _margins.bottom);
        if (type === 'x') {
          visible = tick.position >= _margins.left && tick.position <= (width - _margins.right);
        }
        visible = visible && (this.showMinorTicks || (tick.isZero && this.showZero) || !tick.isMinor);
        visible = visible && ((!isLog) || (isLog && !tick.isMinor));

        if(this.ticksFilter) {
          visible = visible && this.ticksFilter(tick.value, i, arr);
        }
        tick.visible = visible;

        return tick;
      })

    // console.log('GRID!', type, name, 'TICKS', ticks)
      // .filter(tick => tick.visible) // TO BE REVIEWED
      // .filter((tick, i, arr) => this.ticksFilter ? this.ticksFilter(tick.value, i, arr) : true);

    // const ticks = this.parentNode.scales[type].ticks(
    //   //ticksNumber * (this.showMinorTicks ? 2 : 1)
    //   ticksNumber * 2
    // )
    // // .filter((tick, i, arr) => this.ticksFilter(tick.value, i, arr));
    // .filter((tick, i, arr) => this.ticksFilter ? this.ticksFilter(tick.value, i, arr) : true);

    // console.log('got this ticks', type, ticksNumber, ticks);
    this.g.setAttribute('id', `${type}Grid-${this.id()}`);
    this.g.querySelectorAll('line').forEach(gridLine => gridLine.setAttribute('toBeHidden', true));

    ticks.forEach((tick) => {
      let gridLine = this.g.querySelector(
        `[data-id='gridLine-${type}-${tick.value}']`
      );
      if (!gridLine) {
        gridLine = create('line');
        gridLine.setAttribute('data-id', `gridLine-${type}-${tick.value}`);

        if (tick.isMinor) {
          gridLine.classList.add('tick-minor');
        }

        this.g.appendChild(gridLine);
      }

      gridLine.setAttribute('stroke', this.stroke);
      gridLine.setAttribute('stroke-width', this.strokeWidth);
      gridLine.setAttribute('shape-rendering', 'crispEdges');
      if(!isNull(this.strokeStyle)) {
        gridLine.setAttribute('stroke-dasharray', this.strokeStyle);
      }
      gridLine.removeAttribute('toBeHidden');

      const position = _scale(tick.value);

      if (type === 'x') {
        // const isLog = this.parentNode.scales[type][name].isLog();
        // const visible =
        //   this.showMinorTicks || (!isLog && !tick.isMinor) || (isLog && !tick.isMinor); // TODO: improve this check
        verticalGridLine(
          gridLine,
          position,
          height - _margins.bottom,
          _margins.top,
          tick.visible
        );
      }
      if (type === 'y') {
        // const isLog = this.parentNode.scales[type][name].isLog();
        // let visible =
        //   position >= _margins.top && position <= height - _margins.bottom;
        // visible = visible && (this.showMinorTicks || (tick.isZero && this.showZero) || !tick.isMinor);
        // visible = visible && ((!isLog) || (isLog && !tick.isMinor));

        // if(this.ticksFilter) {
        //   visible = this.ticksFilter(tick.value, i, arr);
        // }

        horizontalGridLine(
          gridLine,
          position,
          _margins.left,
          width - _margins.right,
          tick.visible
        );
      }
    });
    this.g.querySelectorAll('line[toBeHidden=true]').forEach(gridLine => gridLine.remove());
    return this.parentNode;
  };

  this.solid = () => lineStyle.call(this, 'solid');
  this.dashed = () => lineStyle.call(this, 'dashed');
  this.dotted = () => lineStyle.call(this, 'dotted');

}

function grid(type, ticksNumber) {
  return new chrtGrid(type, ticksNumber);
}

chrtGrid.prototype = Object.create(chrtGeneric.prototype);
chrtGrid.prototype.constructor = chrtGrid;
chrtGrid.parent = chrtGeneric.prototype;

chrtGrid.prototype = Object.assign(chrtGrid.prototype, {
//chrtGrid.prototype = grid.prototype = {
  width: lineWidth,
  color: lineColor,
  minor,
  firstTick,
  lastTick,
  filter: showTicks,
});

export default grid;
// export default chrtGrid;
