# Simple Login with Google OAuth

## Running on local-system

- Goto  ```./client/src/common/conf.js```. Edit the file give your CLIENTID of Google OAuth.
- Build the front-end, goto ```./client/``` and RUN 
    ```
    npm install
    npm run build
    ``` 

- In the root folder create ```.env``` file and edit Database URI
    ```
    DB_URI="<Your Database URI>"
    ENV="DEV"
    PORT=5000
    ```
- RUN the ```server.py``` .

## For Deployment

- Make the ```ENV="PRO"``` in ```.env``` file at root directory.



