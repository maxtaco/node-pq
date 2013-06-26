(function() {
  var PriorityQueue;



  exports.PriorityQueue = PriorityQueue = (function() {
    PriorityQueue.prototype._cmp = function(a, b) {
      return a - b;
    };

    PriorityQueue.prototype._get_key = function(a) {
      return a.key;
    };

    PriorityQueue.prototype._get_pri = function(a) {
      return a.priority;
    };

    PriorityQueue.prototype._set_pri = function(a, v) {
      return a.priority = v;
    };

    function PriorityQueue(opts) {
      var cmp, get_key, get_pri, set_pri;
      if (opts == null) {
        opts = {};
      }
      cmp = opts.cmp, get_key = opts.get_key, get_pri = opts.get_pri, set_pri = opts.set_pri;
      if (cmp != null) {
        this._cmp = cmp;
      }
      if (typeof key !== "undefined" && key !== null) {
        this._get_key = key;
      }
      if (set_pri != null) {
        this._set_pri = set_pri;
      }
      if (get_pri != null) {
        this._get_pri = get_pri;
      }
      this._elements = [];
      this._index = {};
    }

    PriorityQueue.prototype.is_empty = function() {
      return this.size() === 0;
    };

    PriorityQueue.prototype.size = function() {
      return this._elements.length;
    };

    PriorityQueue.prototype.peek = function() {
      if (this.is_empty()) {
        throw new Error("PriorityQueue is empty");
      }
      return this._elements[0];
    };

    PriorityQueue.prototype._lchild = function(i) {
      return 2 * i + 1;
    };

    PriorityQueue.prototype._rchild = function(i) {
      return 2 * i + 2;
    };

    PriorityQueue.prototype._parent = function(i) {
      return (i - 1) >> 1;
    };

    PriorityQueue.prototype._i_cmp = function(i, j) {
      return this._cmp(this._i_get_pri(i), this._i_get_pri(j));
    };

    PriorityQueue.prototype._i_get_key = function(i) {
      return this._get_key(this._elements[i]);
    };

    PriorityQueue.prototype._i_get_pri = function(i) {
      return this._get_pri(this._elements[i]);
    };

    PriorityQueue.prototype._i_set_pri = function(i, v) {
      return this._set_pri(this._elements[i], v);
    };

    PriorityQueue.prototype._indexify = function(i) {
      return this._index[this._i_get_key(i)] = i;
    };

    PriorityQueue.prototype._set = function(i, val) {
      this._elements[i] = val;
      return this._indexify(i);
    };

    PriorityQueue.prototype._swap = function(i, j) {
      var tmp;
      tmp = this._elements[i];
      this._set(i, this._elements[j]);
      this._set(j, tmp);
      return i;
    };

    PriorityQueue.prototype._bubble_up = function(c) {
      var p;
      while ((c > 0) && this._i_cmp((p = this._parent(c)), c) > 0) {
        c = this._swap(p, c);
      }
      return true;
    };

    PriorityQueue.prototype._bubble_down = function(c) {
      var l, min, r, size, _results;
      size = this.size();
      _results = [];
      while ((0 <= c && c < size)) {
        min = c;
        if ((l = this._lchild(c)) < size && this._i_cmp(l, min) < 0) {
          min = l;
        }
        if ((r = this._rchild(c)) < size && this._i_cmp(r, min) < 0) {
          min = r;
        }
        if (min === c) {
          _results.push(c = -1);
        } else {
          _results.push(c = this._swap(min, c));
        }
      }
      return _results;
    };

    PriorityQueue.prototype.deq = function() {
      var first, last;
      first = this.peek();
      last = this._elements.pop();
      delete this._index[this._get_key(first)];
      if (!this.is_empty()) {
        this._set(0, last);
        this._bubble_down(0);
      }
      return first;
    };

    PriorityQueue.prototype.enq = function(el) {
      var current, size;
      size = this._elements.push(el);
      current = size - 1;
      this._indexify(current);
      this._bubble_up(current);
      return size;
    };

    PriorityQueue.prototype.lookup = function(key) {
      return this._elements[this._index[key]];
    };

    PriorityQueue.prototype.check = function() {
      return this._check(0);
    };

    PriorityQueue.prototype._check = function(i) {
      var l, r;
      l = this._lchild(i);
      r = this._rchild(i);
      if (l < this.size()) {
        if ((this._i_cmp(i, l)) > 0) {
          throw new Error("misordering at " + i + " v " + l);
        }
        this._check(l);
      }
      if (r < this.size()) {
        if ((this._i_cmp(i, r)) > 0) {
          throw new Error("misordering at " + i + " v " + r);
        }
        return this._check(r);
      }
    };

    PriorityQueue.prototype.change_key = function(key, val) {
      var c, cmp;
      if ((c = this._index[key]) != null) {
        cmp = this._cmp(val, this._i_get_pri(c));
        this._i_set_pri(c, val);
        if (cmp > 0) {
          this._bubble_down(c);
        } else {
          this._bubble_up(c);
        }
        return true;
      } else {
        return false;
      }
    };

    return PriorityQueue;

  })();

}).call(this);
