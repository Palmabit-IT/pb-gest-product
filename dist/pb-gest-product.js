/*! pb-gest-product 0.5.0 - Copyright 2015 Palmabit <hello@palmabit.com> (http://www.palmabit.com) */
'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ProductItemConverter = (function () {
  function ProductItemConverter() {
    _classCallCheck(this, ProductItemConverter);

    this.items = [];
    this.maxReached = [];
    this.products = [];
  }

  _createClass(ProductItemConverter, [{
    key: 'add',
    value: function add(products, items) {
      this.products = [];
      this.items = items;
      this.maxReached = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = products[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var product = _step.value;

          this._addProduct(product);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return this._merge();
    }
  }, {
    key: 'get',
    value: function get() {
      return this.items;
    }
  }, {
    key: 'getMaxReached',
    value: function getMaxReached() {
      return this.maxReached;
    }
  }, {
    key: 'hasErrors',
    value: function hasErrors() {
      return this.maxReached.length > 0;
    }
  }, {
    key: '_addProduct',
    value: function _addProduct(product) {
      if (!product) {
        return;
      }

      product.hasLots === true ? this._addProductWithLots(product) : this._addProductWithoutLots(product);
    }
  }, {
    key: '_addProductWithLots',
    value: function _addProductWithLots(product) {
      //Split lots
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = product.lots[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var lot = _step2.value;

          var item = undefined;

          if (!lot.quantity || lot.quantity === 0) {
            continue;
          }

          item = this._create(product, lot);

          if (item.lots) {
            delete item.lots;
          }

          this.products.push(item);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: '_addProductWithoutLots',
    value: function _addProductWithoutLots(product) {
      var item = product.intangible === true ? product : this._create(product, product.noLots);

      if (item.noLots) {
        delete item.noLots;
      }

      this.products.push(item);
    }
  }, {
    key: '_create',
    value: function _create(product, lot) {
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
  }, {
    key: '_merge',
    value: function _merge() {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.products[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var product = _step3.value;

          var found = false;

          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = this.items[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var item = _step4.value;

              if (product._id !== item._id) {
                continue;
              }

              if (product.hasLots !== true) {
                found = true;
                this._incrementItems(product, item);
              } else if (product.lot && item.lot && product.lot.lot === item.lot.lot) {
                found = true;
                this._incrementItems(product, item);
              }
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4['return']) {
                _iterator4['return']();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }

          ;

          if (!found) {
            this.items.push(product);
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3['return']) {
            _iterator3['return']();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      ;
    }
  }, {
    key: '_incrementItems',
    value: function _incrementItems(product, item) {
      if (product.intangible === true || product.quantity + item.quantity <= item.maxQty) {
        item.quantity = product.quantity + item.quantity;
      } else {
        item.quantity = item.maxQty;

        this.maxReached.push({
          description: item.description,
          lot: item.lot && item.lot.lot ? item.lot.lot : '-'
        });
      }
    }
  }]);

  return ProductItemConverter;
})();

'use strict';

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
      if (product.intangible === true) {
        return product;
      }

      return this.getTangibleQuantity(product);
    }
  }, {
    key: 'getTangibleQuantity',
    value: function getTangibleQuantity(product) {
      if (product.hasLots) {
        return this.getQuantityFromLots(product);
      } else if (product.noLots) {
        product.quantity = product.noLots.quantity;
        return product;
      }
    }
  }, {
    key: 'getQuantityFromLots',
    value: function getQuantityFromLots(product) {
      if (product.lots && product.lots.length > 0) {
        product.quantity = 0;

        product.lots.sort(function (a, b) {
          return new Date(a.expiration) - new Date(b.expiration);
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
        return this.user.rate_default || null;
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
