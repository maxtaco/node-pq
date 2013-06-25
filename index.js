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

    PriorityQueue.prototype.deq = function() {
      var c, first, l, last, min, r, size;
      first = this.peek();
      last = this._elements.pop();
      size = this.size();
      delete this._index[this._get_key(first)];
      if (size > 0) {
        c = 0;
        this._set(c, last);
        while ((0 <= c && c < size)) {
          min = c;
          if ((l = this._lchild(c)) < size && this._i_cmp(l, min) < 0) {
            min = l;
          }
          if ((r = this._rchild(c)) < size && this._i_cmp(r, min) < 0) {
            min = r;
          }
          if (min === c) {
            c = -1;
          } else {
            c = this._swap(min, c);
          }
        }
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

    PriorityQueue.prototype.decrease_key = function(key, val) {
      var c;
      c = this._index[key];
      if (c == null) {
        throw new Error("Key " + key + " not found");
      } else if (this._cmp(val, this._i_get_pri(c)) > 0) {
        throw new Error("key increased!");
      }
      this._i_set_pri(c, val);
      return this._bubble_up(c);
    };

    return PriorityQueue;

  })();

}).call(this);
