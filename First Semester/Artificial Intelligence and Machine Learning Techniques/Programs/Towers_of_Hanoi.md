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

# rules for missionaries and cannibals

# Initial State, Final State                                                              
MMMCCC, 0 -> 0, MMMCCC

# Rules
# 1. 1 or 2 missionaries can travel in the boat
# 2. 1 or 2 cannibals can travel in the boat
# 3. If there are missionaries on the bank, then the number of cannibals on the bank should be less than or equal to the number of missionaries on the bank.


