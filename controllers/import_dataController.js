const csv_parse = require("csv-parse/lib/sync");
const fs = require('fs');
require("../Models/Vehicle");
const Vehicle = require('mongoose').model('vehicle');


exports.importCSV = async (request, response) => {

    if(!request.file || !request.body.providerName){
      response.status(400).json({isLoaded : false, message: "file or providerName are not in the request"});
    }
 
    var csv = csv_parse(fs.readFileSync(request.file.path),{
        columns: true,
        skip_empty_lines: true,
        skip_lines_with_error: true,
        relax_column_count: true
    });

    fs.unlinkSync(request.file.path);

    if(!csv){
      response.status(400).json({isLoaded : false, message: "csv is empty"});
    }

      var headers = [
            {csvName : "UUID" , mongoName: "UUID" },
            {csvName : "VIN" , mongoName: "VIN" },
            {csvName : "Make" , mongoName: "Make" },
            {csvName : "Model" , mongoName: "Model" },
            {csvName : "Mileage" , mongoName: "Mileage" },
            {csvName : "Year" , mongoName: "Year"   },
            {csvName : "Price" , mongoName: "Price"   },
            {csvName : "Zip Code" , mongoName: "ZipCode" },
            {csvName : "Create Date" , mongoName: "CreateDate"  },
            {csvName : "Update Date" , mongoName: "UpdateDate" }
      ];
 
      let tmpRow = csv[0];
      //Delete Unnecessary headers
      headers = headers.filter(header => tmpRow.hasOwnProperty(header.csvName) );



      //Change Correct mongoName
       var rows = csv.map((row)=> {
           let finalRow = { Provider : request.body.providerName };
            for(let header in headers){
                finalRow[headers[header].mongoName] = row[headers[header].csvName];
            }
            return finalRow;
       });

       //Save Rows
       Vehicle.collection.insertMany(rows, function (err, docs) {
        if (err){ 

            response.status(400).json({isLoaded : false, message: "csv is empty"});
        } else {
          console.log("Multiple Vehicles inserted");
       
        }
      });

    response.status(201).json({isLoaded : true, data : rows});
}