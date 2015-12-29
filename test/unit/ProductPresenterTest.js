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
        hasLots: true,
        lots: [
          {lot: 'a', quantity: 10},
          {lot: 'b', quantity: 20}
        ],
        noLots: {quantity: 50}
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

    it("should get quantity if product has no lots", function () {
      product.hasLots = false;
      var presenter = new ProductPresenter();
      var presented = presenter.getQuantity(product);
      expect(presented.quantity).toBe(50);
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
        hasLots: true,
        lots: [
          {lot: 'a', quantity: 10},
          {lot: 'b', quantity: 20}
        ],
        noLots: {quantity: 50}
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
});
