import chrtGrid from './chrtGrid';

export function verticalGrid(name, ticksNumber) {
  return chrtGrid.call(this, 'x', ticksNumber);
}

export function horizontalGrid(name, ticksNumber) {
  return chrtGrid.call(this, 'y', ticksNumber);
}

export default chrtGrid;
