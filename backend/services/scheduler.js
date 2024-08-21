const { client, whatsappNumber } = require('../config/twilio');

const sendReminder = () => {
    client.messages.create({
        body: "Please send today's Water Usage Data.",
        from: whatsappNumber,
        to: 'whatsapp:+917979911769'  // Replace with your test number
    });
};

const startScheduler = () => {
    setInterval(sendReminder, 300000);  // 300000 ms = 5 minutes
};

module.exports = {
    startScheduler
};
