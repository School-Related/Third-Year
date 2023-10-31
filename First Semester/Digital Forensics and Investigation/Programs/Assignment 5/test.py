def pattern(n):
    count = 1
    for i in range(1, n + 1):
        while(i):
            print(count, sep = ' ', end = ' ')
            count += 1
            i -= 1
        print()
#%%
pattern(5)