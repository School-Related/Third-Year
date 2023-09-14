# Rules of Towers of hanoi. 

(a1, a2, a3), (b1, b2, b3), (c1, c2, c3) = ([1, 2, 3], [0, 0, 0], [0, 0, 0])
[A, B, C]
given, a < b < c

// if both are empty, then move the small one from a to c or b
[(a, b, c), (0, 0, 0), (0, 0, 0)] -> [if B.isempty() && C.isempty() -> 
(0, b, c), (0, 0, a), (0, 0, 0) || (0, b, c), (0, 0, 0), (0, 0, a)]

(0, b, c), (0, 0, a), (0, 0, 0) -> if C.isempty() and a.top() > b.top() -> [(0, 0, c), (0, 0, a), (0, 0, b)]

(0, b, c), (0, 0, 0), (0, 0, a) -> if B.isempty() and a.top() > c.top() -> [(0, 0, c), (0, 0, b), (0, 0, a)]

// for b and c do the same thing. 
