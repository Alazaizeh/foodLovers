let allOrders = [];
function Orders(customerName, foodType, price = 0) {
  this.customerName = customerName;
  this.foodType = foodType;
  this.price = price;
  this.getRandomPrice();
  allOrders.push(this);
  this.renderOrders();
}

Orders.prototype.getRandomPrice = function () {
  min = 2;
  max = 10;
  if (this.price == 0) {
    this.price = Math.floor(Math.random() * (max - min + 1) + min);
  }
};

Orders.prototype.renderOrders = function () {
  let index = allOrders.length - 1;
  let tbody = document.getElementById("tbody");
  if (tbody == null) {
    let tableDiv = document.getElementById("table-div");
    let table = document.createElement("table");
    table.id = "food-table";
    tableDiv.appendChild(table);
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.textContent = "Order Image";
    tr.appendChild(td);
    td = document.createElement("td");
    td.textContent = "Order Details";
    tr.appendChild(td);
    thead.appendChild(tr);
    table.appendChild(thead);

    tbody = document.createElement("tbody");
    tbody.id = "tbody";
    table.appendChild(tbody);
  }
  let trEl = document.createElement("tr");
  let tdEl = document.createElement("td");
  let img = document.createElement("img");

  if (this.foodType == "Burger") {
    img.setAttribute("src", "img/food/burger.jpg");
  } else if (this.foodType == "Shawarma") {
    img.setAttribute("src", "img/food/shawarma.jpg");
  } else {
    img.setAttribute("src", "img/food/pizza.jpg");
  }
  tdEl.appendChild(img);

  img = document.createElement("img");
  img.className = "removeImg";
  img.setAttribute(
    "src",
    "https://icons-for-free.com/iconfiles/png/512/cercle+close+delete+dismiss+remove+icon-1320196712448219692.png"
  );
  tdEl.appendChild(img);
  img.setAttribute("onclick", `removeItem(${index})`);
  trEl.appendChild(tdEl);

  tdEl = document.createElement("td");
  let p = document.createElement("p");
  let span = document.createElement("span");
  span.textContent = `Customer Name : ${this.customerName}`;
  p.appendChild(span);
  span = document.createElement("span");
  span.textContent = `Food Type : ${this.foodType}`;
  p.appendChild(span);
  span = document.createElement("span");
  span.textContent = `Food Price : ${this.price}`;
  p.appendChild(span);
  tdEl.appendChild(p);
  trEl.appendChild(tdEl);

  tbody.appendChild(trEl);
};

function setLocal() {
  localStorage.setItem("orders", JSON.stringify(allOrders));
}
function getLocal() {
  let data = JSON.parse(localStorage.getItem("orders"));
  if (data != null) {
    allOrders = [];
    for (let i = 0; i < data.length; i++) {
      new Orders(data[i].customerName, data[i].foodType, data[i].price);
    }
  }
}
function clearOrders() {
  allOrders = [];
  let table = document.getElementById("table-div");
  table.textContent = "";
  setLocal();
}

function removeItem(index) {
  allOrders.splice(index, 1);
  setLocal();
  let table = document.getElementById("table-div");
  table.textContent = "";
  getLocal();
}

document.getElementById("food-form").addEventListener("submit", addOrder);
/**
 *
 * @param {event} e
 */
function addOrder(e) {
  e.preventDefault();
  let customerName = e.target.customerName.value;
  let foodType = e.target.foodType.value;
  new Orders(customerName, foodType);
  setLocal();
}

getLocal();
