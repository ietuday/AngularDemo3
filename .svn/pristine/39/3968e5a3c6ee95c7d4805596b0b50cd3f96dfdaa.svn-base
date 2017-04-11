var mongo = require('./mongo.js');

exports.getSOnumbers = function (message, callback) {
  mongo.findDocumentFields("SalesOrder", {"customerId": parseInt(message.message.customerId)}, {"salesOrderNo": true, "_id": false}, function (data) {
    console.log("SalesOrder data", data);
    message.message = data;
    message.status = "Success";
    callback(message);
    // mongo.sendWsMessage(connection, message);
  });
};

exports.saveSalesOrder = function (message, callback) {
  mongo.findDocumentFieldsLimitReverse("SalesOrder", {}, {"salesOrderNo": true, "_id": false}, 1, function (salesOrderData) {
    var salesOrderNo;
    if (salesOrderData.length == 0) {
      salesOrderNo = 1000;
    } else {
      salesOrderNo = salesOrderData[0].salesOrderNo + 1;
    }
    message.message.salesOrderNo = salesOrderNo;
    mongo.insertDocument('SalesOrder', message.message, function (data) {
      message.message = {salesOrderNo: salesOrderNo};
      message.status = "Success";
      callback(message);
      // mongo.sendWsMessage(connection, message);
    });
  });
};

exports.saveSalesOrderDocument = function (formData, callback) {
  var salesOrderNo = JSON.parse(formData).salesOrderNo;
  console.log("saveSalesOrderDocument", JSON.parse(formData).salesOrderNo);
  mongo.updateArrayDocument("SalesOrder", {"salesOrderNo": salesOrderNo}, {"docs": {$each: [JSON.parse(formData)]}}, function (result, query, setvalues) {
    callback(true);
  });
};

exports.getDocsRepo = function (message, callback) {
  mongo.findDocumentFields("SalesOrder", {'salesOrderNo': message.message.salesOrderNo}, {"docs": true, "_id": false}, function (data) {
    message.message = data[0];
    message.status = data.length == 1 ? "Success" : "Fail";
    callback(message);
    // mongo.sendWsMessage(connection, message);
  })
};

exports.getSalesOrder = function (message, callback) {
  mongo.findDocumentFields("SalesOrder", {'salesOrderNo': message.message.salesOrderNo}, { "_id": false}, function (data) {
    message.message = data[0];
    message.status = data.length == 1 ? "Success" : "Fail";
    callback(message);
    // mongo.sendWsMessage(connection, message);
  })
};

//For NcDetail
exports.saveNcDetails = function (message, callback) {
  console.log("saveNcDetails: @@@@@", message);
  mongo.updateArrayDocument("SalesOrder", {"salesOrderNo": message.message.salesOrderNo}, {"ncs": {$each: message.message.ncData}}, function (result, query, setvalues) {
    mongo.findDocumentFields("SalesOrder", {'salesOrderNo': message.message.salesOrderNo}, { "ncs": true, "_id": false}, function (data) {
      console.log("Ncs data", data);
      message.action = 'getNcDetails'
      message.message = data[0];
      message.status = data.length == 1 ? "Success" : "Fail";
      callback(message);
      // mongo.sendWsMessage(connection, message);
    });
  });
};
