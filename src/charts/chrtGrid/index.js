import chrtGrid from './chrtGrid';

export function verticalGrid(ticksNumber) {
  return chrtGrid.call(this, 'x', ticksNumber);
}

export function horizontalGrid(ticksNumber) {
  return chrtGrid.call(this, 'y', ticksNumber);
}

export default chrtGrid;
