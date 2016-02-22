describe("ItemManagerTest", function () {
  it("should has exception if item is not an object", function () {
    expect(function(){new ItemManager()}).toThrow(new Error('item must be an object'));
  });

  it("should increment item with max quantity", function () {
    var item = {
      maxQty: 2,
      quantity: 1
    };
    var itemManager = new ItemManager(item);

    itemManager.increment().increment();

    expect(itemManager.get().quantity).toBe(2);
  });

  it("should increment intangible item", function () {
    var item = {
      maxQty: 2,
      quantity: 1,
      intangible: true
    };
    var itemManager = new ItemManager(item);

    itemManager.increment().increment();

    expect(itemManager.get().quantity).toBe(3);
  });

  it("should decrement", function () {
    var item = {
      quantity: 1
    };
    var itemManager = new ItemManager(item);

    itemManager.decrement().decrement();

    expect(itemManager.get().quantity).toBe(0);
  });
});
