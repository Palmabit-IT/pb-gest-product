'use strict';

class ItemFactory {
  constructor(item) {
    this.item = item;

    if (!item) {
      throw new Error('item must be an object');
    }

    if (item.intangible) {
      return new ItemIntangible(item);
    } else {
      return new ItemLots(item);
    }
  }
}
