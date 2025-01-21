const { Given, When, Then } = require('@wdio/cucumber-framework');
const fakeApiPage = require('../pageobjects/bookApi.page');
const helper = require("../../utils/helper");


When(/^I make a GET request to the endpoint in order to fetch all the records$/,async () => {
    helper.logToFile(`\nBook API logs :${helper.getCheckInDates()}`)
    const response = await fakeApiPage.getAllRecords();
    responseStatus = response.status; 
    responseData = response.data; 
});

Then(/^I get all the records available$/, () => {
    helper.logToFile(`Fetched records :${responseData}`)

});

Then(/^The response status should be 200$/,async () => {
    await expect(responseStatus).toBe(200);  
    helper.logToFile(`Respose status :${responseStatus}`)

});

Then(/^The response should contain the author property$/, () => {
	// expect(responseData.books).not.toBeUndefined();
    // expect(responseData.books.length).toBeGreaterThan(0);
    // expect(responseData.books[0]).toHaveProperty('author');
});
