describe("ItemFactoryTest", function () {
  it("should has exception if parameter is not an object", function () {
    expect(function(){new ItemFactory()}).toThrow(new Error('item must be an object'));
  });

  it("should instantiate ItemIntangible class", function () {
    var factory = new ItemFactory({intangible: true});
    expect(factory instanceof ItemIntangible).toBeTruthy();
  });

  it("should instantiate ItemLots class", function () {
    var factory = new ItemFactory({hasLots: true});
    expect(factory instanceof ItemLots).toBeTruthy();
  });
});
