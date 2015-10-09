'use strict';

class ProductVatPresenter extends ProductPresenter {

  present(product) {
    super.present(product);
    product.vat = this.getVat(product);
    return product;
  }

  getVat(product) {
    product.rate_reduced = product.rate_reduced || [];

    if (product.rate_exemption) {             //product's vat exemption
      return product.rate_exemption;
    } else if (this.user.rate_exemption) {    //user's vat exemption
      return this.user.rate_exemption;
    } else if (this.user.rate) {              //user's vat reduced
      return this.getVatReduced(product);
    } else if (product.rate) {                //product's regular vat
      return product.rate;
    } else {                                  //default vat
      return null;
    }
  }

  getVatReduced(product) {
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
}
