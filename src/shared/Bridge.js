/*
 * The bridge is a higher-order construct for sending
 * messages between the frontend and backend.
 * 
 * Instead of passing raw objects, both the frontend
 * and backend instantiate a bridge and listen/send
 * events of a particular types.
 */
export default class Bridge {
  constructor(wall) {
    this._wall = wall;
    this._listeners = {};

    wall.listen(this._handleMessage.bind(this));
  }

  _handleMessage({type, name, data}) {
    if (type === 'event') {
      var fns = this._listeners[name];
      if (fns) {
        fns.forEach(fn => fn(data));
      }
    }
  }

  on(evt, fn) {
    if (!this._listeners[evt]) {
      this._listeners[evt] = [fn];
    } else {
      this._listeners[evt].push(fn);
    }
  }

  send(name, data) {
    this._wall.send({
      type: 'event',
      name,
      data
    });
  }
}
