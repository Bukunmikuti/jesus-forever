## BUGS
- [x] Verse click bug, bottom bar does not disable when no verse is selected
- [x] searching for a verse after selecting new version updates whole `store.object` array and rerenders all components and removes ```selected``` class but `store.saves` still remains the same. Therefore, while the `selected` class is removed, bottom bar is still visible because `store.saves` contains objects. <br>
FIXED BY: watching and updating ```saves``` whenever ```object``` changes. Implemted in ```components/result-card.js```


## 🔥 IDEAS
- Click result card version to open the change version modal. User can then change the version of that specific result card.