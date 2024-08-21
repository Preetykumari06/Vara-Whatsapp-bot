const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

// Path to the Excel file
const dataFilePath = path.join(__dirname, '../data/water_usage_data.xlsx');

// Function to read binary data and convert to an array of objects
async function readExcelFile() {
    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(dataFilePath);

        // Assuming you want to read data from the first worksheet
        const worksheet = workbook.worksheets[0];

        // Convert worksheet data to an array of objects
        const data = [];
        worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
            if (rowNumber === 1) {
                // Assuming the first row is the header row
                data.headers = row.values.slice(1); // Remove the first element which is undefined
            } else {
                const rowData = {};
                row.values.slice(1).forEach((cell, index) => {
                    rowData[data.headers[index]] = cell;
                });
                data.push(rowData);
            }
        });

        return data;
    } catch (error) {
        console.error('Error reading Excel file:', error);
        throw error;
    }
}

// Function to save water usage data
async function saveWaterUsageData(date, value) {
    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(dataFilePath);

        
        // Check if the 'Data' worksheet exists
        let worksheet = workbook.getWorksheet('Data');
        
        if (!worksheet) {
            // If the 'Data' worksheet doesn't exist, create it
            worksheet = workbook.addWorksheet('Data');
            worksheet.addRow(['Date', 'Value']); // Add headers
        }

        // Add new row of data
        worksheet.addRow([date, value]);

        // Save the workbook
        await workbook.xlsx.writeFile(dataFilePath);
    } catch (error) {
        console.error('Error saving water usage data:', error);
        throw error;
    }
}



module.exports = {
    readExcelFile,
    saveWaterUsageData
};
