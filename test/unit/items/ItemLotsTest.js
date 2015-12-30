describe("ItemLotsTest", function () {
  var item, itemLots;

  beforeEach(function () {
    item = {
      lots: [
        {quantity: 3},
        {quantity: 4}
      ]
    };
    itemLots = new ItemLots(item);
  });

  it("should set max quantity", function () {
    expect(item.lots[0].maxQty).toBe(3);
    expect(item.lots[1].maxQty).toBe(4);
  });

  it("should set initial quantity", function () {
    expect(item.lots[0].quantity).toBe(1);
    expect(item.lots[1].quantity).toBe(0);
  });

  it("should increment", function () {
    itemLots.increment(0).increment(0).increment(1).increment(1);
    expect(itemLots.get().lots[0].quantity).toBe(3);
    expect(itemLots.get().lots[1].quantity).toBe(2);
  });

  it("should increment until max quantity", function () {
    itemLots.increment(0).increment(0).increment(0).increment(0).increment(0);
    itemLots.increment(1).increment(1).increment(1).increment(1).increment(1);
    expect(itemLots.get().lots[0].quantity).toBe(3);
    expect(itemLots.get().lots[1].quantity).toBe(4);
  });

  it("should decrement", function () {
    itemLots.decrement(0).decrement(0).decrement(1).decrement(1);
    expect(itemLots.get().lots[0].quantity).toBe(0);
    expect(itemLots.get().lots[1].quantity).toBe(0);
  });
});
