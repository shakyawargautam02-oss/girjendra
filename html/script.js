const products = [

    {
        id: 1,
        name: "AirFlex Pro Headphones",
        category: "Electronics",
        price: 3499,
        oldPrice: 4999,
        rating: 4.8,
        emoji: "🎧",
        description:
        "Premium wireless headphones with immersive sound and comfortable design."
    },

    {
        id: 2,
        name: "SmartFit Watch X2",
        category: "Electronics",
        price: 4299,
        oldPrice: 5999,
        rating: 4.7,
        emoji: "⌚",
        description:
        "Smart watch with fitness tracking and modern display."
    },

    {
        id: 3,
        name: "Mechanical Keyboard",
        category: "Electronics",
        price: 2899,
        oldPrice: 3799,
        rating: 4.9,
        emoji: "⌨️",
        description:
        "Professional mechanical keyboard with responsive switches."
    },

    {
        id: 4,
        name: "Urban Runner Sneakers",
        category: "Shoes",
        price: 2199,
        oldPrice: 3299,
        rating: 4.6,
        emoji: "👟",
        description:
        "Lightweight sneakers made for everyday comfort."
    },

    {
        id: 5,
        name: "Classic Leather Backpack",
        category: "Accessories",
        price: 1599,
        oldPrice: 2299,
        rating: 4.5,
        emoji: "🎒",
        description:
        "Stylish and durable backpack for everyday use."
    },

    {
        id: 6,
        name: "Aero Sunglasses",
        category: "Accessories",
        price: 999,
        oldPrice: 1499,
        rating: 4.4,
        emoji: "🕶️",
        description:
        "Modern lightweight sunglasses."
    },

    {
        id: 7,
        name: "Essential Hoodie",
        category: "Fashion",
        price: 1299,
        oldPrice: 1899,
        rating: 4.6,
        emoji: "🧥",
        description:
        "Soft and comfortable everyday hoodie."
    },

    {
        id: 8,
        name: "Premium T-Shirt",
        category: "Fashion",
        price: 799,
        oldPrice: 1199,
        rating: 4.5,
        emoji: "👕",
        description:
        "Premium cotton casual t-shirt."
    },


];


let cart =
JSON.parse(localStorage.getItem("cart")) || [];

let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];

let currentProducts = [...products];



/* DISPLAY PRODUCTS */

function displayProducts(list = currentProducts) {

    const grid =
    document.getElementById("productsGrid");

    grid.innerHTML = "";

    if(list.length === 0) {

        grid.innerHTML =
        "<h3>No products found 😕</h3>";

        return;
    }

    list.forEach(product => {

        const liked =
        wishlist.includes(product.id);

        grid.innerHTML += `

        <div class="product">

            <div class="productImage">

                <button
                class="wishlist ${liked ? "active" : ""}"
                onclick="toggleWishlist(${product.id})">

                    ${liked ? "♥" : "♡"}

                </button>

                ${product.emoji}

            </div>


            <div class="productInfo">

                <small>${product.category}</small>

                <h3>${product.name}</h3>

                <div class="rating">
                    ★ ${product.rating}
                </div>

                <div class="price">

                    ₹${product.price.toLocaleString("en-IN")}

                    <span class="oldPrice">
                        ₹${product.oldPrice.toLocaleString("en-IN")}
                    </span>

                </div>


                <button
                class="addCart"
                onclick="addToCart(${product.id})">

                    Add to Cart

                </button>


                <button
                class="viewBtn"
                onclick="showProduct(${product.id})">

                    View Details

                </button>

            </div>

        </div>

        `;
    });

}



/* ADD CART */

function addToCart(id) {

    const item =
    cart.find(item => item.id === id);

    if(item) {

        item.quantity++;

    } else {

        cart.push({
            id: id,
            quantity: 1
        });

    }

    saveData();

    updateCart();

    showToast("Product added to cart 🛒");

}



/* UPDATE CART */

function updateCart() {

    const count =
    cart.reduce(
        (total,item) =>
        total + item.quantity,
        0
    );

    document.getElementById("cartCount")
    .innerText = count;

}



/* OPEN CART */

function openCart() {

    renderCart();

    document
    .getElementById("cartOverlay")
    .classList.add("active");

}



/* CLOSE CART */

function closeCart() {

    document
    .getElementBId("cartOverlay")
    .classList.remove("active");

}



/* RENDER CART */

function renderCart() {

    const box =
    document.getElementById("cartItems");

    if(cart.length === 0) {

        box.innerHTML = `
            <div style="padding:60px 10px;text-align:center">
                <div style="font-size:60px">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add products to continue.</p>
            </div>
        `;

        document.getElementById("cartTotal")
        .innerText = "₹0";

        return;
    }


    let total = 0;

    box.innerHTML = "";

    cart.forEach(item => {

        const product =
        products.find(
            p => p.id === item.id
        );

        total +=
        product.price * item.quantity;


        box.innerHTML += `

        <div class="cartItem">

            <div class="cartEmoji">
                ${product.emoji}
            </div>

            <div>

                <h4>${product.name}</h4>

                <strong>
                    ₹${product.price.toLocaleString("en-IN")}
                </strong>

                <div class="qty">

                    <button
                    onclick="changeQuantity(${product.id},-1)">
                        −
                    </button>

                    ${item.quantity}

                    <button
                    onclick="changeQuantity(${product.id},1)">
                        +
                    </button>

                    <button
                    onclick="removeCart(${product.id})"
                    style="margin-left:10px">
                        ❌
                    </button>

                </div>

            </div>

        </div>

        `;

    });


    document.getElementById("cartTotal")
    .innerText =
    "₹" + total.toLocaleString("en-IN");

}



/* CHANGE QUANTITY */

function changeQuantity(id, amount) {

    const item =
    cart.find(item => item.id === id);

    item.quantity += amount;

    if(item.quantity <= 0) {

        cart =
        cart.filter(
            item => item.id !== id
        );

    }

    saveData();

    updateCart();

    renderCart();

}



/* REMOVE */

function removeCart(id) {

    cart =
    cart.filter(
        item => item.id !== id
    );

    saveData();

    updateCart();

    renderCart();

}



/* WISHLIST */

function toggleWishlist(id) {

    if(wishlist.includes(id)) {

        wishlist =
        wishlist.filter(
            item => item !== id
        );

        showToast("Removed from wishlist");

    } else {

        wishlist.push(id);

        showToast("Added to wishlist ❤️");

    }

    saveData();

    displayProducts();

}



function showWishlist() {

    const list =
    products.filter(
        p => wishlist.includes(p.id)
    );

    if(list.length === 0) {

        showToast("Wishlist is empty ❤️");

        return;
    }

    currentProducts = list;

    displayProducts(list);

    scrollToProducts();

}



/* FILTER */

function filterProducts(category) {

    if(category === "All") {

        currentProducts =
        [...products];

    } else {

        currentProducts =
        products.filter(
            p => p.category === category
        );

    }

    displayProducts(currentProducts);

}



/* SEARCH */

function searchProducts() {

    const value =
    document.getElementById("searchBox")
    .value
    .toLowerCase();

    currentProducts =
    products.filter(product =>

        product.name
        .toLowerCase()
        .includes(value)

        ||

        product.category
        .toLowerCase()
        .includes(value)

    );

    displayProducts(currentProducts);

}



/* SORT */

function sortProducts() {

    const value =
    document.getElementById("sortProducts")
    .value;

    let list =
    [...currentProducts];

    if(value === "low") {

        list.sort(
            (a,b) => a.price - b.price
        );

    }

    if(value === "high") {

        list.sort(
            (a,b) => b.price - a.price
        );

    }

    if(value === "rating") {

        list.sort(
            (a,b) => b.rating - a.rating
        );

    }

    displayProducts(list);

}



/* PRODUCT DETAILS */

function showProduct(id) {

    const product =
    products.find(
        p => p.id === id
    );

    document.getElementById(
        "productDetails"
    ).innerHTML = `

        <div class="details">

            <div class="detailImage">
                ${product.emoji}
            </div>

            <div>

                <small>
                    ${product.category}
                </small>

                <h2>
                    ${product.name}
                </h2>

                <div class="rating">
                    ★ ${product.rating}
                </div>

                <h2>
                    ₹${product.price.toLocaleString("en-IN")}
                </h2>

                <p>
                    ${product.description}
                </p>

                <br>

                <button
                class="mainBtn"
                onclick="addToCart(${product.id});closeProduct()">

                    Add to Cart

                </button>

            </div>

        </div>

    `;

    document
    .getElementById("productModal")
    .classList.add("active");

}



function closeProduct() {

    document
    .getElementById("productModal")
    .classList.remove("active");

}



/* LOGIN */

function openLogin() {

    document
    .getElementById("loginModal")
    .classList.add("active");

}



function closeLogin() {

    document
    .getElementById("loginModal")
    .classList.remove("active");

}



function login() {

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    if(!email || !password) {

        showToast(
            "Please enter email & password"
        );

        return;
    }

    closeLogin();

    showToast(
        "Demo login successful 👋"
    );

}



function signup() {

    showToast(
        "Signup page can be connected next"
    );

}



/* CHECKOUT */

function checkout() {

    if(cart.length === 0) {

        showToast(
            "Your cart is empty"
        );

        return;
    }

    showToast(
        "Order placed successfully 🎉"
    );

    cart = [];

    saveData();

    updateCart();

    renderCart();

}



/* LOCAL STORAGE */

function saveData() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

}



/* TOAST */

function showToast(message) {

    const toast =
    document.getElementById("toast");

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    },1800);

}



/* SCROLL */

function scrollToProducts() {

    document
    .getElementById("products")
    .scrollIntoView({
        behavior:"smooth"
    });

}



/* INITIAL */

displayProducts();

updateCart();

