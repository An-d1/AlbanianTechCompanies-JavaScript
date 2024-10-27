import { companiesData } from "./data.js";

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

let previousValue = ""; // Track the previous input value to prevent unnecessary updates

function searchCompanies() {
  const userInput = document.querySelector('.js-searchInput');

  userInput.addEventListener("input", debounce(e => {
    const value = e.target.value.toLowerCase();

    // Only run the search if the value has changed
    if (value !== previousValue) {
      previousValue = value; // Update the previous value

      const searchResults = companiesData.filter(company => {
        return (
          company.titleCompany.toLowerCase().includes(value) || 
          company.formattedAddress.toLowerCase().includes(value)
        );
      });

      // Use requestAnimationFrame to batch the DOM update
      requestAnimationFrame(() => displayResults(searchResults));
    }
  }, 600));
}

// Function to display search results on the page
function displayResults(results) {
  const resultsDiv = document.querySelector('.js-row-to-be-injected');
  resultsDiv.innerHTML = ''; // Clear previous results

  // Use a DocumentFragment to minimize reflows
  const fragment = document.createDocumentFragment();

  if (results.length > 0) {
    results.forEach(company => {
      const companyElement = document.createElement("div");
      companyElement.classList.add("col-12", "col-sm-6", "col-md-6", "col-lg-4", "col-xl-3");
      companyElement.innerHTML = `
        <div class="flex-container">
          <a class="websiteLink" href="${company.website}" target="_blank">
            <div class="mainImg">
              <img src="images/1721802899_0a08ccaa9a91933a0b20.jpg" alt="${company.titleCompany}">
            </div>
            <div class="title">${company.titleCompany}</div>
            <div class="address">Address: ${company.formattedAddress}</div>
          </a>
          <a href="${company.link}" target="_blank">
            <button class="location">open in google maps</button>
          </a>
        </div>
      `;
      fragment.appendChild(companyElement);
    });
  } else {
    const noResultsElement = document.createElement("div");
    noResultsElement.classList.add("container", "noSearchFound", "text-center");
    noResultsElement.innerHTML = `
      <div class="row d-flex justify-content-center">
        <div class="col-12">
          <h1>No Companies Found!</h1>
        </div>   
      </div>
    `;
    fragment.appendChild(noResultsElement);
  }

  resultsDiv.appendChild(fragment); // Update DOM once with the complete fragment
}

searchCompanies(); // Initialize the search function
