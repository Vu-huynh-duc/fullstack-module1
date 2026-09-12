import "./scss/main.scss";


const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const productTitle = $(".productTitle")
const productImage = $(".productImage")
const productPrice = $(".productPrice")
const productCategory = $(".productCategory")
const productRating = $(".productRating")
const productStock = $(".productStock")


async function start() {
    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")
    
//    console.log(id)

   const response = await fetch(`https://dummyjson.com/products/${id}`)
   const product = await response.json()
   console.log(product)
   productTitle.textContent = product.title
   productImage.src = product.thumbnail
   productPrice.textContent = `${product.price}$`
   productCategory.textContent = product.category
   productRating.textContent = product.rating
   productStock.textContent = product.stock
}

start()

