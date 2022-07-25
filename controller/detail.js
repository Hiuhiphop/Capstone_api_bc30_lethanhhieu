const getAllProduct = () => {
  var promise = axios({
    url: "https://shop.cyberlearn.vn/api/Product",
    method: "GET",
  });
  promise.then((result) => {
    renderTable(result.data.content, "product-list");
  });
};

const renderTable = (arr, id) => {
  let html = "";
  for (let i = 0; i < arr.length; i++) {
    html += `
      <figure class="cart-card">
              <img
                src="${arr[i].image}"
                alt=""
              />
              <figcaption>
                <h3>${arr[i].name}</h3>
                <p>
                  ${arr[i].shortDescription}
                </p>
                <div class="price">
                  <span>$${arr[i].price}</span>
                </div>
              </figcaption>
              <i class="fa-solid fa-cart-shopping"><a href="./details.html?productid=${arr[i].id}"></a></i>
            </figure>
      `;
  }
  document.getElementById(id).innerHTML = html;
};

const getDetails = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const myParams = urlParams.get("productid");

  let promise = axios({
    url: "https://shop.cyberlearn.vn/api/Product/getbyid?id=" + myParams,
    method: "GET",
  });
  promise.then((result) => {
    renderDetails(result.data.content);
  });
};
const renderDetails = (idProduct) => {
  document.getElementById("prod-img").src = idProduct.image;
  document.getElementById("prod-name").innerHTML = idProduct.name;
  document.getElementById("prod-desc").innerHTML = idProduct.description;
  document.getElementById("prod-price").innerHTML = idProduct.price + " $";

  let sizeProd = idProduct.size;
  let html = "";
  for (let i = 0; i < sizeProd.length; i++) {
    html += `<button class="btn btn-secondary fs-3">${sizeProd[i]}</button>`;
  }
  document.getElementById("prod-size").innerHTML = html;
};
window.onload = () => {
  getDetails();
  getAllProduct();
};
