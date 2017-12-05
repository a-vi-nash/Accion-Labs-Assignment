# Accion-Labs-Assignment
An MEAN Stack Assignment for Evaluation

# Components

* Web API
  - this folder contains the API created in Node JS Express Module
  - it has a docs folder which contain a Postman File with all the API's for Testing.

* DB
  - Db contains a json file with the initial record for insertion
  - use the below command for inserting the document after starting the mondo server
    ``` 
    mongoimport -d accion -c employees data.json
    ```
  - To Add a unique constraint on Name field use the following Index.
    ```
    db.employees.createIndex( { "name": 1 }, { unique: true } );
    ```
  - To enable full text search on Name and Role field use the following Index
    ```
    db.employees.createIndex( { name: "text", role: "text"} )
    ```
  - The Above Setup needs to be completed before using the API's

* Web App
  - This is an angular JS App.
  
# Deployment Instructions:

   # Required Softwares:
   * mongo db
   * node js and npm
    
   # Node Modules Required:
   * live-server(to run the angular app) npm 
     ```
      install -g live-server
     ```
   * forever(to restart the web api on crash) 
      ```
      npm install -g forever
      ```
    
   # Initial Setup:
   - Start mongo server by using cmd
    ```
    mongod
    ```
   - initial db setup:
    - use the below command for inserting the document after starting the mongo server by CD inside the DB folder
             ``` 
             mongoimport -d accion -c employees data.json
             ```
    - To Add a unique constraint on Name field use the following Index.
             ```
             db.employees.createIndex( { "name": 1 }, { unique: true } );
             ```
    - To enable full text search on Name and Role field use the following Index
             ```
             db.employees.createIndex( { name: "text", role: "text"} )
             ```
   - API setup:
    - CD to the WebAPI folder and install the node packages using the following command.
        ```
        npm install
        ```
    - Run the web API using forever.
        ```
        forever start app.js
        ```
        
   - Start the WebApp:
    - We will use live-server package of npm to run the angular app.
    - CD to the webapp folder and type:
        ```
        live-server
        ```
    - the app will be launched in the browser on the link localhost:8080/
    
    
