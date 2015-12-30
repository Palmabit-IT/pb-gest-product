'use strict';

class ItemLots {
  constructor(item) {
    item = item || {};
    item.lots = item.lots || [];

    this.item = item;

    //Set max quantity and initial quantity
    item.lots.forEach(function (lot, i) {
      lot.maxQty = lot.quantity;
      lot.quantity = i == 0 ? 1 : 0;
    });
  }

  get() {
    return this.item;
  }

  set(item) {
    this.item = item;
  }

  decrement(index) {
    var item = this.item;

    if (item.lots.length === 0) {
      return this;
    }

    index = index || item.lots.length - 1;
    item.lots[index].quantity = parseInt(item.lots[index].quantity || 0);

    if (index <= 0 || item.lots[index].quantity <= 0) {
      if (item.lots[0].quantity > 0) {
        item.lots[0].quantity -= 1;
      }
    } else {
      if (item.lots[index].quantity > 0) {
        item.lots[index].quantity -= 1;
      }
    }

    return this;
  }

  increment(index) {
    var item = this.item;

    index = index || 0;

    if (index >= item.lots.length) {
      return this;
    }

    item.lots[index].quantity = parseInt(item.lots[index].quantity || 0);
    item.lots[index].maxQty = parseInt(item.lots[index].maxQty || 0);

    if (item.lots[index].quantity + 1 > item.lots[index].maxQty) {
      return this.increment(index + 1);
    } else {
      item.lots[index].quantity += 1;
    }

    return this;
  }
}
