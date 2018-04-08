const fs = require('fs');

const readFile = file =>
    new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });

const rewritePath = (url, ruleObj) => {
    let path = url;
    Object.keys(ruleObj).forEach((key) => {
        const regex = new RegExp(key);
        const value = ruleObj[key];
        path = path.replace(regex, value);
    });

    return path;
};

module.exports = {
    readFile,
    rewritePath,
};
