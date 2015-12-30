describe("ItemLotsTest", function () {
  var item, itemNoLots;

  beforeEach(function () {
    item = {
      noLots: {quantity: 3}
    };
    itemNoLots = new ItemNoLots(item);
  });

  it("should set max quantity", function () {
    expect(item.noLots.maxQty).toBe(3);
  });

  it("should set initial quantity", function () {
    expect(item.noLots.quantity).toBe(1);
  });

  it("should increment", function () {
    itemNoLots.increment().increment();
    expect(itemNoLots.get().noLots.quantity).toBe(3);
  });

  it("should increment until max quantity", function () {
    itemNoLots.increment().increment().increment().increment().increment();
    expect(itemNoLots.get().noLots.quantity).toBe(3);
  });

  it("should decrement", function () {
    itemNoLots.decrement().decrement();
    expect(itemNoLots.get().noLots.quantity).toBe(0);
  });
});
