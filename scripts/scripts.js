import { companiesData } from "./data.js";

let companiesHTML = '';

companiesData.forEach((company) => {
  companiesHTML += `
  <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
          <div class="flex-container">
          <a class="websiteLink" href="${company.website}" target = _blank>

            <div class="mainImg">
              <img src="images/1721802899_0a08ccaa9a91933a0b20.jpg">
            </div>

            <div class="title">
              "${company.titleCompany}"
            </div>

            <div class="category">
              Description: ${company.category}
            </div>
            </a>

            <a href="${company.link}" target = _blank>
            <button class="location">
              open in google maps
            </button>
            </a>
            
          </div>
        </div>
    `;
});

document.querySelector('.js-row-to-be-injected').innerHTML = companiesHTML;