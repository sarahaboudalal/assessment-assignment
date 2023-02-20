const getProducts = () => {
    const cardsContainer = document.getElementById('cards-container') 
    fetch("http://localhost:3000/products")
        .then((response) => response.json())
        .then((data) => {
            data.map((product) => {
                const cardDiv = document.createElement('div')
                cardDiv.setAttribute('class', 'card-div')
                const cardImg = document.createElement('img')
                const productInfo = document.createElement('p')
                const productPrice = document.createElement('p')
                cardImg.src = './assets/cloud-pos.png'
                cardImg.setAttribute('class', 'cloud-image')
                productInfo.innerHTML = `${product.product}`
                productInfo.setAttribute('class', 'product-info')
                productPrice.innerHTML = `${product.price}`
                productPrice.setAttribute = ('class', 'product-price')
                cardDiv.appendChild(cardImg)
                cardDiv.appendChild(productInfo)
                cardDiv.appendChild(productPrice)
                cardsContainer.appendChild(cardDiv)
            })
    })
}
document.addEventListener('DOMContentLoaded', getProducts);