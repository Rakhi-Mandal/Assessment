const { $, browser } = require('@wdio/globals')
const Page = require('./page');
const { expect } = require('chai'); 
const data = require("../../data/data.json");
const helper = require("../../utils/helper");
const path = require("path");



/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {

        get searchInputField() {
            return $("//input[contains(@title,'Search')]");
          }
          get search() {
            return $("//button[@type='submit']");
          }

          get checkFlipkartAssured() {
//          span[text()='Filters']//ancestor::section//following-sibling::section//child::label//child::input
            return $("//div[text()='Brand']//ancestor::section//preceding-sibling::section//child::label//child::input//following-sibling::div");
          }

        

          


       async checkLandingPage (){
        const currentURL = await browser.getUrl();
        expect(currentURL).to.equal("https://www.flipkart.com/");
       }

       async searchAItem(){
        expect(await this.searchInputField.isExisting()).to.be.true;
        expect(await this.searchInputField.isDisplayed()).to.be.true;
        expect(await this.searchInputField.isClickable()).to.be.true;
        

       }

       async compareTheUiSnaps(){
        const screenshotPath1 = path.join(process.cwd(),"assets","beforeSnap.png");
        const screenshotPath2 = path.join(process.cwd(),"assets","afterSnap.png");
        await helper.compareImages(screenshotPath1, screenshotPath2);
       }

}

module.exports = new LoginPage();
