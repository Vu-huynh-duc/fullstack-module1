// import "./scss/main.scss";


// const $ = document.querySelector.bind(document)
// const $$ = document.querySelectorAll.bind(document)


onmessage = (e) => {
    const data = e.data

    const result = data
                    .filter(item => item.price > 15)
                    .sort((a, b) => a.price - b.price)
                    .map(item => ({
                        id: item.id,
                        title: item.title,
                        price: item.price
                        }))
    console.log(result)
    postMessage(result)
}