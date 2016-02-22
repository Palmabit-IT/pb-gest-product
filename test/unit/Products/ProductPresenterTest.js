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
      var presenter = new ProductPresenter({list: {_id: 1}});
      var presented = presenter.getPrice(product);
      expect(presented.price).toBe(1);
    });

    it("should present product price by default price", function () {
      var presenter = new ProductPresenter({list_default: {_id: 2}});
      var presented = presenter.getPrice(product);
      expect(presented.price).toBe(2);
    });

    it("should present product price by active price", function () {
      var presenter = new ProductPresenter({list_active: {_id: 3}});
      var presented = presenter.getPrice(product);
      expect(presented.price).toBe(3);
    });

    it("should present product with not found price", function () {
      var presenter = new ProductPresenter({list: {_id: 4}});
      var presented = presenter.getPrice(product);
      expect(presented.price).toBe(0);
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
      var presenter = new ProductPresenter({list: {_id: 2}});
      var presented = presenter.present(product);
      expect(presented.price).toBe(2);
      expect(presented.quantity).toBe(30);
    });

    it("should present product with custom price", function () {
      product.price = 100;
      var presenter = new ProductPresenter({list: {_id: 2}});
      var presented = presenter.present(product);
      expect(presented.price).toBe(100);
      expect(presented.quantity).toBe(30);
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
});
