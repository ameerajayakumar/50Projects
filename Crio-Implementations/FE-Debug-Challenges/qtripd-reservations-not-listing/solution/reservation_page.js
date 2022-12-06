import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let response = await fetch(config.backendEndpoint + `/reservations/`);
    let reservations = await response.json();
    return reservations;
  } catch (e) {
    // Place holder for functionality to work in the Stubs
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page
   
    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  let tbody = document.getElementById("reservation-table");
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  reservations.forEach((element) => {
    var tr = document.createElement("tr");
    tr.setAttribute("id", element.id);
    var id = document.createElement("td");
    id.innerHTML = element.id;
    var name = document.createElement("td");
    name.innerHTML = element.name;
    var adventure = document.createElement("td");
    adventure.innerHTML = element.adventure;
    var person = document.createElement("td");
    person.innerHTML = element.person;
    var date = document.createElement("td");
    date.innerHTML = new Date(element.date).toLocaleDateString("en-IN");
    var price = document.createElement("td");
    price.innerHTML = element.price;
    var time = document.createElement("td");
    time.innerHTML = new Date(element.time).toLocaleString("en-IN", {
      year: "numeric",
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });

    var action = document.createElement("td");
    action.innerHTML = `<button class="reservation-visit-button"> <a href = "${
      "/frontend/pages/adventures/detail/?adventure=" + element.adventure
    }">Visit Advenutre </a></button>`;

    tr.append(id, name, adventure, person, date, price, time, action);
    tbody.append(tr);
  });

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if (reservations.length == 0) {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  } else {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  }
}

export { fetchReservations, addReservationToTable };
