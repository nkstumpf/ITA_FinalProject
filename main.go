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

// point to db

var port = "8000"
var db *sql.DB

// Structs (data structures model)
type Product struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Price       string `json:"price"`
}

// Initialize products variable as a slice Book struct
var products []Product

// Get all books function
func getProducts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json") // sets content type

	// send query to db

	// return this to browser
	json.NewEncoder(w).Encode(products)

}

// Get single product function
func getProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json") // key
	params := mux.Vars(r)                              // get params

	// loop through products and find correct id

	for _, item := range products {
		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}

	json.NewEncoder(w).Encode(&Product{}) // Return the book struct?

}

func main() {

	fmt.Println("Testing MySQL connection...")

	// For mySQL driver import:
	database, err := sql.Open("mysql", "root:password@tcp(127.0.0.1:3306)/products_db")

	db = database

	if err != nil {
		panic(err.Error())
	}

	fmt.Println("Connected")

	defer database.Close()

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

	// initialize mux router

	router := mux.NewRouter() // creates a new router

	// Mock Data

	// product 1
	// products = append(products, Product{ID: "1", Name: "Burton Slash", Description: "This is a cool snowboard", Price: "189.99"})
	// product 2
	// products = append(products, Product{ID: "2", Name: "Ride Infinity", Description: "This is aanother cool snowboard", Price: "179.99"})

	// Create route handler - Sets our URL endpoints

	router.HandleFunc("/api/products", getProducts).Methods("GET")     // get all products
	router.HandleFunc("/api/products/{id}", getProduct).Methods("GET") // get single product

	//  Run server

	log.Fatal(http.ListenAndServe(":8000", router)) // specify port and router variable

}
