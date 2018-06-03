const Simplifier = require('./Simplifier.js');

function LiberalMap () {
    this.simplifiedData = {};
    this.data = {};
    this.errorList = [];
}

LiberalMap.prototype.getErrors = function() {
    return this.errorList;
};

LiberalMap.prototype.set = function(key, value) {
    this.data[key] = value;

    let simplifiedKey = Simplifier.simplifyText(key);
    let simplifiedEntry = this.simplifiedData[simplifiedKey];
    if (!simplifiedEntry) {
        simplifiedEntry = {};
        this.simplifiedData[simplifiedKey] = simplifiedEntry;
    }
    simplifiedEntry[key] = value;
};

LiberalMap.prototype.get = function(key) {
    let result = this.data[key];

    if (!result && result !== null && result !== false && result !== 0) {
        let simplifiedEntry = this.simplifiedData[Simplifier.simplifyText(key)];
        if (simplifiedEntry) {
            let keys = Object.keys(simplifiedEntry);
            if (keys.length === 1) {
                result = simplifiedEntry[keys[0]];
            } else {
                this.errorList.push({error:'AMBIGUOUS-KEY', 'key':key, 'keyList': keys});
            }
        }
    }
    return result;
};


module.exports = LiberalMap;
