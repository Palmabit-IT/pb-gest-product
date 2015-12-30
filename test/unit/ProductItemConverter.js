describe("ProductItemConverterTest", function () {
  // describe("Products converter", function () {
  //   var products, items;
  //
  //   beforeEach(function () {
  //     items = [];
  //
  //     products = [
  //       {
  //         _id: 1,
  //         price: 2,
  //         intangible: false,
  //         lots: [
  //           {lot: 'a', quantity: 10},
  //           {lot: 'b', quantity: 20}
  //         ]
  //       },
  //       {
  //         _id: 2,
  //         price: 3,
  //         intangible: false,
  //         lots: [
  //           {quantity: 30},
  //           {quantity: 40}
  //         ]
  //       },
  //       {
  //         _id: 3,
  //         price: 4,
  //         intangible: true,
  //         quantity: 60
  //       }
  //     ];
  //   });
  //
  //   it("should add products with lots to items", function () {
  //     var converter = new ProductItemConverter();
  //     converter._addProductWithLots(products[0]);
  //     expect(converter.products.length).toBe(2);
  //   });
  //
  //   it("should add products without lots to items", function () {
  //     var converter = new ProductItemConverter();
  //     converter._addProductWithLots(products[1]);
  //     expect(converter.products.length).toBe(2);
  //   });
  //
  //   it("should add intangible products to items", function () {
  //     var converter = new ProductItemConverter();
  //     converter._addProductIntangible(products[2]);
  //     expect(converter.products.length).toBe(1);
  //   });
  //
  //   it("should add products to items", function () {
  //     var converter = new ProductItemConverter();
  //     converter.add(products, items);
  //     expect(items.length).toBe(4);
  //     expect(items[0].quantity).toBe(10);
  //     expect(items[1].quantity).toBe(20);
  //     expect(items[2].quantity).toBe(70);
  //     expect(items[3].quantity).toBe(60);
  //   });
  // });

  describe("Products converter with max quantity", function () {
    var products, items;

    beforeEach(function () {
      items = [
        {
          _id: 1,
          price: 2,
          quantity: 5,
          maxQty: 5,
          intangible: false,
          lot: {
            lot: 'a'
          }
        },
        {
          _id: 2,
          price: 3,
          quantity: 30,
          maxQty: 40,
          intangible: false,
          lot: {}
        },
        {
          _id: 3,
          price: 4,
          quantity: 10,
          maxQty: 1,
          intangible: true
        }
      ];

      products = [
        {
          _id: 1,
          price: 2,
          intangible: false,
          lots: [
            {lot: 'a', quantity: 10}
          ]
        },
        {
          _id: 2,
          price: 3,
          intangible: false,
          lots: [
            {quantity: 10}
          ]
        },
        {
          _id: 3,
          price: 4,
          intangible: true,
          quantity: 60,
          maxQty: 1
        }
      ];
    });

    it("should add products to items with max quantity", function () {
      var converter = new ProductItemConverter();
      converter.add(products, items);
      expect(items.length).toBe(3);
      // expect(items[0].quantity).toBe(5);
      // expect(items[1].quantity).toBe(40);
      // expect(items[2].quantity).toBe(70);
    });
  });
});
