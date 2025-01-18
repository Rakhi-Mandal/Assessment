const { Given, When, Then } = require('@wdio/cucumber-framework');
const { $, browser } = require("@wdio/globals");
const path = require("path");
const { expect } = require('chai');



const bookingPage = require('../pageobjects/booking.page');

Given(/^I launch the browser and navigate to booking homepage$/,async () => {
    await bookingPage.navigation();
	
});

When(/^I verify the booking landing page details$/,async () => {
	await bookingPage.checkHomepage();
});

Then(/^If Popup appears handle it$/,async () => {
	await bookingPage.handlePopup()
});

Then(/^I validating the provided search blocks$/,async () => {
	await bookingPage.validateSearchBars();
});

Then(/^Fill the booking requirements$/,async () => {
	await bookingPage.fillBookingRequirements();
});

Then(/^I filtered the results$/,async () => {
	await bookingPage.filterTheSearchResult()
});


Then(/^Selected a hotel and verified it$/,async () => {
	await bookingPage.selectAndVerifyHotel()
});





