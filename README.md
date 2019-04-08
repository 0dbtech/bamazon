# bamazon - A Pro Video and Audio Equipment Store

## Video Example
https://drive.google.com/file/d/1cBRd5JFAdYIX6aYTqKh7Lv0n63AB6Mz_/view

## Description
This command line tool uses a MySQL Database to track inventory of items available for sale.  The user will type the Product ID and the Quantity to purchase an item.  Once the purchase is complete, the inventory will be updated based on the purchase order quantity.  

## Commands
Initialize application to see the current list of inventory with the command line below, while in application directory:
* node bamazon_Customer

## Prompts
The tool will first show the user all of the available products for sale in the store including ID and Price.  The user will then be prompted to select
* `Item ID`
* `Quantity`

## Purchase Confirmation
Once Product ID and quantity have been selected & the item is in stock bamazon will provide the following information:

1. Confirm order has been submitted
2. Show order total based on product ID and selected quantity
3. Show how many of the Item remain in Stock

Once completed the user will be prompted to select another product ID to purchase

## Inventory
If there is not enough stock to complete the order bamazon will provide the following information:

1. Alert that there is not enough stock to complete the order
2. Prompt to select another product ID to purchase

## Technologies Incorporated
* MySQL
* Sequel Pro
* MAMP
* node.js
  * Inquirer
