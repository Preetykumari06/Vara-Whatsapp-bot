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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    startScheduler();
});









