'use strict';

class ItemNoLots {
  constructor(item) {
    item = item || {};
    item.noLots = item.noLots || {};

    //Set max quantity and initial quantity
    Object.assign(item.noLots, {
      maxQty: item.noLots.quantity,
      quantity: 1
    });

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
    item.noLots.quantity = parseInt(item.noLots.quantity || 0);

    if (item.noLots.quantity > 0) {
      item.noLots.quantity -= 1;
    }

    return this;
  }

  increment() {
    var item = this.item;

    item.noLots.quantity = parseInt(item.noLots.quantity || 0);
    item.noLots.maxQty = parseInt(item.noLots.maxQty || 0);

    if (item.noLots.quantity + 1 <= item.noLots.maxQty) {
      item.noLots.quantity += 1;
    }

    return this;
  }
}
