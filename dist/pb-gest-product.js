/*! pb-gest-product 0.10.0 - Copyright 2016 Palmabit <hello@palmabit.com> (http://www.palmabit.com) */
'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ItemFactory = function ItemFactory(item) {
  _classCallCheck(this, ItemFactory);

  this.item = item;

  if (!item) {
    throw new Error('item must be an object');
  }

  if (item.intangible) {
    return new ItemIntangible(item);
  } else {
    return new ItemLots(item);
  }
};

'use strict';

var ItemIntangible = (function () {
  function ItemIntangible(item) {
    _classCallCheck(this, ItemIntangible);

    item = item || {};
    //Set initial quantity
    item.quantity = 1;

    this.item = item;
  }

  _createClass(ItemIntangible, [{
    key: 'get',
    value: function get() {
      return this.item;
    }
  }, {
    key: 'set',
    value: function set(item) {
      this.item = item;
    }
  }, {
    key: 'decrement',
    value: function decrement(index) {
      var item = this.item;
      item.quantity = parseInt(item.quantity || 0);

      if (item.quantity > 0) {
        item.quantity -= 1;
      }

      return this;
    }
  }, {
    key: 'increment',
    value: function increment(index) {
      var item = this.item;
      item.quantity = parseInt(item.quantity || 0);
      item.quantity += 1;
      return this;
    }
  }]);

  return ItemIntangible;
})();

'use strict';

var ItemLots = (function () {
  function ItemLots(item) {
    _classCallCheck(this, ItemLots);

    item = item || {};
    item.lots = item.lots || [];

    this.item = item;

    //Set max quantity and initial quantity
    item.lots.forEach(function (lot, i) {
      lot.maxQty = lot.quantity;
      lot.quantity = i == 0 ? 1 : 0;
    });
  }

  _createClass(ItemLots, [{
    key: 'get',
    value: function get() {
      return this.item;
    }
  }, {
    key: 'set',
    value: function set(item) {
      this.item = item;
    }
  }, {
    key: 'decrement',
    value: function decrement(index) {
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
  }, {
    key: 'increment',
    value: function increment(index) {
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
  }]);

  return ItemLots;
})();

'use strict';

var ItemManager = (function () {
  function ItemManager(item) {
    _classCallCheck(this, ItemManager);

    if (!item) {
      throw new Error('item must be an object');
    }

    item.quantity = item.quantity || 0;
    this.item = item;
  }

  _createClass(ItemManager, [{
    key: 'get',
    value: function get() {
      return this.item;
    }
  }, {
    key: 'set',
    value: function set(item) {
      this.item = item;
    }
  }, {
    key: 'decrement',
    value: function decrement() {
      var item = this.item;

      if (item.quantity > 0) {
        item.quantity -= 1;
      }

      return this;
    }
  }, {
    key: 'increment',
    value: function increment() {
      var item = this.item;

      if (item.intangible || !item.maxQty || item.quantity < item.maxQty) {
        item.quantity += 1;
      }

      return this;
    }
  }]);

  return ItemManager;
})();

'use strict';

var AbstractVersionable = (function () {
  function AbstractVersionable(obj) {
    _classCallCheck(this, AbstractVersionable);

    this.obj = obj;
  }

  /**
   * Check if object has a version
   * @param obj
   * @returns {*|boolean}
   */

  _createClass(AbstractVersionable, [{
    key: 'hasVersion',
    value: function hasVersion(obj) {
      return obj && typeof obj.version !== 'undefined' && obj.version;
    }

    /**
     * Check if object has an array of versions
     * @returns {*|boolean}
     */
  }, {
    key: 'hasVersions',
    value: function hasVersions() {
      return this.obj && Array.isArray(this.obj.versions) && this.obj.versions.length > 0;
    }

    /**
     * Find an object's version by name
     * @param versionName
     * @returns {*}
     */
  }, {
    key: 'findVersion',
    value: function findVersion(versionName) {
      if (!versionName || !this.hasVersions()) {
        return;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.obj.versions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var v = _step.value;

          if (v && v.name === versionName) {
            return v;
          }
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
    }

    /**
     * Check if version is active
     * @param version
     * @returns {*|boolean}
     */
  }, {
    key: 'isActive',
    value: function isActive(version) {
      return version && version.active === true;
    }

    /**
     * Check if version is valid
     * @param version
     * @returns {boolean}
     */
  }, {
    key: 'isValid',
    value: function isValid(version) {
      var start,
          end,
          now = Date.now();

      if (!version) {
        return false;
      }

      if (version.start) {
        start = new Date(version.start);
      }
      if (version.end) {
        end = new Date(version.end);
      }

      return (!start || start <= now) && (!end || end >= now);
    }

    /**
     * Check if object has a valid version
     * @returns {boolean}
     */
  }, {
    key: 'hasValidVersion',
    value: function hasValidVersion() {
      if (!this.hasVersions()) {
        return false;
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.obj.versions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var v = _step2.value;

          if (this.isActive(v) && this.isValid(v)) {
            return true;
          }
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

      return false;
    }
  }]);

  return AbstractVersionable;
})();

'use strict';

var ProductItemConverter = (function () {
  function ProductItemConverter() {
    _classCallCheck(this, ProductItemConverter);

    this.items = [];
    this.maxReached = [];
    this.products = [];
  }

  /**
   * Add products to items list
   * @param products
   * @param items
   * @returns {*}
   */

  _createClass(ProductItemConverter, [{
    key: 'add',
    value: function add(products, items) {
      this.products = [];
      this.items = items;
      this.maxReached = [];

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = products[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var product = _step3.value;

          this._addProduct(product);
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

      return this._merge();
    }

    /**
     * Get items list
     * @returns {*|Array}
     */
  }, {
    key: 'get',
    value: function get() {
      return this.items;
    }

    /**
     * Get maxReached
     * @returns {Array}
     */
  }, {
    key: 'getMaxReached',
    value: function getMaxReached() {
      return this.maxReached;
    }

    /**
     * Check if errors
     * @returns {boolean}
     */
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

      product.intangible === true ? this._addProductIntangible(product) : this._addProductWithLots(product);
    }
  }, {
    key: '_addProductWithLots',
    value: function _addProductWithLots(product) {
      //Split lots
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = product.lots[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var lot = _step4.value;

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
    }
  }, {
    key: '_addProductIntangible',
    value: function _addProductIntangible(product) {
      this.products.push(product);
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
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.products[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var product = _step5.value;

          var found = false;

          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = this.items[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              var item = _step6.value;

              if (product._id !== item._id) {
                continue;
              }

              if (product.intangible === true || !product.hasLots && this._areDatesEqual(product.lot, item.lot)) {
                found = true;
                this._incrementItems(product, item);
              } else if (product.lot.lot === item.lot.lot && this._areDatesEqual(product.lot, item.lot)) {
                found = true;
                this._incrementItems(product, item);
              }
            }
          } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion6 && _iterator6['return']) {
                _iterator6['return']();
              }
            } finally {
              if (_didIteratorError6) {
                throw _iteratorError6;
              }
            }
          }

          ;

          if (!found) {
            this.items.push(product);
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5['return']) {
            _iterator5['return']();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      ;
    }
  }, {
    key: '_incrementItems',
    value: function _incrementItems(product, item) {
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
  }, {
    key: '_areDatesEqual',
    value: function _areDatesEqual(productLot, itemLot) {
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
  }]);

  return ProductItemConverter;
})();

'use strict';

var ProductPresenter = (function () {
  function ProductPresenter(user) {
    _classCallCheck(this, ProductPresenter);

    this.user = user || {};
  }

  /**
   * Present a list of products
   * @param products
   * @returns {*}
   */

  _createClass(ProductPresenter, [{
    key: 'presentList',
    value: function presentList(products) {
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

    /**
     * Get product price
     * @param product
     * @returns {*}
     */
  }, {
    key: 'getPrice',
    value: function getPrice(product) {
      var i,
          user = this.user;

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

    /**
     * Get product price from a list
     * @param product
     * @param list
     * @returns {*}
     */
  }, {
    key: 'getListPrice',
    value: function getListPrice(product, list) {
      if (!Array.isArray(product.prices) || !list) {
        return;
      }

      for (var i = 0; i < product.prices.length; i += 1) {
        if (product.prices[i].list === list._id) {
          var productPrice = new ProductPrice(list, product.prices[i]);
          product.price = productPrice.getPrice();
          product.discount = productPrice.getDiscount() || this.getDiscountList(product.prices[i]);
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
  }, {
    key: 'getDiscountList',
    value: function getDiscountList(productPrices) {
      if (!this.user.list_discount) {
        return;
      }

      var productPrice = new ProductPrice(this.user.list_discount, productPrices);
      return productPrice.getDiscount();
    }

    /**
     * Get product quantity
     * @param product
     * @returns {*}
     */
  }, {
    key: 'getQuantity',
    value: function getQuantity(product) {
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
  }, {
    key: 'getQuantityFromLots',
    value: function getQuantityFromLots(product) {
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
  }]);

  return ProductPresenter;
})();

'use strict';

var ProductPrice = (function (_AbstractVersionable) {
  _inherits(ProductPrice, _AbstractVersionable);

  function ProductPrice(list, productPrice) {
    _classCallCheck(this, ProductPrice);

    _get(Object.getPrototypeOf(ProductPrice.prototype), 'constructor', this).call(this, list);

    this.list = list;
    this.productPrice = productPrice;

    if (typeof list !== 'object') {
      throw new TypeError('list must be an object');
    }

    if (typeof productPrice !== 'object') {
      throw new TypeError('product price must be an object');
    }
  }

  /**
   * Get product price
   * @returns {*}
   */

  _createClass(ProductPrice, [{
    key: 'getPrice',
    value: function getPrice() {
      return this.productPriceHasVersion() ? this._getPriceWithVersion() : this._getPriceWithoutVersion();
    }
  }, {
    key: '_getPriceWithVersion',
    value: function _getPriceWithVersion() {
      var version = this.findVersion(this.productPrice.version);

      if (version && this.isActive(version) && this.isValid(version)) {
        return this.productPrice.price || 0;
      }

      return 0;
    }
  }, {
    key: '_getPriceWithoutVersion',
    value: function _getPriceWithoutVersion() {
      if (this.isValid(this.list) || this.hasValidVersion()) {
        return this.productPrice.price || 0;
      }

      return 0;
    }

    /**
     * Check if product price has a version
     * @returns {boolean|string}
     */
  }, {
    key: 'productPriceHasVersion',
    value: function productPriceHasVersion() {
      return typeof this.productPrice.version !== 'undefined' && this.productPrice.version;
    }

    /**
     * Get product's discount
     * @returns {*}
     */
  }, {
    key: 'getDiscount',
    value: function getDiscount() {
      return this.productPriceHasVersion() ? this._getDiscountWithVersion() : this._getDiscountWithoutVersion();
    }
  }, {
    key: '_getDiscountWithVersion',
    value: function _getDiscountWithVersion() {
      var version = this.findVersion(this.productPrice.version);

      if (version && this.isActive(version) && this.isValid(version)) {
        return version.discount;
      }

      return;
    }
  }, {
    key: '_getDiscountWithoutVersion',
    value: function _getDiscountWithoutVersion() {
      if (this.isValid(this.list) || this.hasValidVersion()) {
        return this.list.discount;
      }

      return;
    }
  }]);

  return ProductPrice;
})(AbstractVersionable);

'use strict';

var ProductVatPresenter = (function (_ProductPresenter) {
  _inherits(ProductVatPresenter, _ProductPresenter);

  function ProductVatPresenter() {
    _classCallCheck(this, ProductVatPresenter);

    _get(Object.getPrototypeOf(ProductVatPresenter.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ProductVatPresenter, [{
    key: 'present',

    /**
     * Present a product with VAT
     * @param product
     * @returns {*}
     */
    value: function present(product) {
      _get(Object.getPrototypeOf(ProductVatPresenter.prototype), 'present', this).call(this, product);
      product.vat = this.getVat(product);
      return product;
    }

    /**
     * Get product's VAT
     * @param product
     * @returns {*}
     */
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

    /**
     * Get product's VAT reduced
     * @param product
     * @returns {*}
     */
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
