var mysql = require("mysql");
//npm mysql installation required
var inquirer = require("inquirer");
//npm inquirer installation required
var Table = require("cli-table");
//npm cli-table installation required
var code = require("./key.js")
//added a file to be gitignored to mask password

var table;
var items;

var chosenItem;

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



connection.connect(function(err){
//inidicates the connection upon launch of app
	if (err) throw err;
	console.log("connected as id " + connection.threadId + "\n")
});

readTable();
/*
promptUserForProduct()
.then(function() {
	console.log('QUESTION')

})
*/


function printTable() {
	console.log(table.toString());
}

function readTable(){
//function reads table called "products" in mysql database
	connection.query("SELECT * FROM products", function (err, res) {
		if(err) console.log(err)
//creates a table structure and inserts column name strings
		table = new Table({
				head: ["id", "Product Name", "Department Name", "Price ($)", "Quantity in Stock" ]
		})
//loop through the connection parameter that was passed in to retrieve all of the data within the database
		for (var i = 0; i < res.length; i ++){
			table.push(
				[res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_q]
			)
		}
		items = res
		printTable()
		promptUserForProduct()
			//.then(handleProductAnswer)

//sends the data to the generated table that was invoked on line 45
		
		// purchaseItem();
		/*
		promptUserForProduct()
			.then(function() {
				console.log('Asked queston')
			})
			.then(handleProductAnswer)
			.then(handleQuantityAnswer)
		*/
	})
}

function promptUserForProduct() {
	inquirer
	.prompt([
		{
			name: "list",
			type: "rawlist",
			choices: function() {
			//choices function generates a list of input selections for user to  choose from locked in
			//within an array. 
				var choiceArray = [];
				for (var i = 0; i < items.length; i++) {
					choiceArray.push(items[i].product_name);
				//loops through all of the data within the database table
				}
				choiceArray.push("Q")
				//returns the results from database gather within the array to be selected through choices
				return choiceArray;
			},
			message: "\nWhat is the ID of the item you would like to purchase?(press 11 for exit)\n"
		}
	])
	.then(function(response) {
		if(response.list === "Q"){
				console.log("QUIT")
				connection.end()
				process.exit()
			}
			for (var i = 0; i < items.length; i++){
				if (items[i].product_name === response.list){
					chosenItem = items[i];
				}
			}
			promptUserForQuantity()
		})
}


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
	.then(function(response) {
		if (chosenItem.stock_q >= parseInt(response.purchase)){	
			// variable "changestock" assigned to represent the amount left in stock after input request
			var changeStock = chosenItem.stock_q - parseInt(response.purchase)		
			connection.query(
				"UPDATE products SET ? WHERE ?",
				[
				//SQL query on where and which data to update on the table 
					{
						stock_q: changeStock
					},
					//reduces the stock by the input of the user for their request
					{
						id: chosenItem.id
						//determines which row will be affected on the basis of the user id
					}
				],
			function(error) {

				if(error) throw err;
				console.log("Item purchased")
				console.log("You paid $" + chosenItem.price * response.purchase + "."+ " Thanks!")
				readTable();
				//when the user purchases an amount of an item, the amount paid is shown

			}
				);
			}else if(response.purchase == "Q" || "q"){
				process.exit()
			}
	//message for when there is less stock than the request for quantity from the user.
		else{
			console.log("Not enough stock!")
			return readTable()
		}
	})
}

/*

	function purchaseItem(){
//retrieves data from table "products"

	connection.query("SELECT * FROM products", function(err, results) {
		if (err) throw err;
//inquirer prompt to collect user input
		])
}
*/





/****************************************************************************/
// 	inquirer
// 		.prompt([
// 			{
// 				name: "list",
// 				type: "rawlist",
// 				choices: function() {
// 				//choices function generates a list of input selections for user to  choose from locked in
// 				//within an array. 
// 					var choiceArray = [];
// 					for (var i = 0; i < results.length; i++) {
// 						choiceArray.push(results[i].product_name);
// 					//loops through all of the data within the database table
// 					}
// 					choiceArray.push("Q")
// 					//returns the results from database gather within the array to be selected through choices
// 					return choiceArray;
// 				},
// 				message: "\nWhat is the ID of the item you would like to purchase?\n"
// 			},
// 			{
// 			//prompt collects user input
// 				name:"purchase",
// 				type:"input",
// 				message: "How many would like to purchase?"
// 			}
// 		])
// 		.then(function(response){
// 		//. then loops through the response from the database

// 			var chosenItem;

// 			if(response.list ==="Q"){
// 				console.log("QUIT")
// 			}
// 			for (var i = 0; i < results.length; i++){
// 				if (results[i].product_name === response.list){
// 					chosenItem = results[i];
// 				}
// 			}
			
// 			condition determines that if the amount input is greater than the stock amount,
// 			then the user's request for a number above the amount available will not be depleted 


// 			if (chosenItem.stock_q >= parseInt(response.purchase)){	
// 			// variable "changestock" assigned to represent the amount left in stock after input request
// 			var changeStock = chosenItem.stock_q - parseInt(response.purchase)		
// 			connection.query(
// 				"UPDATE products SET ? WHERE ?",
// 				[
// 				//SQL query on where and which data to update on the table 
// 					{
// 						stock_q: changeStock
// 					},
// 					//reduces the stock by the input of the user for their request
// 					{
// 						id: chosenItem.id
// 						//determines which row will be affected on the basis of the user id
// 					}
// 				],
// 			function(error) {
// 			if(error) throw err;
// 			console.log("Item purchased")
// 			console.log("You paid $" + chosenItem.price * response.purchase + "."+ " Thanks!")
// 			readTable();
// 			//when the user purchases an amount of an item, the amount paid is shown

// 			}
// 		);
// 	}
// 	//message for when there is less stock than the request for quantity from the user.
// 	else{
// 		console.log("Not enough stock!")
// 		readTable()
// 	}
// })
// 	});

// }


		


	
