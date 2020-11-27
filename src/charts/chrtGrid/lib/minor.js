export default function minor(value = true) {
  if (typeof value === 'function') {
    // something will go here
  } else {
    this.showMinorTicks = value;
  }
  return this;
}
