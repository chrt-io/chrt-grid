# chrt-grid

Component for creating grid lines in chrt charts. The grid lines help readers to better understand the values in the chart by providing visual reference lines. Grid lines can be horizontal, vertical, or both, and can be customized in style, color, and frequency.

The component provides two types of grid lines:

- Vertical Grid Lines (`verticalGrid`) which align with x-axis ticks
- Horizontal Grid Lines (`horizontalGrid`) which align with y-axis ticks

### Observable Examples and Documentation:

- [Chrt Grids - Observable](https://observablehq.com/d/b40a826f372020f5?collection=@chrt/chrt)
- [Introducing Chrt - Observable](https://observablehq.com/@chrt/introducing-chrt?collection=@chrt/chrt)

## Installing

For use with Webpack, Rollup, or other Node-based bundlers, `chrt-grid` can be installed as a standalone module via a package manager such as Yarn or npm.

```bash
npm install chrt-grid chrt-core
```

`chrt-grid` can be used as part of the `chrt` package:

```bash
npm install chrt
```

## Usage

### ES6 / Bundlers (Webpack, Rollup, etc.)

```js
import Chrt from "chrt-core";
import { horizontalGrid, verticalGrid } from "chrt-grid";

// Create chart with both horizontal and vertical grid lines
Chrt().data([1, 2, 3, 4, 5]).add(horizontalGrid()).add(verticalGrid());
```

### Vanilla HTML

```html
<div id="chart"></div>

<script type="module">
  import Chrt from "https://cdn.skypack.dev/chrt-core";
  import {
    horizontalGrid,
    verticalGrid,
  } from "https://cdn.skypack.dev/chrt-grid";

  const chart = Chrt()
    .data([1, 2, 3, 4, 5])
    .add(horizontalGrid())
    .add(verticalGrid());

  document.querySelector("#chart").appendChild(chart.node());
</script>
```

## API Reference

### Grid Creation

#### `horizontalGrid([tickCount[, name]])`

Creates horizontal grid lines aligned with y-axis ticks.

```js
// Basic horizontal grid
Chrt().add(horizontalGrid());

// Horizontal grid with specific number of lines
Chrt().add(horizontalGrid(5));

// Horizontal grid with custom name (for multiple grids)
Chrt().add(horizontalGrid(10, "customGrid"));
```

#### `verticalGrid([tickCount[, name]])`

Creates vertical grid lines aligned with x-axis ticks.

```js
// Basic vertical grid
Chrt().add(verticalGrid());

// Vertical grid with specific number of lines
Chrt().add(verticalGrid(5));
```

### Styling Methods

#### `.color([value])` / `.width([value])`

Set the color and width of grid lines.

```js
// Set fixed color and width
horizontalGrid().color("#cccccc").width(1);

// Color based on value
verticalGrid().color((d) => (d.value > 0 ? "#ff0000" : "#00ff00"));
```

#### Line Styles

Three preset line styles are available:

```js
// Solid lines (default)
horizontalGrid().solid();

// Dashed lines
horizontalGrid().dashed();

// Dotted lines
horizontalGrid().dotted();
```

### Grid Line Control

#### `.ticks([values])`

Specify exact positions for grid lines.

```js
// Set specific grid line positions
horizontalGrid().ticks([0, 25, 50, 75, 100]);

// Set custom tick values
verticalGrid().ticks([-5, 0, 5, 10]);
```

#### `.minor([show])`

Show or hide minor grid lines.

```js
// Show minor grid lines
horizontalGrid().minor(true);

// Hide minor grid lines
verticalGrid().minor(false);
```

#### Filtering Methods

##### `.showTicks([filter])` / `.hideTicks([filter])`

Control which grid lines are visible.

```js
// Show only specific values
horizontalGrid().showTicks([0, 50, 100]);

// Show grid lines based on a condition
verticalGrid().showTicks((value) => value > 0);

// Hide specific grid lines
horizontalGrid().hideTicks([25, 75]);
```

##### `.firstTick([show])` / `.lastTick([show])`

Control visibility of first and last grid lines.

```js
// Show only first grid line
horizontalGrid().firstTick();

// Show only last grid line
verticalGrid().lastTick();
```

##### `.firstAndLastTicks([show])`

Show or hide both first and last grid lines.

```js
// Show only first and last grid lines
horizontalGrid().firstAndLastTicks();
```

### Complete Examples

#### Basic Grid with Styling

```js
Chrt()
  .data([1, 2, 3, 4, 5])
  .add(horizontalGrid().color("#cccccc").width(1).dashed())
  .add(verticalGrid().color("#eeeeee").width(1).dotted());
```

#### Complex Grid Configuration

```js
Chrt()
  .data([1, 2, 3, 4, 5])
  .add(
    horizontalGrid()
      .minor(true)
      .color((d) => (d.value === 0 ? "#ff0000" : "#cccccc"))
      .width((d) => (d.value === 0 ? 2 : 1))
      .showTicks((value) => value % 2 === 0),
  )
  .add(verticalGrid().ticks([1, 2, 3, 4, 5]).dashed().firstAndLastTicks());
```
