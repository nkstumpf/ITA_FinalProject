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
	Category    string `json:"category"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Price       string `json:"price"`
	ImgMain     string `json:"img_main"`
	ImgB        string `json:"img_b"`
	ImgC        string `json:"img_c"`
}

// Initialize products variable as a slice of Product struct
var products []Product

// Get all products function
func getProducts(w http.ResponseWriter, r *http.Request) {

	// set header content type
	w.Header().Set("Content-Type", "application/json")

	// set structure of what we are going to return
	products := []Product{}

	// set the query we send to db
	query := "SELECT * FROM products"

	// make sure we have cors in the header
	enableCors(&w)

	// rows = results of the query
	rows, err := db.Query(query)

	// if there is an error do this
	if err != nil {
		fmt.Println(err)
		return
	}

	// if there is NOT an error do this
	for rows.Next() {
		// create a new variable and set its value to our existing struct
		var product Product
		err := rows.Scan(&product.ID, &product.Category, &product.Name, &product.Description, &product.Price, &product.ImgMain, &product.ImgB, &product.ImgC)
		// if there is an error do this
		if err != nil {
			fmt.Println(err)
			return
		}
		// append the returned values to our products variable
		products = append(products, product)
	}

	// let the client know the request worked
	w.WriteHeader(http.StatusOK)
	// let header know it's in a json
	w.Header().Set("Content-Type", "application/json")

	// return this via json data
	json.NewEncoder(w).Encode(products)

}

// Get single product function

func getProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	productID := params["id"]
	products := []Product{}
	query := "SELECT * FROM products WHERE ID = ?"
	enableCors(&w)

	rows, err := db.Query(query, productID)
	if err != nil {
		fmt.Println(err)
		return
	}
	for rows.Next() {
		var product Product
		err := rows.Scan(&product.ID, &product.Category, &product.Name, &product.Description, &product.Price, &product.ImgMain, &product.ImgB, &product.ImgC)
		if err != nil {
			fmt.Println(err)
			return
		}
		products = append(products, product)
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(products)

}

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

		err = results.Scan(&product.ID, &product.Category, &product.Name, &product.Description, &product.Price, &product.ImgMain, &product.ImgB, &product.ImgC)

		if err != nil {
			panic(err.Error())
		}

		fmt.Println(product)
	}
	////////////////////
	////////////////////

	// initialize mux router

	router := mux.NewRouter() // creates a new router

	// Create route handler - Sets our URL endpoints

	router.HandleFunc("/products", getProducts).Methods("GET")     // get all products
	router.HandleFunc("/products/{id}", getProduct).Methods("GET") // get single product

	//  Run server

	log.Fatal(http.ListenAndServe(":8000", router)) // specify port and router variable

}
