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

window.onload = () => {
  getAllProduct();
};
