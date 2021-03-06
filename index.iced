##=============================================================

exports.PriorityQueue = class PriorityQueue

  _cmp     : (a,b) -> (a - b)
  _get_key : (a)   -> a.key
  _get_pri : (a)   -> a.priority
  _set_pri : (a,v) -> a.priority = v

  #---------------

  constructor : (opts = {}) ->
    {cmp, get_key, get_pri, set_pri} = opts
    @_cmp = cmp if cmp?
    @_get_key = get_key if get_key?
    @_set_pri = set_pri if set_pri?
    @_get_pri = get_pri if get_pri?
    @_elements = []
    @_index = {}

  #---------------
  
  is_empty : () -> @size() is 0
  size : () -> @_elements.length

  peek : () ->
    if @is_empty() then throw new Error "PriorityQueue is empty"
    @_elements[0]

  #---------------
  
  _lchild : (i)   -> 2*i + 1
  _rchild : (i)   -> 2*i + 2
  _parent : (i)   -> (i - 1) >> 1

  #---------------
  
  _i_cmp     : (i,j) -> @_cmp(@_i_get_pri(i), @_i_get_pri(j))
  _i_get_key : (i)   -> @_get_key @_elements[i]
  _i_get_pri : (i)   -> @_get_pri @_elements[i]
  _i_set_pri : (i,v) -> @_set_pri @_elements[i], v

  #---------------
  
  _indexify : (i) -> @_index[@_i_get_key i] = i
  _set : (i, val) -> 
    @_elements[i] = val
    @_indexify i

  _swap : (i,j) ->
    tmp = @_elements[i]
    @_set i, @_elements[j]
    @_set j, tmp
    i

  #---------------

  _bubble_up : (c) ->
    c = @_swap(p, c) while (c > 0) and @_i_cmp((p = @_parent c), c) > 0
    true

  _bubble_down : (c) -> 
    size = @size()
    while 0 <= c < size
      min = c
      min = l if (l = @_lchild c) < size and @_i_cmp(l, min) < 0
      min = r if (r = @_rchild c) < size and @_i_cmp(r, min) < 0
      if min is c then c = -1
      else c = @_swap min, c

  #---------------

  deq : () ->
    first = @peek()
    last = @_elements.pop()
    delete @_index[@_get_key first]
    unless @is_empty()
      @_set 0, last
      @_bubble_down 0
    first

  #---------------

  enq : (el) ->
    size = @_elements.push el
    current = size - 1
    @_indexify current
    @_bubble_up current
    size

  #---------------

  lookup : (key) -> @_elements[@_index[key]]

  #---------------

  check : () -> @_check 0

  #---------------

  _check : (i) ->
    l = @_lchild i
    r = @_rchild i
    if l < @size()
      if (@_i_cmp i, l) > 0 then throw new Error "misordering at #{i} v #{l}"
      @_check l
    if r < @size()
      if (@_i_cmp i, r) > 0 then throw new Error "misordering at #{i} v #{r}"
      @_check r

  #---------------

  change_key : (key, val) ->
    if (c = @_index[key])?
      cmp = @_cmp val, @_i_get_pri c
      @_i_set_pri c, val
      if cmp > 0 then @_bubble_down c
      else @_bubble_up c
      true
    else false

##=============================================================
