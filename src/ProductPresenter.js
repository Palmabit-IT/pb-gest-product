'use strict';

class ProductPresenter {
  constructor (user) {
    if (typeof user !== 'object') {
      throw new TypeError('user must be an object');
    }

    this.user = user;
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
      this.calculatePrice(product);
    }

    this.calculateQty(product);

    return product;
  }

  calculatePrice(product) {
    var i,
        user = this.user,
        products = user.products || [];

    for (i = 0; i < products.length; i += 1) {
      if (product && products[i].product === product._id) {
        product.price = products[i].price_customer;
        return product;
      }
    }

    for (var i = 0; i < product.prices.length; i += 1) {
      if (user.activeList && product.prices[i].list === user.activeList._id) {
        product.price = product.prices[i].price;
        return product;
      }
    }

    product.price = 0;
    return product;
  }

  calculateQty(product) {
    if (product.lots && product.lots.length > 0) {
      product.quantity = 0;

      product.lots.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });

      for (var i = 0; i < product.lots.length; i += 1) {
        product.quantity += product.lots[i].quantity;
      }
    }

    return product;
  }
}
