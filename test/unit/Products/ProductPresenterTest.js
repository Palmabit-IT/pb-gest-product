describe("ProductPresenterTest", function () {
  describe("Price product presenter", function () {
    var product = {
      prices: [
        {list: 1, price: 1},
        {list: 2, price: 2},
        {list: 3, price: 3}
      ]
    };

    it("should present product price", function () {
      var presenter = new ProductPresenter({list_custom: {_id: 1}});
      var presented = presenter.getPrice(product);
      expect(presented.price).toBe(1);
    });

    it("should present product price by default price", function () {
      var presenter = new ProductPresenter({list_base: {_id: 2}});
      var presented = presenter.getPrice(product);
      expect(presented.price).toBe(2);
    });

    it("should present product price by active price", function () {
      var presenter = new ProductPresenter({list_default: {_id: 3}});
      var presented = presenter.getPrice(product);
      expect(presented.price).toBe(3);
    });

    it("should present product with not found price", function () {
      var presenter = new ProductPresenter({list_custom: {_id: 4}});
      var presented = presenter.getPrice(product);
      expect(presented.price).toBe(0);
    });

    it("should get list data", function () {
      var presenter = new ProductPresenter();
      expect(presenter.getListData({_id: 1, code: 'code', name: 'name', versions: []}, 'b')).toEqual({
        _id: 1,
        code: 'code',
        name: 'name',
        type: 'b'
      });
    });

    it("should present product with list", function () {
      var presenter = new ProductPresenter({list_custom: {_id: 1}});
      var presented = presenter.getPrice(product);
      expect(presented.list).toEqual({
        _id: 1,
        code: '',
        name: '',
        type: 'c'
      });
    });
  });

  describe("Quantity product presenter", function () {
    var product;

    beforeEach(function () {
      product = {
        intangible: false,
        lots: [
          {lot: 'a', quantity: 10},
          {lot: 'b', quantity: 20}
        ]
      };
    });

    it("should get undefined quantity if product is intangible", function () {
      product.intangible = true;
      var presenter = new ProductPresenter();
      var presented = presenter.getQuantity(product);
      expect(presented.quantity).toBeUndefined();
    });

    it("should get total quantity from lots", function () {
      var presenter = new ProductPresenter();
      var presented = presenter.getQuantity(product);
      expect(presented.quantity).toBe(30);
    });
  });

  describe("Product presenter", function () {
    var product;

    beforeEach(function () {
      product = {
        prices: [
          {list: 1, price: 1},
          {list: 2, price: 2},
          {list: 3, price: 3}
        ],
        intangible: false,
        lots: [
          {lot: 'a', quantity: 10},
          {lot: 'b', quantity: 20}
        ]
      };
    });

    it("should present product", function () {
      var presenter = new ProductPresenter({list_custom: {_id: 2}});
      var presented = presenter.present(product);
      expect(presented.price).toBe(2);
      expect(presented.discount).toBeUndefined();
      expect(presented.quantity).toBe(30);
    });

    it("should present product with discount", function () {
      var presenter = new ProductPresenter({list_custom: {_id: 1, discount: {name: 'adj1', discounts: [10, 20, 30]}}});
      var presented = presenter.present(product);
      expect(presented.price).toBe(1);
      expect(presented.discount.name).toBe('adj1');
      expect(presented.discount.discounts).toEqual([10, 20, 30]);
      expect(presented.quantity).toBe(30);
    });

    it("should present product with custom price", function () {
      product.price = 100;
      var presenter = new ProductPresenter({list_custom: {_id: 2}});
      var presented = presenter.present(product);
      expect(presented.price).toBe(100);
      expect(presented.discount).toBeUndefined();
      expect(presented.quantity).toBe(30);
    });

    it("should present product without include vat", function () {
      var presenter = new ProductPresenter({list_custom: {_id: 1}});
      expect(presenter.present(product).include_vat).toBeFalsy();
    });

    it("should present product with include vat", function () {
      var presenter = new ProductPresenter({list_custom: {_id: 1, include_vat: true}});
      expect(presenter.present(product).include_vat).toBeTruthy();
    });

    it("should get exception id product isn't an object", function () {
      var presenter = new ProductPresenter();
      expect(function(){presenter.present()}).toThrow(new TypeError('product must be an object'));
      expect(function(){presenter.present('')}).toThrow(new TypeError('product must be an object'));
      expect(function(){presenter.present({})}).not.toThrow(new TypeError('product must be an object'));
    });
  });

  describe("Sort lots by dates", function () {
    var presenter, product,
        date1 = new Date(),
        date2 = new Date(date1),
        date3 = new Date(date1);

    date2 = date2.setDate(date2.getDate() + 1);
    date3 = date3.setDate(date3.getDate() + 2);

    beforeEach(function () {
      presenter = new ProductPresenter();
    });

    it("should sorting lots by dates", function () {
      var presented = presenter.getQuantityFromLots({
        lots: [
          {lot: 'a', quantity: 10, date: date3},
          {lot: 'b', quantity: 20, date: date2},
          {lot: 'c', quantity: 20, date: date1}
        ]
      });
      expect(presented.lots[0].lot).toBe('c');
      expect(presented.lots[1].lot).toBe('b');
      expect(presented.lots[2].lot).toBe('a');
    });

    it("should sorting lots by expiration dates", function () {
      var presented = presenter.getQuantityFromLots({
        lots: [
          {lot: 'a', quantity: 10, date: date3, expiration: date3},
          {lot: 'b', quantity: 20, date: date2, expiration: date1},
          {lot: 'c', quantity: 20, date: date1, expiration: date2}
        ]
      });
      expect(presented.lots[0].lot).toBe('b');
      expect(presented.lots[1].lot).toBe('c');
      expect(presented.lots[2].lot).toBe('a');
    });
  });

  describe("Discounts presenter", function () {
    var product, user1, user2;

    beforeEach(function () {
      product = {
        prices: [
          {list: 1, price: 1},
          {list: 2, price: 2},
          {list: 3, price: 3}
        ],
        intangible: false,
        lots: [
          {lot: 'a', quantity: 10},
          {lot: 'b', quantity: 20}
        ]
      };

      user1 = {
        list_custom: {
          _id: 1
        },
        list_discount: {
          _id: 2,
          discount: {
            name: 'disc1',
            discounts: [5, 10, 15]
          }
        }
      };

      user2 = {
        list_custom: {
          _id: 1,
          discount: {
            name: 'adj1',
            discounts: [10, 20, 30]
          }
        },
        list_discount: {
          _id: 2,
          discount: {
            name: 'disc1',
            discounts: [5, 10, 15]
          }
        }
      };
    });

    it("should get discounts from discount list", function () {
      var presenter = new ProductPresenter(user1);
      var presented = presenter.present(product);
      expect(presented.price).toBe(1);
      expect(presented.discount.name).toBe('disc1');
      expect(presented.discount.discounts).toEqual([5, 10, 15]);
      expect(presented.quantity).toBe(30);
    });

    it("should override discount list with user list", function () {
      var presenter = new ProductPresenter(user2);
      var presented = presenter.present(product);
      expect(presented.price).toBe(1);
      expect(presented.discount.name).toBe('adj1');
      expect(presented.discount.discounts).toEqual([10, 20, 30]);
      expect(presented.quantity).toBe(30);
    });
  });
});
