describe("AbstractVersionableTest", function () {
  var obj, versionable,
      date1 = new Date(), date2 = new Date(), date3 = new Date(), date4 = new Date();

  date1 = date1.setDate(date1.getDate() - 100),
  date2 = date2.setDate(date2.getDate() - 1),
  date3 = date3.setDate(date3.getDate() + 100);
  date4 = date4.setDate(date4.getDate() + 200);

  beforeEach(function () {
    obj = {
      name: 'V001',
      start: date2,
      end: date3,
      versions : [
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

    versionable = new AbstractVersionable(obj);
  });

  it("should check if obj has a version", function () {
    expect(versionable.hasVersion({version: '1'})).toBeTruthy();
  });

  it("should check if obj has versions", function () {
    expect(versionable.hasVersions()).toBeTruthy();
  });

  it("should search a specific obj version", function () {
    expect(typeof versionable.findVersion('1')).toBe('object');
  });

  it("should check if obj version is active", function () {
    expect(versionable.isActive(obj.versions[1])).toBeTruthy();
    expect(versionable.isActive(obj.versions[2])).toBeFalsy();
  });

  it("should check if obj version is valid", function () {
    expect(versionable.isValid(obj.versions[1])).toBeTruthy();
    expect(versionable.isValid(obj.versions[2])).toBeFalsy();
  });
});
