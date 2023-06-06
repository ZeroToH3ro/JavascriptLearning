const products = document.querySelector('.products');
const filter = document.getElementById('filter');
const listItem = [];

getData();

//input data to filter
filter.addEventListener('input', (e) => filterData(e.target.value))


async function getData() {
    //Create res to fetch data from store api 
    //Store fetch data into variable result
    const res = await fetch ('https://fakestoreapi.com/products');
    const results = await res.json();

    //Clear data
    products.innerHTML = '';
    //Loop through data and append to html
    results.forEach((element) => {
        //Create div and set its 'product'
        const div = document.createElement('div');
        div.setAttribute('class', 'product');
        //Push data into list item
        listItem.push(div);

        div.innerHTML = 
        `
        <img src=${element.image} alt="">
        <div>
            <h4>${element.title.slice(0,30)}</h4>
            <p>${element.price}</p>
        </div>
        `
        products.appendChild(div);
    });
}

function filterData(search){
    listItem.forEach((item) => {
        if (item.innerText.toLowerCase().includes(search.toLowerCase())) {
			item.classList.remove('hide')
		} else {
			item.classList.add('hide')
		}
    });
}