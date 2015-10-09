Tinytest.add('ReactiveArray', function(test) {
  var array = new ReactiveArray(['a', 'b', 'c', 'd']);

  var autorun = [];
  var returned;
  var get0;
  Tracker.autorun(function() {
    get0 = array.get(0);
    autorun.push('get0');
  });
  var get1;
  Tracker.autorun(function() {
    get1 = array.get(1);
    autorun.push('get1');
  });
  var getAll;
  Tracker.autorun(function() {
    getAll = array.get();
    autorun.push('getAll');
  });
  var slice;
  Tracker.autorun(function() {
    slice = array.slice();
    autorun.push('slice');
  });
  var sliceFrom1To3;
  Tracker.autorun(function() {
    sliceFrom1To3 = array.slice(1, 3);
    autorun.push('sliceFrom1To3');
  });
  var length;
  Tracker.autorun(function() {
    length = array.length();
    autorun.push('length');
  });

  test.equal(get0, 'a',
    'Initial: Wrong value from the "get(0)" method'
  );
  test.equal(get1, 'b',
    'Initial: Wrong value from the "get(1)" method'
  );
  test.equal(getAll, ['a', 'b', 'c', 'd'],
    'Initial: Wrong value from the "get()" method'
  );
  test.equal(slice, ['a', 'b', 'c', 'd'],
    'Initial: Wrong value from the "slice()" method'
  );
  test.equal(sliceFrom1To3, ['b', 'c'],
    'Initial: Wrong value from the "slice(1, 3)" method'
  );
  test.equal(length, 4,
    'Initial: Wrong value from the "length()" method'
  );
  test.equal(
    autorun.sort(),
    ['get0', 'get1', 'getAll', 'length', 'slice', 'sliceFrom1To3'].sort(),
    'Initial: Wrong autorun functions executed'
  );

  // Set existing.
  autorun = [];
  returned = array.set(0, 'x');
  Tracker.flush();
  test.equal(returned, 'x',
    'Set existing: Wrong returned value from the "set(0)" method'
  );
  test.equal(get0, 'x',
    'Set existing: Wrong value from the "get(0)" method'
  );
  test.equal(get1, 'b',
    'Set existing: Wrong value from the "get(1)" method'
  );
  test.equal(getAll, ['x', 'b', 'c', 'd'],
    'Set existing: Wrong value from the "get()" method'
  );
  test.equal(slice, ['x', 'b', 'c', 'd'],
    'Set existing: Wrong value from the "slice()" method'
  );
  test.equal(sliceFrom1To3, ['b', 'c'],
    'Set existing: Wrong value from the "slice(1, 3)" method'
  );
  test.equal(length, 4,
    'Set existing: Wrong value from the "length()" method'
  );
  test.equal(
    autorun.sort(),
    ['getAll', 'get0', 'slice'].sort(),
    'Set existing: Wrong autorun functions executed'
  );

  // Push.
  autorun = [];
  returned = array.push('e');
  Tracker.flush();
  test.equal(returned, 5,
    'Push: Wrong returned value from the "push()" method'
  );
  test.equal(get0, 'x',
    'Push: Wrong value from the "get(0)" method'
  );
  test.equal(get1, 'b',
    'Push: Wrong value from the "get(1)" method'
  );
  test.equal(getAll, ['x', 'b', 'c', 'd', 'e'],
    'Push: Wrong value from the "get()" method'
  );
  test.equal(slice, ['x', 'b', 'c', 'd', 'e'],
    'Push: Wrong value from the "slice()" method'
  );
  test.equal(sliceFrom1To3, ['b', 'c'],
    'Push: Wrong value from the "slice(1, 3)" method'
  );
  test.equal(length, 5,
    'Push: Wrong value from the "length()" method'
  );
  test.equal(
    autorun.sort(),
    ['getAll', 'length', 'slice'].sort(),
    'Push: Wrong autorun functions executed'
  );

  // Pop.
  autorun = [];
  returned = array.pop();
  Tracker.flush();
  test.equal(returned, 'e',
    'Pop: Wrong returned value from the "pop()" method'
  );
  test.equal(get0, 'x',
    'Pop: Wrong value from the "get(0)" method'
  );
  test.equal(get1, 'b',
    'Pop: Wrong value from the "get(1)" method'
  );
  test.equal(getAll, ['x', 'b', 'c', 'd'],
    'Pop: Wrong value from the "get()" method'
  );
  test.equal(slice, ['x', 'b', 'c', 'd'],
    'Pop: Wrong value from the "slice()" method'
  );
  test.equal(sliceFrom1To3, ['b', 'c'],
    'Pop: Wrong value from the "slice(1, 3)" method'
  );
  test.equal(length, 4,
    'Pop: Wrong value from the "length()" method'
  );
  test.equal(
    autorun.sort(),
    ['getAll', 'length', 'slice'].sort(),
    'Pop: Wrong autorun functions executed'
  );

  // Unshift.
  autorun = [];
  returned = array.unshift('y');
  Tracker.flush();
  test.equal(returned, 5,
    'Unshift: Wrong returned value from the "unshift()" method'
  );
  test.equal(get0, 'y',
    'Unshift: Wrong value from the "get(0)" method'
  );
  test.equal(get1, 'x',
    'Unshift: Wrong value from the "get(1)" method'
  );
  test.equal(getAll, ['y', 'x', 'b', 'c', 'd'],
    'Unshift: Wrong value from the "get()" method'
  );
  test.equal(slice, ['y', 'x', 'b', 'c', 'd'],
    'Unshift: Wrong value from the "slice()" method'
  );
  test.equal(sliceFrom1To3, ['x', 'b'],
    'Unshift: Wrong value from the "slice(1, 3)" method'
  );
  test.equal(length, 5,
    'Unshift: Wrong value from the "length()" method'
  );
  test.equal(
    autorun.sort(),
    ['get0', 'get1', 'getAll', 'length', 'slice', 'sliceFrom1To3'].sort(),
    'Unshift: Wrong autorun functions executed'
  );

  // Shift.
  autorun = [];
  returned = array.shift();
  Tracker.flush();
  test.equal(returned, 'y',
    'Shift: Wrong returned value from the "shift()" method'
  );
  test.equal(get0, 'x',
    'Shift: Wrong value from the "get(0)" method'
  );
  test.equal(get1, 'b',
    'Shift: Wrong value from the "get(1)" method'
  );
  test.equal(getAll, ['x', 'b', 'c', 'd'],
    'Shift: Wrong value from the "get()" method'
  );
  test.equal(slice, ['x', 'b', 'c', 'd'],
    'Shift: Wrong value from the "slice()" method'
  );
  test.equal(sliceFrom1To3, ['b', 'c'],
    'Shift: Wrong value from the "slice(1, 3)" method'
  );
  test.equal(length, 4,
    'Shift: Wrong value from the "length()" method'
  );
  test.equal(
    autorun.sort(),
    ['get0', 'get1', 'getAll', 'length', 'slice', 'sliceFrom1To3'].sort(),
    'Shift: Wrong autorun functions executed'
  );

  // Set all.
  autorun = [];
  returned = array.set(['u', 'v', 'w']);
  Tracker.flush();
  test.equal(returned, ['u', 'v', 'w'],
    'Shift: Wrong returned value from the "set([])" method'
  );
  test.equal(get0, 'u',
    'Shift: Wrong value from the "get(0)" method'
  );
  test.equal(get1, 'v',
    'Shift: Wrong value from the "get(1)" method'
  );
  test.equal(getAll, ['u', 'v', 'w'],
    'Shift: Wrong value from the "get()" method'
  );
  test.equal(slice, ['u', 'v', 'w'],
    'Shift: Wrong value from the "slice()" method'
  );
  test.equal(sliceFrom1To3, ['v', 'w'],
    'Shift: Wrong value from the "slice(1, 3)" method'
  );
  test.equal(length, 3,
    'Shift: Wrong value from the "length()" method'
  );
  test.equal(
    autorun.sort(),
    ['get0', 'get1', 'getAll', 'length', 'slice', 'sliceFrom1To3'].sort(),
    'Shift: Wrong autorun functions executed'
  );
});
