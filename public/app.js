window.onload = function() {

  new PieChart();

  var url ='https://restcountries.eu/rest/v1/all'
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.send(null);// why null??

  request.onload = function() {
    if (request.status === 200) {
      var jsonString = request.responseText;
      var countries = JSON.parse(jsonString);

      data = [];

      countries.forEach(function(country,index) {
        data.push(
          {name:country.name,
            y:country.population
          }
          )
      })
      new PieChart(data);
      main(countries);

    }
  }
  
};

var main = function(countries) {
  fillDropdown(countries);
  var cached = localStorage.getItem("selectedCountry");
  var selected = countries[0];
  if(cached){
      selected = JSON.parse(cached);
      document.querySelector('#countries').selectedIndex = selected.index;
  }
  updateDisplay(selected);
  document.querySelector('#info').style.display = 'block';
}

//I want to be able to access all the countries in a dropdown menu. Create function:::

//1. countries refers to json info passed from api
//2. document.querySelector returns first element of document with class countries
//3.forEach() method calls provided function once for each element in countries array, in order

var fillDropdown = function(countries) {
  var dropdown = document.querySelector('#countries');
  countries.forEach(function (country, index) {
    country.index = index;
    //confused here...
    var option = document.createElement("option");
    option.value = index.toString();
    option.text = country.name;
    dropdown.appendChild(option);
  });
  dropdown.style.display = 'block';
  dropdown.addEventListener('change', function(event) {
    var index = this.value;
    var country = countries[index];
    updateDisplay(country);
    localStorage.setItem("selectedCountry", JSON.stringify(country));
  })
}

  var updateDisplay = function (country) {
      var tags = document.querySelectorAll('#info p');
      tags[0].innerText = country.name;
      tags[1].innerText = country.capital;
      tags[2].innerText = country.population;
      
}
