'use strict';

class ItemManager {
  constructor(item) {
    if (!item) {
      throw new Error('item must be an object');
    }

    item.quantity = item.quantity || 0;
    this.item = item;
  }

  get() {
    return this.item;
  }

  set(item) {
    this.item = item;
  }

  decrement() {
    var item = this.item;

    if (item.quantity > 0) {
      item.quantity -= 1;
    }

    return this;
  }

  increment() {
    var item = this.item;

    if (item.intangible || !item.maxQty || item.quantity < item.maxQty) {
      item.quantity += 1;
    }

    return this;
  }
}
