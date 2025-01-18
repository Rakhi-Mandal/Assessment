const { Given, When, Then } = require('@wdio/cucumber-framework');
const { $, browser } = require("@wdio/globals");
const path = require("path");
const { expect } = require('chai');



const targetPage = require('../pageobjects/target.page');
Given(/^I launch the browser and navigate to target homepage$/,async () => {
	await targetPage.navigation()
});

When(/^I verify the target landing page details$/,async () => {
	await targetPage.checkHomepage()
});

Then(/^I searched for watch$/,async () => {
	await targetPage.searchForAnItem()
});

Then(/^I verified the results obtaianed$/,async () => {
	await targetPage.validateTheResults()
});


When(/^I got a product in discount offers and selected that product$/,async () => {
	await targetPage.selectAProductWithDiscount()
});


Then(/^Verfied wheather the percentage discount given on product matches to the claimed one$/,async () => {
	await targetPage.validatePercentageDiscounts()
});

Then(/^Verfied wheather the price discount given on product matches to the claimed one$/,async () => {
	return targetPage.validatePriceDiscounts
});
