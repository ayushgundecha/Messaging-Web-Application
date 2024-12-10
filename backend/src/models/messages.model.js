const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');

const User = require('./users.mongo');
const Message = require('./messages.mongo');


function loadCustomerData() {
    const filePath = path.join(__dirname, '..', '..', 'data', 'CUSTOMER_DATA.csv');

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', async (data) => {
                await addCustomer(data);
            })
            .on('end', () => {
                console.log('Customers Data Found');
                resolve();
            })
            .on('error', (err) => {
                reject(err);
            });
    });
}

async function addCustomer(customer) {
    try {

        const { 'User ID': userId, 'Timestamp (UTC)': timestamp, 'Message Body': messageBody } = customer;

        // Use updateOne with upsert to insert or update the user
        await User.updateOne(
            {
                user_id: userId
            },
            {
                user_id: userId,
            },
            { upsert: true }
        );

        // Insert the message
        await Message.updateOne(
            { user_id: userId, timestamp: timestamp },
            {
                user_id: userId,
                message_body: messageBody,
            },
            { upsert: true }  // This ensures the message is only inserted if it doesn't already exist
        );
    } catch (error) {
        console.log("Error: ", error);

    }
}

module.exports = {
    loadCustomerData,
};