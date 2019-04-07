var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_DB"
});

//inital database connection and display inventory
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected to database\n");
  showItems();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Find songs by artist",
        "Find all artists who appear more than once",
        "Find data within a specific range",
        "Search for a specific song",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Find songs by artist":
        artistSearch();
        break;

      case "Find all artists who appear more than once":
        multiSearch();
        break;

      case "Find data within a specific range":
        rangeSearch();
        break;

      case "Search for a specific song":
        songSearch();
        break;

      case "exit":
        connection.end();
        break;
      }
    });
}

function buyItem() {
  inquirer
    .prompt([{
      name: "id",
      type: "input",
      message: "Enter the product ID you wish to buy",
    //   validate: function(value) {
    //     if (isNaN(value) === false) {
    //       return true;
    //     }
    //     return false;
    //   }
    },
    {
        name: "quantity",
        type: "input",
        message: "How many you need?"
      }])
      //END array of questions

    .then(function(answer) {
    //   var query = 'SELECT COUNT(*) FROM top5000 WHERE ?';
    //   connection.query(query, { artist: answer.artist }, function(err, res) {
        // for (var i = 0; i < res.length; i++) {
        //   console.log("Position: " + res[i].position);
        //   console.log("Song: " + res[i].song)
        //   console.log("Year: " + res[i].year);
        // }
        console.log("checking answer object");
        console.log(answer);

        var query = 'SELECT * FROM bamazon_DB.products WHERE ?';

        connection.query(query, { id: answer.id }, function(error, response){

       
            console.log(response);
            console.log("item qty is " + response[0].quantity);
            if (answer.quantity <= response[0].quantity){

                console.log("We have enough in stock");
                //fulfill order here
                
                var remainingQty = response[0].quantity - answer.quantity;
                console.log("remaining Qty for " + response[0].product_name + " is " + remainingQty);

                // connection.query(
                //     '"UPDATE bamazon_DB.products SET quantity =" + remainingQty + " WHERE id=" + answer.id';
                //     {
                //       item_name: answer.item,
                //       category: answer.category,
                //       starting_bid: answer.startingBid || 0,
                //       highest_bid: answer.startingBid || 0
                //     },

                // connection.query(query, [{ id: answer.id }, { answer. }], function(error, response){
                    // "UPDATE bamazon_DB.products WHERE ? SET ?",
                    // {
                    //   quantity: response[0].quantity-answer.quantity
                    // //   category: answer.category,
                    // //   starting_bid: answer.startingBid || 0,
                    // //   highest_bid: answer.startingBid || 0
                    // },
                

            }
            else{
                console.log("out of stock");
            }
        
        })
        // runSearch();
    });
    // });
}


//display inventory
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
    //NEXT FUNCTION
    // runSearch();
    console.log("calling inquirer function");
    buyItem();
  });

};

function rangeSearch() {
  inquirer
    .prompt([
      {
        name: "start",
        type: "input",
        message: "Enter starting year: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "end",
        type: "input",
        message: "Enter ending year: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      var query = 'SELECT position, song, artist, year FROM top5000 WHERE year BETWEEN ? AND ?'
      //' SELECT position, song, artist, year FROM top5000 WHERE year BETWEEN 2009 AND 2011'
      // [obj, obj]
      // [2009, 2011]
      connection.query(query, [answer.start, answer.end], function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(
            "Position: " +
              res[i].position +
              " || Song: " +
              res[i].song +
              " || Artist: " +
              res[i].artist +
              " || Year: " +
              res[i].year
          );
        }
        runSearch();
      });
    });
}

function songSearch() {
  inquirer
    .prompt({
      name: "song",
      type: "input",
      message: "What song would you like to look for?"
    })
    .then(function(answer) {
      console.log(answer.song);

      var q = connection.query("SELECT * FROM top5000 WHERE ?", { year: answer.song }, function(err, res) {
        console.log(
          "Position: " +
            res[0].position +
            " || Song: " +
            res[0].song +
            " || Artist: " +
            res[0].artist +
            " || Year: " +
            res[0].year
        );
        console.log(q.sql);
        runSearch();
      });
    });
}
