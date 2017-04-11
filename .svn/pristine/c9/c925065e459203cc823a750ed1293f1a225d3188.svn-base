var mongo = require('./mongo.js');
var uuid = require('uuid');

exports.getCustomers = function(message, callback) {
  // console.log("Inside masters.js getCustomers(): message ", message);
  mongo.findDocumentFields("CustomerMaster", {}, {"customerId":true,"customerName":true, "countryId": true, "currencyId": true, "userId": true, "deptId": true, "_id": false}, function (data) {
    message.message = data;
    message.status = "Success";
    callback(message);
    // mongo.sendWsMessage(connection, message);
  });
}

exports.getCurrencies = function (message, callback) {
  mongo.findDocumentFields("CurrencyMaster",{ CURRENCY_EX_RATE: { $gt:0}},{"CURRENCY_ID":true,"CURRENCY_NAME":true}, function (data) {
    message.message = data;
    message.status = "Success";
    callback(message);
    // mongo.sendWsMessage(connection, message);
  })

}

exports.getNCParties = function (message, callback) {
  mongo.findDocumentFields("NCPartyMaster",{ USER_ID: { $eq: "SCCELITE" }},{"NC_PARTY_DESC":true,"NC_PARTY_CODE":true}, function (data) {
    message.message = data;
    message.status = "Success";
    callback(message);
    // mongo.sendWsMessage(connection, message);
  })
}

exports.getJobTypes = function (message, callback) {
  mongo.findDocumentFields("JobType",{ job_id: { $ne:0}},{"job_id":true,"job_description":true}, function (data) {
    message.message = data;
    message.status = "Success";
    callback(message);
    // mongo.sendWsMessage(connection, message);
  })
}

exports.getContainerTypes = function (message, callback) {
  mongo.findDocumentFields('ContainerTypeMaster',{TARE_WT : { $eq: "NULL" }},{"CONT_TYPE_ID":true,"CONT_TYPE_DES":true,"CONT_SIZE":true,"CONT_TEU":true},function (data) {
      message.message = data;
      message.status = "Success";
      callback(message);
      // mongo.sendWsMessage(connection, message);
  })
}

exports.getVendors = function (message, callback) {
  mongo.findDocumentFields("Vender",{ VENDOR_ID: { $ne:0}},{"VENDOR_ID":true,"VENDOR_NAME":true}, function (data) {
    message.message = data;
    message.status = "Success";
    callback(message);
    // mongo.sendWsMessage(connection, message);
  })
}

exports.getNCTypes = function (message, callback) {
  mongo.findDocumentFields("NCTypeMaster",{ NC_CATE_CODE: { $eq: message.name }},{"NC_TYPE_DESC":true,"NC_TYPE_CODE":true}, function (data) {
    message.message = data;
    message.status = "Success";
    callback(message);
    // mongo.sendWsMessage(connection, message);
  })
}
