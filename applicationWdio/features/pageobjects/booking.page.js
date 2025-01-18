const { $, browser } = require("@wdio/globals");
const data = require("../../data/bookingData.json");
const { expect, assert } = require("chai");
const helper = require("../../utils/helper");
const fs = require('fs');

class BookingPage {
  constructor() {}

  get signInPopUp() {
    return $(
      "//span[text()='Sign in or register']//parent::a//parent::div//parent::div//parent::div"
    );
  }
  get closePopUp() {
    return $("//button[contains(@aria-label,'Dismiss')]");
  }
  get destination() {
    return $("//input[@placeholder='Where are you going?']");
  }
  get checkInDate() {
    return $("//span[text()='Check-in Date']");
  }
  get numberOfGuest() {
    return $(
      "//span[text()='Search']//parent::button//parent::div//preceding-sibling::div[1]"
    );
  }
  get getParis() {
    return $(
      "//ul[@role='group']//child::li//child::div//child::div//child::div//child::div[1]"
    );
  }

  get bookingDates() {
    return (date) => $(
      `//span[@aria-label='${date}']`)
  
  }
  get selectTheAdultCount() {
    return $(
      "(//div[@data-testid='occupancy-popup']//child::div//child::div//child::div//following-sibling::div//child::button)[2]"
    );
  }

  get doneButton() {
    return $("//button//span[text()='Done']");
  }
  get grid() {
    return $("//label[text()='Grid']");
  }
  get giveAFilter() {
    return $("(//input[@aria-label and @type='checkbox'])[1]");
  }
  get giveAnotherFilter() {
    return $("(//input[@aria-label and @type='checkbox'])[3]");
  }

  get countOptionsAvailable() {
    return $("//h1[@aria-live='assertive']");
  }
  get search() {
    return $("//button//span[text()='Search']");
  }
 get selectTheHotel(){
    return $("(//div[@data-testid='title'])[1]")
 } 
 get selectedHotel(){
    return $("div[data-testid='title']:first-of-type")
 }
  async navigation() {
    await browser.url(process.env.bookingBaseURL);
  }
  async checkHomepage() {
    const title = await browser.getTitle();
    const url = await browser.getUrl();
    expect(title).to.be.equal(process.env.bookingPageTitle);
    expect(url).to.be.equal(process.env.bookingBaseURL);
  }
  async handlePopup() {
    await this.signInPopUp.waitForDisplayed(parseInt(process.env.mediumTimeOut));
    const popup =this.destination.isDisplayed()
    if(popup)
    {await this.closePopUp.isEnabled();
    await this.closePopUp.click();}
  }
  async validateSearchBars() {
    expect(await this.destination.isDisplayed()).to.be.true;
    expect(await this.destination.isEnabled()).to.be.true;
    expect(await this.checkInDate.isDisplayed()).to.be.true;
    expect(await this.numberOfGuest.isDisplayed()).to.be.true;
    expect(await this.numberOfGuest.isEnabled()).to.be.true;
  }
  async fillBookingRequirements() {
    await this.destination.setValue(data.destination);
    await this.checkInDate.click();
    let formattedCurrentDate = helper.getCheckInDates();
    const checkInDate=  this.bookingDates(formattedCurrentDate)
    await checkInDate.click()
    let formattedCheckOutDate = helper.getCheckOutDates();
    const checkOutDate=  this.bookingDates(formattedCheckOutDate)
    await checkOutDate.click();
    await this.numberOfGuest.click();
      await this.selectTheAdultCount.click();
      await this.doneButton.click();
      await this.search.click();
  }
  async filterTheSearchResult() {
    expect(await this.grid.isDisplayed()).to.be.true;
    await this.grid.click()
    expect(await this.giveAFilter.isSelected()).to.be.false;
    const preCount=await this.countOptionsAvailable.getText()
    fs.writeFileSync('bookingOutput.txt', `Total suggested pre-count: ${preCount}`);
    await this.giveAFilter.click()
    await this.giveAnotherFilter.click()
    const postCount=await this.countOptionsAvailable.getText()
    fs.appendFileSync('bookingOutput.txt', `\nTotal suggested post-count: ${postCount}`);
  }
  async selectAndVerifyHotel() {
    const hotelSelected = await this.selectTheHotel.getText(); // Get the hotel text
    await this.selectTheHotel.click(); // Click the hotel to open in new tab

    // Wait for the new tab (popup) to be opened
    const handles = await browser.getWindowHandles();
    const originalWindow = handles[0]; // Save the original window handle
    const newTabHandle = handles[1]; // The new tab handle

    // Switch to the new tab
    await browser.switchToWindow(newTabHandle);

    // Wait for the page content to load (adjust timeout as needed)
    await browser.pause(parseInt(process.env.smallTimeOut));

    // Find the header in the new tab and get the text
    const hotelDisplayed = await browser.$("//h2[contains(@class,'header__title')]").getText();

    // Log to file
    fs.appendFileSync('bookingOutput.txt', `\nSelected hotel: ${hotelSelected}`);
    fs.appendFileSync('bookingOutput.txt', `\nHotel displayed: ${hotelDisplayed}`);

    // Log verification to file
    if (hotelSelected === hotelDisplayed) {
        fs.appendFileSync('bookingOutput.txt', '\nHotel verified successfully');
    } else {
        fs.appendFileSync('bookingOutput.txt', '\nHotel verification failed');
    }

    // Assert the values (optional)
    expect(hotelSelected).to.be.equal(hotelDisplayed);

    // Close the new tab and return to the original window
    await browser.closeWindow();
    await browser.switchToWindow(originalWindow);
}


    


  }

module.exports = new BookingPage();



