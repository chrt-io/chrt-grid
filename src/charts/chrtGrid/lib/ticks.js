import { isNull } from '~/helpers';

export default function ticks(ticks) {
  if (isNull(ticks)) {
    return this._ticks;
  }
  this._fixedTicks = ticks;

  return this;
}

// showTicks and hideTicks can get different type of parameters and they filter the ticks based on the parameters
export function showTicks(filter = true) {
  this._filter = filter;

  // filter-in with a function
  // showTicks((d,i) => !(i % 2))
  if (typeof filter === 'function') {
    this.ticksFilter = (d, i, arr) => filter(d, i, arr);
    return this;
  }

  // show/hide all ticks
  // showTicks(false|true)
  if (typeof filter === 'boolean') {
    this.ticksFilter = () => filter;
    return this;
  }

  // show only one tick
  // showTicks(10)
  if (Number.isFinite(filter)) {
    this.ticksFilter = d => filter === d;
    return this;
  }

  // show based on an array of values
  // showTicks([10, 20, 30])
  if (Array.isArray(filter)) {
    this.ticksFilter = d => filter.indexOf(d) > -1;
    return this;
  }

  return this;
}

// hideTicks is the opposite of showTicks and it filters out
export function hideTicks(filter) {
  showTicks.call(this, filter);
  const ticksFilter = this.ticksFilter;
  this.ticksFilter = (d, i, arr) => !ticksFilter(d, i, arr);

  return this;
}

export function firstTick(show = true) {
  // // console.log('FIRST TICK', this, show)
  if (show) {
    showTicks.call(this, (d, i) => i === 0);
  } else {
    hideTicks.call(this, (d, i) => i === 0);
  }
  return this;
}

export function lastTick(show = true) {
  if (show) {
    showTicks.call(this, (d, i, arr) => i === arr.length - 1);
  } else {
    hideTicks.call(this, (d, i, arr) => i === arr.length - 1);
  }

  return this;
}

export function firstAndLastTicks(show = true) {
  if (show) {
    showTicks.call(this, (d, i, arr) => i === 0 || i === arr.length - 1);
  } else {
    hideTicks.call(this, (d, i, arr) => i === 0 || i === arr.length - 1);
  }

  return this;
}
