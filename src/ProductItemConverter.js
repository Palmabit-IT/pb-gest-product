'use strict';

class ProductItemConverter {
  constructor() {
    this.items = [];
    this.maxReached = [];
    this.products = [];
  }

  add(products, items) {
    this.products = [];
    this.items = items;
    this.maxReached = [];

    for (let product of products) {
      this._addProduct(product);
    }

    return this._merge();
  }

  get() {
    return this.items;
  }

  getMaxReached() {
    return this.maxReached;
  }

  hasErrors() {
    return this.maxReached.length > 0;
  }

  _addProduct(product) {
    if (!product) {
      return;
    }

    product.intangible === true ? this._addProductIntangible(product) : this._addProductWithLots(product);
  }

  _addProductWithLots(product) {
    //Split lots
    for (let lot of product.lots) {
      let item;

      if (!lot.quantity || lot.quantity === 0) {
        continue;
      }

      item = this._create(product, lot);

      if (item.lots) {
        delete item.lots;
      }

      this.products.push(item);
    }
  }

  _addProductIntangible(product) {
    this.products.push(product);
  }

  _create(product, lot) {
    lot = lot || {};

    return Object.assign({}, product, {
      quantity: lot.quantity,
      maxQty: lot.maxQty,
      lot: {
        lot: lot.lot,
        date: lot.date,
        expiration: lot.expiration
      },
      warehouse: lot.warehouse
    });
  }

  _merge() {
    for (let product of this.products) {
      let found = false;

      for (let item of this.items) {
        if (product._id !== item._id) {
          continue;
        }

        if ((product.intangible === true) || (!product.hasLots && this._areDatesEqual(product.lot, item.lot))) {
          found = true;
          this._incrementItems(product, item);
        } else if (product.lot.lot === item.lot.lot && this._areDatesEqual(product.lot, item.lot)) {
          found = true;
          this._incrementItems(product, item);
        }
      };

      if (!found) {
        this.items.push(product);
      }
    };
  }

  _incrementItems(product, item) {
    if (product.intangible === true || !item.maxQty || product.quantity + item.quantity <= item.maxQty) {
      item.quantity = product.quantity + item.quantity;
    } else {
      item.quantity = item.maxQty;

      this.maxReached.push({
        description: item.description,
        lot: item.lot && item.lot.lot ? item.lot.lot : '-'
      });
    }
  }

  _areDatesEqual(productLot, itemLot) {
    var date1, date2;
    var exp1 = productLot.expiration;
    var exp2 = itemLot.expiration;

    if (!exp1 && !exp2) {
      return true;
    } else if (!exp1 || !exp2) {
      return false;
    }

    date1 = new Date(exp1);
    date2 = new Date(exp2);

    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
  }
}
