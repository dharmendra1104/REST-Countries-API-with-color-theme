const countryName = new URLSearchParams(location.search).get('name')
const flagImage = document.querySelector('.country-details img')
const countryNameH1 = document.querySelector('.country-details h1')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.top-level-domain')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderCountries = document.querySelector('.border-countries')
// const themeChanger=document.querySelector(".theme-changer")

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    flagImage.src = country.flags.svg
    countryNameH1.innerText = country.name.common
    population.innerText = country.population.toLocaleString('en-IN')
    region.innerText = country.region
    topLevelDomain.innerText = country.tld.join(', ')

    if (country.capital) {
      capital.innerText = country.capital?.[0]
    }

    if (country.subregion) {
      subRegion.innerText = country.subregion
    }

    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common
    } else {
      nativeName.innerText = country.name.common
    }

    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(', ')
    }

    if (country.languages) {
      languages.innerText = Object.values(country.languages).join(', ')
    }

    console.log(country);
    if (country.borders) {

      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            // console.log(borderCountry)
            const borderCountryTag = document.createElement('a')
            borderCountryTag.innerText = borderCountry.name.common
            borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
            borderCountries.append(borderCountryTag)
          })
      })
    }
  })

// themeChanger.addEventListener('click', () => {
//   document.body.classList.toggle('dark')
// })

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