/* =====================================================
   CAMPUS SNACKPASS
   MENU + CART + ORDER TOKEN LOGIC
===================================================== */


/* ================= MENU DATA ================= */

const menuItems = [

    /* ---------- SNACKS ---------- */

    {
        id: 1,
        name: "Veg Burger",
        category: "Snacks",
        price: 80,
        image: "images/veg-burger.jpg"
    },

    {
        id: 2,
        name: "Veg Sandwich",
        category: "Snacks",
        price: 65,
        image: "images/veg-sandwich.jpg"
    },

    {
        id: 3,
        name: "French Fries",
        category: "Snacks",
        price: 60,
        image: "images/french-fries.jpg"
    },

    {
        id: 4,
        name: "Garlic Bread",
        category: "Snacks",
        price: 70,
        image: "images/garlic-bread.jpg"
    },


    /* ---------- CHAAT ---------- */

    {
        id: 5,
        name: "Pani Puri",
        category: "Chaat",
        price: 50,
        image: "images/pani-puri.jpg"
    },

    {
        id: 6,
        name: "Bhel Puri",
        category: "Chaat",
        price: 55,
        image: "images/bhel-puri.jpg"
    },

    {
        id: 7,
        name: "Dahi Puri",
        category: "Chaat",
        price: 60,
        image: "images/dahi-puri.jpg"
    },

    {
        id: 8,
        name: "Samosa Chaat",
        category: "Chaat",
        price: 65,
        image: "images/samosa-chaat.jpg"
    },


    /* ---------- MAGGI ---------- */

    {
        id: 9,
        name: "Masala Maggi",
        category: "Maggi",
        price: 60,
        image: "images/masala-maggi.jpg"
    },

    {
        id: 10,
        name: "Cheese Maggi",
        category: "Maggi",
        price: 80,
        image: "images/cheese-maggi.jpg"
    },


    /* ---------- PIZZA ---------- */

    {
        id: 11,
        name: "Veg Pizza",
        category: "Pizza",
        price: 120,
        image: "images/veg-pizza.jpg"
    },

    {
        id: 12,
        name: "Paneer Pizza",
        category: "Pizza",
        price: 150,
        image: "images/paneer-pizza.jpg"
    },


    /* ---------- MEALS ---------- */

    {
        id: 13,
        name: "Masala Dosa",
        category: "Meals",
        price: 70,
        image: "images/masala-dosa.jpg"
    },

    {
        id: 14,
        name: "Veg Fried Rice",
        category: "Meals",
        price: 100,
        image: "images/veg-fried-rice.jpg"
    },

    {
        id: 15,
        name: "Veg Noodles",
        category: "Meals",
        price: 90,
        image: "images/veg-noodles.jpg"
    },


    /* ---------- TEA & COFFEE ---------- */

    {
        id: 16,
        name: "Regular Tea",
        category: "Tea & Coffee",
        price: 20,
        image: "images/tea.jpg"
    },

    {
        id: 17,
        name: "Filter Coffee",
        category: "Tea & Coffee",
        price: 30,
        image: "images/filter-coffee.jpg"
    },

    {
        id: 18,
        name: "Cold Coffee",
        category: "Tea & Coffee",
        price: 60,
        image: "images/cold-coffee.jpg"
    },


    /* ---------- COLD DRINKS ---------- */

    {
        id: 19,
        name: "Fresh Lime Soda",
        category: "Drinks",
        price: 40,
        image: "images/lime-soda.jpg"
    },

    {
        id: 20,
        name: "Mango Shake",
        category: "Drinks",
        price: 70,
        image: "images/mango-shake.jpg"
    },


    /* ---------- DESSERTS ---------- */

    {
        id: 21,
        name: "Chocolate Cake",
        category: "Desserts",
        price: 60,
        image: "images/chocolate-cake.jpg"
    },

    {
        id: 22,
        name: "Brownie",
        category: "Desserts",
        price: 70,
        image: "images/brownie.jpg"
    },

    {
        id: 23,
        name: "Ice Cream",
        category: "Desserts",
        price: 50,
        image: "images/ice-cream.jpg"
    }

];


/* ================= CART ================= */

let cart = [];


/* ================= HTML ELEMENTS ================= */

const menuGrid =
    document.getElementById("menuGrid");

const cartItemsContainer =
    document.getElementById("cartItems");

const totalPrice =
    document.getElementById("totalPrice");

const cartCount =
    document.getElementById("cartCount");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const confirmBtn =
    document.getElementById("confirmBtn");

const orderModal =
    document.getElementById("orderModal");

const orderToken =
    document.getElementById("orderToken");

const closeModal =
    document.getElementById("closeModal");

const newOrderBtn =
    document.getElementById("newOrderBtn");


/* =====================================================
   DISPLAY MENU
===================================================== */

function displayMenu(items) {

    menuGrid.innerHTML = "";


    items.forEach(function(item) {

        menuGrid.innerHTML += `

            <div class="menu-card">

                <div class="food-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                </div>


                <div class="food-info">

                    <h3>
                        ${item.name}
                    </h3>


                    <p class="category">
                        ${item.category}
                    </p>


                    <div class="food-bottom">

                        <span class="price">
                            ₹${item.price}
                        </span>


                        <button
                            class="add-btn"
                            onclick="addToCart(${item.id})"
                        >
                            ADD +
                        </button>

                    </div>

                </div>

            </div>

        `;

    });

}


/* =====================================================
   CATEGORY FILTERING
===================================================== */

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {


        /* Remove active state */

        filterButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });


        /* Activate selected button */

        button.classList.add("active");


        /* Get category */

        const selectedCategory =
            button.dataset.category;


        /* Show everything */

        if (selectedCategory === "All") {

            displayMenu(menuItems);

            return;

        }


        /* Filter items */

        const filteredItems =
            menuItems.filter(function(item) {

                return item.category ===
                    selectedCategory;

            });


        displayMenu(filteredItems);

    });

});


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(id) {


    /* Find selected item */

    const selectedItem =
        menuItems.find(function(item) {

            return item.id === id;

        });


    /* Check if already in cart */

    const existingItem =
        cart.find(function(item) {

            return item.id === id;

        });


    if (existingItem) {

        existingItem.quantity++;

    }

    else {

        cart.push({

            ...selectedItem,

            quantity: 1

        });

    }


    updateCart();

}


/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {


    cartItemsContainer.innerHTML = "";


    /* Empty cart */

    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `

            <p class="empty-cart">

                <span>🍽️</span>

                Your order is empty.

                <small>
                    Pick something delicious
                    from the menu.
                </small>

            </p>

        `;

    }


    /* Cart has items */

    else {

        cart.forEach(function(item) {

            cartItemsContainer.innerHTML += `

                <div class="cart-item">


                    <div class="cart-item-top">

                        <span class="cart-item-name">

                            ${item.name}

                        </span>


                        <button
                            class="remove-btn"
                            onclick="removeItem(${item.id})"
                        >
                            Remove
                        </button>

                    </div>


                    <div class="quantity-controls">


                        <div class="quantity-buttons">

                            <button
                                class="qty-btn"
                                onclick="changeQuantity(
                                    ${item.id},
                                    -1
                                )"
                            >
                                −
                            </button>


                            <span>
                                ${item.quantity}
                            </span>


                            <button
                                class="qty-btn"
                                onclick="changeQuantity(
                                    ${item.id},
                                    1
                                )"
                            >
                                +
                            </button>

                        </div>


                        <span class="item-subtotal">

                            ₹${item.price *
                            item.quantity}

                        </span>

                    </div>

                </div>

            `;

        });

    }


    updateTotal();

    updateCartCount();

}


/* =====================================================
   CHANGE QUANTITY
===================================================== */

function changeQuantity(id, change) {


    const item =
        cart.find(function(item) {

            return item.id === id;

        });


    if (!item) {

        return;

    }


    item.quantity += change;


    /* Remove if quantity reaches zero */

    if (item.quantity <= 0) {

        removeItem(id);

        return;

    }


    updateCart();

}


/* =====================================================
   REMOVE ITEM
===================================================== */

function removeItem(id) {


    cart =
        cart.filter(function(item) {

            return item.id !== id;

        });


    updateCart();

}


/* =====================================================
   CALCULATE TOTAL
===================================================== */

function updateTotal() {


    const total =
        cart.reduce(function(sum, item) {

            return sum +
                (item.price *
                item.quantity);

        }, 0);


    totalPrice.textContent =
        "₹" + total;

}


/* =====================================================
   CART COUNT
===================================================== */

function updateCartCount() {


    const totalItems =
        cart.reduce(function(count, item) {

            return count +
                item.quantity;

        }, 0);


    cartCount.textContent =
        totalItems;

}


/* =====================================================
   RANDOM TOKEN
===================================================== */

function generateOrderToken() {


    const randomNumber =
        Math.floor(
            1000 +
            Math.random() * 9000
        );


    return "SNK-" + randomNumber;

}


/* =====================================================
   CONFIRM ORDER
===================================================== */

confirmBtn.addEventListener(
    "click",
    function() {


        /* Don't allow empty order */

        if (cart.length === 0) {

            alert(
                "Your order is empty! Please add some food first."
            );

            return;

        }


        /* Generate token */

        const token =
            generateOrderToken();


        /* Display token */

        orderToken.textContent =
            token;


        /* Open modal */

        orderModal.classList.add("show");

    }
);


/* =====================================================
   START NEW ORDER
===================================================== */

newOrderBtn.addEventListener(
    "click",
    function() {


        cart = [];


        updateCart();


        orderModal.classList.remove(
            "show"
        );

    }
);


/* =====================================================
   CLOSE MODAL
===================================================== */

closeModal.addEventListener(
    "click",
    function() {

        orderModal.classList.remove(
            "show"
        );

    }
);


/* =====================================================
   CLICK OUTSIDE MODAL
===================================================== */

window.addEventListener(
    "click",
    function(event) {


        if (
            event.target === orderModal
        ) {

            orderModal.classList.remove(
                "show"
            );

        }

    }
);


/* =====================================================
   INITIAL LOAD
===================================================== */

displayMenu(menuItems);

updateCart();