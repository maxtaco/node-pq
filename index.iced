
class PriorityQueue

  # Default comparitor
  cmp : (a,b) -> if a > b then 1 else -1

  constructor : ({cmp}) ->
    @cmp = cmp if cmp?

