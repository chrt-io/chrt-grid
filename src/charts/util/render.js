import { createSVG as create } from '../../layout';
import { hasData } from '~/helpers';

export default function render() {
  this.g = create('g');

  // console.log('RENDER', this, this.parentNode.objects)

  if(hasData(this)) {
    // series
    // console.log('THIS IS A SERIES', 'APPEND')
    this.currentNode.append(this.g);
  } else {
    const grid = (this.parentNode.objects || []).slice().reverse().find(obj => obj.type === 'grid');
    if(grid && this.type === 'axis') {
        // console.log('THIS IS AN',this.type,'AND THERE IS A GRID',grid,'INSERT BEFORE',grid.node(), grid.node().nextSibling)
        this.currentNode.insertBefore(this.g, grid.node().nextSibling);
    } else {
      // console.log('THIS IS A', this.type, 'PREPEND')
      this.currentNode.prepend(this.g);
    }

  }
  this.update();
  return this.parentNode;
}
