/**
 * Common database helper functions.
 */
/*global idb :true*/

/* eslint-disable no-unused-vars */
class DBHelper {
  /* eslint-enable  no-unused-vars */

  /**
   * Server URL.
   */
  static get SERVER_URL() {
    const port = 3000; // Change this to your server port
    return `http://localhost:${port}`;
  }

  /**
   *  Store the promise of the database
   *
   */
  static getDB() {
    this.crdtDBPromise = idb.open('crdt-db', 1, function(upgradeDB) {
      switch (upgradeDB.oldVersion) {
        case 0:
          var stateStore = upgradeDB.createObjectStore('crdt-states', {
            keyPath: 'id'
          });
          stateStore.createIndex('id', 'id');

          var snapshotStore = upgradeDB.createObjectStore('crdt-timestamps', {
            keyPath: 'id'
          });

          snapshotStore.createIndex('id', 'id');
      }
    });
  }

  /**
   * Process the response of the fetch request
   */
  static status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(`Request failed. Returned status of ${response.statusText}`));
    }
  }

  /**
   * Parse the received JSON data
   */
  static json(response) {
    return response.json();
  }
}
