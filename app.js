console.log("connected to js file");

var snow, skate, surf, long, content;

snow = document.getElementById('snow');
skate = document.getElementById('skate');
surf = document.getElementById('surf');
long = document.getElementById('long');
content = document.getElementById('content');

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
    axios.get('localhost:8000/api/products')

    // response 
    .then((response) => {
        console.log(response);
        let products = response.data;
        let output = '';
        
    });

    console.log(output);
    content.innerHTML = output;
        
}
