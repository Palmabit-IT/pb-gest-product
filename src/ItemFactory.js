'use strict';

class ItemFactory {
  constructor(item) {
    this.item = item;

    if (!item) {
      throw new Error('item must be an object');
    }

    if (item.intangible) {
      return new ItemIntangible(item);
    } else if (item.hasLots) {
      return new ItemLots(item);
    } else {
      return new ItemNoLots(item);
    }
  }
}
