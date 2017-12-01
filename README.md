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

* Web App(Incomplete)
  - This is an angular JS App.
  
