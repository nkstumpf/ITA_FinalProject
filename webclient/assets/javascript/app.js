console.log("connected to js file");

var all, snow, skate, surf, long, body;

snow = document.getElementById("snow");
skate = document.getElementById("skate");
surf = document.getElementById("surf");
long = document.getElementById("long");
body = document.getElementById("body");

function postContact() {
  // variables to store our user inputs
  var firstNameVal = document.getElementById("customer-firstname").value;
  var lastNameVal = document.getElementById("customer-lastname").value;
  var emailVal = document.getElementById("customer-email").value;
  var commentsVal = document.getElementById("customer-comments").value;
  var phoneVal, prefContactVal, refByVal;

  // collect and format phone number for db
  var phoneA = document.getElementById("customer-phone-a").value;
  var phoneB = document.getElementById("customer-phone-b").value;
  var phoneC = document.getElementById("customer-phone-c").value;

  phoneVal = "(" + phoneA + ")" + " " + phoneB + "-" + phoneC;

  // figure out which radio option the user selected
  if (document.getElementById("phone-btn").checked) {
    prefContactVal = document.getElementById("phone-btn").value;
  } else if (document.getElementById("email-btn").checked) {
    prefContactVal = document.getElementById("email-btn").value;
  }

  //   find out which checkboxes the user selected
  var checkboxes = [];

  checkboxes.push(document.getElementById("conf-btn"));
  checkboxes.push(document.getElementById("tv-btn"));
  checkboxes.push(document.getElementById("radio-btn"));
  checkboxes.push(document.getElementById("wom-btn"));
  checkboxes.push(document.getElementById("other-btn"));

  var selection = [];

  for (i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      selection.push(checkboxes[i].value);
    }
  }

  console.log(selection);

  refByVal = selection.toString();

  // our user object
  var user = {
    firstName: firstNameVal,
    lastName: lastNameVal,
    email: emailVal,
    phone: phoneVal,
    pref_contact: prefContactVal,
    referred_by: refByVal,
    comments: commentsVal
  };

  // format our user object into JSON
  JSONUser = JSON.stringify(user);

  // check our inputs
  console.log(prefContactVal);
  console.log(refByVal);
  console.log(JSONUser);

  // call to db
  function userPost() {
    const respData = fetch("http://localhost:8080/users", {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },

      body: JSONUser
    });

    body.innerHTML = generateResponse(respData, "post");

    // error handling
    //   if (respData.ok === true) {
    //     //  grab correct html and display
    //     body.innerHTML = generateResponse(respData, "post");
    //     console.log("true response" + respData.ok);
    //   } else {
    //     console.log("else hit");
    //     var JSONerr = {
    //       error_code: respData.status,
    //       response_msg: respData.statusText
    //     };

    //     JSONerr = JSON.stringify(JSONerr);

    //     const errReport = await fetch("http://localhost:8080/errors", {
    //       mode: "no-cors",
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json;charset=UTF-8"
    //       },

    //       body: JSONerr
    //     });
    //   }
    // }
  }
  userPost();
}

// get request for sinlge product
function getProduct(id) {
  console.log("view product was clicked");

  axios
    .get("http://localhost:8080/products/" + id)

    .then(response => {
      body.innerHTML = generateResponse(response, "single");
      console.log(response.data);
    });
}

// get request for all or product category
function getProducts(param) {
  if (param === "all") {
    axios
      .get("http://localhost:8080/products")

      .then(response => {
        content.innerHTML = generateResponse(response, "all");
        console.log(response);
      });
  } else if (param === "longboards") {
    axios
      .get("http://localhost:8080/products/sort/" + param)

      .then(response => {
        content.innerHTML = generateResponse(response, "longboards");
      });
  } else if (param === "skateboards") {
    axios
      .get("http://localhost:8080/products/sort/" + param)

      .then(response => {
        content.innerHTML = generateResponse(response, "skateboards");
      });
  } else if (param === "snowboards") {
    axios
      .get("http://localhost:8080/products/sort/" + param)

      .then(response => {
        content.innerHTML = generateResponse(response, "snowboards");
      });
  } else if (param === "surfboards") {
    axios
      .get("http://localhost:8080/products/sort/" + param)

      .then(response => {
        content.innerHTML = generateResponse(response, "surfboards");
      });
  }
}

// dynamic content loading for client
function loadHTML(param) {
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
            <button id="skate" class="btn" type="button" onclick="loadHTML('skateboards')">Skateboards</button>
            <button id="long" class="btn" type="button" onclick="loadHTML('longboards')">Longboards</button>
            <button id="snow" class="btn" type="button" onclick="loadHTML('snowboards')">Snowboards</button>
            <button id="surf" class="btn" type="button" onclick="loadHTML('surfboards')">Surfboards</button>
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
            <a href="./contact.html"
            ><button id="contactBtn" class="btn" type="button">
              <i class="far fa-paper-plane"></i>Contact Us
            </button></a
          >
            </div>
            <div class="col">
                <h6 id="about">About</h6>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error consequatur adipisci et maxime. Dicta autem, ullam dolorem recusandae ea officia consequuntur facilis deserunt laudantium quasi voluptatem! Labore eveniet dolores ab in laudantium recusandae. Assumenda tenetur architecto sapiente minima saepe aliquid natus porro possimus hic quam culpa, qui animi ipsum sit.</p>
            </div>
        </footer>`;

  if (param === "all") {
    // load all products
    getProducts("all");
  } else if (param === "longboards") {
    // load all longboards
    getProducts("longboards");
  } else if (param === "skateboards") {
    // load all skateboards
    getProducts("skateboards");
  } else if (param === "snowboards") {
    // load all snowboards
    getProducts("snowboards");
  } else if (param === "surfboards") {
    // load all surfboards
    getProducts("surfboards");
  }
}

function generateResponse(response, param) {
  console.log(response);
  var responseData = response.data;
  var output = "";

  if (param === "all") {
    console.log("all block entered");

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
  } else if (param === "longboards") {
    console.log("longboards block entered");

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
  } else if (param === "skateboards") {
    console.log("skateboards block entered");

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
  } else if (param === "snowboards") {
    console.log("snowboardsboards block entered");

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
  } else if (param === "surfboards") {
    console.log("surfboards block entered");

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
  } else if (param === "single") {
    console.log("single block entered");

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
            <a href="./contact.html"
            ><button id="contactBtn" class="btn" type="button">
              <i class="far fa-paper-plane"></i>Contact Us
            </button></a
          >
            </div>
            <div class="col">
                <h6>About</h6>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error consequatur adipisci et maxime. Dicta autem, ullam dolorem recusandae ea officia consequuntur facilis deserunt laudantium quasi voluptatem! Labore eveniet dolores ab in laudantium recusandae. Assumenda tenetur architecto sapiente minima saepe aliquid natus porro possimus hic quam culpa, qui animi ipsum sit.</p>
            </div>
        </footer>
        <script src="assets/javascript/app.js"></script>`;
  } else if (param === "post") {
    console.log("post function hit");
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

        <div class="submitted-msg">
        <div class="center">
            <i class="fas fa-mountain"></i>
            <h2>Thanks for reaching out!</h2>
            <p>Someone from our staff will be in touch soon.</p>
        </div>
    </div>

    <footer class="footer">
            <div class="col">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error consequatur adipisci et maxime. Dicta
                    autem, ullam dolorem recusandae ea officia consequuntur facilis deserunt laudantium quasi
                    voluptatem!
                    Labore eveniet dolores ab in laudantium recusandae. Assumenda tenetur architecto sapiente minima
                    saepe
                    aliquid natus porro possimus hic quam culpa, qui animi ipsum sit.</p>
            </div>
    </footer>
    <script src="assets/javascript/app.js"></script>`;
  }

  return output;
}
