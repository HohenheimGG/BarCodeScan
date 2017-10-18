
import Realm from 'realm';
import Constant from 'BCSConstant';

var BCSRealm;
/**
 * 存入数据
 * @param  {String} dbName:   string        [description]
 * @param  {Object} params:   Array        [description]
 * @param  {[type]} beforeCallback: function      [description]
 * @param  {[type]} afterCallback: function      [description]
 * @return {[type]}           [description]
 */
function write(dbName: string = '', params: Array = [], beforeCallback: function, afterCallback: function) {
    BCSRealm.write(() => {
        beforeCallback && beforeCallback();
        for(let i = 0; i < params.length; i ++) {
            let temp = params[i];
            if(temp instanceOf Object) {
                console.warn('realm's input is not Object');
                break;
            }
            BCSRealm.create(dbName, ...temp);
        }
        afterCallback && afterCallback();
    })
}

function load(dbName: string = '', filtered: string = '', beforeCallback: function, afterCallback: function) {

}

/**
 * 初始化
 * @return {[type]} [description]
 */
function __init__() {
    let realmSchame = {
        name: Constant.DB_NAME,
        primaryKey:'id'
        properties: {
            id: 'int',
            name: 'string',
            code: 'string',
            description: 'string',
            price: 'int'
        }
    };
    Realm.open({schame: [realmSchame]}).then(realm => {
        BCSRealm = realm;
        list = [];
        for(let i = 0; i < 200000; i ++)
            list.push({
                name: `name${i}`,
                code: `name-${i}-num${i}-price-${i}`,
                description: `num-${i}`,
                price: getRandomInt()
            });
        write(Constant.DB_NAME, list);
    })
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    write
};
