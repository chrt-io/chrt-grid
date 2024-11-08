import * as chrt from 'chrt';
import { horizontalGrid, verticalGrid } from '../../../src/'

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
    .add(horizontalGrid())
    .add(verticalGrid())
}
