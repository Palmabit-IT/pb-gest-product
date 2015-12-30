describe("ItemIntangibleTest", function () {
  var item, itemIntangible;

  beforeEach(function () {
    item = {quantity: 1};
    itemIntangible = new ItemIntangible(item);
  });

  it("should set initial quantity", function () {
    expect(item.quantity).toBe(1);
  });

  it("should increment", function () {
    itemIntangible.increment().increment();
    expect(itemIntangible.get().quantity).toBe(3);
  });

  it("should decrement", function () {
    itemIntangible.decrement().decrement();
    expect(itemIntangible.get().quantity).toBe(0);
  });
});
