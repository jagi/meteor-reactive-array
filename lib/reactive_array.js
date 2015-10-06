var changed = function(v) {
  v && v.changed();
};

ReactiveArray = function(array) {
  this._length = 0;
  this._values = [];

  // Dependencies.
  this._allDep = new Tracker.Dependency;
  this._lengthDep = new Tracker.Dependency;
  this._indexesDeps = [];

  // Initialize an array.
  if (array) {
    this.set(array);
  }
};

_.extend(ReactiveArray.prototype, {
  _ensureIndex: function(index) {
    if (!this._indexesDeps[index]) {
      this._indexesDeps[index] = new Tracker.Dependency;
    }
  },

  // Getters.

  _getOne: function(index) {
    this._ensureIndex(index);
    this._indexesDeps[index].depend();

    return this._values[index];
  },

  _getAll: function() {
    var self = this;

    self._allDep.depend();

    var values = new Array(this._values.length);
    _.each(this._values, function(value, index) {
      values[index] = _.isUndefined(value) ? null : value;
    });

    return values;
  },

  get: function() {
    if (arguments.length === 0) {
      return this._getAll.apply(this, arguments);
    } else if (arguments.length === 1) {
      return this._getOne.apply(this, arguments);
    }
  },

  length: function() {
    this._lengthDep.depend();

    return this._values.length;
  },

  slice: function(beg, end) {
    beg = _.isNumber(beg) ? beg : 0;
    end = _.isNumber(end) ? end : this._values.length;

    var result = this._values.slice.apply(this._values, arguments);

    if (beg < 0 || end < 0) {
      this._allDep.depend();
      return result;
    }

    for (var i = beg; i < end; i++) {
      this._ensureIndex(i);
      this._indexesDeps[i].depend();
    }

    return result;
  },

  // Modifiers.

  _setOne: function(index, value) {
    // If value has not changed than do nothing.
    if (value === this._values[index]) {
      return;
    }

    // Get a current length of an array.
    var length = this._values.length;
    this._values[index] = value;

    if (length < index) {
      this._lengthDep.changed();
    }
    this._allDep.changed();
    changed(this._indexesDeps[index]);
  },

  _setAll: function(values) {
    var orgLength = this._values.length;
    this._values = values.slice();
    var newLength = this._values.length;

    if (orgLength !== newLength) {
      this._lengthDep.changed();
    }
    this._allDep.changed();
    var length = Math.max(orgLength, newLength);
    for (var i = 0; i < length; i++) {
      changed(this._indexesDeps[i]);
    }
  },

  set: function() {
    if (arguments.length === 1 && _.isArray(arguments[0])) {
      this._setAll.apply(this, arguments);
    } else if (arguments.length === 2) {
      this._setOne.apply(this, arguments);
    }
  },

  push: function() {
    this._values.push.apply(this._values, arguments);
    var from = this._values.length - arguments.length;

    this._lengthDep.changed();
    this._allDep.changed();
    for (var i = from; i < this._values.length; i++) {
      changed(this._indexesDeps[i]);
    }

    return length;
  },

  pop: function() {
    if (this._values.length === 0) {
      return;
    }

    var popped = this._values.pop();
    this._lengthDep.changed();
    this._allDep.changed();
    changed(this._indexesDeps[this._values.length]);

    return popped;
  },

  unshift: function() {
    this._values.unshift.apply(this._values, arguments);

    this._lengthDep.changed();
    this._allDep.changed();
    for (var i = 0; i < this._values.length; i++) {
      changed(this._indexesDeps[i]);
    }

    return this._values.length;
  },

  shift: function() {
    if (this._values.length === 0) {
      return;
    }

    var shifted = this._values.shift();

    this._lengthDep.changed();
    this._allDep.changed();
    for (var i = 0; i <= this._values.length; i++) {
      changed(this._indexesDeps[i]);
    }

    return shifted;
  }
});
