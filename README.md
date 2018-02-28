# bamazon App

The bamazon app connects to a database 
App built with Node and SQL which simulates the taking of orders from customers, purchasing of products and the resulting depletion of stock from a store's inventory.

![](assets/bamazongif1.gif)



## Getting Started

To get started, below are some instructions for what is needed to get bamazon up and running.


## Requirements

Node must be installed for bamazon to work.

MySQL must also be installed. 

Node Package Managers needed for bamazon: 

After installing NPM, install the listed NPMs:

cli-table
mysql
inquirer

## Database 

bamazon uses mysql database to pull data from a created table.

Once mySQL and mySQL workbench are installed properly, make a database with columns "id", "name" (of the product), "department name", "price", and "quantity in stock".

Afterwards, insert the appropriate values. 

Then, run the table, save the database and continue to the node .js file for the logic.


## Node

#### NPMS
require all NPMs that are needed listed under installation requirements.


## mySQL

In node, create a connection to mySQL through a PORT that runs locally on your machine. Insert your mySQL credentials with the database name.
```
var connection = mysql.createConnection({
//initializes connection to mysql via local server
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: code,
  database: "bamazon_db"
});
```




```
connection.query("SELECT * FROM products", function (err, res) { })

```

## Table

Create a new table using "New" to insert column strings as the new table's column heads.

Once connected, retrieve table data from the database with the query: SELECT * FROM (tablename) and iterate through the data and then inserting those vales with "toString".

Doing this will generate your table on the command line.
```
table = new Table({
head: ["id", "Product Name", "Department Name", "Price ($)", "Quantity in Stock" ]
})
```

## Inquirer

```

function promptUserForQuantity() {
inquirer
.prompt([
  {
  //prompt collects user input
    name:"purchase",
    type:"input",
    message: "How many would like to purchase? (Choose number or else will Quit)"
  }
])
.then(function(response) { })

  ```
Prompt users with an inquirer prompt.

