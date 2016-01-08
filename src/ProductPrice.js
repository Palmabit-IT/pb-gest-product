'use strict';

class ProductPrice {
  constructor (list, productPrice) {
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
    if (this.isValid(this.list) || this._hasValidVersion()) {
      return this.productPrice.price || 0;
    }

    return 0;
  }

  productPriceHasVersion() {
    return typeof this.productPrice.version !== 'undefined' && this.productPrice.version;
  }

  listHasVersions() {
    return Array.isArray(this.list.versions) && this.list.versions.length > 0;
  }

  findVersion(versionName) {
    if (!versionName || !this.listHasVersions()) {
      return;
    }

    for (let v of this.list.versions) {
      if (v && v.name === versionName) {
        return v;
      }
    }
  }

  isActive(version) {
    return version && version.active === true;
  }

  isValid(version) {
    var start, end,
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

  _hasValidVersion() {
    for (let v of this.list.versions) {
      if (this.isActive(v) && this.isValid(v)) {
        return true;
      }
    }

    return false;
  }
}
