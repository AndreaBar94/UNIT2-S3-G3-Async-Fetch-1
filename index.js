fetch("https://striveschool-api.herokuapp.com/books")
	.then((responseObj) => responseObj.json())
	.then((books) => {
		const box = document.getElementById("box");
		box.innerHTML = "";
		const row = document.createElement("div");
		row.className = "row";
		row.classList.add("row-cols-1");
		row.classList.add("row-cols-md-2");
		row.classList.add("row-cols-lg-4");
		row.classList.add("row-cols-xl-6");
		row.classList.add("d-flex");
		row.classList.add("align-items-end");
		row.classList.add();
		row.classList.add("g-5");
		row.classList.add("mt-3");
		box.appendChild(row);

		books.forEach((book) => {
			let col = document.createElement("div");
			col.className = "col";
			col.innerHTML = `
            <div class="card shadow" id="${book.asin}">
            <img src="${book.img}" class="card-img-top img-fluid" alt="book thumbnail">
            <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">${book.category}; Price: ${book.price}</p>
            <button type="button" id="add-to-cart" class="btn btn-primary m-1">Compra ora <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg></button>
            <button type="button" id="discard-btn" class="btn btn-primary m-1">Scarta <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
          </svg></button>
            </div>
        </div>
                        `;
			//elimina la card
			let deleteBtn = col.querySelector("#discard-btn");
			deleteBtn.addEventListener("click", () => {
				col.remove();
			});

			//aggiungi al carrello

			let addToCart = col.querySelector("#add-to-cart");
			let cartList = document.querySelector("#cart-list");
			addToCart.addEventListener("click", () => {
				let containerCartItem = document.createElement("div");
				containerCartItem.classList.add("d-flex");
				containerCartItem.classList.add("p-2");
				let item = document.createElement("li");
				item.className = "dropdown-item";
				item.innerText = `${book.title}`;
				containerCartItem.appendChild(item);
				cartList.appendChild(containerCartItem);
				//salvo nel local storage
				let CART = "Cart";
				let cart = [];
				if (localStorage.getItem(CART)) {
					cart = JSON.parse(localStorage.getItem(CART));
				}
				cart.push(`${book.title}`);
				localStorage.setItem(CART, JSON.stringify(cart));

				//elimina dal carrello
				let deleteFromCart = document.createElement("button");
				deleteFromCart.setAttribute("type", "button");
				deleteFromCart.classList.add("btn");
				deleteFromCart.classList.add("btn-outline-danger");
				deleteFromCart.textContent = "Elimina";
				containerCartItem.appendChild(deleteFromCart);
				deleteFromCart.addEventListener("click", () => {
					item.remove();
					deleteFromCart.remove();
				});
			});
			row.appendChild(col);
		});
	})
	.catch((error) => console.log("CATCH", error));
