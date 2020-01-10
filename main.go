// Linking mySQL database requires database drivers:
// install via CLI: $ go get -u github.com/go-sql-driver/mysql

package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

// ignore drivers pkg with the underscore

// point to db
// this will use listen and serve

var port = "8000"

// use pointer here. otherwise go will open a COPY of the database every time
var db *sql.DB

// enable cors because we're making a request to a 'third party' (our database) for information. So we'll make a function that can add this to the headers whenever needed.
func enableCors(w *http.ResponseWriter) { // cross origin resource sharing
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

// Structs (data structures model)

// Product : this is the correct format for  commment of of a struct
type Product struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Price       string `json:"price"`
}

// Initialize products variable as a slice of Product struct
var products []Product

// Get all products function
func getProducts(w http.ResponseWriter, r *http.Request) {

	// set header content type
	w.Header().Set("Content-Type", "application/json")

	// set structure of what we are going to return
	products := []Product{}

	// the query we send to db
	// query := `SELECT id, name, description, price FROM products`
	query := "SELECT * FROM products"

	// make sure we have cors in the header
	enableCors(&w)

	rows, err := db.Query(query)
	if err != nil {
		fmt.Println(err)
		return
	}

	for rows.Next() {
		var product Product
		err := rows.Scan(&product.ID, &product.Name, &product.Description, &product.Price)
		if err != nil {
			fmt.Println(err)
			return
		}
		products = append(products, product)
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json") //let header know it's in a json

	// return this to browser
	json.NewEncoder(w).Encode(products) // this is returning empty strings?

}

// Get single product function

// func getProduct(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json") // key
// 	params := mux.Vars(r)                              // get params

// 	// loop through products and find correct id

// 	for _, item := range products {
// 		if item.ID == params["id"] {
// 			json.NewEncoder(w).Encode(item)
// 			return
// 		}
// 	}

// 	json.NewEncoder(w).Encode(&Product{}) // Return the product struct?

// }

func main() {

	fmt.Println("Testing MySQL connection...")

	// For mySQL driver import:
	database, err := sql.Open("mysql", "root:password@tcp(127.0.0.1:3306)/products_db") // Always use a fake password here

	db = database

	if err != nil {
		panic(err.Error())
	}

	fmt.Println("Connected")

	defer database.Close()

	// testing only //
	//////////////////
	results, err := database.Query("SELECT * FROM products")
	if err != nil {
		panic(err.Error())
	}

	for results.Next() {
		var product Product

		err = results.Scan(&product.ID, &product.Name, &product.Description, &product.Price)
		if err != nil {
			panic(err.Error())
		}

		// fmt.Println("Record Returned:")
		fmt.Println(product)
	}
	////////////////////
	////////////////////

	// initialize mux router

	router := mux.NewRouter() // creates a new router

	// Create route handler - Sets our URL endpoints

	router.HandleFunc("/products", getProducts).Methods("GET") // get all products
	// router.HandleFunc("/products/{id}", getProduct).Methods("GET") // get single product

	//  Run server

	log.Fatal(http.ListenAndServe(":8000", router)) // specify port and router variable

}
