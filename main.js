var Capsule,
    Property = require('vz.property'),
    Collection = require('vz.collection'),
    Machine = require('vz.machine'),
    internalObject = new Property(),
    propertiesBag;

module.exports = Capsule = function(obj){
  if(arguments.length == 0) return;
  
  internalObject.set(this,obj);
  Object.defineProperty(this,'watcher',{value: new Machine()});
};

function extend(object,props,that,str){
  var keys = Object.keys(props),i,j,collection = new Collection();
  
  for(i = 0;i < keys.length;i++){
    if(props[keys[i]] && props[keys[i]].constructor == Object)
    collection.add(extend(object[keys[i]] = object[keys[i]] || {},props[keys[i]],that,str + keys[i] + '.'));
    else{
      if(object[keys[i]] != props[keys[i]])
        collection.add(that.watcher.fire(str + keys[i],props[keys[i]],object[keys[i]]));
      object[keys[i]] = props[keys[i]];
    }
  }
  
  return collection;
}

propertiesBag = {
  getByArray: {value: function(array){
    var ret = internalObject.get(this),i;
    
    for(i = 0;i < array.length;i++) ret = ret[array[i]];
    
    return ret;
  }},
  get: {value: function(){
    return this.getByArray(arguments);
  }},
  
  float: {value: function(){
    return parseFloat(this.getByArray(arguments));
  }},
  int: {value: function(){
    return parseInt(this.getByArray(arguments));
  }},
  round: {value: function(){
    return Math.round(parseFloat(this.getByArray(arguments)));
  }},
  string: {value: function(){
    return this.getByArray(arguments) + '';
  }},
  test: {value: function(){
    return !!this.getByArray(arguments);
  }},
  
  set: {value: function(desc){
    return extend(internalObject.get(this),desc,this,'');
  }}
};

Capsule.encapsulate = function(internal,external){
  
  if(arguments.length == 1) Object.defineProperties(internal,propertiesBag);
  else{
    Object.defineProperties(external,propertiesBag);
    Capsule.call(external,internal);
  }
  
};

Object.defineProperties(Capsule.prototype,propertiesBag);

