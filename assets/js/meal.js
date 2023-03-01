const loadMeal = (searchText) => {
    const url =`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayMeal(data.meals))
        .catch(error => console.log(error))

   
}


const displayMeal = meals => {
    const mealRow =document.getElementById('meal-row');
    mealRow.innerText ='';
    
    meals.forEach(meal => {
        const mealDescription = meal.strInstructions;
        const mealDescriptionShort = mealDescription.slice(0, 50);
        const div = document.createElement('div');
        div.classList.add('col-lg-6');
        div.classList.add('col-md-6');
        div.innerHTML =`
            <div class="single-meal-item">
                <div class="meal-feauture-img">
                    <img src="${meal.strMealThumb}" alt="">
                </div>
                <div class="meal-body">
                    <h3>${meal.strMeal}</h3>
                    <p>${mealDescriptionShort}...</p>

                 
                    <button onclick="loadMealDetails(${meal.idMeal})" type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Launch demo modal
                    </button>

                </div>

            </div>
        
        `

        mealRow.appendChild(div);



        

    });

    
  

    
}

const searchMeal = () =>{
    const searchText = document.getElementById('search-field').value;
    if(searchText === ''){
     
        alert("Please write a meal name")
        return;
    }

    loadMeal(searchText);

}

const loadMealDetails = idMeal =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayMealDetails(data.meals[0]))
        .catch(error => console.log(error))

}

const displayMealDetails = mealDetails =>{
    document.getElementById('modal-details-title').innerText =`${mealDetails.strMeal}`;
    const meaBodyDetails = document.getElementById('meal-details-body');
    meaBodyDetails.innerHTML=`
         <img src="${mealDetails.strMealThumb}"/>
         <ul>
            <li><b>Category :</b> ${mealDetails.strCategory}</li>
            <li><b>Area :</b> ${mealDetails.strArea}</li>
            <li><b>Instructions :</b> ${mealDetails.strInstructions}</li>
            <li><b>Youtube :</b> <a target="_blank" href="${mealDetails.strYoutube}">${mealDetails.strYoutube}</a> </li>
         </ul>
    `;
   
    console.log(mealDetails);
}






// Load Meal
loadMeal('fish')
