
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  var searchParams = new URLSearchParams(search);
  return searchParams.get("city")
}


//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  let url = config.backendEndpoint + `/adventures?city=${city}`;
  try{
    let res = await fetch(url);
    if(!res.ok){
      throw Error(res.statusText);
    }
    let response = await res.json();
    return response;
  }
  catch(err){
    return null;
}
}


//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((adventure) => {
    let ele = document.createElement("div");
    ele.className = "col-6 col-lg-3 mb-4";
    ele.innerHTML = `
            <a href="detail/?adventure=${adventure.id}" id=${adventure.id}>
            <div class="category-banner">${adventure.category}</div>
              <div class="activity-card">
                <img
                  class="img-responsive"
                  src=${adventure.image}
                />
                <div class="activity-card-text text-md-center w-100 mt-3">
                  <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
                    <h5 class="text-left">${adventure.name}</h5>
                    <p>₹${adventure.costPerHead}</p>
                  </div>
                    <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
                    <h5 class="text-left">Duration</h5>
                    <p>${adventure.duration} Hours</p>
                  </div>
                </div>
              </div>
            </a>
          `;
    document.getElementById("data").appendChild(ele);}
  )}
//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  // let durationlist = (list.filter((e)=> e.duration > low && e.duration < high));
  // return durationlist;
  let durationlist = list.filter((e) => {
    return e.duration > low && e.duration < high;
  });
  return durationlist;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let adventureList = list.filter((adventure) => {
    return categoryList.includes(adventure.category);
  });
  return adventureList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // if(filters.duration == "" && filters.category !== ""){
  //   const list = filterByCategory(list, filters.category)
  // }

  let filterListCat;
  let filterListDur;

  if(filters.category.length > 0 && filters.duration.length > 0){
    let categoryList = filters.category;
    filterListCat = filterByCategory(list, categoryList);
    let duration = filters.duration;
    let array = duration.split("-");
    let low = parseInt(array[0]), high = parseInt(array[1]);
    return filterByDuration(filterListCat, low, high);
  }
  else if(filters.category.length > 0){
    let categoryList = filters.category;
    filterListCat = filterByCategory(list, categoryList);

    return filterListCat;
  }

  else if(filters.duration.length > 0){
    let duration = filters.duration;
    let array = duration.split("-");
    let low = array[0], high = array[1];
    filterListDur = filterByDuration(list, low, high);
    return filterListDur;
  }

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills
  let category = filters['category']

  for(let i = 0; i < category.length; i++){
    let el = document.createElement('div')
    el.setAttribute('class', 'category-filter')
    el.setAttribute('id', 'category-filter-dom')
    el.innerHTML = category[i]
    document.getElementById('category-list').append(el)
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
