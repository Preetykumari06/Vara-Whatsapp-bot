
const express = require('express');
const bodyParser = require('body-parser');
const whatsappRoutes = require('./backend/routes/whatsappRoutes');
const { startScheduler } = require('./backend/services/scheduler');
const path = require('path');
const ExcelJS = require('exceljs');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, './backend/public')));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(whatsappRoutes);

app.get("/", (req, res) => {
    res.send("Hello, Welcome to the Vara's backend!");
});

// Serve the HTML file
app.get('/ExcelFileToJSON.html', (req, res) => {
    res.sendFile(path.join(__dirname, './backend/public', 'ExcelFileToJSON.html'));
});

app.get('/api/data', async (req, res) => {
    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(path.join(__dirname, './backend/data', 'water_usage_data.xlsx'));
        const worksheet = workbook.getWorksheet(1); // Assuming there's only one worksheet

        // Initialize the data array with the header row
        const dataArray = [];
        const headerRow = worksheet.getRow(1).values.slice(1); // Skip the first empty cell
        dataArray.push(headerRow);

        // Add data rows
        worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
            if (rowNumber === 1) return; // Skip the header row
            const rowData = row.values.slice(1); // Skip the first empty cell
            dataArray.push(rowData);
        });
        console.log('Data Array:', dataArray);
        res.setHeader('Content-Type', 'application/json');
        res.json(dataArray);
    } catch (error) {
        console.error('Error reading Excel file:', error);
        res.status(500).send('Error reading Excel file');
    }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    startScheduler();
});









