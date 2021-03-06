import { City } from './shared/City';
function helloName(name: string): void {
  PIXI.utils.sayHello(name);
}

function getCities() {
  fetch('http://localhost:5000/city/cities')
    .then(res => res.json())
    .then(data => {
      sessionStorage.setItem('cities', JSON.stringify(data.cities));
      sessionStorage.setItem('casinos', JSON.stringify(data.casinos));
      return data.cities;
    })
    .then((cities: [City]) => {
      const citiesDOM = document.querySelector('.main-container');
      console.log(cities);
      cities.forEach((city: City) => {
        const cityDOM = createDOMCity(city);
        citiesDOM!.appendChild(cityDOM);
      });
    });
}

function createDOMCity(city: City): HTMLDivElement {
  const cityDOM = document.createElement('div');
  cityDOM.classList.add('card');

  const imgDOM = document.createElement('img');
  imgDOM.src = 'data:image/jpg;base64,' + city.image;
  imgDOM.classList.add('city-image');

  const descriptionDOM = document.createElement('p');
  descriptionDOM.textContent = city.description;

  const nameDOM = document.createElement('h2');
  nameDOM.textContent = city.name;

  const linkDOM = document.createElement('a');
  linkDOM.href = `city.html?id=${city._id}`;
  linkDOM.classList.add('card');

  linkDOM.appendChild(imgDOM);
  linkDOM.appendChild(descriptionDOM);
  linkDOM.appendChild(nameDOM);
  cityDOM.appendChild(linkDOM);
  return cityDOM;
}

window.addEventListener('load', () => {
  getCities();
});

helloName('TEST');
console.log('hello world');
