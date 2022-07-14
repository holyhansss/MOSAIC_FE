import { createConnection } from 'mysql';

var connection = createConnection({
  host: "localhost",
  user: "root",
  password: "Password1!",
  database : 'crypto_daily_price '
});

connection.connect(function(err) {
  if (err) throw err;
  else
  console.log("Connected!");
});

connection.query({
  sql: 'show tables',
  timeout: 4000, // 4s
}, function (error, results, fields) {
  // error will be an Error if one occurred during the query
  // results will contain the results of the query
  // fields will contain information about the returned results fields (if any)
});


//// dailyPrice QUERY LIST

//Create category coins list
export const insert_category_coins = (tableName, valuesList) => {
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO " + tableName + " VALUES ?";
    
    connection.query(sql, [valuesList], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  });
}

//Retrieve all coins from all categories
export const getAllCoinsAllCategories = () => {
  let result;
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "SELECT CoinSymbol FROM categories_coins_list";
    
    connection.query(sql, [valuesList], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  });
  // return result;
}



//find table by name
let coin_symbol = 'BTC';
let tableName = 'dailyPrice_' + coin_symbol 

const does_table_exit = (tableName) => {
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "SELECT table_name FROM information_schema.tables WHERE table_type = 'base table' AND table_schema= " + tableName;
    
    connection.query(sql, [valuesList], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  });  
}

//Create table and insert data when coin table does NOT already exist
//! may have to amend incoming date format
const create_coin_table = (tableName) => {
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE " + tableName + " (Date DATE, PriceInDollar DECIMAL(10,1))"
    
    connection.query(sql, [valuesList], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  });  
}

//Insert when coin table already exists
let valuesList = [];

const insert_coin_price = (tableName, valuesList) => {
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO " + tableName + " VALUES ?";
    
    connection.query(sql, [valuesList], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  });
}

//get data from startDate to endDate
let startDate = '';
let endDate = '';

const get_prices_start_to_end = (tableName, valuesList, startDate, endDate) => {
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "SELECT * FROM " + tableName + " WHERE date_column BETWEEN "+ startDate + " AND " + endDate;
    
    connection.query(sql, [valuesList], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  });
}

//// queries for 