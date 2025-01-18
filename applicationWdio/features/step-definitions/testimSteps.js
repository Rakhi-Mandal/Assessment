const { Given, When, Then } = require('@wdio/cucumber-framework');
const { $, browser } = require("@wdio/globals");
const path = require("path");
const { expect } = require('chai');



const testimPage = require('../pageobjects/testim.page');

Given(/^I launch the browser and navigate to Testim homepage$/,async () => {
	await testimPage.navigation();
});

When(/^I verify the Testim landing page details$/, async() => {
	await testimPage.checkHomepage();
});

Then(/^I validate the header options$/,async () => {
	await testimPage.validateTheHeaderOptions();
});

Given(/^In header company option is visible$/,async () => {
    expect(await testimPage.companyOption.isDisplayed()).to.be.true;

});

When(/^I select company option from header$/,async () => {
	await testimPage.companyOption.click();
});

Then(/^All sub options under company are visible$/,async () => {
	await testimPage.validateCompanySection();
});

Then(/^All of them are validated$/, async () => {
	await testimPage.validateCustomerSubSection()
});

When(/^Footer section is visible$/, async () => {
	await testimPage.visibilityOfFooter()
});

Then(/^They are validated$/, async () => {
	await testimPage.validateFooterSection()
});



