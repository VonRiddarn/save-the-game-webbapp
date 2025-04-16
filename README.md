# Save the game

# Ramblings and ideas

## Route safety

Use the spread operator on a slug where the page is deeper than expected.  
From there, use a custom hook that sends the user back to the route before the start of that slug.

Eg:  
`/games/[id]/[...badPath]`  
Here we can determine that the path is not good and send the user back to:  
`/games/[id]`  
When doing this we will also send a query that tells us the user has been redirected.

If this query (`rdr` aka redirect reason) is present, the `RootLayout` will parse it and create a static toast.  
When the user presses `OK` on the toast the param will be cleared without triggering a reroute.

This will require:

-   Clear, intentional routes
-   A custom hook
-   A toast component

## Splitting context and hook files

`hook` = CONSUMER of context  
`context` = CREATOR / INITIALIZER of context
