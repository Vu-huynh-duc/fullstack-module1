import "./scss/main.scss";


const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const productsList = $(".productsList")
const productsListRow = productsList.querySelector(".row")

async function start() {
    const response = await fetch("https://dummyjson.com/products")
    
    const data =  JSON.parse(await response.text()).products
    console.log(data)
    
    data.forEach(item => {
            const productCol = document.createElement('div')            
            productCol.classList.add("col")
            

            const product = document.createElement('div')
            product.innerText = item.title
            product.classList.add("product")

            product.dataset.id = item.id



            productsListRow.appendChild(productCol)
            productCol.appendChild(product)

            product.addEventListener("click", () => {
            window.location.href = `details.html?id=${item.id}`
            })
        })
}

start()

