console.log("connected to js file");

// require axios
// var axios = require('axios');

var all, snow, skate, surf, long, body;

// all = document.getElementById('all');
snow = document.getElementById('snow');
skate = document.getElementById('skate');
surf = document.getElementById('surf');
long = document.getElementById('long');
body = document.getElementById('body');

// axios 

function getProduct(id) {

    console.log('view product was clicked');

    // get single produc
    // query api
    axios.get('http://localhost:8000/products/' + id)
        // response 
        .then((response) => {
            body.innerHTML = generateResponse(response, 'single');
            console.log(response.data);

        });
}

function getProducts(param) {

    if (param === 'all') {

    // get all products

    // query api
    axios.get('http://localhost:8000/products')
        // response 
        .then((response) => {
            content.innerHTML = generateResponse(response, 'all');

        });
    } else {

        axios.get('http://localhost:8000/products/' + param)
        // response 
        .then((response) => {
            content.innerHTML = generateResponse(response, 'all');

        });

    }

}

function loadHTML(param) {

    if (param === 'all') {

        body.innerHTML = `
        
        <header class="flex-container header">
            <a href="index.html"><h1 id="logo">Nollie</h1></a>
            <nav>
                <ul class="flex-container nav">
                    <li><a href="#" onclick="loadHTML('all')">Products</a></li>
                    <li><a href="./contact.html">Contact</a></li>
                </ul>
            </nav>
        </header>

        <div class="page-title">
            <h2>All Products</h2>
        </div>

        <div class="featured-products-banner">
            <h3>Featured!</h3>
        </div>

        <div class="featured-products">
            <img src="./assets/images/featured-product.jpg" alt="featured product" width="300px">
            <img src="./assets/images/featured-product2.jpg" alt="featured product" width="300px">
            <img src="./assets/images/featured-product3.jpg" alt="featured product" width="300px">
        </div>

        <div class="flex-container">
            <button id="skate" class="btn" type="button">Skateboards</button>
            <button id="long" class="btn" type="button">Longboards</button>
            <button id="snow" class="btn" type="button">Snowboards</button>
            <button id="surf" class="btn" type="button">Surfboards</button>
        </div>
        
        <div class="searchbar-container">
            <div class="searchbar">
                <button type="submit" class="search-btn"><i class="fas fa-search fa-xs"></i></button>
                <input id="search-input" type="text" value="" placeholder="Search Products">
            </div>
        </div>

        <section id="content" class="products-container">

            // OUR NEW CONTENT HERE

        </section>

        <footer class="footer">
            <div class="col flex-container">
                <button id="contactBtn" class="btn" type="button"><i class="far fa-paper-plane"></i>Contact Us</button>
            </div>
            <div class="col">
                <h6 id="about">About</h6>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error consequatur adipisci et maxime. Dicta autem, ullam dolorem recusandae ea officia consequuntur facilis deserunt laudantium quasi voluptatem! Labore eveniet dolores ab in laudantium recusandae. Assumenda tenetur architecto sapiente minima saepe aliquid natus porro possimus hic quam culpa, qui animi ipsum sit.</p>
            </div>
        </footer>`;

        getProducts('all');

    } else if (param === 'category') {
        // load product category
    }

}

function generateResponse(response, param) {
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
                    <li><a href="#" onclick="loadHTML('all')">Products</a></li>
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
