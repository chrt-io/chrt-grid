export default function lineStyle(value) {
  this._lineStyle = value;
  if(!value) {
    return this.strokeStyle;
  }

  if (typeof value === 'function') {
    // something will go here
  } else {
    switch(value) {
      case 'dashed':
        this.strokeStyle = `${this.strokeWidth * 4} ${this.strokeWidth * 4}`;
        break;
      case 'dotted':
        this.strokeStyle = `${this.strokeWidth} ${this.strokeWidth}`;
        break;
      case 'solid':
      default:
        this.strokeStyle = null;
    }
  }
  return this;
}
