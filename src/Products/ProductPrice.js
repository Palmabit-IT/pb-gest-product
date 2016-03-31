'use strict';

class ProductPrice extends AbstractVersionable {
  constructor (list, productPrice) {
    super(list);

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
  getPrice() {
    return this.productPriceHasVersion() ? this._getPriceWithVersion() : this._getPriceWithoutVersion();
  }

  _getPriceWithVersion() {
    var version = this.findVersion(this.productPrice.version);

    if (version && this.isActive(version) && this.isValid(version)) {
      return this.productPrice.price || 0;
    }

    return 0;
  }

  _getPriceWithoutVersion() {
    if (this.isValid(this.list) || this.hasValidVersion()) {
      return this.productPrice.price || 0;
    }

    return 0;
  }

  /**
   * Check if product price has a version
   * @returns {boolean|string}
   */
  productPriceHasVersion() {
    return typeof this.productPrice.version !== 'undefined' && this.productPrice.version;
  }

  /**
   * Get product's discount
   * @returns {*}
   */
  getDiscount() {
    return this.productPriceHasVersion() ? this._getDiscountWithVersion() : this._getDiscountWithoutVersion();
  }

  _getDiscountWithVersion() {
    var version = this.findVersion(this.productPrice.version);

    if (version && this.isActive(version) && this.isValid(version)) {
      return version.discount;
    }

    return;
  }

  _getDiscountWithoutVersion() {
    if (this.isValid(this.list) || this.hasValidVersion()) {
      return this.list.discount;
    }

    return;
  }
}
