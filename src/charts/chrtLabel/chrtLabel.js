import chrtGeneric from '../chrtGeneric';
import { isNull } from '~/helpers';
import {
  color,
  position,
  top,
  left,
  align,
  valign,
} from './lib';
import { createSVG as create } from '~/layout';

const DEFAULT_FILL_COLOR = '#000';

function chrtLabel(text) {
  chrtGeneric.call(this);
  // console.log('HI WE ARE MARKERS', this);
  this.type = 'label';
  this.g = null;
  this.text = text;
  this._fill = null;
  this._position = {};
  this._alignment = {
    horizontal: 'start',
    vertical: '0.25em',
  }

  this.draw = () => {
    if (!this.parentNode.parentNode.scales) {
      return this.parentNode.parentNode;
    }

    if (!this.g) {
      this.g = create('g');
      this.parentNode.g.appendChild(this.g);
    }

    const { scales } = this.parentNode.parentNode;

    // console.log('chrtLabel', this._position)

    if(scales && scales['x']) {
      const x = isNull(this._position.x) ? 0 : scales['x'](this._position.x);
      // if y is not defined by the user, it should be calculated based on the closest Y value based on X
      const y = isNull(this._position.y) ? 0 : scales['y'](this._position.y);
      this.g.setAttribute('transform',`translate(${x},${y})`)
    }

    let label = this.g.querySelector('text');

    if (!label) {
      label = create('text');
      label.setAttribute('data-id', `label-${this.text}`);
      this.g.appendChild(label);
    }

    label.setAttribute('fill', this._fill || this.parentNode.stroke || DEFAULT_FILL_COLOR)
    label.textContent = this.text;

    label.setAttribute('text-anchor', this._alignment.horizontal)
    label.setAttribute('dy', this._alignment.vertical)
  }
}

chrtLabel.prototype = Object.create(chrtGeneric.prototype);
chrtLabel.prototype.constructor = chrtLabel;
chrtLabel.parent = chrtGeneric.prototype;

chrtLabel.prototype = Object.assign(chrtLabel.prototype, {
  color,
  position,
  top,
  left,
  align,
  valign,
});

export default chrtLabel;