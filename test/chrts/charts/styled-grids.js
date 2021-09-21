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
        .color(d => d.value > 0 ? '#f00' : '#0f0')
        .width(2)
        .minor()
        .dotted()
    )
    .add(
      verticalGrid()
        .color('#00f')
        .width(1)
        .minor()
        .dashed()
    )
}
