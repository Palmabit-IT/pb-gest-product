'use strict';

class ProductPresenter {
  constructor (user) {
    this.user = user || {};
  }

  /**
   * Present a list of products
   * @param products
   * @returns {*}
   */
  presentList (products) {
    var i;

    for (i = 0; i < products.length; i += 1) {
      this.present(products[i]);
    }

    return products;
  }

  /**
   * Present a single product
   * @param product
   * @returns {*}
   */
  present(product) {
    if (typeof product !== 'object') {
      throw new TypeError('product must be an object');
    }

    if (!product.price) {
      this.getPrice(product);
    }

    this.getQuantity(product);

    return product;
  }

  /**
   * Get product price
   * @param product
   * @returns {*}
   */
  getPrice(product) {
    var i, user = this.user;

    if (this.getListPrice(product, user.list, 'c')) {            //priority 1
      return product;
    }
    if (this.getListPrice(product, user.list_default, 'b')) {    //priority 2
      return product;
    }
    if (this.getListPrice(product, user.list_active, 'd')) {     //priority 3
      return product;
    }

    product.price = 0;
    return product;
  }

  /**
   * Get product price from a list
   * @param product
   * @param list
   * @returns {*}
   */
  getListPrice(product, list, type) {
    if (!Array.isArray(product.prices) || !list) {
      return
    }

    for (var i = 0; i < product.prices.length; i += 1) {
      if (product.prices[i].list === list._id) {
        let productPrice = new ProductPrice(list, product.prices[i]);
        product.price = productPrice.getPrice();
        product.discount = productPrice.getDiscount() || this.getDiscountList(product.prices[i]);
        product.list = this.getListData(list, type);
        product.include_vat = !!list.include_vat;
        return product;
      }
    }
  }

  /**
   * Get discounts from user's discount list
   * @param productPrices
   * @returns {*}
   */
  getDiscountList(productPrices) {
    if (!this.user.list_discount) {
      return;
    }

    let productPrice = new ProductPrice(this.user.list_discount, productPrices);
    return productPrice.getDiscount();
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
}
