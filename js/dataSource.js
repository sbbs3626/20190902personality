nie.define('ds',function(){
    const _femaledata1 = {
        body : 'female',
        pants : 'femalepants1',
        shoes : 'femaleshoes10',
        jacket : 'femalejacket1',
        eye : 'eye1',
        hair : 'femalehair2',
        hat : null,
        object : 'object1'
    }

    const _maledata = {
        body : 'male',
        pants : 'malepants1',
        shoes : 'maleshoes9',
        jacket : 'malejacket1',
        eye : 'eye1',
        hair : 'malehair4',
        hat : null,
        object : 'object1'
    }
    function ds(opts){
        this.init(opts);
    }
    ds.prototype = {
        constructor : ds,
        init : function(opts){
            this.opts = opts;
            this.data = _femaledata1;

        },
        get : function(key){
            return this.data[key];
            // console.log(this.data);
        },
        set : function(key,value){
            if(key == 'body'){
                if(value == 'male'){
                    this.data = _maledata;
                }else{
                    this.data = _femaledata1;
                }
            }
            this.data[key] = value;;
            // console.log(this.data);
        }
    }

    return  new ds();
});
