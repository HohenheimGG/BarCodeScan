
import Realm from 'realm';
import Cnonstant from 'BCSConstant';

const realm = __init__();
/**
 * 存入数据
 * @param  {String} dbName:   string        [description]
 * @param  {Object} params:   Array        [description]
 * @param  {[type]} beforeCallback: function      [description]
 * @param  {[type]} afterCallback: function      [description]
 * @return {[type]}           [description]
 */
function write(dbName: string = '', params: Array = [], beforeCallback: function, afterCallback: function) {
    realm.write(() => {
        beforeCallback && beforeCallback();
        for(let i = 0; i < params.length; i ++) {
            let temp = params[i];
            if(temp instanceOf Object) {
                console.warn('realm's input is not Object');
                break;
            }
            realm.create(dbName, ...temp);
        }
        afterCallback && afterCallback();
    })
}

function __init__() {
    let realmSchame = {
        name: Cnonstant.DB_NAME,
        properties: {
            id: 'int',
            name: 'string',
            code: 'string',
            description: 'string',
            price: 'int'
        }
    };
    return new Realm({schame: [realmSchame]});
}

module.exports = {
    write
};
