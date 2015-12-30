'use strict';

class ItemIntangible {
  constructor(item) {
    item = item || {};
    //Set initial quantity
    item.quantity = 1;

    this.item = item;
  }

  get() {
    return this.item;
  }

  set(item) {
    this.item = item;
  }

  decrement(index) {
    var item = this.item;
    item.quantity = parseInt(item.quantity || 0);

    if (item.quantity > 0) {
      item.quantity -= 1;
    }

    return this;
  }

  increment(index) {
    var item = this.item;
    item.quantity = parseInt(item.quantity || 0);
    item.quantity += 1;
    return this;
  }
}
