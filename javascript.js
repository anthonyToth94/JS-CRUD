//Create an object array what you want to render when the page is loaded
let state = {
  product: [
    {
      id: randomIdGen(),
      name: "Product 1",
      price: 2500,
      isInStock: true,
    },
    {
      id: randomIdGen(),
      name: "Product 2",
      price: 4000,
      isInStock: false,
    },
    {
      id: randomIdGen(),
      name: "Product 3",
      price: 3000,
      isInStock: true,
    },
    {
      id: randomIdGen(),
      name: "Product 4",
      price: 1500,
      isInStock: false,
    },
    {
      id: randomIdGen(),
      name: "Product 5",
      price: 1200,
      isInStock: true,
    },
  ],
  editedId: "",
};

//Check items
//console.log(...state.product);

//randomGenerator add to the state objects
function randomIdGen() {
  /*
    CREATE A MULTI DIMENSION ARRAY[0][0]
    CREATE EMPTY STRING "" where you want to add the random values
    LOOP ONCE - NOT NEED BUT LATER MAYBE EASIER IF NEED IT
    ADD THE RANDOM NUMBER TO YOUR STRING
    INSIDE THE FIRST LOOP START ANOTHER FOR (5) - 1+5 = 6 VALUES
    TERNARY OPERATOR AFTER 3 CHAR ADD - OR NOTHING
    RETURN THE VALUE TO USE IN OBJECTS
  */
  const rnd = [
    ["A", "B", "C", "D", "E", "F"],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  ];
  let myNum = "";
  for (let one = 0; one < 2; one++) {
    let random = Math.floor(Math.random() * rnd[0].length);
    myNum += rnd[0][random];

    for (let i = 0; i < 2; i++) {
      let random2 = Math.floor(Math.random() * rnd[1].length);
      i == 1 ? (myNum += rnd[1][random2] + "-") : (myNum += rnd[1][random2]);
    }
  }

  let myNumSub = myNum.substr(0, 7);
  //console.log(myNumSub);
  return myNumSub;
}

//crud Project
crudProducts();
function crudProducts() {
  //Render element
  document.onload = renderProducts();
  function renderProducts() {
    /*   
        SAVE DIV where you want to fill the content
        CREATE AN EMPTY "" CONTENT WHERE YOU ADD THE CONTENT
        LOOP THE OBJECTS AND TAKES OUT THE VALUES
        CREATE DIV / bottom the termék h1 .wrappem 
        CREATE H3 name / CREATE P price / CREATE P isInStock 
        CREATE 2 BUTTON CLASS: .delete .edit
        FILL ITEMS INTO THE ELEMENTS 
        isInStock false GIVE AN UNIQUE CLASS .delete.add, edit.add, button.disabled, .opacity
        USE DIV what you save to add a new dynamic content
     */
    const productsDiv = document.getElementsByClassName("products")[0];
    let content = "";
    for (product of state.product) {
      content += `
    <div class ="wrappem ${product.isInStock == false ? "opacity" : ""}">
    <h3>${product.name}</h3>
    <p>${product.price} £</p>
    <p>${product.isInStock == true ? "Is in stock" : "Out of stock"}</p>
    <div>
    <button class="edit"" data-productId="${product.id}">Edit</button>
    <button class="delete" data-productId="${product.id}">Delete</button>
      </div>
    </div>
     `;
    }

    productsDiv.innerHTML = content;

    //Render edited Elements
    renderEditedProducts = function (id) {
      /*
      SAVE DIV edit-products
      CREATE CONTENT = ""
      USE ID FROM METHOD PARAMATER AND FILL IT UP THE CONTENT
      ADD INNERHTML FROM edit-products

      SIMILAR THAN CREATE
      state.product[ID] from paramater and create a new object
      STATE EDITED ID = "";
      renderProducts();
      EXTRA FORM INNERHTML = "" IF editedId == "" and return to stop 
       */
      let editProd = document.getElementsByClassName("edit-products")[0];

      let content = `
      <form id="editForm">
      <h1>Edit product</h1>
      <!-- row 1 -->
      <div style="margin-bottom: 20px; margin-top: 20px">
        <input
          class="input"
          type="text"
          name="name"
          autocomplete="off"
          maxlength="15"
          value="${state.product[id].name}"
        />
      </div>
      <!-- row 2 -->
      <div style="margin-bottom: 20px">
        <input
        type="number"
          name="price"
          autocomplete="off"
          value="${state.product[id].price}"
        />
      </div>
      <!-- row 3 -->
      <div>
        <label>
          Is in stock?
          <input type="checkbox" name="isInStock" id="checkbox" ${
            state.product[id].isInStock == true ? "checked" : ""
          }/>
        </label>
        <button type="submit">Add</button>
      </div>
    </form>
      `;
      editProd.innerHTML = content;

      const editForm = document.getElementById("editForm");
      editForm.onsubmit = function (event) {
        event.preventDefault();
        let name = event.target.elements.name.value;
        let price = Number(event.target.elements.price.value);
        let isInStock = event.target.elements.isInStock.checked;

        state.product[id] = {
          id: state.editedId,
          name: name,
          price: price,
          isInStock: isInStock,
        };
        state.editedId = "";
        if (name != "" || price != "") {
          renderProducts();
          //if (state.editedId === "") {
          //Ez csak az elejére kéne
          editProd.innerHTML = "";
          //return;
          //   }
          //renderEditedProducts();
        }
      };
    };

    //Edit element
    editProducts();
    function editProducts() {
      /*
       ADD data-name="value" ATTRIBUTE FOR YOUR EDIT BUTTON
       SAVE ALL OF EDIT BUTTON / LOOP ALL OF THEM
       ADD EVENT FOR YOUR BUTTON ELEMENTS
       SAVE FOR VARIABLE dataset.name  <- WHAT YOU ADD FOR THE DATA
       SAVE it for state.editedId 
       CREATE AN ID "" TO STORE THE PRODUCT ELEMENT ID
       RENDER BOTTOM OF THE FORM THE OBJECT (METHOD)
       */
      const editButton = document.querySelectorAll(".edit");

      for (let i = 0; i < editButton.length; i++) {
        editButton[i].onclick = function (event) {
          let prodId = editButton[i].dataset.productid;

          state.editedId = prodId;

          let id = i;

          renderEditedProducts(id);
        };
      }
    }

    //Delete element
    deleteProducts();
    function deleteProducts() {
      /*
        ADD data-name="value" ATTRIBUTE FOR YOUR DELETE BUTTON
        SAVE ALL OF DELETE BUTTON /LOOP ALL OF THEM 
        ADD EVENT FOR YOUR BUTTON ELEMENTS
        SAVE FOR VARIABLE dataset.name  <- WHAT YOU ADD FOR THE DATA
        CREATE ID EMPTY VARIABLES "" then save your LOOP NUMBER THERE
        UNSET OBJECT ARRAY -> ID[0], HOW MUCH?
        CALL renderProducts() method
         */
      const deleteButton = document.querySelectorAll(".delete");

      for (let i = 0; i < deleteButton.length; i++) {
        deleteButton[i].onclick = function (event) {
          let prodId = deleteButton[i].dataset.productid;

          let id;
          if (state.product[i].id === prodId) {
            id = i;
          }
          state.product.splice(id, 1);

          renderProducts();
        };
      }
    }
  }

  //Create element
  createProducts();

  function createProducts() {
    /* 
        SAVE THE FORM / ADD ONSUBMIT EVENT / PREVENTDEFAULT
        SAVE THE INPUT NAME / PRICE / CHECKBOX / SUBMIT VALUES
        THE PRICE CONVERT TO NUMBER!
        PUSH ITEMS INTO THE OBJECT ARRAY
        FILL IT UP WITH YOUR VALUES
        THEN USE RENDERPRODUCTS() FUNCTION
        AFTER ADD PUT DEFAULT VALUES ""
        FIX THE EMPTY VALUES
     */
    const form = document.getElementsByTagName("FORM")[0];
    form.onsubmit = function (event) {
      event.preventDefault();
      let name = event.target.elements.name.value;
      let price = Number(event.target.elements.price.value);
      let isInStock = event.target.elements.isInStock.checked;

      if (name != "" || price != "") {
        state.product.push({
          id: randomIdGen(),
          name: name,
          price: price,
          isInStock: isInStock,
        });
      }
      event.target.elements.name.value = "";
      event.target.elements.price.value = "";
      event.target.elements.isInStock.checked = false;
      renderProducts();
    };
  }
}
