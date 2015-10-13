/*! pb-gest-product 0.1.2 - Copyright 2015 Palmabit <hello@palmabit.com> (http://www.palmabit.com) */
'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ProductPresenter = (function () {
  function ProductPresenter(user) {
    _classCallCheck(this, ProductPresenter);

    this.user = user || {};
  }

  _createClass(ProductPresenter, [{
    key: 'presentList',
    value: function presentList(products) {
      var i;

      for (i = 0; i < products.length; i += 1) {
        this.present(products[i]);
      }

      return products;
    }
  }, {
    key: 'present',
    value: function present(product) {
      if (typeof product !== 'object') {
        throw new TypeError('product must be an object');
      }

      if (!product.price) {
        this.getPrice(product);
      }

      this.getQuantity(product);

      return product;
    }
  }, {
    key: 'getPrice',
    value: function getPrice(product) {
      var i,
          user = this.user;
      // var products = user.products || [];

      // for (i = 0; i < products.length; i += 1) {
      //   if (product && products[i].product === product._id) {
      //     product.price = products[i].price_customer;
      //     return product;
      //   }
      // }

      if (this.getListPrice(product, user.list)) {
        //priority 1
        return product;
      }
      if (this.getListPrice(product, user.list_default)) {
        //priority 2
        return product;
      }
      if (this.getListPrice(product, user.list_active)) {
        //priority 3
        return product;
      }

      product.price = 0;
      return product;
    }
  }, {
    key: 'getListPrice',
    value: function getListPrice(product, list) {
      if (!Array.isArray(product.prices) || !list) {
        return;
      }

      for (var i = 0; i < product.prices.length; i += 1) {
        if (product.prices[i].list === list._id) {
          product.price = product.prices[i].price;
          return product;
        }
      }
    }
  }, {
    key: 'getQuantity',
    value: function getQuantity(product) {
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
  }]);

  return ProductPresenter;
})();

'use strict';

var ProductVatPresenter = (function (_ProductPresenter) {
  _inherits(ProductVatPresenter, _ProductPresenter);

  function ProductVatPresenter() {
    _classCallCheck(this, ProductVatPresenter);

    _get(Object.getPrototypeOf(ProductVatPresenter.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ProductVatPresenter, [{
    key: 'present',
    value: function present(product) {
      _get(Object.getPrototypeOf(ProductVatPresenter.prototype), 'present', this).call(this, product);
      product.vat = this.getVat(product);
      return product;
    }
  }, {
    key: 'getVat',
    value: function getVat(product) {
      product.rate_reduced = product.rate_reduced || [];

      if (product.rate_exemption) {
        //product's vat exemption
        return product.rate_exemption;
      } else if (this.user.rate_exemption) {
        //user's vat exemption
        return this.user.rate_exemption;
      } else if (this.user.rate) {
        //user's vat reduced
        return this.getVatReduced(product);
      } else if (product.rate) {
        //product's regular vat
        return product.rate;
      } else {
        //default vat
        return null;
      }
    }
  }, {
    key: 'getVatReduced',
    value: function getVatReduced(product) {
      var i, reduced;

      for (i = 0; i < product.rate_reduced.length; i += 1) {
        reduced = product.rate_reduced[i];

        if (reduced && reduced.name === this.user.rate) {
          return reduced.vat;
        }
      }

      //Product's regular vat is returned if reduced one is not found
      return product.rate;
    }
  }]);

  return ProductVatPresenter;
})(ProductPresenter);
//# sourceMappingURL=pb-gest-product.js.map
