const { $, browser } = require("@wdio/globals");
const data = require("../../data/bookingData.json");
const { expect } = require("chai");
const helper = require("../../utils/helper");

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
  async navigation() {
    await helper.assertAllureStep('Navigate to Booking Website', async () => {

    await browser.url(process.env.bookingBaseURL);
    helper.logToFile(`Target Application Logs:${helper.getCheckInDates()}`)
    });
  }
  async checkHomepage() {
    await helper.assertAllureStep('Verify Page URL and Title', async () => {

    const title = await browser.getTitle();
    const url = await browser.getUrl();
    expect(title).to.be.equal(process.env.bookingPageTitle);
    expect(url).to.be.equal(process.env.bookingBaseURL);
    });
  }
  async handlePopup() {
    await helper.assertAllureStep('Handle Sign-In Popup', async () => {

    await this.signInPopUp.waitForDisplayed(parseInt(process.env.mediumTimeOut));
    const popup =this.destination.isDisplayed()
    if(popup)
    {await this.closePopUp.isEnabled();
    await this.closePopUp.click();}
    });
  }
  async validateSearchBars() {
    await helper.assertAllureStep('Validate Search Bars Visibility and Editability', async () => {

    expect(await this.destination.isDisplayed()).to.be.true;
    expect(await this.destination.isEnabled()).to.be.true;
    expect(await this.checkInDate.isDisplayed()).to.be.true;
    expect(await this.numberOfGuest.isDisplayed()).to.be.true;
    expect(await this.numberOfGuest.isEnabled()).to.be.true;
    });
  }
  async fillBookingRequirements() {
    await helper.assertAllureStep('Fill Booking Requirements and Search', async () => {

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
    });
  }
  async filterTheSearchResult() {
    await helper.assertAllureStep('Validate visibility of filter grid and change the view to grid format', async () => {

    expect(await this.grid.isDisplayed()).to.be.true;
    await this.grid.click()
    });
    expect(await this.giveAFilter.isSelected()).to.be.false;
    await helper.assertAllureStep('Filter and Verify Hotels then log the count', async () => {

    const preCount=await this.countOptionsAvailable.getText()
    helper.logToFile(`Total suggested pre-count :${preCount}`)
    await this.giveAFilter.click()
    await this.giveAnotherFilter.click()
    const postCount=await this.countOptionsAvailable.getText()
    helper.logToFile(`Total suggested post-count:${postCount}`)
    });
  }
  async selectAndVerifyHotel() {

    const hotelSelected = await this.selectTheHotel.getText();
    await this.selectTheHotel.click(); 
    const handles = await browser.getWindowHandles();
    const originalWindow = handles[0]; 
    const newTabHandle = handles[1]; 
    await browser.switchToWindow(newTabHandle);
    await browser.pause(parseInt(process.env.smallTimeOut));
    const hotelDisplayed = await browser.$("//h2[contains(@class,'header__title')]").getText();
    helper.logToFile(`Selected hotel:${hotelSelected}`)
    helper.logToFile(`Hotel displayed:${hotelDisplayed}`)

    if (hotelSelected == hotelDisplayed) {
    helper.logToFile(`Hotel verified successfully`)
    } else {
    helper.logToFile(`Hotel verification failed`)
    }
    await helper.assertAllureStep('Verify Selected Hotel is correct', async () => {

    expect(hotelSelected).to.be.equal(hotelDisplayed);
    });
    await browser.closeWindow();
    await browser.switchToWindow(originalWindow);
    helper.logToFile(`Switched to main window after completion of task`)

}

  }

module.exports = new BookingPage();



