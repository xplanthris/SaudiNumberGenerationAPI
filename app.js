'use strict';

// Standard boilerplate
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Carrier list
const carriers = ["stc", "salam", "zain", "mobily", "virgin", "redbull", "lebara"];
// List of carrier prefixes, stored in a mapping object
const prefixes = {
    stc: ["050", "053", "055"],
    salam: ["051"],
    zain: ["058", "059"],
    mobily: ["054", "056"],
    virgin: ["0570", "0571", "0572"],       
    redbull: ["0574", "0575"],
    lebara: ["0576", "0577", "0578"],
    any: ["050", "051", "053", "054", "055", "056", "058", "059",
        "0570", "0571", "0572", "0574", "0575", "0576", "0577", "0578"]
};
// Make a slice for carriers that have prefixes that have 4 numbers
const fournprefix = prefixes["any"].slice(-8);

// This function generates the numbers after the prefix
function generateLastNumbers(amount) {
    // Define numbers
    let numbers = "";

    // Generate them
    for (let i = 0; i < amount; i++) {
        numbers += Math.floor(Math.random() * 10).toString();
    }

    // Return them
    return numbers;
}

// This generates the phone number
function generateNumber(carrier) {
    // Variables
    let number = "";
    let prefix = ""; 
    let count = "";

    // Generation
    prefix = prefixes[carrier][Math.floor(Math.random() * prefixes[carrier].length)];
    count = fournprefix.includes(prefix) ? 6 : 7;
    number = prefix + generateLastNumbers(count);

    // Return
    return number;
}

// Index endpoint
app.get("/", (req, res) => {
    // Basically, we check if there is a carrier specified, if not, do any
    const carrier = req.query.carrier || "any";

    // Check if amount is specified, if not, do one.
    const amount = req.query.amount || 1;

    // Just a check if the carrier is not valid
    if (!carriers.includes(carrier) && carrier !== "any") {
        res.send("Invalid carrier, valid carriers are stc, salam, zain, mobily, virgin, redbull, and lebara.");
    }

    let numbers = []

    // Generate
    for (let i = 0; i < amount; i++) {
        numbers += generateNumber(carrier) + "\n";
    }

    // Send
    res.send(numbers);
});

// Listener function
app.listen(port, () => {
    console.log("API listening on " + port);
});
