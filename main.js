// CREATION OF HTML ELEMENTS

/* Container element with class property */

const containerDiv = document.createElement("div");
containerDiv.classList.add("container");
containerDiv.classList.add("col-md-8");
containerDiv.classList.add("col-xs-8");
containerDiv.classList.add("col-sm-4");
containerDiv.classList.add("col-lg-11");

/** h3 element*/

const headingDiv = document.createElement("h3");
headingDiv.innerHTML = "Nationalize API";
headingDiv.style.color = "yellow";
headingDiv.style.textAlign = "center";
headingDiv.style.fontStyle = "bold";
headingDiv.style.fontSize = "42px";

/** input Element*/

const inputSearchBox = document.createElement("input");
inputSearchBox.classList.add("form-control");
inputSearchBox.setAttribute("type", "text");
inputSearchBox.setAttribute("id", "search");
inputSearchBox.placeholder = "Press enter to search by name";
inputSearchBox.style.margin = "30px";
inputSearchBox.addEventListener("keyup", getDataFromApi);

/** ul Element*/

const createUlElem = document.createElement("ul");
createUlElem.classList.add("list-group");
createUlElem.setAttribute("id", "ul");

document.body.style.backgroundColor = "black";
document.body.appendChild(containerDiv);
containerDiv.appendChild(headingDiv);
containerDiv.appendChild(inputSearchBox);

//API IMPLEMENTATION

//async function
async function getDataFromApi(event) {
  let finalArray = [];
  //on press of enter key
  if (event.keyCode === 13) {
    //take the values of input field
    const inputVal = document.getElementById("search").value;

    if (inputVal && inputVal.length) {
      //setting value
      const requestParam = {
        name: inputVal,
      };

      try {
        //passing request parameter to API
        const nationalizeApi =
          "https://api.nationalize.io/?name=" + requestParam.name;
        //fetch of url
        const fetchData = await fetch(nationalizeApi);
        //getting promise
        const getPromiseData = await fetchData.json();
        // data
        const response = getPromiseData.country;
        //getting 2 array elements
        finalArray = [...response].slice(0, 2);

        finalArray.forEach((data) => {
          // creating 2 list element an data to list

          const createLiElem = document.createElement("li");
          createLiElem.classList.add("list-group-item");
          createLiElem.setAttribute("id", "list");
          createLiElem.style.margin = "30px";

          createLiElem.innerHTML =
            data.country_id + " " + " - " + " " + data.probability;
          containerDiv.appendChild(createUlElem);
          createUlElem.appendChild(createLiElem);
        });
        // if there is error caught it in catch block
      } catch (e) {
        console.log("Api Error: " + e);
      }
    }
  }
}