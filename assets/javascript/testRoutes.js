console.log("connected to js file");

// require axios
// var axios = require('axios');

var all, snow, skate, surf, long, content;

all = document.getElementById('all');
snow = document.getElementById('snow');
skate = document.getElementById('skate');
surf = document.getElementById('surf');
long = document.getElementById('long');
content = document.getElementById('content');

all.addEventListener('click', function() {
    console.log("all button was clicked");

    // retreive data
    getProducts();

    // getProducts(category);

});

snow.addEventListener('click', function() {
    console.log("snow button was clicked");

    // retreive data
    // getProducts(category);

});

skate.addEventListener('click', function() {
    console.log("skate button was clicked");

    // retreive data
    // getProducts(category);

});

surf.addEventListener('click', function() {
    console.log("surf button was clicked");

    // retreive data
    // getProducts(category);

});

long.addEventListener('click', function() {
    console.log("long button was clicked");

    // retreive data
    // getProducts(category);

});

// axios 

function getProducts() {

    // query api
    axios.get('http://localhost:8000/products')

    // response 
    .then((response) => {

        content.innerHTML = generateHTML(response);
        
    });
        
}

function generateHTML(response) {
    console.log(response);
    var responseData = response.data;
    console.log(responseData);
    var output = '';

    for(i=0; i < responseData.length; i++){

        output += `
        <a href="./productDetail.html">
        <div class="flex-product">
            <img class="product-thumbnail" src="./assets/images/featured-skate.jpg" height="60%"> 
            <h4 class="product-name">${responseData[i].name}</h4>
            <h5 class="product-price">$${responseData[i].price}</h5>
            <p class="product-description">${responseData[i].description}</p>
            <p class="sku">SKU#${responseData[i].id}</p>
        </div>
        </a>`; // add later: products[i].image, products[i].category
    }

    return  output
}
