// This example sets up an endpoint using the Express framework.

const express = require('express');
const app = express();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'STRIPE_SECRET_KEY');

app.get('/success', (req, res) => {
    res.sendFile(__dirname + '/success.html');
});
app.get('/cancel', (req, res) => {
    res.sendFile(__dirname + '/cancel.html');
});
app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Made Of India',
                    },
                    unit_amount: 100,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:4242/success',
        cancel_url: 'http://localhost:4242/cancel',
    });

    console.log(session);

    res.redirect(303, session.url);
});

app.listen(4242, () => console.log(`Listening on port ${4242}!`));