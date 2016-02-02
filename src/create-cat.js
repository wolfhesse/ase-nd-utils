// design: reduce-cost-of-change
var engine=require('./kitten_engine').KittenEngine;

var kittenData = {
    here: {
        name: 'Zildjian',
        age: 12,
        comment: ' @per: @create-cat, built w/ create-cat script',
        //
        purpose: 'testing',
        va1kz: 'zulu',
        // auto-fill: created_at: new Date
    }
};

engine.createCat(kittenData);

kittenData.here.name='Seconder';
kittenData.here.age=11;
engine.createCat(kittenData);