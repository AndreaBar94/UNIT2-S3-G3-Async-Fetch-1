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
            <button type="button" id="add-to-cart" class="btn btn-primary m-1">Compra ora</button>
            <button type="button" id="discard-btn" class="btn btn-primary m-1">Scarta</button>
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
