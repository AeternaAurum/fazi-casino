// Pixi
import { Casino } from './shared/Casino';

const mainContainer = document.querySelector('.main-container');
const app = new PIXI.Application({ width: 256, height: 256 });
const webSocketURL = 'ws://localhost:4200';
const wsConnection = new WebSocket(webSocketURL);
const DEGREES = 57.2958;
let thisCasino: any;
let newCasinoLayout: any[] | never[] = [];

function populate() {
  const topBarDOM = document.querySelector('.top-bar');
  const searchParams = new URLSearchParams(window.location.search);

  fetch(`http://localhost:5000/casino/casino/${searchParams.get('id')}`)
    .then(res => res.json())
    .then(data => {
      const { casino } = data;
      thisCasino = casino;
      console.log(casino);
      const casinoNameDOM = document.createElement('p');
      casinoNameDOM.innerText = casino.name;
      topBarDOM!.appendChild(casinoNameDOM);
      console.log('casino.devices : ', casino.devices);
      casino.devices.forEach((device: any) => {
        if (device.apparatusType === 'BLACKJACK_TABLE') {
          PIXI.loader.reset();
          PIXI.loader.add('assets/table1.png').load(() => {
            const sprite = PIXI.Sprite.fromImage('assets/table1.png');
            // new PIXI.Sprite(
            //   PIXI.loader.resources['assets/table1.png'].texture
            // );
            console.log(sprite);
            sprite.scale.set(0.5, 0.5);
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            sprite.position.x = device.x;
            sprite.position.y = device.y;
            // divide by 57.2958 to get radians
            sprite.rotation = device.orientation / 57.2958;

            sprite.interactive = true;
            sprite.buttonMode = true;

            let data: any;
            let alpha: number;
            let dragging: boolean;
            console.log(app.stage.children);

            sprite.on('mousedown', e => {
              data = e.data;
              alpha = 0.5;
              dragging = true;
            });

            sprite.on('mouseup', e => {
              alpha = 1;
              dragging = false;
              data = null;
              // check if y is less than the bottom boundary of selection elements
              newCasinoLayout = app.stage.children;
              let sendData: any = [];
              newCasinoLayout.forEach(child => {
                if (
                  child.texture.baseTexture.imageUrl === 'assets/table1.png' &&
                  child.y < 400
                ) {
                  const apparatus = {
                    apparatusType: 'BLACKJACK_TABLE',
                    casinoId: casino._id,
                    orientation: child.transform.rotation * DEGREES,
                    x: child.x,
                    y: child.y,
                  };
                  sendData.push(apparatus);

                  console.log(apparatus);
                } else if (
                  child.texture.baseTexture.imageUrl ===
                    'assets/machine1.png' &&
                  child.y < 400
                ) {
                  const apparatus = {
                    apparatusType: 'SLOT_MACHINE',
                    casinoId: casino._id,
                    orientation: child.transform.rotation * DEGREES,
                    x: child.x,
                    y: child.y,
                  };
                  sendData.push(apparatus);

                  console.log(apparatus);
                } else if (
                  child.texture.baseTexture.imageUrl ===
                    'assets/roulette.png' &&
                  child.y < 400
                ) {
                  const apparatus = {
                    apparatusType: 'ROULETTE_MACHINE',
                    casinoId: casino._id,
                    orientation: child.transform.rotation * DEGREES,
                    x: child.x,
                    y: child.y,
                  };
                  sendData.push(apparatus);

                  console.log(apparatus);
                }
              });
              wsConnection.send(JSON.stringify(sendData));
              sendData = [];
            });

            sprite.on('mouseupoutside', e => {
              alpha = 1;
              dragging = false;
              data = null;
            });

            sprite.on('mousemove', e => {
              if (dragging) {
                const newPosition = data.getLocalPosition(
                  e.currentTarget.parent
                );
                sprite.position.x = newPosition.x;
                sprite.position.y = newPosition.y;
              }
            });

            app.stage.addChild(sprite);
          });
        } else if (device.apparatusType === 'SLOT_MACHINE') {
          PIXI.loader.reset();
          PIXI.loader.add('assets/machine1.png').load(() => {
            const sprite = PIXI.Sprite.fromImage('assets/machine1.png');
            sprite.scale.set(0.5, 0.5);
            sprite.anchor.set(0.5, 0.5);
            sprite.position.x = device.x;
            sprite.position.y = device.y;
            sprite.rotation = device.orientation / 57.2958;

            sprite.interactive = true;
            sprite.buttonMode = true;

            let data: any;
            let alpha: number;
            let dragging: boolean;
            console.log(app.stage.children);

            sprite.on('mousedown', e => {
              data = e.data;
              alpha = 0.5;
              dragging = true;
            });

            sprite.on('mouseup', e => {
              alpha = 1;
              dragging = false;
              data = null;
              // check if y is less than the bottom boundary of selection elements
              newCasinoLayout = app.stage.children;
              let sendData: any = [];
              newCasinoLayout.forEach(child => {
                if (
                  child.texture.baseTexture.imageUrl ===
                    'assets/machine1.png' &&
                  child.y < 400
                ) {
                  const apparatus = {
                    apparatusType: 'SLOT_MACHINE',
                    casinoId: casino._id,
                    orientation: child.transform.rotation * DEGREES,
                    x: child.x,
                    y: child.y,
                  };
                  sendData.push(apparatus);

                  console.log(apparatus);
                } else if (
                  child.texture.baseTexture.imageUrl ===
                    'assets/roulette.png' &&
                  child.y < 400
                ) {
                  const apparatus = {
                    apparatusType: 'ROULETTE_MACHINE',
                    casinoId: casino._id,
                    orientation: child.transform.rotation * DEGREES,
                    x: child.x,
                    y: child.y,
                  };
                  sendData.push(apparatus);

                  console.log(apparatus);
                } else if (
                  child.texture.baseTexture.imageUrl === 'assets/table1.png' &&
                  child.y < 400
                ) {
                  const apparatus = {
                    apparatusType: 'BLACKJACK_TABLE',
                    casinoId: casino._id,
                    orientation: child.transform.rotation * DEGREES,
                    x: child.x,
                    y: child.y,
                  };
                  sendData.push(apparatus);

                  console.log(apparatus);
                }
              });
              wsConnection.send(JSON.stringify(sendData));
              sendData = [];
            });

            sprite.on('mouseupoutside', e => {
              alpha = 1;
              dragging = false;
              data = null;
            });

            sprite.on('mousemove', e => {
              if (dragging) {
                const newPosition = data.getLocalPosition(
                  e.currentTarget.parent
                );
                sprite.position.x = newPosition.x;
                sprite.position.y = newPosition.y;
              }
            });

            app.stage.addChild(sprite);
          });
        } else if (device.apparatusType === 'ROULETTE_MACHINE') {
          PIXI.loader.reset();
          PIXI.loader.add('assets/roulette.png').load(() => {
            const sprite = PIXI.Sprite.fromImage('assets/roulette.png');
            sprite.scale.set(0.5, 0.5);
            sprite.anchor.set(0.5, 0.5);
            sprite.position.x = device.x;
            sprite.position.y = device.y;
            sprite.rotation = device.orientation / 57.2968;

            sprite.interactive = true;
            sprite.buttonMode = true;

            let data: any;
            let alpha: number;
            let dragging: boolean;
            console.log(app.stage.children);

            sprite.on('mousedown', e => {
              data = e.data;
              alpha = 0.5;
              dragging = true;
            });

            sprite.on('mouseup', e => {
              alpha = 1;
              dragging = false;
              data = null;
              // check if y is less than the bottom boundary of selection elements
              newCasinoLayout = app.stage.children;
              let sendData: any = [];
              newCasinoLayout.forEach(child => {
                if (
                  child.texture.baseTexture.imageUrl === 'assets/table1.png' &&
                  child.y < 400
                ) {
                  const apparatus = {
                    apparatusType: 'BLACKJACK_TABLE',
                    casinoId: casino._id,
                    orientation: child.transform.rotation * DEGREES,
                    x: child.x,
                    y: child.y,
                  };
                  sendData.push(apparatus);

                  console.log(apparatus);
                } else if (
                  child.texture.baseTexture.imageUrl ===
                    'assets/machine1.png' &&
                  child.y < 400
                ) {
                  const apparatus = {
                    apparatusType: 'SLOT_MACHINE',
                    casinoId: casino._id,
                    orientation: child.transform.rotation * DEGREES,
                    x: child.x,
                    y: child.y,
                  };
                  sendData.push(apparatus);

                  console.log(apparatus);
                } else if (
                  child.texture.baseTexture.imageUrl ===
                    'assets/roulette.png' &&
                  child.y < 400
                ) {
                  const apparatus = {
                    apparatusType: 'ROULETTE_MACHINE',
                    casinoId: casino._id,
                    orientation: child.transform.rotation * DEGREES,
                    x: child.x,
                    y: child.y,
                  };
                  sendData.push(apparatus);

                  console.log(apparatus);
                }
              });
              wsConnection.send(JSON.stringify(sendData));
              sendData = [];
            });

            sprite.on('mouseupoutside', e => {
              alpha = 1;
              dragging = false;
              data = null;
            });

            sprite.on('mousemove', e => {
              if (dragging) {
                const newPosition = data.getLocalPosition(
                  e.currentTarget.parent
                );
                sprite.position.x = newPosition.x;
                sprite.position.y = newPosition.y;
              }
            });

            app.stage.addChild(sprite);
          });
        } else if (device.apparatusType === 'SLOT_MACHINE') {
          PIXI.loader.reset();
          PIXI.loader.add('assets/machine1.png').load(() => {
            const sprite = new PIXI.Sprite(
              PIXI.loader.resources['assets/machine1.png'].texture
            );
            sprite.scale.set(0.5, 0.5);
            sprite.anchor.set(0.5, 0.5);
            sprite.position.x = device.x;
            sprite.position.y = device.y;
            sprite.rotation = device.orientation / 57.2958;

            sprite.interactive = true;
            sprite.buttonMode = true;

            let data: any;
            let alpha: number;
            let dragging: boolean;
            console.log(app.stage.children);

            sprite.on('mousedown', e => {
              data = e.data;
              alpha = 0.5;
              dragging = true;
            });

            sprite.on('mouseup', e => {
              alpha = 1;
              dragging = false;
              data = null;
              // check if y is less than the bottom boundary of selection elements
              newCasinoLayout = app.stage.children;
              let sendData: any = [];
              newCasinoLayout.forEach(child => {
                if (
                  child.texture.baseTexture.imageUrl ===
                    'assets/machine1.png' &&
                  child.y < 400
                ) {
                  const apparatus = {
                    apparatusType: 'SLOT_MACHINE',
                    casinoId: casino._id,
                    orientation: child.transform.rotation * DEGREES,
                    x: child.x,
                    y: child.y,
                  };
                  sendData.push(apparatus);

                  console.log(apparatus);
                } else if (
                  child.texture.baseTexture.imageUrl ===
                    'assets/roulette.png' &&
                  child.y < 400
                ) {
                  const apparatus = {
                    apparatusType: 'ROULETTE_MACHINE',
                    casinoId: casino._id,
                    orientation: child.transform.rotation * DEGREES,
                    x: child.x,
                    y: child.y,
                  };
                  sendData.push(apparatus);

                  console.log(apparatus);
                } else if (
                  child.texture.baseTexture.imageUrl === 'assets/table1.png' &&
                  child.y < 400
                ) {
                  const apparatus = {
                    apparatusType: 'BLACKJACK_TABLE',
                    casinoId: casino._id,
                    orientation: child.transform.rotation * DEGREES,
                    x: child.x,
                    y: child.y,
                  };
                  sendData.push(apparatus);

                  console.log(apparatus);
                }
              });
              wsConnection.send(JSON.stringify(sendData));
              sendData = [];
            });

            sprite.on('mouseupoutside', e => {
              alpha = 1;
              dragging = false;
              data = null;
            });

            sprite.on('mousemove', e => {
              if (dragging) {
                const newPosition = data.getLocalPosition(
                  e.currentTarget.parent
                );
                sprite.position.x = newPosition.x;
                sprite.position.y = newPosition.y;
              }
            });

            app.stage.addChild(sprite);
          });
        }
      });
    });
}

app.renderer.autoResize = true;
app.renderer.view.style.display = 'block';
app.renderer.view.style.position = 'relative';
app.renderer.backgroundColor = 0xeeeeee;
app.renderer.resize(512, 512);

PIXI.loader.add('assets/table1.png').load(() => {
  const image = PIXI.Sprite.fromImage('assets/table1.png');
  // new PIXI.Sprite(PIXI.loader.resources['table1.png'].texture);
  image.scale.set(0.5, 0.5);
  image.rotation = 1.5708;
  image.anchor.x = 0.5;
  image.anchor.y = 0.5;
  image.x = 200;
  image.y = 450;
  image.interactive = true;
  image.buttonMode = true;

  image.on('pointerup', () => {
    const newImage = PIXI.Sprite.fromImage('assets/table1.png');
    // new PIXI.Sprite(
    //   PIXI.loader.resources['assets/table1.png'].texture
    // );
    newImage.scale.set(0.5, 0.5);
    newImage.x = app.view.width / 2;
    newImage.y = app.view.height / 2;
    newImage.interactive = true;
    newImage.buttonMode = true;

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

    newCasinoLayout = app.stage.children;
    let sendData: any = [];
    newCasinoLayout.forEach(child => {
      if (child.texture.baseTexture.imageUrl === 'assets/table1.png') {
        const apparatus = {
          apparatusType: 'BLACKJACK_TABLE',
          casinoId: thisCasino._id,
          orientation: child.transform.rotation * DEGREES,
          x: child.x,
          y: child.y,
        };
        sendData.push(apparatus);

        console.log(apparatus);
      } else if (child.texture.baseTexture.imageUrl === 'assets/machine1.png') {
        const apparatus = {
          apparatusType: 'SLOT_MACHINE',
          casinoId: thisCasino._id,
          orientation: child.transform.rotation * DEGREES,
          x: child.x,
          y: child.y,
        };
        sendData.push(apparatus);

        console.log(apparatus);
      }
    });
    wsConnection.send(JSON.stringify(sendData));
    sendData = [];

    console.log(app.stage.children);
  });

  app.stage.addChild(image);
});

PIXI.loader.reset();
PIXI.loader.add('assets/machine1.png').load(() => {
  const image = PIXI.Sprite.fromImage('assets/machine1.png');

  // new PIXI.Sprite(
  //   PIXI.loader.resources['assets/machine1.png'].texture
  // );

  image.scale.set(0.5, 0.5);
  image.rotation = 1.5708;
  image.anchor.x = 0.5;
  image.anchor.y = 0.5;
  image.x = 100;
  image.y = 450;
  image.interactive = true;
  image.buttonMode = true;

  image.on('pointerup', () => {
    const newImage = PIXI.Sprite.fromImage('assets/machine1.png');
    // new PIXI.Sprite(
    //   PIXI.loader.resources['assets/table1.png'].texture
    // );
    newImage.scale.set(0.5, 0.5);
    newImage.x = app.view.width / 2;
    newImage.y = app.view.height / 2;
    newImage.interactive = true;
    newImage.buttonMode = true;

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

    newCasinoLayout = app.stage.children;
    let sendData: any = [];
    newCasinoLayout.forEach(child => {
      if (child.texture.baseTexture.imageUrl === 'assets/table1.png') {
        const apparatus = {
          apparatusType: 'BLACKJACK_TABLE',
          casinoId: thisCasino._id,
          orientation: child.transform.rotation * DEGREES,
          x: child.x,
          y: child.y,
        };
        sendData.push(apparatus);

        console.log(apparatus);
      } else if (child.texture.baseTexture.imageUrl === 'assets/machine1.png') {
        const apparatus = {
          apparatusType: 'SLOT_MACHINE',
          casinoId: thisCasino._id,
          orientation: child.transform.rotation * DEGREES,
          x: child.x,
          y: child.y,
        };
        sendData.push(apparatus);

        console.log(apparatus);
      }
    });
    wsConnection.send(JSON.stringify(sendData));
    sendData = [];

    console.log(app.stage.children);
  });

  app.stage.addChild(image);
});

PIXI.loader.reset();
PIXI.loader.add('assets/roulette.png').load(() => {
  const image = PIXI.Sprite.fromImage('assets/roulette.png');
  // new PIXI.Sprite(
  //   PIXI.loader.resources['assets/roulette.png'].texture
  // );
  image.scale.set(0.5, 0.5);
  image.rotation = 1.5708;
  image.anchor.x = 0.5;
  image.anchor.y = 0.5;
  image.x = 300;
  image.y = 450;
  image.interactive = true;
  image.buttonMode = true;

  image.on('pointerup', () => {
    const newImage = PIXI.Sprite.fromImage('assets/roulette.png');
    // new PIXI.Sprite(
    //   PIXI.loader.resources['assets/table1.png'].texture
    // );
    newImage.scale.set(0.5, 0.5);
    newImage.x = app.view.width / 2;
    newImage.y = app.view.height / 2;
    newImage.interactive = true;
    newImage.buttonMode = true;

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

    newCasinoLayout = app.stage.children;
    let sendData: any = [];
    newCasinoLayout.forEach(child => {
      if (child.texture.baseTexture.imageUrl === 'assets/table1.png') {
        const apparatus = {
          apparatusType: 'BLACKJACK_TABLE',
          casinoId: thisCasino._id,
          orientation: child.transform.rotation * DEGREES,
          x: child.x,
          y: child.y,
        };
        sendData.push(apparatus);

        console.log(apparatus);
      } else if (child.texture.baseTexture.imageUrl === 'assets/machine1.png') {
        const apparatus = {
          apparatusType: 'SLOT_MACHINE',
          casinoId: thisCasino._id,
          orientation: child.transform.rotation * DEGREES,
          x: child.x,
          y: child.y,
        };
        sendData.push(apparatus);

        console.log(apparatus);
      }
    });
    wsConnection.send(JSON.stringify(sendData));
    sendData = [];

    console.log(app.stage.children);
  });

  app.stage.addChild(image);
});

mainContainer!.appendChild(app.view);

wsConnection.onerror = err => {
  console.log(`WebSocket error: ${err}`);
};

wsConnection.onmessage = e => {
  console.log(e.data);
};

window.addEventListener('load', () => {
  PIXI.loader.reset();
  populate();
});
