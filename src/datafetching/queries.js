import mysql from 'mysql2/promise';
import {MY_HOST, MY_USERNAME, MY_PASSWORD, MY_DATABASE} from querySecureInfo.js

//// dailyPrice QUERY LIST

//Create categories coins list
export const create_categories_coins_list = async () => {
  var sql = "CREATE TABLE categories_coins_list (CoinSymbol varchar(10), CoinName varchar(50), CoinPapricaID varchar(50), Category varchar(30), CoinRank int)"
  const connection = await mysql.createConnection
    ({
        host: MY_HOST,
        user: MY_USERNAME,
        password: MY_PASSWORD,
        database : MY_DATABASE,
    });
  const [rows, fields] = await connection.execute(sql);
  console.log("end query create_categories_coins_list()");
  return rows;
}

//Insert data into categories coins list
export const insert_category_coins = async (tableName, valuesList) => {
  var sql = 'INSERT INTO ' + tableName + ' VALUES ?';
  const connection = await mysql.createConnection
  ({
    host: MY_HOST,
    user: MY_USERNAME,
    password: MY_PASSWORD,
    database : MY_DATABASE,
});
  const [rows, fields] = await connection.query(sql, [valuesList]);
  console.log("end query insert_category_coins()");
  return rows;
}

//Retrieve all coins from all categories
export const get_all_coinID_all_categories = async () => {
  var sql = "SELECT CoinSymbol, CoinPapricaID FROM categories_coins_list";
  const connection = await mysql.createConnection
  ({
    host: MY_HOST,
    user: MY_USERNAME,
    password: MY_PASSWORD,
    database : MY_DATABASE,
});
  const [rows, fields] = await connection.execute(sql);
  console.log(rows);
  console.log("end query get_all_coins_all_categories()");
  return rows;
}

//find table by name
export const does_table_exist = async (tableName) => {
  // var sql = "SELECT table_name FROM information_schema.tables WHERE table_type = 'base table' AND table_schema= " + tableName;
  var sql = "SELECT EXISTS( \
              SELECT * FROM information_schema.tables \
              where table_name = '" + tableName + "' \
            );"
  const connection = await mysql.createConnection
  ({
    host: MY_HOST,
    user: MY_USERNAME,
    password: MY_PASSWORD,
    database : MY_DATABASE,
});
  const [rows, fields] = await connection.execute(sql);
  //retrieving result of query that is in json form
  //does this really have to be this way..?
  let firstKey=Object.keys(rows[0])[0];
  let firstValueOfQueryResult= rows[0][firstKey];

  console.log("end query does_table_exist()");
  return firstValueOfQueryResult;
}


//Create table and insert data when coin table does NOT already exist
//! may have to amend incoming date format
export const create_coin_table = async (tableName) => {

  var sql = "CREATE TABLE " + tableName + " (Date DATE, PriceInDollar DECIMAL(10,1))"
  const connection = await mysql.createConnection
  ({
    host: MY_HOST,
    user: MY_USERNAME,
    password: MY_PASSWORD,
    database : MY_DATABASE,
});
  const [rows, fields] = await connection.execute(sql);
  console.log("end query create_coin_table()");
  return rows;
}



//Insert when coin table already exists
const insert_coin_price = async (tableName, valuesList) => {
  var sql = "INSERT INTO " + tableName + " VALUES ?";
  const connection = await mysql.createConnection
  ({
    host: MY_HOST,
    user: MY_USERNAME,
    password: MY_PASSWORD,
    database : MY_DATABASE,
});
  const [rows, fields] = await connection.query(sql, [valuesList]);
  console.log("end query insert_coin_price()");
  return rows;
}

//get data from startDate to endDate
let startDate = '';
let endDate = '';

const get_prices_start_to_end = async (tableName, valuesList, startDate, endDate) => {

    var sql = "SELECT * FROM " + tableName + " WHERE date_column BETWEEN "+ startDate + " AND " + endDate;
    const connection = await mysql.createConnection
    ({
      host: MY_HOST,
      user: MY_USERNAME,
      password: MY_PASSWORD,
      database : MY_DATABASE,
  });
    const [rows, fields] = await connection.query(sql, [valuesList]);
    console.log("end query get_prices_start_to_end()");
    return rows;

}
