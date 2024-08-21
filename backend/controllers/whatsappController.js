const ExcelJS = require('exceljs');
const path = require('path');
const { client, whatsappNumber } = require('../config/twilio');
const { readExcelFile,saveWaterUsageData } = require('../models/dataModel');

// Handle incoming WhatsApp messages
const handleIncomingMessage = async (req, res) => {
    const incomingMessage = req.body.Body;
    const from = req.body.From;
    const date = new Date().toLocaleDateString();

    if (incomingMessage.toLowerCase().includes('liters')) {
        const waterUsageMatch = incomingMessage.match(/\d+/);
        if (waterUsageMatch) {
            const waterUsage = waterUsageMatch[0];
            
            try {
                // Save the water usage data to the Excel file
                await saveWaterUsageData(date, `${waterUsage} liters`);

                // Send a confirmation message via WhatsApp
                await client.messages.create({
                    body: `Data received: ${waterUsage} liters on ${date}`,
                    from: whatsappNumber,
                    to: from
                });
                
                res.sendStatus(200);
            } catch (error) {
                console.error('Error processing the data or sending confirmation message:', error);
                res.sendStatus(500); // Internal Server Error
            }
        } else {
            try {
                // Send an error message if water usage couldn't be extracted
                await client.messages.create({
                    body: `Unable to extract water usage from the message. Please use the format 'XXX liters'.`,
                    from: whatsappNumber,
                    to: from
                });
                
                res.sendStatus(400); // Bad Request
            } catch (error) {
                console.error('Error sending error message:', error);
                res.sendStatus(500); // Internal Server Error
            }
        }
    } else {
        try {
            // Send a message asking for the correct format
            await client.messages.create({
                body: `Please input the water usage in the format 'XXX liters'.`,
                from: whatsappNumber,
                to: from
            });
            
            res.sendStatus(400); // Bad Request
        } catch (error) {
            console.error('Error sending format request message:', error);
            res.sendStatus(500); // Internal Server Error
        }
    }
};


// Fetch water usage data from Excel
const waterUsageData = async (req, res) => {
    try {
        // Use the model function to read the Excel file
        const data = await readExcelFile();

        // Send the data as JSON
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    } catch (error) {
        console.error('Error reading Excel file:', error);
        res.status(500).send('Error reading Excel file');
    }
};

module.exports = {
    handleIncomingMessage,
    waterUsageData
};

