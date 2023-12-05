 // Function to fetch data from the API
 async function fetchData() {
    try {
        const response = await fetch('https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


// Function to create product cards
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const imageCard = document.createElement('div');
    imageCard.className = "image-container";
    card.appendChild(imageCard);

    // Add image

    const image = document.createElement('img');
    image.src = product.product_image;
    image.alt = product.product_title;
    imageCard.appendChild(image);

    // Add badge

    const badge = document.createElement('div');
    badge.textContent = product.product_badge;
    badge.className = "text-overlay";
    imageCard.appendChild(badge);

    const listContainer = document.createElement("div");
    listContainer.className = "list-container";
    card.appendChild(listContainer)
    // Add title
    const title = document.createElement('h3');
    title.textContent = product.product_title;
    listContainer.appendChild(title);

    

    // Add variants
    const variants = document.createElement('ul');
    product.product_variants.forEach(variant => {
        const variantItem = document.createElement('li');
        variantItem.textContent = Object.values(variant)[0];
        variants.appendChild(variantItem);
    });
    listContainer.appendChild(variants);

    return card;
}

// Get the product container
const productContainer = document.getElementById('product-container');

// Fetch data from the API and create cards
fetchData().then(products => {
    products.forEach(product => {
        const productCard = createProductCard(product);
        productContainer.appendChild(productCard);
    });
});



// Get the elements with class="column"
var elements = document.getElementsByClassName("product-card");

// Declare a loop variable
var i;

// List View
function listView() {
for (i = 0; i < elements.length; i++) {
    elements[i].style.width = "100%";
}
}

// Grid View
function gridView() {

    productCard.setAttribute("width", "calc(50% - 20px)")
}

fetchData().then(products => {
    displayProducts(products); // Display all products initially
});

function displayProducts(products) {
    // Clear the existing content
    productContainer.innerHTML = '';

    // Get the search input value
    const searchInput = document.getElementById('search-item').value.toLowerCase();

    // Filter products based on the search input
    const filteredProducts = products.filter(product =>
        product.product_title.toLowerCase().includes(searchInput)
    );

    // Create and display product cards for the filtered products
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productContainer.appendChild(productCard);
    });
}