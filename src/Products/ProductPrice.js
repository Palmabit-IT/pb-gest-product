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

  productPriceHasVersion() {
    return typeof this.productPrice.version !== 'undefined' && this.productPrice.version;
  }
}
