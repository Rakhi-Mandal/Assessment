const { Given, When, Then } = require('@wdio/cucumber-framework');
// const { expect, $ } = require('@wdio/globals')
const data = require("../../data/data.json");
const path = require("path");
const { expect } = require('chai');



const flipkartPage = require('../pageobjects/flipkart.page');

Given(/^I am on the landing page$/, async() => {
    await flipkartPage.checkLandingPage()
   
});

When(/^click on the search bar$/,async () => {
    await flipkartPage.searchAItem()
	
});

When(/^type tablets$/,async () => {
	await flipkartPage.searchInputField.setValue(data.searchItem)
});

Then(/^click search to see all suggestions that are available$/,async () => {
	await flipkartPage.search.click()
    await browser.pause(5000)

});


When(/^take a screenshot$/,async () => {
    await browser.saveScreenshot('./assets/beforeSnap.png')
	
});


Then(/^check filters to get only Flipkart Assured products$/,async () => {
    await flipkartPage.checkFlipkartAssured.scrollIntoView();
    expect(await flipkartPage.checkFlipkartAssured.isClickable()).to.be.true;
    await browser.pause(5000)


	await flipkartPage.checkFlipkartAssured.click();
    await browser.saveScreenshot('./assets/afterSnap.png')

});


When(/^again take a screenshot$/,async () => {
    await browser.saveScreenshot('./assets/afterSnap.png')
	
});


Then(/^compare the above two screenshots$/,async () => {
	await flipkartPage.compareTheUiSnaps();
});





