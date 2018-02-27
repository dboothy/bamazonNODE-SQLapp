var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var colors = require("colors")
var code = require("./key.js")



var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: code,
  database: "bamazon_db"
});



connection.connect(function(err){
	if (err) throw err;
	console.log("connected as id " + connection.threadId + "\n")
});
readTable();

function readTable(){
	connection.query("SELECT * FROM products", function (err, res) {
		if(err) console.log(err)

		var table = new Table({
				head: ["id", "Product Name", "Department Name", "Price ($)", "Quantity in Stock" ]
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

	connection.query("SELECT * FROM products", function(err, results) {
		if (err) throw err;

	inquirer
		.prompt([
			{
				name: "list",
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
				message: "How many would like to purchase?"
			}
		])
		.then(function(response){

			var chosenItem;
			for (var i = 0; i < results.length; i++){
				if (results[i].product_name === response.list){
					chosenItem = results[i];
				}
			}
			console.log(chosenItem)
			// if (chosenItem.stock_q)


			if (chosenItem.stock_q >= parseInt(response.purchase)){	
			var changeStock = chosenItem.stock_q - parseInt(response.purchase)		
			connection.query(
				"UPDATE products SET ? WHERE ?",
				[
					{
						stock_q: changeStock
					},
					{
						id: chosenItem.id
					}
				],
			function(error) {
			if(error) throw err;
			console.log("Item purchased")
			console.log("You paid $" + chosenItem.price * response.purchase + "."+ " Thanks!")
			readTable();

			}
		);
	}
	else{
		console.log("Not enough stock!")
		readTable()
	}
})
	});

}


		


	
