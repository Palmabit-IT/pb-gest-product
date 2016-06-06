'use strict';

const LIST_BASE = 'b';
const LIST_CUSTOM = 'c';
const LIST_DEFAULT = 'd';

class ProductPresenter {
  constructor(user) {
    this.user = user || {};
  }

  getUser() {
    return this.user;
  }

  setUser(user) {
    this.user = user || {};
  }

  /**
   * Present a list of products
   * @param products
   * @param options
   * @returns {*}git
   */
  presentList(products, options) {
    var i;

    for (i = 0; i < products.length; i += 1) {
      this.present(products[i], options);
    }

    return products;
  }

  /**
   * Present a single product
   * @param product
   * @param options
   * @returns {*}
   */
  present(product, options) {
    if (typeof product !== 'object') {
      throw new TypeError('product must be an object');
    }

    if (!product.price) {
      this.getPrice(product, options);
    }

    this.getQuantity(product);

    return product;
  }

  /**
   * Get product price
   * @param product
   * @param options
   * @returns {*}
   */
  getPrice(product, options) {
    var i, user = this.user;
    this.setDafaults(product);

    product = this.getListPrice(product, user.list_custom, LIST_CUSTOM, options);     //priority 1

    if (this._hasPriceAndDiscount(product)) {
      return product;
    }

    product = this.getListPrice(product, user.list_base, LIST_BASE, options);         //priority 2

    if (this._hasPriceAndDiscount(product)) {
      return product;
    }

    product = this.getListPrice(product, user.list_default, LIST_DEFAULT, options);   //priority 3
    return product;
  }

  /**
   * Get product price from a list
   * @param product
   * @param list
   * @param type
   * @param options
   * @returns {*}
   */
  getListPrice(product, list, type, options) {
    if (!Array.isArray(product.prices) || !list) {
      return product;
    }

    if (list && options && list.include_vat !== options.include_vat) {
      return product;
    }

    for (var i = 0; i < product.prices.length; i += 1) {
      if (product.prices[i].list === list._id) {
        let productPrice = new ProductPrice(list, product.prices[i]);

        if (!this._hasPrice(product)) {
          product.price = productPrice.getPrice();
          product.list = this.getListData(list, type);
          product.include_vat = !!list.include_vat;
        }

        if (!this._hasDiscount(product)) {
          product.discount = productPrice.getDiscount();
        }

        return product;
      }
    }

    return product;
  }

  setDafaults(product) {
    product.price = 0;
    product.discount = this.getUserDiscount();
    return product;
  }

  /**
   * Get discounts from user's discount list
   * @returns {*}
   */
  getUserDiscount() {
    return this.user.discount;
  }

  /**
   * Get product quantity
   * @param product
   * @returns {*}
   */
  getQuantity(product) {
    if (product.intangible === true) {
      return product;
    }

    return this.getQuantityFromLots(product);
  }

  /**
   * Get product quantity from lots
   * @param product
   * @returns {*}
   */
  getQuantityFromLots(product) {
    if (product.lots && product.lots.length > 0) {
      product.quantity = 0;

      product.lots.sort(function (a, b) {
        if (a.expiration && b.expiration) {
          return new Date(a.expiration) - new Date(b.expiration);
        } else {
          return new Date(a.date) - new Date(b.date);
        }
      });

      for (var i = 0; i < product.lots.length; i += 1) {
        product.quantity += product.lots[i].quantity;
      }
    }

    return product;
  }

  /**
   * Get list data
   * @param list
   * @param type
   * @returns {{_id: *, code: (*|string|string|number|Number|string), name: string, type: string}}
   */
  getListData(list = {}, type = '') {
    return {
      _id: list._id,
      code: list.code || '',
      name: list.name || '',
      type: type
    }
  }

  _hasPrice(product) {
    return product && product.price && product.price !== 0;
  }

  _hasDiscount(product) {
    return product && typeof product.discount === 'object' && product.discount._id;
  }

  _hasPriceAndDiscount(product) {
    return this._hasPrice(product) && this._hasDiscount(product);
  }
}
