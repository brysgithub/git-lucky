# Routes

## GET

/home - Home page - Prompt user to play. Divert to login/register or dashboard from here

/login - Where the user logs in

/register - Where the user creates an account

/dashboard
    - Where the can see their wins and losses
    - Where the user can view and edit their profile

/game/:id - Where the chosen game is loaded

## POST

/api/users - CREATE a new user

/api/users/login - CREATE logged in session data