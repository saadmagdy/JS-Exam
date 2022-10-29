$(".menu").click(function () {
  $(".left-nav").toggleClass("close-left-nav");
  $(".right-nav").toggleClass("close-right-nav");
  //
  $(".item1").animate(
    {
      opacity: "1",
      paddingTop: "25px",
    },
    1100
  ),
    $(" .item2").animate(
      {
        opacity: "1",
        paddingTop: "25px",
      },
      1200
    ),
    $(" .item3").animate(
      {
        opacity: "1",
        paddingTop: "25px",
      },
      1300
    ),
    $(" .item4").animate(
      {
        opacity: "1",
        paddingTop: "25px",
      },
      1400
    ),
    $(" .item5").animate(
      {
        opacity: "1",
        paddingTop: "25px",
      },
      1500
    ),
    $(".item6").animate(
      {
        opacity: "1",
        paddingTop: "25px",
      },
      1600
    );
});
/******************************************************************************/

/* get random meals to display on site load*/
async function getRandomMeals() {
  let responce = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  result = await responce.json();
  meals = result.meals;

  let cartona = "";

  for (let i = 0; i < meals.length; i++) {
    cartona += ` 
      <div class="col-md-6 col-lg-3 my-3   shadow">
            <div onclick="getMeal('${meals[i].idMeal}')" class="pointer overflow-hidden hover shadow rounded position-relative">
                <div class="post ">
                    <img src='${meals[i].strMealThumb}' class="w-100 rounded" />
                    <div class="layer d-flex align-items-center ">
                        <div class=" font-5fif p-2">
                            <h2>${meals[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  `;
    $("#rowData").html(cartona);
  }
}
$(document).ready(function () {
  getRandomMeals();
});

/***********************************************/

async function getMeal(mealId) {
  let responce = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  let result = await responce.json();
  meal = result.meals;
  /**************************/
  let recipes = "";
  for (let i = 1; i <= 20; i++) {
    if (meal[0][`strIngredient${i}`]) {
      recipes += `<li class="my-3 mx-1 p-1 alert alert-success rounded"> ${
        meal[0][`strMeasure${i}`]
      } ${meal[0][`strIngredient${i}`]}</li>`;
    }
  }
  /** ******************************************/

  let tag = meal[0].strTags?.split(",");
  let tags = "";
  for (let i = 0; i < tag?.length; i++) {
    tags += `<li class="my-3 mx-1 p-1 alert alert-danger rounded">${tag[i]}</li>`;
  }
  /*********************************** */
  let cartona = "";
  for (let i = 0; i < meal.length; i++) {
    cartona += ` 
       <div class="col-md-4 myM text-white">
					<img class="w-100" src="${meal[i].strMealThumb}">
          <br>
					<h1 >${meal[i].strMeal}</h1>
				</div>
				<div class="col-md-8  text-white  text-start">
					<h2>Instructions</h2>
					<p>${meal[i].strInstructions}</p>
					<p><b class="fw-bolder">Area :</b> ${meal[i].strArea}</p>
					<p><b class="fw-bolder">Category :</b> ${meal[i].strCategory}</p>
					<h3>Recipes :</h3>
					<ul class="d-flex flex-wrap fw-light"  id="recipes">
					</ul>
          <h3 class="my-2 mx-1">Tags :</h3>
					<ul class="d-flex" id="tags">
					</ul>

					
					<a class="btn btn-success text-white" target="_blank" href="${meal[i].strSource}">Source</a>
					<a class="btn btn-danger youtube text-white" target="_blank" href="${meal[i].strYoutube}">Youtub</a>
				</div>`;
  }
  $("#rowData").html(cartona);
  $("#recipes").html(recipes);
  $("#tags").html(tags);
}
/***********************************************/
async function getCategories() {
  let responce = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let result = await responce.json();
  let category = result.categories;

  /********************************************** */
  let cartona = "";
  for (let i = 0; i < category.length; i++) {
    cartona += `
    <div class="col-md-6 col-lg-3 my-3  shadow">
        <div class="pointer shadow rounded position-relative  overflow-hidden hover">
            <div onclick=" getCategoryByName('${
              category[i].strCategory
            }')" class=" overflow-hidden hover">
                <img src='${
                  category[i].strCategoryThumb
                }' class="w-100 rounded" />
                <div class="layer d-flex align-items-center  p-3 ">
                    <div class=" font-5fif ">
                        <h4 class=" pt-5">${category[i].strCategory}</h4>
                        <p>${category[i].strCategoryDescription
                          .split(" ")
                          .slice(0, 12)
                          .join(" ")}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
  }
  $("#rowData").html(cartona);
}

$(".nav-item #categories").click(function () {
  getCategories();
});
/***************************************************** */
async function getCategoryByName(categoryName) {
  let responce = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  );
  let result = await responce.json();
  let categName = result.meals;
  console.log(categName);

  /****************************************** */
  let cartona = "";

  for (let i = 0; i < categName.length; i++) {
    cartona += ` 
      <div class="col-md-6 col-lg-3 my-3   shadow">
            <div onclick="getMeal('${categName[i].idMeal}')" class="pointer overflow-hidden hover shadow rounded position-relative">
                <div class="post ">
                    <img src='${categName[i].strMealThumb}' class="w-100 rounded" />
                    <div class="layer d-flex align-items-center ">
                        <div class=" font-5fif p-2">
                            <h4 class="fw-light">${categName[i].strMeal}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  `;
  }
  $("#rowData").html(cartona);
}
/************************************************ */
async function getArea() {
  let responce = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let result = await responce.json();
  let area = result.meals;

  let cartona = "";
  for (let i = 0; i < 20; i++) {
    cartona += `<div class="col-md-6 col-lg-3 my-3   shadow">
        <div class=" shadow rounded position-relative pointer">
            <div onclick=(displayArea('${area[i].strArea}')) class="post ">
                <i class="fa-solid fa-city fa-3x"></i>
                <h2 class="text-white">${area[i].strArea}</h2>
            </div>
        </div>
    </div>`;
  }
  $("#rowData").html(cartona);
}

$(".nav-item #area").click(function () {
  getArea();
});

async function displayArea(areaId) {
  let responce = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaId}`
  );
  let result = await responce.json();
  let place = result.meals;
  let cartona = "";

  for (let i = 0; i < place.length; i++) {
    cartona += ` 
      <div class="col-md-6 col-lg-3 my-3   shadow">
            <div onclick="getMeal('${place[i].idMeal}')" class="pointer overflow-hidden hover shadow rounded position-relative">
                <div class="post ">
                    <img src='${place[i].strMealThumb}' class="w-100 rounded" />
                    <div class="layer d-flex align-items-center ">
                        <div class=" font-5fif p-2">
                            <h2>${place[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  `;
    $("#rowData").html(cartona);
  }
}

async function getIngredients() {
  let responce = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let result = await responce.json();
  let allIngred = result.meals;

  let cartona = "";
  for (let i = 0; i < 20; i++) {
    cartona += `
    <div class="col-md-6 col-lg-3 my-3   shadow">
        <div onclick="displayIngredients('${
          allIngred[i].strIngredient
        }')" class=" shadow rounded position-relative pointer">
            <div class="post ">
                <i class="fa-solid fa-bowl-food fa-3x"></i>
                <h3 class="text-white">${allIngred[i].strIngredient}</h3>
                <p class="text-white">${allIngred[i].strDescription
                  .split(" ")
                  .splice(0, 10)
                  .join(" ")}</p>
            </div>
        </div>
    </div>`;
  }
  $("#rowData").html(cartona);
}

$(".nav-item #ingredients").click(function () {
  getIngredients();
});

async function displayIngredients(ingredId) {
  let responce = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredId}`
  );
  let result = await responce.json();
  let wasfa = result.meals;
  let cartona = "";

  for (let i = 0; i < wasfa.length; i++) {
    cartona += ` 
      <div class="col-md-6 col-lg-3 my-3   shadow">
            <div onclick="getMeal('${wasfa[i].idMeal}')" class="pointer overflow-hidden hover shadow rounded position-relative">
                <div class="post ">
                    <img src='${wasfa[i].strMealThumb}' class="w-100 rounded" />
                    <div class="layer d-flex align-items-center ">
                        <div class=" font-5fif p-2">
                            <h2>${wasfa[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  `;
    $("#rowData").html(cartona);
  }
}
/******************************** */

function getSearchValue() {
  cartona = `
  <div class="col-md-6 ">
      <input id="searchInput" class="form-control mb-2  " placeholder="Search By Name">
	</div>
				<div class="col-md-6">
					<input class="form-control search-input" type="text" maxlength="1" id="letter" placeholder="search By First Letter...">
				</div> `;
  $("#rowData").html(cartona);

  $("#searchInput").keyup((e) => {
    search(e.target.value);
  });
  $("#letter").keyup(function (e) {
    let value = e.target.value;
    search(e.target.value);
  });
}

$(".nav-item #search").click(function () {
  getSearchValue();
});

async function search(x) {
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`
  );
  meals = await meals.json();
  meals = meals.meals;

  let cartona = "";

  for (let i = 0; i < meals.length; i++) {
    cartona += ` 
      <div class="col-md-6 col-lg-3 my-3   shadow">
            <div onclick="getMeal('${meals[i].idMeal}')" class="pointer overflow-hidden hover shadow rounded position-relative">
                <div class="post ">
                    <img src='${meals[i].strMealThumb}' class="w-100 rounded" />
                    <div class="layer d-flex align-items-center ">
                        <div class=" font-5fif p-2">
                            <h2>${meals[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  `;
    $("#rowData").append(cartona);
  }
}
/************************************************ */

/************************************* */
function displayContact() {
  cartona = `
        <section id="contact" class="container myM w-75 mx-auto mb-5 ">
		<div class="p-2">
			<h2 class="text-light mb-5">ContacUs...</h2>
			<div class="row g-4">
				<div class="col-md-6">
					<div class=" form-group">
						<input class=" form-control shadow " onkeyup="validation()" id="name"
							placeholder="Enter Your Name">
						<div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
							Special Characters and Numbers not allowed
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="email" placeholder="Enter Email">
						<div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
							Enter valid email. *Ex: xxx@yyy.zzz
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="phone" placeholder="Enter phone">
						<div class="alert mt-1 alert-danger  d-none" id="phonealert" role="alert">
							Enter valid Phone Number
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="age" placeholder="Enter Age">
						<div class="alert mt-1 alert-danger  d-none" id="agealert" role="alert">
							Enter valid Age
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" type="password" id="password"
							placeholder="Enter Password">
						<div class="alert mt-1 alert-danger  d-none" id="passwordalert" role="alert">
							Enter valid password *Minimum eight characters, at least one letter and one number:*
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" type="password" id="rePassword"
							placeholder="Enter RePassword">
						<div class="alert mt-1 alert-danger  d-none" id="repasswordalert" role="alert">
							Enter valid Repassword
						</div>
					</div>
				</div>


			</div>

			<button type="submit" disabled id="submitBtn" class="btn btn-outline-danger mt-5">Submit</button>
		</div>

	</section>`;
  $("#rowData").html(cartona);
  (userName = document.getElementById("name")),
    (userEmail = document.getElementById("email")),
    (userPhone = document.getElementById("phone")),
    (userAge = document.getElementById("age")),
    (userPassword = document.getElementById("password")),
    (userRePassword = document.getElementById("rePassword")),
    (userNameAlert = document.getElementById("namealert")),
    (userEmailAlert = document.getElementById("emailalert")),
    (userPhoneAlert = document.getElementById("phonealert")),
    (userAgeAlert = document.getElementById("agealert")),
    (userpasswordAlert = document.getElementById("passwordalert")),
    (userRepasswordAlert = document.getElementById("repasswordalert"));

  userName.addEventListener("focus", () => {
    nameToached = true;
  });
  userEmail.addEventListener("focus", () => {
    emailToached = true;
  });
  userPhone.addEventListener("focus", () => {
    phoneToached = true;
  });
  userAge.addEventListener("focus", () => {
    ageToached = true;
  });
  userPassword.addEventListener("focus", () => {
    passwordToached = true;
  });
  userRePassword.addEventListener("focus", () => {
    repasswordToached = true;
  });
}

$(".nav-item #contact").click(function () {
  displayContact();
});

let nameToached = false,
  emailToached = false,
  phoneToached = false,
  ageToached = false,
  passwordToached = false,
  repasswordToached = false;

function validation() {
  if (nameToached) {
    if (userNameValid()) {
      userName.classList.remove("is-invalid");
      userName.classList.add("is-valid");
      userNameAlert.classList.replace("d-block", "d-none");
      userNameAlert.classList.replace("d-block", "d-none");
    } else {
      userName.classList.replace("is-valid", "is-invalid");
      userNameAlert.classList.replace("d-none", "d-block");
    }
  }

  if (emailToached) {
    if (userEmailValid()) {
      userEmail.classList.remove("is-invalid");
      userEmail.classList.add("is-valid");
      userEmailAlert.classList.replace("d-block", "d-none");
      userEmailAlert.classList.replace("d-block", "d-none");
    } else {
      userEmail.classList.replace("is-valid", "is-invalid");
      userEmailAlert.classList.replace("d-none", "d-block");
    }
  }

  if (phoneToached) {
    if (userPhoneValid()) {
      userPhone.classList.remove("is-invalid");
      userPhone.classList.add("is-valid");
      userPhoneAlert.classList.replace("d-block", "d-none");
      userPhoneAlert.classList.replace("d-block", "d-none");
    } else {
      userPhone.classList.replace("is-valid", "is-invalid");
      userPhoneAlert.classList.replace("d-none", "d-block");
    }
  }

  if (ageToached) {
    if (userAgeValid()) {
      userAge.classList.remove("is-invalid");
      userAge.classList.add("is-valid");
      userAgeAlert.classList.replace("d-block", "d-none");
      userAgeAlert.classList.replace("d-block", "d-none");
    } else {
      userAge.classList.replace("is-valid", "is-invalid");
      userAgeAlert.classList.replace("d-none", "d-block");
    }
  }

  if (passwordToached) {
    if (userPasswordValid()) {
      userPassword.classList.remove("is-invalid");
      userPassword.classList.add("is-valid");
      userpasswordAlert.classList.replace("d-block", "d-none");
      userpasswordAlert.classList.replace("d-block", "d-none");
    } else {
      userPassword.classList.replace("is-valid", "is-invalid");
      userpasswordAlert.classList.replace("d-none", "d-block");
    }
  }

  if (repasswordToached) {
    if (userRePasswordValid()) {
      userRePassword.classList.remove("is-invalid");
      userRePassword.classList.add("is-valid");
      userRepasswordAlert.classList.replace("d-block", "d-none");
      userRepasswordAlert.classList.replace("d-block", "d-none");
    } else {
      userRePassword.classList.replace("is-valid", "is-invalid");
      userRepasswordAlert.classList.replace("d-none", "d-block");
    }
  }

  if (
    userNameValid() &&
    userEmailValid() &&
    userPhoneValid() &&
    userAgeValid() &&
    userPasswordValid() &&
    userRePasswordValid()
  ) {
    document.getElementById("submitBtn").removeAttribute("disabled");
  } else {
    document.getElementById("submitBtn").setAttribute("disabled", "true");
  }
}

function userNameValid() {
  return /^[a-zA-Z ]+$/.test(userName.value);
}

function userEmailValid() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    userEmail.value
  );
}

function userPhoneValid() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    userPhone.value
  );
}

function userAgeValid() {
  return /^[1-9][0-9]?$|^100$/.test(userAge.value);
}

function userPasswordValid() {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword.value);
}

function userRePasswordValid() {
  return userPassword.value == userRePassword.value;
}
