let productForm = document.getElementById("add_product_form");
productForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let data = JSON.stringify({
    name: event.target["name"].value,
    desk: event.target["desc"].value,
    price: event.target["price"].value,
    photo: event.target["photo"].value,
    author_id: event.target["author_id"].value,
  });
  event.target["name"].value = "";
  event.target["desc"].value = "";
  event.target["price"].value = "";
  event.target["photo"].value = "";
  event.target["author_id"].value = "";

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });
  xhr.open("POST", "https://market-4085.restdb.io/rest/products");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("x-apikey", "680e1fb272702c457ab3d319");
  xhr.setRequestHeader("cache-control", "no-cache");

  xhr.send(data);
});

let orders = document.getElementById('admin_page_orders');

let xhr = new XMLHttpRequest();
      xhr.open("GET","https://market-4085.restdb.io/rest/orders");
      xhr.responseType = "json";
      xhr.setRequestHeader("content-type", "application/json");
      xhr.setRequestHeader("x-apikey", "680e1fb272702c457ab3d319");
      xhr.setRequestHeader("cache-control", "no-cache");

      xhr.onload = function(){
        xhr.response.forEach(function(order) {
          let orderElement = document.createElement('div');
          orderElement.classList.add('product');

          let statusColor = 'green';
          if(order.status == 'Complited'){
            statusColor = 'yellow';
          }
          orderElement.innerHTML += `
          <h2>Order: ${order._id}</h2>
          <p><b>Status: </b> <span style="color:${statusColor}">${order.status}</span><p/>
          <p><b>Customer name: </b> ${order.name}<p/>
          <p><b>Address: </b> ${order.address}<p/>
          <p><b>Phone: </b> ${order.phone}<p/>
          <p><b>Post Office Nummber: </b> ${order.post_number}<p/>
          `;
          let sum = 0;


          order.products.forEach(function(p){
            sum+= p.price;
          })

          orderElement.innerHTML +=`
          <p>Total price: ${sum}$</p>
          <button onclick="">Mark as Completed</button>
          `;
          orders.append(orderElement);
          })
        }

        xhr.send();
      
