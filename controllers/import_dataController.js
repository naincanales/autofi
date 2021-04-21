const csv_parse = require('csv-parse/lib/sync');
import * as fs from 'fs';
import * as vehicleModel from "../Models/Vehicle";
import templatesHeader from "../config/headers";
const Vehicle = require('mongoose').model('vehicle');


exports.importCSV = (request, response) => {

  if (!request.file || !request.body.providerName) {

    if (request.file) {
      fs.unlinkSync(request.file.path);
    }

    response.status(400).json({ isLoaded: false, message: "File or providerName are not in the request" });
  }

  if (request.file.mimetype != "text/csv") {
    if (request.file) {
      fs.unlinkSync(request.file.path);
    }
    response.status(400).json({ isLoaded: false, message: "Incorrect mimetype" });
  }


  const csv = csv_parse(fs.readFileSync(request.file.path), {
    columns: true,
    skip_empty_lines: true,
    skip_lines_with_error: true,
    relax_column_count: true
  });

  fs.unlinkSync(request.file.path);

  if (!csv) {
    response.status(400).json({ isLoaded: false, message: "CSV file is empty" });
  }
 
 let ProvideHeaders = templatesHeader.templateHeader.filter(tmpHeader => tmpHeader.providerName == request.body.providerName);

  
 if(ProvideHeaders.length < 1){
  response.status(400).json({ isLoaded: false, message: "There is not template for the provider" });
 }

 let headers = ProvideHeaders[0].headers;


  let tmpRow = csv[0];
  //Delete Unnecessary headers
  headers = headers.filter(header => tmpRow.hasOwnProperty(header.csvName));



  //Change Correct mongoName
  var rows = csv.map((row) => {
    let finalRow = { Provider: request.body.providerName };
    for (let header in headers) {
      finalRow[headers[header].mongoName] = row[headers[header].csvName];
    }
    return finalRow;
  });

  //Save Rows
  Vehicle.collection.insertMany(rows, function (err, docs) {
    if (err) {

      response.status(400).json({ isLoaded: false, message: "csv is empty" });
    } else {
      console.log("Multiple Vehicles inserted");

    }
  });

  response.status(201).json({ isLoaded: true, data: rows });
}