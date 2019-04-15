import { Casino } from './shared/Casino';
const canvas = document.getElementById('canvas');

function populate() {
  const topBarDOM = document.querySelector('.top-bar');
  const searchParams = new URLSearchParams(window.location.search);
  console.log(searchParams.get('id'));
  console.log(window.location);
  if (sessionStorage.getItem('casinos')) {
    const casinos = JSON.parse(sessionStorage.getItem('casinos')!);
    const currentCasino: Casino = casinos.filter(
      (casino: Casino) => casino._id === searchParams.get('id')
    )[0];
    console.log(currentCasino);
    const casinoNameDOM = document.createElement('p');
    casinoNameDOM.innerText = currentCasino.name;

    topBarDOM!.appendChild(casinoNameDOM);
  } else {
    fetch(`http://localhost:5000/casino/casino/${searchParams.get('id')}`)
      .then(res => res.json())
      .then((casino: Casino) => {
        console.log(casino);
        const casinoNameDOM = document.createElement('p');
        casinoNameDOM.innerText = casino.name;
        topBarDOM!.appendChild(casinoNameDOM);
      });
  }
}

const webSocketURL = 'ws://localhost:4200';
const wsConnection = new WebSocket(webSocketURL);

wsConnection.onopen = () => {
  wsConnection.send('hello from client');
};

wsConnection.onerror = err => {
  console.log(`WebSocket error: ${err}`);
};

wsConnection.onmessage = e => {
  console.log(e.data);
};

window.addEventListener('load', () => {
  populate();
});
