Input Graph for BFS:

graph = {0: [1, 2], 
            1: [2],
            2: [3],
            3: [1, 2]
        }

Following is Breadth First Traversal: 
0
1
2
3 


DFS Input Graph: 

graph = {'0': set(['1', '2']),
         '1': set(['0', '3', '4']),
         '2': set(['0']),
         '3': set(['1']),
         '4': set(['2', '3'])}


The Following is the dfs solution: 
0
2
1
3
4