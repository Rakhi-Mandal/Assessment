const axios = require('axios');
const { $, browser } = require("@wdio/globals");
const { expect, assert } = require("chai");
class ApiPage{
    async getAllRecords() {
        const base = process.env.fakeStore;  
        const endPoint = process.env.getAllBooks;
        const response = await axios.get(base + endPoint, {
          httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),
        });
        return response; 
    }
}

module.exports = new ApiPage();

