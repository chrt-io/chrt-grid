import * as chrt from 'chrt';
import { horizontalGrid, verticalGrid } from '~/'

const data = new Array(10).fill(1).map((d,i) => ({x: -5 + i, y: -5 + i}));

export default async function(container) {
  return chrt.Chrt()
    .node(container)
    .size(600, 200)
    .add(
      chrt.chrtPoints()
        .data(data, d => ({
          x: d.x,
          y: d.y,
        }))
    )
    .add(
      horizontalGrid()
        .hideTicks()
    )
    .add(
      horizontalGrid()
        .filter(3)
    )
    .add(
      horizontalGrid()
        .filter([-1,-2])
    )
    .add(
      verticalGrid()
        .firstAndLastTicks()
    )
    .add(
      verticalGrid()
        .filter(d => d > 0 && d < 3)
    )
    .add(
      horizontalGrid()
        .firstTick()
    )
    .add(
      horizontalGrid()
        .lastTick()
    )
}
