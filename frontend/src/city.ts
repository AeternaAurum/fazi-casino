import { Casino } from './shared/Casino';
import { City } from './shared/City';

function populate() {
  const titleDOM = document.querySelector('title');
  const casinoDOM = document.querySelector('.casino-list');
  const descriptionDOM = document.querySelector('.city-description');
  const searchParams = new URLSearchParams(window.location.search);

  if (sessionStorage.getItem('cities') && sessionStorage.getItem('casinos')) {
    populateFromSessionStorage(
      searchParams,
      titleDOM,
      descriptionDOM,
      casinoDOM
    );
  } else {
    populateFromDatabase(searchParams, titleDOM, descriptionDOM, casinoDOM);
  }
}

function populateFromDatabase(
  searchParams: URLSearchParams,
  titleDOM: HTMLTitleElement | null,
  descriptionDOM: Element | null,
  casinoDOM: Element | null
) {
  let casinos: [Casino];

  fetch('http://localhost:5000/casino/casinos')
    .then(res => res.json())
    .then(data => {
      casinos = data.casinos;
    });
  fetch(`http://localhost:5000/city/city/${searchParams.get('id')}`)
    .then(res => res.json())
    .then((city: City) => {
      titleDOM!.textContent = city.name;
      descriptionDOM!.textContent = city.description;
      const currentCasinos = casinos.filter((casino: Casino) =>
        city.casinos.includes(casino._id)
      );
      currentCasinos.forEach((casino: Casino) => {
        const listItem = document.createElement('li');
        listItem.textContent = casino.name;
        casinoDOM!.appendChild(listItem);
      });
    });
}

function populateFromSessionStorage(
  searchParams: URLSearchParams,
  titleDOM: HTMLTitleElement | null,
  descriptionDOM: Element | null,
  casinoDOM: Element | null
) {
  const cities = JSON.parse(sessionStorage.getItem('cities')!);
  const casinos = JSON.parse(sessionStorage.getItem('casinos')!);
  const currentCity = cities.filter(
    (city: City) => city._id === searchParams.get('id')
  )[0];
  const currentCasinos = casinos.filter((casino: Casino) =>
    currentCity.casinos.includes(casino._id)
  );
  if (!!currentCity) {
    titleDOM!.textContent = currentCity.name;
    descriptionDOM!.textContent = currentCity.description;
    currentCasinos.forEach((casino: Casino) => {
      const listItem = document.createElement('li');
      listItem.textContent = casino.name;
      casinoDOM!.appendChild(listItem);
    });
  }
  console.log(cities, casinos);
}

console.log('hello from city');

window.addEventListener('load', () => {
  populate();
});
