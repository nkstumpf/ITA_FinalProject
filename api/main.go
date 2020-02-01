// Linking mySQL database requires database drivers:
// install via CLI: $ go get -u github.com/go-sql-driver/mysql

package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

// ignore drivers pkg with the underscore

// point to db
// this will use listen and serve

var port = "8080"

// use pointer here. otherwise go will open a COPY of the database every time
var db *sql.DB

// enable cors because we're making a request to a 'third party' (our database) for information. So we'll make a function that can add this to the headers whenever needed.
func enableCors(w *http.ResponseWriter) { // cross origin resource sharing
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

// Structs (data structures model)

// ErrorLog : this is the correct format for  commment of of a struct
type ErrorLog struct {
	ErrorCode   string `json:"error_code"`
	ResponseMsg string `json:"response_msg"`
}

// User : this is the correct format for  commment of of a struct
type User struct {
	FirstName   string `json:"firstname"`
	LastName    string `json:"lastname"`
	Email       string `json:"email"`
	Phone       int64  `json:"phone"`
	PrefContact string `json:"pref_contact"`
	ReferredBy  string `json:"referred_by"`
}

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

// new error function

func logError(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")
	enableCors(&w)
	var errorLog ErrorLog

	json.NewDecoder(r.Body).Decode(&errorLog)

	stmt, err := db.Prepare("INSERT INTO errors (error_code, response_msg) VALUES (?,?)")
	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}

	json.Unmarshal(body, &errorLog)

	_, err = stmt.Exec(errorLog.ErrorCode, errorLog.ResponseMsg)
	if err != nil {
		panic(err.Error())
	}
	fmt.Println("error logged to db")

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(errorLog)
}

// set new user function

func setUser(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	enableCors(&w)

	var user User

	json.NewDecoder(r.Body).Decode(&user)

	stmt, err := db.Prepare("INSERT INTO users (firstname, lastname, email, phone, pref_contact, referred_by) VALUES (?,?,?,?,?,?)")
	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}

	json.Unmarshal(body, &user)

	_, err = stmt.Exec(user.FirstName, user.LastName, user.Email, user.Phone, user.PrefContact, user.ReferredBy)
	if err != nil {
		panic(err.Error())
	}
	fmt.Println("New user was created")

	w.WriteHeader(http.StatusBadGateway)
	json.NewEncoder(w).Encode(user)

}

// w.Header().Set("Content-Type", "application/json")
// var user User
// // query := `INSERT INTO users (id, name, email, phone, pref_contact, referred_by)` // values (?,?,?,?,?,?,?,?,?)

// _ = json.NewDecoder(r.Body).Decode(&user)

// // create id for new book
// user.ID = strconv.Itoa(rand.Intn(10000000)) // not best practice just an example
// json.NewEncoder(w).Encode(user)

// res, err := db.Exec(query, user.Name, user.Email, user.Phone, user.PrefContact, user.ReferredBy)
// if err != nil {
// 	fmt.Println(err)
// 	return
// }

// id, err := res.LastInsertId()

// if err != nil {
// 	fmt.Println(err)
// 	return
// }

// user.ID = id

// w.WriteHeader(http.StatusCreated)
// json.NewEncoder(w).Encode(user)

// Get all products function
func getProducts(w http.ResponseWriter, r *http.Request) {

	// set header content type
	w.Header().Set("Content-Type", "application/json")

	// Initialize the data structure we will return
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

	// return this via json data
	json.NewEncoder(w).Encode(products)

}

// Get all products from a specific category function
func getCategory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	productCategory := params["category"]
	products := []Product{}
	query := "SELECT * FROM products WHERE category = ?"
	enableCors(&w)

	rows, err := db.Query(query, productCategory)

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
	// database, err := sql.Open("mysql", "root:password@tcp(127.0.0.1:3306)/project_db") // localhost setting
	database, err := sql.Open("mysql", "root:password@tcp(database:3306)/project_db") // docker setting

	db = database

	if err != nil {
		panic(err.Error())
	}

	fmt.Println("Connected")

	defer database.Close()

	// testing only //
	//////////////////
	// results, err := database.Query("SELECT * FROM products")
	// if err != nil {
	// 	panic(err.Error())
	// }

	// for results.Next() {
	// 	var product Product

	// 	err = results.Scan(&product.ID, &product.Category, &product.Name, &product.Description, &product.Price, &product.ImgMain, &product.ImgB, &product.ImgC)

	// 	if err != nil {
	// 		panic(err.Error())
	// 	}

	// 	fmt.Println(product)
	// }
	////////////////////
	////////////////////

	// initialize mux router

	router := mux.NewRouter() // creates a new router

	// Create route handler - Sets our URL endpoints

	router.HandleFunc("/products", getProducts).Methods("GET")                 // get all products
	router.HandleFunc("/products/{id}", getProduct).Methods("GET")             // get single product
	router.HandleFunc("/products/sort/{category}", getCategory).Methods("GET") // get single category of products
	router.HandleFunc("/users", setUser).Methods("POST")                       // post a users info to the db
	router.HandleFunc("/errors", logError).Methods("POST")                     // log an error to the db

	//  Run server

	log.Fatal(http.ListenAndServe(":8080", router)) // specify port and router variable

}
