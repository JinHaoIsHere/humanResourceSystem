var mongoClient = require('mongodb').MongoClient;
var config = require('../config');


//an alternative way to create db connection. Currently not used
function open() {
    let url = config.db.url;
    return new Promise((resolve, reject) => {
        mongoClient.connect(url, (err, client) => {
            var db = client.db(config.db.name);
            if (err) {
                reject(err);
            } else {
                resolve(db);
            }
        });
    });
}

function close(db){
    if(db){
        db.close();
    }
}

let db = {
    open : open,
    close: close
}

module.exports = db;