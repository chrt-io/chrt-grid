// export { default as chrtGrid, horizontalGrid, verticalGrid } from './chrtGrid';
import chrtGrid from './chrtGrid';

export function verticalGrid(ticksNumber, name) {
  return chrtGrid.call(this, 'x', ticksNumber, name);
}

export function horizontalGrid(ticksNumber, name) {
  return chrtGrid.call(this, 'y', ticksNumber, name);
}

export default chrtGrid;
