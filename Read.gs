function _read( sheet, id ) {
  var data         = sheet.getDataRange().getValues();
  var header       = data.shift();
  
  // Find All
  var result = data.map(function( row, indx ) {
    var reduced = header.reduce( function(accumulator, currentValue, currentIndex) {
      accumulator[ currentValue ] = row[ currentIndex ];
      return accumulator;
    }, {});

    reduced.row = indx + 2;
    return reduced;
    
  });
  
  // Filter if id is provided
  if( id ) {
    var filtered = result.filter( function( record ) {
      if ( record.id === id ) {
        return true;
      } else {
        return false;
      }
    });
    
    return filtered.shift();
  } 
  
  return result;
  
}
