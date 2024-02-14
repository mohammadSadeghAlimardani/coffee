const productsContainerDOM = document.querySelector(".products-container");
const specialMenuLinksDOM = document.querySelector(".special-menu-links");
const loadingDOM = document.querySelector(".loading");
const productsURL = "./api/products.json";
let uniqueLabels = [];

const fetchProducts = async () => {
    try {
        const response = await fetch(productsURL);
        const data = await response.json();
        setupUniqueLabals(data);
        displayProducts(data);
        displayTopGradeProducts(getTopGradeProducts(data));
    } catch (error) {
        console.log(error);
    }
}

function setupUniqueLabals(products){

    products.map(product => {

        const {labal} = product;
        uniqueLabels.push(labal);
    })

    uniqueLabels.unshift("all");
    uniqueLabels = [...new Set(uniqueLabels)];

    specialMenuLinksDOM.innerHTML = uniqueLabels.map(labal => {
        return  `<li class="${labal == "all" ? "active" : ""}">
                    <a href="#">${labal}</a>
                </li>`;
    }).join("");

}

function displayProducts (products){

    loadingDOM.classList.add("hide");

    productsContainerDOM.innerHTML = products.map(product => {

        const {image, title, price} = product;
        const {new : newPrice, old : oldPrice} = price;

        return  `<article>
                    <div class="product-image">
                        <img src="${image}" alt="${title}"/>
                    </div>
                    <h2 class="title-desc-primary">${title}</h2>
                    <h4 class="product-price">
                        price - <span class="new-product-price">$${newPrice}</span>
                        <span>/</span>
                        <span class="old-product-price">$${oldPrice}</span>
                    </h4>
                    <nav>
                        <ul class="product-links">
                            <li>
                                <a href="#">
                                    <i class="fa-solid fa-basket-shopping"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fa-regular fa-heart"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fa-solid fa-eye"></i>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </article>`;

    }).join("");

    const links = [...specialMenuLinksDOM.querySelectorAll("a")];
    
    links.forEach(link => {
        link.addEventListener("click", (e)=>{
            productsContainerDOM.innerHTML = "";
            loadingDOM.classList.remove("hide");
            e.preventDefault();
            removeActiveClass();
            link.parentElement.classList.add("active");
            filterProducts(link.textContent);
        });
    })
}

function removeActiveClass(){
    const listItems = [...document.querySelectorAll(".special-menu-links li")];
    listItems.forEach(listItem => listItem.classList.remove("active"));
}

async function filterProducts(labal){
    const response = await fetch(productsURL);
    const products = await response.json();
    let newProducts;
    if(labal == "all"){
        newProducts = [...products];
    }else{
        newProducts = products.filter(product => {
            return product.labal == labal;
        })
    }
    displayProducts(newProducts);
}

//-----------------------

const topGradeContainerDOM = document.querySelector(".top-grade-container");

function getTopGradeProducts(products){

    const topGradeProducts = products.filter(product => {
        return product.topGrade == true;
    })
    return topGradeProducts;
}


function displayTopGradeProducts(topGradeProducts){

    topGradeContainerDOM.innerHTML = topGradeProducts.map((topGradeProduct, index) => {

        const {image, title, description} = topGradeProduct;

        return  `<article>
                    <div>
                        <img src="${image}" alt="${title}"/>
                        <span class="grade-number">
                            ${index + 1} 
                        </span>
                    </div>
                    <h2 class="title-desc-primary">${title}</h2>
                    <p>${description}</p>
                </article>`;

    }).join("");
}

//------------------------

const carouselDOM = document.querySelector(".carousel");
const CutomerReviewsURL = "./api/customerReviews.json";
let carouselCellsDOM;
let currentTranslate;

const fetchCutomerReviews = async () => {
    const response = await fetch(CutomerReviewsURL);
    const data = await response.json();
    displayCutomerReviews(data);
}
function displayCutomerReviews(customerReviews){

    carouselDOM.innerHTML = customerReviews.map(customerReview => {

        const {description, image, userName, userJob} = customerReview;

        return  `<div class="carousel-cell">
                    <nav>
                        <ul>
                            <li class="icon"></li>
                            <li class="icon"></li>
                        </ul>
                    </nav>
                    <p>
                        ${description}
                    </p>
                    <img src="${image}" alt="${userName}"/>
                    <h5 class="user-name">${userName}</h5>
                    <h5 class="user-job">${userJob}</h5>
                </div>`;

    }).join("");

    carouselCellsDOM = document.querySelectorAll(".carousel-cell");
    currentTranslate = [];

    carouselCellsDOM.forEach((carouselCell, index)=>{
        carouselCell.style.transform = `translateX(${index * 100}%)`;
        currentTranslate.push(index * 100);
    })

}

let count = 0;

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

nextBtn.addEventListener("click", function(){
    if(count < carouselCellsDOM.length - 1){
        carouselCellsDOM.forEach((carouselCell, index)=>{
            currentTranslate[index] = currentTranslate[index] - 100;
            carouselCell.style.transform = `translateX(${currentTranslate[index]}%)`;
        })
        count++;  
    }
})
prevBtn.addEventListener("click", function(){
    if(count > 0){
        carouselCellsDOM.forEach((carouselCell, index)=>{
            currentTranslate[index] = currentTranslate[index] + 100;
            carouselCell.style.transform = `translateX(${currentTranslate[index]}%)`;
        })
        count--;  
    }
})

//-------------------

const newsAndBlogsURL = "./api/newsAndBlogs.json";
const blogsContainerDOM = document.querySelector(".blogs-container");

const fetchNewsAndBlogs = async () => {
    const response = await fetch(newsAndBlogsURL)
    const data = await response.json();
    displayNewsAndBlogs(data);
}

function displayNewsAndBlogs(newsAndBlogs){

    blogsContainerDOM.innerHTML = newsAndBlogs.map(newsAndBlog => {

        const {image, title, author} = newsAndBlog;

        return  `<article>
                    <div class="blog-image">
                        <img src="${image}" alt="${title}"/>
                    </div>
                    <h4 class="blog-author">by: <span>${author}</span></h4>
                    <h2 class="blog-title">
                        ${title}
                    </h2>
                    <ul>
                        <li>
                            <a href="#">
                                read more 
                                <i class="fa-solid fa-arrow-right"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fa-solid fa-code-branch"></i>
                            </a>
                        </li>
                    </ul>
                </article>`;
    }).join("");
}


window.addEventListener("DOMContentLoaded", fetchProducts);
window.addEventListener("DOMContentLoaded", fetchCutomerReviews);
window.addEventListener("DOMContentLoaded", fetchNewsAndBlogs);