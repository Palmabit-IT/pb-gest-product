describe("ProductPriceTest", function () {
  it("should get exception if list is not an object", function () {
    expect(function () {
      new ProductPrice()
    }).toThrow(new TypeError('list must be an object'));
  });

  it("should get exception if price is not an object", function () {
    expect(function () {
      new ProductPrice({})
    }).toThrow(new TypeError('product price must be an object'));
  });
});

describe("Product list with version", function () {
  var list, productPrice, obj,
    date1 = new Date(), date2 = new Date(), date3 = new Date(), date4 = new Date();

  date1 = date1.setDate(date1.getDate() - 100),
    date2 = date2.setDate(date2.getDate() - 1),
    date3 = date3.setDate(date3.getDate() + 100);
  date4 = date4.setDate(date4.getDate() + 200);

  beforeEach(function () {
    list = {
      name: 'L001',
      start: date2,
      end: date3,
      versions: [
        {
          name: '1',                  //not valid
          active: true,
          start: new Date(date1),
          end: new Date(date2)
        },
        {
          name: '2',                  //valid
          active: true,
          start: new Date(date2),
          end: new Date(date3)
        },
        {
          name: '3',                  //not valid
          active: false,
          start: new Date(date3),
          end: new Date(date4)
        },
        {
          name: '4',                  //not valid
          active: true,
          start: new Date(date3),
          end: new Date(date4)
        }
      ]
    };

    productPrice = {
      version: '2',
      price: 10
    };

    obj = new ProductPrice(list, productPrice);
  });

  it("should get price from list version", function () {
    expect(obj.getPrice()).toBe(10);
  });

  describe("Product list with not valit version", function () {
    it("should get price 0 if list version is not found", function () {
      var obj2 = new ProductPrice(list, {version: '5', price: 20});
      expect(obj2.getPrice()).toBe(0);
    });

    it("should get price 0 if list version is not active", function () {
      var obj2 = new ProductPrice(list, {version: '4', price: 20});
      expect(obj2.getPrice()).toBe(0);
    });

    it("should get price 0 if price is not setted", function () {
      var obj2 = new ProductPrice(list, {version: '2'});
      expect(obj2.getPrice()).toBe(0);
    });
  });

  describe("Product price without version", function () {
    var obj2;

    beforeEach(function () {
      obj2 = new ProductPrice(list, {price: 30});
    });

    it("should get price if base list is valid", function () {
      expect(obj2._getPriceWithoutVersion()).toBe(30);
      expect(obj2.getPrice()).toBe(30);
    });

    it("should get price 0 if base list is not valid", function () {
      list = {
        name: 'L001',
        start: date1,
        end: date2,
        versions: []
      }
      var obj3 = new ProductPrice(list, {price: 30});
      expect(obj3._getPriceWithoutVersion()).toBe(0);
      expect(obj3.getPrice()).toBe(0);
    });

    it("should get price if base list is not valid and a version is valid", function () {
      list.start = date1;
      list.end = date2;
      var obj3 = new ProductPrice(list, {price: 30});
      expect(obj3._getPriceWithoutVersion()).toBe(30);
      expect(obj3.getPrice()).toBe(30);
    });
  });
});

describe("Product discount without version", function () {
  var list, obj;

  beforeEach(function () {
    list = {
      name: 'L001'
    };

    obj = new ProductPrice(list, {
      discount: {
        name: 'adj1',
        fixed: 1,
        discounts: [10, 20, 30]
      }
    });
  });

  it("should get discount from list version", function () {
    var adj = obj.getDiscount();
    expect(adj.name).toBe('adj1');
    expect(adj.fixed).toBe(1);
    expect(adj.discounts).toEqual([10, 20, 30]);
  });
});

describe("Product discount with version", function () {
  var list, obj;

  beforeEach(function () {
    list = {
      name: 'L001',
      versions: [
        {
          name: '1',
          active: true
        }
      ]
    };

    obj = new ProductPrice(list, {
      version: '1',
      discount: {
        name: 'adj1',
        fixed: 1,
        discounts: [10, 20, 30]
      }
    });
  });

  it("should get discount from list version", function () {
    var adj = obj.getDiscount();
    expect(adj.name).toBe('adj1');
    expect(adj.fixed).toBe(1);
    expect(adj.discounts).toEqual([10, 20, 30]);
  });

  it("should get null discount if not valid version", function () {
    var obj2 = new ProductPrice(list, {version: '2'});
    var adj = obj2.getDiscount();
    expect(adj).toBeUndefined();
  });
});
