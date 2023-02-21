// fetching products and displaying them into cards
const getProducts = () => {
    fetch('./products.json')
    .then((response) => response.json())
    .then((data) => {
        data.map((product) => {
            createCards(product)
        })
    })
}

// creating cards for each product and passing it in the above map
const createCards = (product) => {
    const cardsContainer = document.getElementById('cards-container') 
    const cardDiv = document.createElement('div')
                cardDiv.setAttribute('class', 'card-div')
                cardDiv.setAttribute('name', `${product.id}`)
                const cardImg = document.createElement('img')
                const productInfo = document.createElement('p')
                const productPrice = document.createElement('p')
                cardImg.src = './assets/cloud-pos.png'
                cardImg.setAttribute('class', 'cloud-image')
                productInfo.innerHTML = `${product.product}`
                productInfo.setAttribute('class', 'product-info')
                productPrice.innerHTML = `$${product.price}`
                productPrice.setAttribute = ('class', 'product-price')
                cardDiv.appendChild(cardImg)
                cardDiv.appendChild(productInfo)
                cardDiv.appendChild(productPrice)
                cardsContainer.appendChild(cardDiv)
                cardDiv.addEventListener('click', function () {
                        handleOnClick(product) //adding products info to the table
                })
}

// checks if the product is already added to the table, if it is the function increases it's quantity, if it's not it adds it
const handleOnClick = (product) => {
    let quantity = 1
    let total = parseInt(product.price) * parseInt(quantity)
    let totalPrice = 0.00
    const table = document.getElementById('table')
    const existingRow = document.getElementById(`${product.id}`)
    const totalPriceSection = document.getElementById('total')
    if (existingRow) {                                              // increasing the quantity of the existing product without adding it again
        const quantityCell = existingRow.querySelector('.quantity')
        const totalCell = existingRow.querySelector('.total-price')
        quantity = parseInt(quantityCell.innerHTML)
        quantity++;
        quantityCell.innerHTML = quantity                        //updating quantity
        total = parseInt(product.price).toFixed(2) * quantity
        totalCell.innerHTML = total.toFixed(2)                  //updating total price of single product
    } else {                                                   
        addProduct(table, product, quantity, total, totalPrice, totalPriceSection)
    }
    // calculating total price of all products
    for (i = 1; i < table.rows.length; i++){
        totalPrice = totalPrice + parseInt(table.rows[i].cells[3].innerHTML)
       }
    totalPriceSection.innerHTML = totalPrice.toFixed(2)
}

// adding a new row to the table 
const addProduct = (table, product, quantity, total, totalPrice, totalPriceSection) => {
        const row = table.insertRow()
        row.setAttribute('id', `${product.id}`)
        const productCell = row.insertCell(0)
        const priceCell = row.insertCell(1)
        const quantityCell = row.insertCell(2)
        const totalCell = row.insertCell(3)
        const decreaseCell = row.insertCell(4)
        productCell.innerHTML = `${product.product}`
        priceCell.innerHTML = `$${product.price}`
        quantityCell.innerHTML = `${quantity}`
        quantityCell.setAttribute('class', 'quantity')
        totalCell.innerHTML = `${total.toFixed(2)}`
        totalCell.setAttribute('class', 'total-price')
        decreaseCell.innerHTML = '-'
        decreaseCell.setAttribute('class', 'decrease')
        decreaseCell.addEventListener('click', function (e) {
            totalPrice = parseInt(totalPriceSection.innerHTML)
            decreaseQuantity(e, product, totalPrice)
        })
}


// to decrease the quantity of the products added or remove
const decreaseQuantity = (e, product, totalPrice) => {
    const existingRow = document.getElementById(`${product.id}`)
    const quantityCell = existingRow.querySelector('.quantity')
    const totalPriceSection = document.getElementById('total')
    const totalCell = existingRow.querySelector('.total-price')
    let quantity = parseInt(quantityCell.innerHTML)
    if (quantity === 1) {
        const target = e.target.parentNode.rowIndex;
        document.getElementById('table').deleteRow(target)
    } else {
        quantity--
        quantityCell.innerHTML = quantity //updating quantity
        totalCell.innerHTML = (product.price * quantity).toFixed(2) //updating total price
    }
    totalPrice = totalPrice - parseInt(product.price)  // decreasing the total price of all products when quantity decreases
    totalPriceSection.innerHTML = totalPrice.toFixed(2)
}

document.addEventListener('DOMContentLoaded', getProducts);