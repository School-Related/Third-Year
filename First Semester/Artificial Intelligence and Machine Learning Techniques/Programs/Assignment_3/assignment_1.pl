cost(burger, 50).
cost(sandwich, 40).
cost(pizza, 60).
cost(coke, 20).
cost(pepsi, 20).
cost(mountain_dew, 20).
cost(water, 10).
cost(fries, 30).
cost(salad, 30).
cost(ice_cream, 30).
cost(cake, 30).
cost(pie, 30).
cost(brownie, 90).
cost(chocolate, 90).
cost(vanilla, 150).

food(burger).
food(sandwich).
food(pizza).
food(salad).
food(fries).
food(ice_cream).
food(cake).
food(pie).
food(brownie).
food(chocolate).
food(vanilla).


drink(coke).
drink(pepsi).
drink(mountain_dew).
drink(water).

meal(X) :- food(X) ; drink(X).

how_much(X) :- cost(X, Y).
can_buy(Item, Cost) :-
    cost(Item, ItemCost),
    ItemCost =< Cost.