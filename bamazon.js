var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var colors = require("colors")


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "gogeta1",
  database: "bamazon_db"
});

var purchasedArray = [];

connection.connect(function(err){
	if (err) throw err;
	console.log("connected as id " + connection.threadId + "\n")
});
readTable();

function readTable(){
	connection.query("SELECT * FROM products", function (err, res) {
		if(err) console.log(err)

		var table = new Table({
				head: ["id", "ProductName", "DepartmentName", "Price", "QuantityInStock" ]
		})

		for (var i = 0; i < res.length; i ++){
			table.push(
				[res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_q]
					)
		}
		
		console.log(table.toString());
		purchaseItem();
		})
		
}

function purchaseItem(){

	connection.query("SELECT * FROM products", function(err, results){
		if (err) throw err;

	inquirer
		.prompt([
		{
			name: "purchase",
			type: "rawlist",
			choices: function() {
				var choiceArray = [];
				for (var i = 0; i < results.length; i++) {
					choiceArray.push(results[i].product_name);
				}
				return choiceArray;
			},
			message: "\nWhat is the ID of the item you would like to purchase?\n"
		},
		{
			name:"purchase",
			type:"input",
			message: "What is the item ID for the product you would you like to purchase"
		}
	])
	.then(function(response){

		var chosenItem;
		for (var i = 0; i < results.length; i++){
			if (results[i].ProductName === response.purchase){
				chosenItem = results[i];
			}
		}
		connection.query(
			"UPDATE products SET ? WHERE ?",
			[
				{
					stock_q: response.purchase
				},
				{
					id: chosenItem.id
				}
			],
			function(error) {
				
			}
			)
			// var input = response.purchase
			// var inputParsed = parseInt(input)

			// if(Number.isNaN(inputParsed)){
			// 	console.log("Please input a valid number [1-10");
			// } else if(inputParsed === 0){
			// 	console.log("Please input a valid number [1-10");
			// } else if(inputParsed > 10){

			// }else{
			// 	console.log("Great choice!")
			// 	purchasedArray.push(inputParsed)
			// 	console.log(purchasedArray)
				
			
			})
		})
	}



// readTable();
// start();
// selectItem();


// function start() {

// 	connection.query("SELECT * FROM products", function(err, results){
// 		if (err) throw err;

// 		inquirer
// 			.prompt({
// 				name:"selection",
// 				type:"input",
// 				message: "What is the ID of the item you would like to purchase? [Quit with Q]"


// 			})
// 			.then(function(response){
// 				var input = response.selection
// 				inputParsed = parseInt(input)

// 				if(Number.isNaN(inputParsed)){
// 		        console.log("Please input a valid number [1-10]");
// 		        start();
// 		    	} else if(inputParsed === 0){
// 		    		console.log("Please input a valid number [1-10]");
// 		    		start();
// 		    	}else{
// 		    		console.log("Great choice!")
		    		
// 		    	} 

// 			});
// 	});
// }






// function selectItem(){
// 	 connection.query("SELECT * FROM products", function(err, results) { 
// 	 	if (err) throw err;

// 	 	inquirer
// 	 		.prompt([
// 	 		{
// 	 			name:"choice",
// 	 			type:"rawlist",
//  				choices: function () {
// 				var choiceArray = [];
// 				for (var i = 0; i < results.length; i++){
// 					choiceArray.push(results[i].id);
// 				}
// 				return choiceArray;
// 				console.log(choiceArray[0])
// 				},
// 				message: "Which item would you like to purchase?"
// 	 		},
// 	 		{
// 	 			name:"quantity",
// 	 			type: "input",
// 	 			message: "How many would you like?"
// 	 		}
// 	 	])
// 	 		.then(function(answer){
// 	 			var chosenItem;
// 	 			for (var i = 0; i < results.length; i++){
// 	 				if (results[i].id === answer.choice){
// 	 					chosenItem = results[i];
// 	 				}
// 	 			}
// 	 			connection.query(
// 	 				"DELETE products SET ? WHERE ?",
// 	 				[
// 	 					{
// 	 						stock_q: answer.quantity
// 	 					},
// 	 					{
// 	 						id: chosenItem.id
// 	 					}
// 	 				],
// 	 				function(error) {
// 	 					if (error) throw err;
// 	 					console.log("Product purchased!");
// 	 				}
// 	 				);
// 	 		})
// 	 	});
// 	}


	
