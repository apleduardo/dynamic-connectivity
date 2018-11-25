const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('models/union-find/db.json')
const db = low(adapter)
const util = require('util')

class QuickFind
{
    constructor() {
        this.id =   JSON.parse(JSON.stringify(db.get('id')))
    }

    union(p, q){
        var pid = this.id[p];
        var qid = this.id[q];
        for (var i = 0; i < this.id.length; i++) {
            if (pid === this.id[i]) {
                this.id[i] = qid;
            }
        }
        db.set('id', this.id).write();
    }

    conected(p, q){
        if (this.id[p] == this.id[q]) {
            return true;
        }

        return false;
    }

    showConectedsComponents(){
        let componets = {};
        let controlArray = [];
        for (var j=0; j < this.id.length; j++) {
            if (controlArray.indexOf(j)>=0) {
                continue;
            }    
            componets[j] = [j];
            for (var i=j+1; i < this.id.length; i++) {
                if (this.conected(this.id[j], this.id[i])) {
                    componets[j].push(i);
                    controlArray.push(i);
                }
            }
        }

        //console.log(util.inspect(controlArray, false, null, true /* enable colors */))
        //console.log(util.inspect(componets, false, null, true /* enable colors */))

        return JSON.stringify(componets);
    }
}

module.exports = QuickFind;

