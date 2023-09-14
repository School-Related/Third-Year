food(burger).
food(sandwich).
food(pizza).
lunch(sandwich).
dinner(pizza).

meal(X) :- food(X).

/*
?- meal(burger).
true.

?- dinner(sandwich).
false.

?- meal(sandwich).
true.
*/