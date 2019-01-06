function doGet() {
  var html = HtmlService.createTemplateFromFile('index');
  return html.evaluate().setTitle('O - P - S').setFaviconUrl("https://coastlinerehabcenters.com/wp-content/uploads/2018/02/Coastline-Flavicon.png");
}

function debuggg(){
 Logger.log(HtmlService.createTemplateFromFile('index').getCode());
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function onOpen() {
  var menu = [{name: 'Update Form', functionName: 'formUpdate'}];
  SpreadsheetApp.getActive().addMenu('🌊', menu);
}

function test() {
  //Logger.log(sheetToObject(_settings())); 
}

var House = Object.create(null, {
  
 // name:{
   // value:
  
});

function formUpdate() {
  const settings = _settings();

  var incomingData      = sheetToObject(),   //calling function that put data from sheet and putting it in an Object

      incomingHouses    = makeUniqueList('house'),
      incomingCtNames   = makeUniqueList('name'),
      incomingHouseMgrs = makeUniqueList('caseManager'),
  
      ctAmChecks = settings.ctAmChecks.split(','),
      ctPmChecks = settings.ctPmChecks.split(','),
      staffAmChecks = settings.staffAmChecks.split(','),
      staffPmChecks = settings.staffPmChecks.split(','),
      
      currentForm = gridByHouse(),
      
      appurl = settings.appurl,
      am = [];
      pm = [];
  
  for (var n = 0; n < currentForm.length; n++) {
  
 incomingData.filter(function(row) {
    currentForm[n]['title'].indexOf(row.house) != -1
  Logger.log(am1);  
  });
   am.push(am1);         
  
// Logger.log(currentForm[n]['title'] );
  }
//  incomingData.forEach(function(row) {
//    if(row.house) {
//      pm.push({'Title' : row.house += ' PM', 
//               'row'   : row.name, 
//               'cols'  : ctPmChecks});
//    }
//  });
  //am.forEach(function(row) {
                      
  
    //       });
  }

function gridByHouse(){
  const items = _dataForm();
  var fChecks = [];
  var fCtNames = [];
  var grid = [];
  
    for (var n = 0; n < items.length; n++) {
      var item = items[n];
      var textItem = item.asCheckboxGridItem();
      fCtNames = textItem.getRows();
      fChecks = textItem.getColumns();
      grid.push({'title' : textItem.getTitle(),'rows' : fCtNames, 'cols' : fChecks});  
  }
    return grid;
}            
   
/*  
  
//  for (var k = 0; k < houses.length; ++k) {     //Loop thru houses then 
//    var house = houses[k];
//    
//    for (var i = 0; i < formItems.length; ++i) {    //Loop thru each question
      var item = formItems[i];
            
      if (item.getType() == questionType) {
        if (item.getTitle().indexOf(house) !== -1){
          textItem = item.asCheckboxGridItem(); 
          textItem.setRows(objOfArrays[house]);
        }
      }
    }
  }
*/

function formSetUp(items, houses) {
  var obj = sheetToObject();          //calling function that put data from sheet and putting it in an Object
  var objOfArrays = sortByHouse(obj); // sorts the names of clients into arrays by house name stored in an object
  var houses = makeUniqueList('house');

  var ss = SpreadsheetApp.getActive();
  var form = FormApp.openByUrl(ss.getFormUrl());    //get the form
  
  var items = form.getItems(FormApp.ItemType.CHECKBOX_GRID); //get only the questions (items) with the the checkbox grid format
  
  for (var j = 0; j < houses.length; j++) {     //Loop thru houses then 
    var house = houses[j];
    
    for (var i = 0; i < items.length; i++) {    //Loop thru each question
      var item = items[i];
            
        if (item.getTitle().indexOf(house) !== -1){
          textItem = item.asCheckboxGridItem(); 
          textItem.setRows(objOfArrays[house]);
          //Logger.log(item.getTitle());
         
      }
    }
  }
}
/** 
 * [URL of Web app, https://script.google.com/macros/s/AKfycbyM9U98CX-6I14VfV9rrT-3Sd09Qc41w4ZuCOo9q-FA04RcYwE/exec]
 * 
 *
 */
function _settings(){
  //------------------------------UPDATE nate dont use ACTIVE in production-----------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  var ss    = SpreadsheetApp.getActive(),   // Select the current Spreadsheet 
      sheet = ss.getSheetByName('settings'),

      appURL        = sheet.getRange(3,2).getValue(),
      ctAmChecks    = sheet.getRange(5,2).getValue(),
      ctPmChecks    = sheet.getRange(6,2).getValue(),
      staffAmChecks = sheet.getRange(7,2).getValue(),
      staffPmChecks = sheet.getRange(8,2).getValue()
  ;

  var settings = { 'appurl'        : appURL, 
                   'ctAmChecks'    : ctAmChecks, 
                   'ctPmChecks'    : ctPmChecks, 
                   'staffAmChecks' : staffAmChecks,
                   'staffPmChecks' : staffPmChecks 
                 };

  return settings;
}
/**
 * _dataSheet() only job is to get the spreadsheet and sheet needed 
 *
 * @return {string[]} uniqueListArray - An array of strings from a single property all unique. 
 */
function _dataSheet(){
    //------------------------------UPDATE nate dont use ACTIVE in production-----------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 var ss = SpreadsheetApp.getActive(),   // Select the current Spreadsheet
     sheet = ss.getSheetByName('settings'), // Get the specific tab with the data
     dataSheetName = sheet.getRange(2,2).getValue()
 ; 
 return ss.getSheetByName(dataSheetName).getDataRange().getValues(); 
}
/**
 * _dataForm() only job is to get the form data from current form.  
 *
 * @return {object{}} object of form item objects. 
 */
function _dataForm(){
    //------------------------------UPDATE nate dont use ACTIVE in production-----------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  var ss    = SpreadsheetApp.getActive(),
      form  = FormApp.openByUrl(ss.getFormUrl()),
      items = form.getItems(FormApp.ItemType.CHECKBOX_GRID);
  return items;
}
  //fixedHeaders = [no, bed, name, house, hmFirstname, hmLastname, code, daysSober, txDate, urLoc, 
  //                clinicalLoc,payIns, intake, projectedDischarge, caseManager, therapist,     
  //                notes, nextReview, sobrietyDate, schedule, doesClientOweRent, from,
  //                toNextDueDate, amount, perWeek2WeeksMonth, notes]
  // convert 2d array into object array
  // https://stackoverflow.com/a/22917499/1027723 
function sheetToObject() {
  
  var data         = _dataSheet(),
      headers      = data.shift(),                  // pull off the first row that is the headers
      fixedHeaders = normalizeHeaders(headers),     //then "Normalize" them AKA format them in a way javascript can use them
   
      obj = data.map(function(values) {
        return fixedHeaders.reduce(function(o, k, i) {
          o[k] = values[i];
          return o;
        }, {});
      });
  
  //Logger.log(obj);
  return obj;
}
/**
 * makeUniqueList 
 *
 * @param  {string} fixedHeader - A name of a column from the fixed headers var (ex: house, caseManager).
 * @param  {object} obj - Data from sheet put into an object.  
 * @return {string[]} uniqueListArray - An array of strings from a single property all unique. 
 */
function makeUniqueList(fixedHeader){
  var list = [];

  var obj = sheetToObject();
  
  // goes over each "row" and if there is the item you are looking for it adds it to the list array
  obj.forEach(function(row) {
    if(row[fixedHeader]) {
      list.push(row[fixedHeader].toString().trim()); 
    }   
  });
  
    // filters out duplicates to create an array with only unique values borrowed from Sir Ben Collins
    // https://github.com/benlcollins/apps_script_apis/blob/master/api_009_gmail_service/api_009_gmail.gs
    var uniqueListArray = list.filter(function(item,pos) {
    return list.indexOf(item) == pos;
  }); 
   //Logger.log(uniqueListArray);
   return uniqueListArray;
}

function sortByHouse(obj) {                                
    
  var hb2CTs = [];  // empty arrays for each house
  var hb1CTs = [];
  var cm2CTs = [];
  var fv1CTs = [];
  
  obj.forEach(function(row) {  
    
     switch(row.house) {    
       case 'HB2':
         hb2CTs.push(row.name);
         break;
       case 'HB1':
         hb1CTs.push(row.name);
         break;
       case 'CM2':
         cm2CTs.push(row.name);
         break;
       case 'FV1 Lotus:':
         fv1CTs.push(row.name);
         break;
     };
  });
  var objOfArrays = { "HB1" : hb1CTs, "HB2" : hb2CTs, "CM2" : cm2CTs, "FV1 Lotus:" : fv1CTs };

  return objOfArrays;
}
//function formQuestions(form,obj) {
//  var items = form.getItems();
//  for (var i = 0; i < items.length; ++i) {
//    var item = items[i];
//    if (item.getType() == 'CHECKBOX_GRID') {
//      if (item.getTitle() == 'HB2 AM'  ){
 //       item.asCheckboxGridItem();
        
      //Logger.log(item.getTitle());
//      }
//    }
    //Logger.log();
//  }
  //Logger.log(items);
//}
    
//Logger.log(fixedHeaders);
//obj.forEach(function(row){
//   name = 
//   Logger.log(row);
//  });
 // setUp_(ssID, obj);
 
 // Array for caseManager to get a list of names 
 // Initialize arrays for each house to make a list of residents
 
/*function cmList(obj){
  var caseManagers = [];
  var houses = [];

  obj.forEach(function(row){
    if (row.caseManager) {
      if(caseManagers.indexOf(sentenceCase(row.caseManager.trim())) == -1) {
        caseManagers.push(sentenceCase(row.caseManager.trim()));
      }
    }
  });
  return caseManagers;
}*/


/*       
    switch(row.caseManager) {
      case 'HB2':
        hb2CTs.push(row);
        break;
      case 'HB1':
        hb1CTs.push(row);
        break;
      case 'CM2':
        cm2CTs.push(row);
        break;
      case 'FV1 Lotus:':
        fv1CTs.push(row);
        break;
       };
*/

 // Logger.log(hb1CTs);
  //formQuestions(form,obj);
 // ScriptApp.newTrigger().forSpreadsheet(ss).onFormSubmit().create();  

function sentenceCase (str) {
  if ((str===null) || (str===''))
       return false;
  else
   str = str.toString();

 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

// Returns an Array of normalized Strings.
// Empty Strings are returned for all Strings that could not be successfully normalized.
// Arguments:
//   - headers: Array of Strings to normalize
function normalizeHeaders(headers) {
  var keys = [];
  for (var i = 0; i < headers.length; ++i) {
    keys.push(normalizeHeader(headers[i]));
    //Logger.log("string: "+headers[i]);
  }
  return keys;
}

// Normalizes a string, by removing all alphanumeric characters and using mixed case
// to separate words. The output will always start with a lower case varter.
// This function is designed to produce JavaScript object property names.
// Arguments:
//   - header: string to normalize
// Examples:
//   "First Name" -> "firstName"
//   "Market Cap (millions) -> "marketCapMillions
//   "1 number at the beginning is ignored" -> "numberAtTheBeginningIsIgnored"
function normalizeHeader(header) {
  var key = "";
  var upperCase = false;
  for (var i = 0; i < header.length; ++i) {
    var varter = header[i];
    if (varter == " " && key.length > 0) {
      upperCase = true;
      continue;
    }
    if (!isAlnum(varter)) {
      continue;
    }
    if (key.length == 0 && isDigit(varter)) {
      continue; // first character must be a varter
    }
    if (upperCase) {
      upperCase = false;
      key += varter.toUpperCase();
    } else {
      key += varter.toLowerCase();
    }
  }
  
  //Logger.log("header: "+key);
  return key;
}

// Returns true if the cell where cellData was read from is empty.
// Arguments:
//   - cellData: string
function isCellEmpty(cellData) {
  return typeof(cellData) == "string" && cellData == "";
}

// Returns true if the character char is alphabetical, false otherwise.
function isAlnum(char) {
  return char >= 'A' && char <= 'Z' ||
    char >= 'a' && char <= 'z' ||
    isDigit(char);
}

// Returns true if the character char is a digit, false otherwise.
function isDigit(char) {
  return char >= '0' && char <= '9';
}

