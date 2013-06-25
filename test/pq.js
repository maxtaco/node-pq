
var elements = {};

function make_el(key, priority) {
  elements[key] = { key : key, priority : priority};
}

make_el("albert", 1000);
make_el("frank", 400);
make_el("fran", -22);
make_el("georgi", 401);
make_el("jano", 300);
make_el("valentina", 1);
make_el("yando", 300);
make_el("zombie", 200);

function push_all(q) {
  for (var k in elements) {
    var val = elements[k];
    q.enq(val);
  }
}

describe('PriorityQueue()', function() {
  it('returns an new PriorityQueue', function() {
    expect(new PriorityQueue()).to.be.a(PriorityQueue);
  });

  it('accepts a comparator function', function() {
    var queue = new PriorityQueue({cmp : function(a, b) {
      return a - b;
    }});

    expect(queue).to.be.a(PriorityQueue);
  });
  describe('#is_empty()', function() {
    it('returns true when the queue is empty', function() {
      var queue = new PriorityQueue({});
      expect(queue.is_empty()).to.be(true);
    });

    it('returns false when the queue is not empty', function() {
      var queue = new PriorityQueue();
      queue.enq({ key : 'jano', priority : 10 });
      expect(queue.is_empty()).to.be(false);
    });
  });

  describe('#peek()', function() {
    it('fails when the queue is empty', function() {
      var queue = new PriorityQueue();
      expect(function() {
        queue.peek();
      }).to.throwException('PriorityQueue is empty');
    });

    it('returns the top element of the queue', function() {
      var queue = new PriorityQueue();
      push_all(queue);
      expect(queue.peek().key).to.be('fran');
    });
  });

  describe('#deq()', function() {
    it('fails when the queue is empty', function() {
      var queue = new PriorityQueue();
      expect(function() {
        queue.deq();
      }).to.throwException('PriorityQueue is empty');
    });

    it('dequeues the top element of the queue', function() {
      var queue = new PriorityQueue();
      push_all(queue);
      expect(queue.deq().key).to.be('fran');
      expect(queue.deq().key).to.be('valentina');
      expect(queue.deq().key).to.be('zombie');
      var set = {};
      set[queue.deq().key] = true;
      set[queue.deq().key] = true;
      expect(set.yando).to.be(true);
      expect(set.jano).to.be(true);
      expect(queue.deq().key).to.be('frank');
      expect(queue.deq().key).to.be('georgi');
      expect(queue.deq().key).to.be('albert');
      expect(queue.is_empty()).to.be(true);
    });

    it('not fails with only one element', function() {
      var queue = new PriorityQueue();
      queue.enq(elements.jano);
      expect(queue.deq().key).to.be('jano');
      expect(queue.size()).to.be(0);
    });

    it('works with custom comparators', function() {
      var queue = new PriorityQueue(function(a, b) {
        return b.priority - a.priority;
      });

      queue.enq({ priority: 100 });
      queue.enq({ priority: -1 });
      queue.enq({ priority: 0 });
      queue.enq({ priority: 5 });
      expect(queue.deq()).to.be.eql({ priority: -1 });
      expect(queue.deq()).to.be.eql({ priority: 0 });
      expect(queue.deq()).to.be.eql({ priority: 5 });
      expect(queue.deq()).to.be.eql({ priority: 100 });
      expect(queue.is_empty()).to.be(true);
    });
  });

  describe('#enq()', function() {
    it('enqueues an element at the end of the queue', function() {
      var queue = new PriorityQueue();
      queue.enq(elements.jano);
      queue.enq(elements.valentina);
      queue.enq(elements.fran);
      expect(queue.peek().key).to.be('fran');
      expect(queue.size()).to.be(3);
    });

    it('returns the new size of the queue', function() {
      var queue = new PriorityQueue();
      expect(queue.enq(elements.jano)).to.be(1);
    });

    it('works with custom comparators', function() {
      var queue = new PriorityQueue(function(a, b) {
        return b.priority - a.priority;
      });

      queue.enq({ priority: 100 });
      queue.enq({ priority: -1 });
      queue.enq({ priority: 0 });
      queue.enq({ priority: 5 });
      expect(queue.peek()).to.be.eql({ priority: -1 });
      expect(queue.size()).to.be(4);
    });

    it('changes keys properly', function () {
      var queue = new PriorityQueue();
      push_all(queue);
      queue.change_key('yando',-3000);
      expect(queue.deq().key).to.be('yando');
      expect(queue.deq().key).to.be('fran');
      queue.change_key('valentina', 1000000);
      expect(queue.deq().key).to.be('zombie');
      expect(queue.deq().key).to.be('jano');
      expect(queue.deq().key).to.be('frank');
      expect(queue.deq().key).to.be('georgi');
      expect(queue.deq().key).to.be('albert');
      expect(queue.deq().key).to.be('valentina');
      expect(queue.is_empty()).to.be(true);
    });
  });

  describe('#size()', function() {
    it('returns 0 when the queue is empty', function() {
      var queue = new PriorityQueue();
      expect(queue.size()).to.be(0);
    });

    it('returns the size of the queue', function() {
      var queue = new PriorityQueue();
      queue.enq('jano');
      queue.enq('valentina');
      expect(queue.size()).to.be(2);
    });
  });
});
