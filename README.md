# node-pq

A Priority Queue for NodeJS in CoffeeScript.  It offers three major
operations: `enq`, `deq`, and `change_key`.  You can use it to 
manage the nodes to visit in Dijkstra's algorithm.  By default,
the minimum object is at the top of the heap, though you can change
the ordering with your own comparitor function.

## Install

```
npm install pq2
```

## Use

```coffeescript
pq = new ProrityQueue {}
pq.enq { key : 'max', priority : 3 }     # returns 1, the new size of the PQ
pq.enq { key : 'blah', priority : 1 }    # returns 2, etc...
pq.peek()                                # returns { key : 'blah', priority : 1 }
pq.deq()                                 # returns { key : 'blah', priority : 1 }
pq.peek()                                # returns { key : 'max', priority : 3 }
pq.deq()                                 # returns { key : 'max', priority : 3 }
pq.enq { key : 'max', priority : 3 }     # returns 1, the new size of the PQ
pq.enq { key : 'blah', priority : 1 }    # returns 2, etc...
pq.change_key 'max', -3                  # returns null
pq.deq()                                 # returns { key : 'max', priority : -3 }
```


## Contributors

Written by @maxtaco

The original template for this PQ is from @janogonzalez's priorityqueuejs, available
at https://github.com/janogonzalez/priorityqueuejs


