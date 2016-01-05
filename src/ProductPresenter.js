'use strict';

class ProductPresenter {
  constructor (user) {
    this.user = user || {};
  }

  presentList (products) {
    var i;

    for (i = 0; i < products.length; i += 1) {
      this.present(products[i]);
    }

    return products;
  }

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

  getPrice(product) {
    var i, user = this.user;
    // var products = user.products || [];

    // for (i = 0; i < products.length; i += 1) {
    //   if (product && products[i].product === product._id) {
    //     product.price = products[i].price_customer;
    //     return product;
    //   }
    // }

    if (this.getListPrice(product, user.list)) {            //priority 1
      return product;
    }
    if (this.getListPrice(product, user.list_default)) {    //priority 2
      return product;
    }
    if (this.getListPrice(product, user.list_active)) {     //priority 3
      return product;
    }

    product.price = 0;
    return product;
  }

  getListPrice(product, list) {
    if (!Array.isArray(product.prices) || !list) {
      return
    }

    for (var i = 0; i < product.prices.length; i += 1) {
      if (product.prices[i].list === list._id) {
        product.price = product.prices[i].price;
        return product;
      }
    }
  }

  getQuantity(product) {
    if (product.intangible === true) {
      return product;
    }

    return this.getQuantityFromLots(product);
  }

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
}
