describe('Jasmine Test', function() {


  describe("A spy - toHaveBeenCalled, toHaveBeenCalledWith", function() {
    var foo, bar = null;

    beforeEach(function() {
      foo = {
        setBar: function(value) {
          bar = value;
        }
      };

      spyOn(foo, 'setBar');
      foo.setBar(555);
      foo.setBar(123);
      foo.setBar(456, 'another param');
    });

    it("tracks that the spy was called", function() {
      expect(foo.setBar).toHaveBeenCalled();
    });

    it("tracks all the arguments of its calls", function() {
      expect(foo.setBar).toHaveBeenCalledWith(555);
      expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
    });

    it("stops all execution on a function", function() {
      expect(bar).toBeNull();
    });
  });

  describe("A spy, when configured to call through", function() {
    var foo, bar, fetchedBar;

    beforeEach(function() {
      foo = {
        setBar: function(value) {
          bar = value;
        },
        getBar: function() {
          return bar;
        }
      };

      spyOn(foo, 'getBar').and.callThrough();

      foo.setBar(123);
      //fetchedBar = foo.getBar();
    });

    it("tracks that the spy was called", function() {
      foo.getBar();
      foo.getBar(123);
      foo.getBar();
      expect(foo.getBar).toHaveBeenCalled();
      expect(foo.getBar.calls.count()).toEqual(3);
    });

    it("should not affect other functions", function() {
      expect(bar).toEqual(123);
    });

    it("when called returns the requested value", function() {
      expect(foo.getBar()).toEqual(123);
    });
  });


  describe("A spy - stub", function() {
    var foo, bar = null;

    beforeEach(function() {
      foo = {
        setBar: function(value) {
          bar = value;
        }
      };

      /*
      spyOn(foo, 'setBar') = spyOn(foo, 'setBar').and.stub()
      */
      spyOn(foo, 'setBar').and.callThrough();
    });

    it("can call through and then stub in the same spec", function() {
      foo.setBar(123);
      expect(bar).toEqual(123);

      foo.setBar.and.stub(); // 原本是callThourgh, 現在又把它stub起來
      bar = null;

      foo.setBar(123);
      expect(bar).toBe(null);
      expect(foo.setBar.calls.count()).toEqual(2);

      foo.setBar.and.returnValue(1234); // 設不進去..
      foo.setBar(111);
      expect(bar).toBe(null);
    });



  });



  describe("A spy, when configured to fake a return value", function() {
    var foo, bar, fetchedBar;

    beforeEach(function() {
      foo = {
        setBar: function(value) {
          bar = value;
        },
        getBar: function() {
          return bar;
        }
      };

      spyOn(foo, "getBar").and.returnValue(745);

      foo.setBar(123);
      fetchedBar = foo.getBar();
    });

    it("tracks that the spy was called", function() {
      expect(foo.getBar).toHaveBeenCalled();
    });

    it("should not affect other functions", function() {
      expect(bar).toEqual(123);
    });

    it("when called returns the requested value", function() {
      expect(fetchedBar).toEqual(745);
    });
  });

});
