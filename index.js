const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container input')
// const themeChanger = document.querySelector('.theme-changer')

let allCountriesData

fetch('https://restcountries.com/v3.1/all')
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data)
    allCountriesData = data
  })

filterByRegion.addEventListener('change', (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries)
})

function renderCountries(data) {
  countriesContainer.innerHTML = ''
  data.forEach((country) => {
    const countryCard = document.createElement('a')
    countryCard.classList.add('country-card')
    countryCard.href = `/country.html?name=${country.name.common}`
    countryCard.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name.common} flag" />
          <div class="card-text">
              <h3 class="card-title">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString(
      'en-IN'
    )}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>
  `
    countriesContainer.append(countryCard)
  })
}

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredCountries = allCountriesData.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm)
  );
  renderCountries(filteredCountries);
});



const themeChanger = document.querySelector('.theme-changer');

function ThemeMode() {
  // themeChanger.addEventListener('click', () => {
  const currentMode = document.body.classList.contains('dark') ? 'dark' : 'light';

  if (currentMode === 'light') {
    document.body.classList.add('dark');
    themeChanger.innerHTML = '<span class="darktheam"><i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode</span>';
    localStorage.setItem('themeMode', 'dark');
  } else {
    document.body.classList.remove('dark');
    themeChanger.innerHTML = '<span class="light"><i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mode</span>';
    localStorage.setItem('themeMode', 'light');
  }
  // });

}

themeChanger.addEventListener('click', ThemeMode);

window.addEventListener('load', () => {
  const storedMode = localStorage.getItem('themeMode');
  if (storedMode === 'dark') {
    ThemeMode();
  }
})
