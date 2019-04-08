//package requirements
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    //database connection info
        host: "localhost",
        port: 8889,
        user: "root",
        password: "root",
        database: "bamazon_DB"
    });

//inital database connection and display inventory
        connection.connect(function(err) {
            if (err) throw err;
                console.log("connected to database\n");
        showItems();
    });

//buy item function
function buyItem() {
            inquirer.prompt([{
            name: "id",
            type: "input",
            message: "Enter the product ID you wish to buy",
        },
        {
            name: "quantity",
            type: "input",
            message: "How many?"
      //END array of questions
        }])

    //Callback function query DB
         .then(function(answer) {

        // console.log("checking answer object");
        // console.log(answer);
            var query = 'SELECT * FROM bamazon_DB.products WHERE ?';

            connection.query(query, { id: answer.id }, function(error, response){

       //test database query response - array of objects
        // console.log(response);

            console.log("item qty is " + response[0].quantity);

            //check item stock against database
            if (answer.quantity <= response[0].quantity){

                console.log("We have enough in stock");
                //fulfill order here
                
                var remainingQty = response[0].quantity - answer.quantity;
                var orderTotal = answer.quantity * response[0].price;

                console.log("Remaining stock for " + response[0].product_name + " is " + remainingQty);
                console.log("You order total is $" + orderTotal);

                connection.query(
                    "UPDATE bamazon_DB.products SET ? WHERE ?",
                    [
                      {
                        quantity: remainingQty
                      },
                      {
                        id: answer.id
                      }
                    ],

                    function(error) {

                        if (error) throw err;
                            console.log("Thanks for your order!");
                            //END Program
                            console.log("\n");
                            buyItem();
                            }
                )} //END if statement stock check
                        else{
                            console.log("Selected Item Quantity is Out of Stock");
                            //Return to item list
                            console.log("\n");
                            buyItem();
                            }
        
            }) //END Query
        
        }) //END Callback function then
 
    }; //END buyItem Function

//display inventory function
function showItems() {
    
        var query = 'SELECT * FROM bamazon_DB.products';
        
        connection.query(query, function(error, result) {

                console.log("CURRENT PRODUCT INVENTORY\n");

            for (var i = 0; i < result.length; i++) {
    
                console.log("-----------------------------------------"); 
                console.log(
                    "Product: " + result[i].product_name + "\n" +
                    "Price $: " + result[i].price + "\n" +
                    "ID: " + result[i].id
                );
            }

        // console.log("calling inquirer function");
        buyItem();

        }); //END Query

    }; //END showItems fn


function mainMenu(){

} 
