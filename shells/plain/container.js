import React from 'react';
import ReactDOM from 'react-dom';
import Panel from '../../src/frontend/Panel';
import Bridge from '../../src/shared/Bridge';

var target = document.getElementById('target');

function loadIframe(done) {
  target.src = 'iframe.html';
  target.onload = done;
}

function inject(src, done) {
  if (!src || src === 'false') {
    done();
    return;
  }

  var script = target.contentDocument.createElement('script');
  script.src = src;
  script.onload = done;
  target.contentDocument.body.appendChild(script);
}

loadIframe(() => {
  inject('../../angular2app/main.bundle.js', () => {
    // Inject the backend into the iframe after angular app is loaded
    inject('/backend.js', () => {
      const iframeWindow = target.contentWindow;

      var wall = {
        listen(fn) {
          iframeWindow.parent.addEventListener('message', evt => {
            if (evt.source === iframeWindow) {
              fn(evt.data);
            }
          });
        },
        send(data) {
          iframeWindow.postMessage(data, '*');
        }
      };

      const bridge = new Bridge(wall);

      // bridge.send('test_front_to_back', {frontToBack: true});

      // bridge.on('test_back_to_front', (data) => {
      //   console.log('test_back_to_front recieved', data);
      // });

      var node = document.getElementById('container');
      ReactDOM.render(<Panel bridge={bridge} />, node);
    });
  });
});
