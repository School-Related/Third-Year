bigger(elephant, horse).
bigger(horse, donkey).
bigger(donkey, dog).
bigger(donkey, monkey).


/*
?- bigger(donkey, dog).
true.

?- bigger(monkey, elephant).
false.

?- bigger(elephant, monkey).
false.
*/


is_bigger(X, Y) :- bigger(X, Z), bigger(Z, Y). 

/*
?- is_bigger(elephant, monkey).
false.

?- is_bigger(horse, monkey).
true.

?- is_bigger(X, donkey).
X = elephant .
*/