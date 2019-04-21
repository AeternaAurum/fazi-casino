// Pixi
import { Casino } from './shared/Casino';

const mainContainer = document.querySelector('.main-container');
const app = new PIXI.Application({ width: 256, height: 256 });
const webSocketURL = 'ws://localhost:4200';
const wsConnection = new WebSocket(webSocketURL);

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

    currentCasino.devices.forEach(device => {
      if (device.apparatusType === 'POKER_TABLE') {
        PIXI.loader.add('table1.png').load(() => {
          const sprite = new PIXI.Sprite(
            PIXI.loader.resources['table1.png'].texture
          );
          sprite.scale.set(0.5, 0.5);
          sprite.anchor.x = 0.5;
          sprite.anchor.y = 0.5;
          sprite.position.x = device.x;
          sprite.position.y = device.y;
          // divide by 57.2958 to get radians
          sprite.rotation = device.orientation / 57.2958;

          app.stage.addChild(sprite);
        });
      } else if (device.apparatusType === 'SLOT_MACHINE') {
        PIXI.loader.add('machine1.png').load(() => {
          const sprite = new PIXI.Sprite(
            PIXI.loader.resources['machine1.png'].texture
          );
          sprite.scale.set(0.5, 0.5);
          sprite.anchor.set(0.5, 0.5);
          sprite.position.x = device.x;
          sprite.position.y = device.y;
          sprite.rotation = device.orientation / 57.2958;

          app.stage.addChild(sprite);
        });
      } else if (device.apparatusType === 'ROULETTE_MACHINE') {
        PIXI.loader.add('roulette.png').load(() => {
          const sprite = new PIXI.Sprite(
            PIXI.loader.resources['roulette.png'].texture
          );
          sprite.scale.set(0.5, 0.5);
          sprite.anchor.set(0.5, 0.5);
          sprite.position.x = device.x;
          sprite.position.y = device.y;
          sprite.rotation = device.orientation / 57.2968;

          app.stage.addChild(sprite);
        });
      }
    });

    topBarDOM!.appendChild(casinoNameDOM);
  } else {
    fetch(`http://localhost:5000/casino/casino/${searchParams.get('id')}`)
      .then(res => res.json())
      .then((casino: Casino) => {
        console.log(casino);
        const casinoNameDOM = document.createElement('p');
        casinoNameDOM.innerText = casino.name;
        topBarDOM!.appendChild(casinoNameDOM);

        casino.devices.forEach(device => {
          if (device.apparatusType === 'POKER_TABLE') {
            PIXI.loader.add('table1.png').load(() => {
              const sprite = new PIXI.Sprite(
                PIXI.loader.resources['table1.png'].texture
              );
              sprite.scale.set(0.5, 0.5);
              sprite.anchor.x = 0.5;
              sprite.anchor.y = 0.5;
              sprite.position.x = device.x;
              sprite.position.y = device.y;
              // divide by 57.2958 to get radians
              sprite.rotation = device.orientation / 57.2958;

              app.stage.addChild(sprite);
            });
          } else if (device.apparatusType === 'SLOT_MACHINE') {
            PIXI.loader.add('machine1.png').load(() => {
              const sprite = new PIXI.Sprite(
                PIXI.loader.resources['machine1.png'].texture
              );
              sprite.scale.set(0.5, 0.5);
              sprite.anchor.set(0.5, 0.5);
              sprite.position.x = device.x;
              sprite.position.y = device.y;
              sprite.rotation = device.orientation / 57.2958;

              app.stage.addChild(sprite);
            });
          } else if (device.apparatusType === 'ROULETTE_MACHINE') {
            PIXI.loader.add('roulette.png').load(() => {
              const sprite = new PIXI.Sprite(
                PIXI.loader.resources['roulette.png'].texture
              );
              sprite.scale.set(0.5, 0.5);
              sprite.anchor.set(0.5, 0.5);
              sprite.position.x = device.x;
              sprite.position.y = device.y;
              sprite.rotation = device.orientation / 57.2968;

              app.stage.addChild(sprite);
            });
          }
        });
      });
  }
}

app.renderer.autoResize = true;
app.renderer.view.style.display = 'block';
app.renderer.view.style.position = 'absolute';
app.renderer.backgroundColor = 0xeeeeee;
app.renderer.resize(512, 512);

PIXI.loader.add('table1.png').load(() => {
  const image = new PIXI.Sprite(PIXI.loader.resources['table1.png'].texture);
  image.scale.set(0.5, 0.5);
  image.rotation = 1.5708;
  image.anchor.x = 0.5;
  image.anchor.y = 0.5;
  image.x = app.view.width - image.width;
  image.y = app.view.height - image.height;
  image.interactive = true;
  image.buttonMode = true;

  image.on('pointerup', () => {
    const newImage = new PIXI.Sprite(
      PIXI.loader.resources['table1.png'].texture
    );
    newImage.scale.set(0.5, 0.5);
    newImage.x = app.view.width / 2;
    newImage.y = app.view.height / 2;
    newImage.interactive = true;
    newImage.buttonMode = true;

    // newImage.on('mouseup', e => {
    //   console.log(e);
    // });
    // newImage.on('touchstart', e => {
    //   console.log(e);
    // });

    // newImage.on('touchmove', e => {
    //   console.log(e);
    // });

    let data: any;
    let alpha: number;
    let dragging: boolean;

    newImage.on('mousedown', e => {
      data = e.data;
      alpha = 0.5;
      dragging = true;
    });

    newImage.on('mouseup', e => {
      alpha = 1;
      dragging = false;
      data = null;
      // check if y is less than the bottom boundary of selection elements
    });

    newImage.on('mouseupoutside', e => {
      alpha = 1;
      dragging = false;
      data = null;
    });

    newImage.on('mousemove', e => {
      if (dragging) {
        const newPosition = data.getLocalPosition(e.currentTarget.parent);
        newImage.position.x = newPosition.x;
        newImage.position.y = newPosition.y;
      }
    });

    app.stage.addChild(newImage);
    console.log(app.stage.children);
  });

  app.stage.addChild(image);
});

// PIXI.loader.add('roulette.png').load(() => {
//   const image = new PIXI.Sprite(PIXI.loader.resources['roulette.png'].texture);

//   app.stage.addChild(image);
// });

// PIXI.loader.add('machine1.png').load(() => {
//   const image = new PIXI.Sprite(PIXI.loader.resources['machine1.png'].texture);

//   app.stage.addChild(image);
// });

mainContainer!.appendChild(app.view);

wsConnection.onopen = () => {
  wsConnection.send('hello from client');
};

wsConnection.onerror = err => {
  console.log(`WebSocket error: ${err}`);
};

wsConnection.onmessage = e => {
  console.log(e.data);
};

wsConnection.onclose = e => {
  // send all app.stage.children that have y < boundary where bottom elements are
};

window.addEventListener('load', () => {
  populate();
});
