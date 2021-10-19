import { COMPONENTS_W_DATA } from '../constants';

export function isNull(value) {
  return value === null || value == null || typeof value === 'undefined';
}

export function hasData(obj) {
  return !isNull(obj.type) && COMPONENTS_W_DATA.indexOf(obj.type) > -1;
}

export function isInfinity(value) {
  return !isFinite(value);
}

export function getStrokeStyle(style, strokeWidth) {
  let strokeStyle = null;
  switch (style) {
    case 'dashed':
      strokeStyle = `${strokeWidth * 4} ${strokeWidth * 4}`;
      break;
    case 'dotted':
      strokeStyle = `${strokeWidth} ${strokeWidth}`;
      break;
    case 'solid':
    default:
      strokeStyle = null;
  }
  return strokeStyle;
}
