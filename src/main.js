import "./scss/main.scss";


const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const productsList = $(".productsList")
const productsListRow = productsList.querySelector(".row")

const worker1 = new Worker("./worker.js")

async function start() {
    const response = await fetch("https://dummyjson.com/products")
    
    const data =  await response.json()

    worker1.postMessage(data.products)
    
}
start()

worker1.onmessage = (e) => {
      const products = e.data
      const fragment = document.createDocumentFragment()

      products.forEach(item => {
            const productCol = document.createElement('div')            
            productCol.classList.add("col")            

            const product = document.createElement('div')
            product.innerText = item.title
            product.classList.add("product")

            product.dataset.id = item.id

            
            productCol.appendChild(product)
            fragment.appendChild(productCol)
        })
      productsListRow.appendChild(fragment)
}


productsListRow.onclick = (e) => {
  if(e.target.closest(".product")) {
    const product = e.target.closest(".product")
    window.location.href = `details.html?id=${product.dataset.id}`
  }
}



