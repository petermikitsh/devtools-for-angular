/* The backend is embedded in the application
 * that is being debugged. It sends information
 * to the frontend, including:
 * 
 * - serialized component tree(s)
 */

import Bridge from '../../src/shared/Bridge';

var wall = {
  listen(fn) {
    window.addEventListener('message', evt => {
      if (evt.source === window.parent) {
        fn(evt.data);
      }
    });
  },
  send(data) {
    window.parent.postMessage(data, '*');
  }
};

var bridge = new Bridge(wall);

// bridge.on('test_front_to_back', (data) => {
//   console.log('test_front_to_back recieved', data);
// });

// bridge.send('test_back_to_front', {backToFront: true});

const rootElem = getAllAngularRootElements()[0];
const rootTree = ng.probe(rootElem);

function treeToObject(tree, parent) {
  if (!tree) {
    return;
  }

  const nodeType = tree.nativeNode.nodeType;
  const isText = nodeType === Text.TEXT_NODE;
  const isComment = nodeType === Comment.COMMENT_NODE;

  if (isText || isComment) {
    const value = tree.nativeNode.textContent.trim();
    if (value) {
      parent.c.push(value);
    }
    return;
  }

  const node = {
    tag: tree.name || tree.nativeElement.tagName.toLowerCase(),
    attrs: tree.attributes,
    props: tree.properties,
    l: tree.listeners.map(listener => listener.name)
  };

  if (parent) {
    parent.c.push(node);
  }

  if (tree.childNodes && tree.childNodes.length) {
    node.c = [];
    tree.childNodes.map((child) => {
      treeToObject(child, node)
    });
  }

  return node;
}

const treeObject = treeToObject(rootTree);
bridge.send('tree', treeObject);
