
// grab data
// function getData() {
//     fetch('http://localhost:8020/products')
//     .then(response => { 
//         return response.json()
//     })
//     .then(data => {
//       for (i = 0; i < data.length; i++) {
//           var product = 

//           `<figure class="${data[i].description}"> 
//                 <a href="details.html"><img class="products" src="image${data[i].imgNum}.jpg" alt="${data[i].description}"/></a>
//                 <figcaption>${data[i].product_name}</figcaption>
//                 <figcaption>$${data[i].price}</figcaption>
//             </figure> `

//           document.getElementById('empty-div').innerHTML += product
//       }
//     })
//   }
   
// filter data
  // function filterProducts(category) {

    // if category === "shampoo"

        // loop through all products in empty-div 
        // find the ones the have the matching class: "shampoo" (use an if statement)
        // add a class to these that sets "display" to "block" (classList.add)
        // any product that doesn't have class: "shampoo" add a class to these that sets "display" to "none"

    // else if category === "conditioner"

        // show all products with class "conditioner"

    // else if category === "hair spray"

            // show all products with class "hair spray"


    //  else if category === "mousse"

        // show all products with class "mousse"