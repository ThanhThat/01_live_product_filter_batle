const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const API = "https://fakestoreapi.com/products/";
const productTemplate = $("#productTemplate");

renderProductList(API);

$("#input-group").addEventListener("input", filterProductList);

async function renderProductList(api) {
  const productListElem =
    productTemplate.content.firstElementChild.cloneNode(true);
  const productImg = productListElem.querySelector(".product-img > img");
  const productName = productListElem.querySelector(".product-name");
  const productPrice = productListElem.querySelector(".product-price");
  let html = "";

  try {
    const res = await fetch(api);
    const productList = await res.json();

    productList.forEach((product) => {
      productImg.src = product.image;
      productImg.alt = product.title;
      productName.textContent = product.title;
      productPrice.textContent = "$" + product.price;

      html += productListElem.outerHTML;
    });

    $(".product-list").innerHTML = html;
  } catch (err) {
    console.log(err);
  }
}

// filter product
function filterProductList() {
  const productList = $$(".product-item");

  productList.forEach((product) => {
    const productInfo = product.textContent.toLowerCase().trim();

    if (!productInfo.includes(this.value.toLowerCase().trim())) {
      product.classList.add("d-none");
    } else {
      product.classList.remove("d-none");
    }
  });
}
