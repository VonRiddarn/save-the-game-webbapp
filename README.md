# Save the game

## Note

This project is currently being worked on, and this README serves the multi-purpose of being a note-block.  
The reason for this is that due to this being an important document, I will eventually see what's in here later.

# Ramblings and ideas

## DO NOT FORGET!!!!

`features/.../Toast.tsx`

```
// TODO: Maybe add a dismiss status in the state instead...
// Reason: If we was to add a dismiss-all button we would have to use the clear from the reducer.
// In that case we won't be able to animate away the toasts!!! (damn it!!#"/UI")
// So yeah,
// TODO: Add toDismiss to state, or just add dismissed to state as is.
```

## Route safety

Use the spread operator on a slug where the page is deeper than expected.  
From there, use a custom hook that sends the user back to the route before the start of that slug.

Eg:  
`/games/[id]/[...badPath]`  
Here we can determine that the path is not good and send the user back to:  
`/games/[id]`  
When doing this we will also send an object to session storage to tell that the user has been force directed.  
This will allow us to trigger a notification.

This will require:

-   Clear, intentional routes
-   A custom hook
-   A toast component

## Splitting context and hook files

`hook` = CONSUMER of context  
`context` = CREATOR / INITIALIZER of context
