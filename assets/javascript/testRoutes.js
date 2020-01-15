console.log("connected to js file");

// require axios
// var axios = require('axios');

var all, snow, skate, surf, long, body, content;

all = document.getElementById('all');
snow = document.getElementById('snow');
skate = document.getElementById('skate');
surf = document.getElementById('surf');
long = document.getElementById('long');
content = document.getElementById('content');
body = document.getElementById('body');


all.addEventListener('click', function () {
    console.log("all button was clicked");

    // retreive data
    getProducts('all');

    // getProducts(category);

});

snow.addEventListener('click', function () {
    console.log("snow button was clicked");

    // retreive data
    // getProducts(category);

});

skate.addEventListener('click', function () {
    console.log("skate button was clicked");

    // retreive data
    // getProducts(category);

});

surf.addEventListener('click', function () {
    console.log("surf button was clicked");

    // retreive data
    // getProducts(category);

});

long.addEventListener('click', function () {
    console.log("long button was clicked");

    // retreive data
    // getProducts(category);

});

// axios 

function getProduct(id) {

    console.log('view product was clicked');

    // get single produc
    // query api
    axios.get('http://localhost:8000/products/' + id)
        // response 
        .then((response) => {
            body.innerHTML = generateHTML(response, 'single');
            console.log(response.data);

        });
}

function getProducts(param) {

    // get all products

    // query api
    axios.get('http://localhost:8000/products')
        // response 
        .then((response) => {
            content.innerHTML = generateHTML(response, 'all');

        });

}

function generateHTML(response, param) {
    console.log(response);
    var responseData = response.data;
    var output = '';

    if (param === 'all') {

        for (i = 0; i < responseData.length; i++) {

            output += `
            
            <div class="flex-product">
                <img class="product-thumbnail" src="./${responseData[i].img_main}" height="60%"> 
                <h4 class="product-name">${responseData[i].name}</h4>
                <h5 class="product-price">$${responseData[i].price}</h5>
                <p class="product-description">${responseData[i].description}</p>
                <button class="sku" onclick="getProduct(${responseData[i].id})">View!</button>
            </div>`;
        }

    } else if (param === 'single') {

        output += `

        <header class="flex-container header">
            <a href="index.html"><h1 id="logo">Nollie</h1></a>
            <nav>
                <ul class="flex-container nav">
                    <li><a href="./allProducts.html">Products</a></li>
                    <li><a href="./contact.html">Contact</a></li>
                </ul>
            </nav>
        </header>

        <div class="page-title">
            <h2>Product Detail</h2>
        </div>

        <section class="details-grid">
        
            <div class="grid-left">
                <img class="item-img-main" src="./${responseData[0].img_main}" height="60%">
            </div>


            <img class="item-img-top" src="./${responseData[0].img_b}">

            <img class="item-img-bottom" src="./${responseData[0].img_c}">


            <div class="grid-right">
                <h4 class="item-name">${responseData[0].name}</h4>
                <h5 class="item-price">$${responseData[0].price}</h5>
                <p class="item-description">${responseData[0].description}</p>
            <div>
            <select id="select">
                <option>Select Qty</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
            </div>
                <button id="addToCart" class="btn">Add To Cart</button>
            </div>

        </section>

        <footer class="footer">
            <div class="col flex-container">
                <button id="contactBtn" class="btn"><i class="far fa-paper-plane"></i>Contact Us</button>
            </div>
            <div class="col">
                <h6>About</h6>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error consequatur adipisci et maxime. Dicta autem, ullam dolorem recusandae ea officia consequuntur facilis deserunt laudantium quasi voluptatem! Labore eveniet dolores ab in laudantium recusandae. Assumenda tenetur architecto sapiente minima saepe aliquid natus porro possimus hic quam culpa, qui animi ipsum sit.</p>
            </div>
        </footer>
        <script src="assets/javascript/buttons.js"></script>
        <script src="assets/javascript/testRoutes.js"></script>`;
    }

    return output;
}
