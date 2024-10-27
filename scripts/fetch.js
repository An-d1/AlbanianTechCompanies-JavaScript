import { companiesData } from "./data.js";

var requestOptions = {
  method: 'GET',
};

// fetched from https://myprojects.geoapify.com/api/z9cdMdgdd9eKHRLBEZAu/settings

 const fetchPromises = companiesData.map((latLng, index) => {
  return fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latLng.lat}&lon=${latLng.lng}&apiKey=b3ed69c446a24019894e6f2bb2662dd3`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // Extract the formatted address
      const formattedAddress = result.features[0].properties.formatted;

      // Add the formatted address to the corresponding company object
      companiesData[index].formattedAddress = formattedAddress;
    })
    .catch(error => console.log('error', error));
});

// Wait for all fetch requests to complete
Promise.all(fetchPromises).then(() => {

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
  
              <div class="address">
                Address: ${company.formattedAddress}
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
});
