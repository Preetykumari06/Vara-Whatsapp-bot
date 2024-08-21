# Vara-Whatsapp-bot
Introduction
This project is a WhatsApp bot that collects water usage data from users and stores it in an Excel sheet.

How to Run:
1. Clone the repository.
2. Install dependencies: npm install.
3. Set up your Twilio API keys.
4. Run the server: node index.js.
5. Start Ngrok: ngrok http 3000.
6. Update the webhook URL in your Twilio account with the Ngrok URL.

Technical Architecture:
* Node.js for the server.
* Twilio for WhatsApp API.
* ExcelJS for Excel file management.
* SetInterval for sending scheduled messages.

Urls:
nagrok url ---> https://8c47-2405-201-a415-6a7c-3d9d-85f9-f3f0-43b4.ngrok-free.app

Post request ----> https://8c47-2405-201-a415-6a7c-3d9d-85f9-f3f0-43b4.ngrok-free.app/webhook

Json:
{
  "Body": "518 liters",
  "From": "whatsapp:+910123654789"
}

Video Presentation -----  https://drive.google.com/drive/folders/1F0steYvSztoqSQU2MxaMNraKfPL9wNw7?usp=sharing
