/**
 * Writen by Arif Akbarul Huda. Feel free for you to copy, paste and modify it. 
 * Warm welcome if you say thanks to me. :)
 * 
 *  */
function Main(){
  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  var data = _read(sheet);
 
  for(let i=0;i<data.length;i++){
    var item = data[i];
    var result = sendMail(item);
    if(result)
      markSent(sheet,item);
    else
      break;
  }
}
function sendMail(data){
    if(MailApp.getRemainingDailyQuota()==0)
      return false;
    
    var template = HtmlService.createTemplateFromFile(TEMPLATE);
    template.nama=data.dosen;
    template.uniqueid = data.id;
    var message = template.evaluate().getContent();

    GmailApp.sendEmail(
        data.email, SUBJECT, '',
        {htmlBody: message, name: SENDER_NAME}
      );
    return true;
}
function markSent(sheet,data){
        sheet.getRange(data.row, COLUMN_NUMBER_ISSENT).setValue("sent");
        SpreadsheetApp.flush();
}
function markOpen(sheet,data){
        sheet.getRange(data.row, COLUMN_NUMBER_STATUS).setValue("opened");
        SpreadsheetApp.flush();
}
function doGetTest(){
      var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
      var data = _read(sheet,1);
      console.log(data)
      markOpen(sheet,data)
}
function doGet(e) {
  var method = e.parameter['method'];
  switch (method) {
    case 'track':
      var id = e.parameter['id'];
      var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
      var data = _read(sheet,parseInt(id));
      markOpen(sheet,data)
    default:
      break;
  }
}
