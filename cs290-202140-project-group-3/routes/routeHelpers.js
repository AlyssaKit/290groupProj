
function errorParser(errorString) {
  let duplicate = errorString;
  
  duplicate = duplicate.slice(0, duplicate.indexOf(" "));
  errorString = errorString.slice(errorString.indexOf(":") + 1);
  let errorArray = errorString.split(",");
  if(duplicate === "E11000" || duplicate === "E11001"){
    errorArray = [];
    errorArray[0] = "Object already in database";
  } else {
  for (let i = 0; i < errorArray.length; i++) {
    let e = errorArray[i];
      errorArray[i] = e.slice(e.indexOf(":") + 1).trim();
  }
  }
  return errorArray;

}

module.exports = { errorParser };