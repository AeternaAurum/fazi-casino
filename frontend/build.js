const fs = require('fs-extra');

const distFolder = 'dist';

if (fs.existsSync(distFolder)) {
  fs.remove(distFolder)
    .then(() => {
      fs.mkdirSync(distFolder);
    })
    .then(() => {
      fs.copy('src/assets', distFolder + '/assets', err => {
        err ? console.error(err) : console.log('success');
      });
      fs.copy('pixi/pixi.js', distFolder + '/pixi.js', err => {
        err ? console.error(err) : console.log('success');
      });
      fs.copy('src/index.html', distFolder + '/index.html', err => {
        err ? console.error(err) : console.log('success');
      });
      fs.copy('src/casino.html', distFolder + '/casino.html', err => {
        err ? console.error(err) : console.log('success');
      });
      fs.copy('src/city.html', distFolder + '/city.html', err => {
        err ? console.error(err) : console.log('success');
      });
    })
    .catch(err => console.error(err));
}

if (!fs.existsSync(distFolder)) {
  fs.mkdirSync(distFolder);
  fs.copy('src/assets', distFolder + '/assets', err => {
    err ? console.error(err) : console.log('success');
  });
  fs.copy('pixi/pixi.js', distFolder + '/pixi.js', err => {
    err ? console.error(err) : console.log('success');
  });
  fs.copy('src/index.html', distFolder + '/index.html', err => {
    err ? console.error(err) : console.log('success');
  });
  fs.copy('src/casino.html', distFolder + '/casino.html', err => {
    err ? console.error(err) : console.log('success');
  });
  fs.copy('src/city.html', distFolder + '/city.html', err => {
    err ? console.error(err) : console.log('success');
  });
}
