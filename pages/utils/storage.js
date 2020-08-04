export  function getFromStorage(key){
  if(!key){
    return null ;
  }
  try{
    const valueString =  localStorage.getItem(key);
    if(valueString){
      return JSON.parse(valueString);
    }
    return null;
  }catch(err){
    return null;
  }

}


export  function setInStorage(key,obj){
  if(!key){
    console.log("Key is not set");
  }
  try{
    localStorage.setItem(key,JSON.stringify(obj));

  }catch(err){

  }
}
export  function deleteFromStorage(key){
  if(key){
    localStorage.removeItem(key)
  }
}
