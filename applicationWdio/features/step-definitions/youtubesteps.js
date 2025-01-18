
const { Given, When, Then } = require('@wdio/cucumber-framework');
// const { expect, $ } = require('@wdio/globals')
const { $, browser } = require("@wdio/globals");

const path = require("path");
const { expect } = require('chai');




const youtubePage = require('../pageobjects/youtube.page');

Given('I launch the browser and navigate to YouTube homepage', async () => {
    await youtubePage.navigation();

});


When(/^I  verify the page details$/,async () => {
    await youtubePage.checkHomepage();
	
});
Then(/^the page should have a meta description and viewport$/,async () => {
	await youtubePage.verifyMetaDescription()
});


Given(/^I search bar is visible$/, async() => {
	await youtubePage.searchBar.isDisplayed();
});

When(/^I search for a video with a query$/, async () => {
	await youtubePage.searchForVideo();
});

When(/^I selected to get only videos recommendations$/,async () => {
  await youtubePage.onlyVideos.waitForDisplayed();
  await youtubePage.onlyVideos.waitForClickable();
  await youtubePage.onlyVideos.click();
});



Then(/^I should see at least 10 video results$/,async () => {
	await youtubePage.verifySearchResults();
});


Given(/^I click on the first video from the results$/,async () => {
    await youtubePage.selectAVideo();
});

When(/^Any pre-video pop-ups i should handle it successfully$/,async () => {
	const sponsore=await youtubePage.sponsored.isDisplayed();
    if(sponsore)
    {
        await youtubePage.handleVideoPopups();
    }
	
});

Then(/^i should see the video successfully playing$/,async () => {
	await youtubePage.verifyVideoLoading();
});

Then('I should see the play or pause button',async () => {
    expect(await youtubePage.playPauseButton.isDisplayed()).to.be.true;
 
})

Then(/^I should see video progress bar$/, async() => {
    expect(await youtubePage.videoProgressBar.isDisplayed()).to.be.true;

});

Then(/^I should be able to the settings menu of video$/,async () => {
    expect(await youtubePage.videoSettings.isDisplayed()).to.be.true;
	
});

Then('the video should play and pause as expected',async () => {
    await youtubePage.verifyVideoPauseResume()
})























