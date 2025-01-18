const { $, browser } = require("@wdio/globals");
const data = require("../../data/targetData.json");
const { expect, assert } = require("chai");
const helper = require("../../utils/helper");

class BookingPage {
  constructor() {}

  get logo() {
    return $("(//a[@aria-label='Target home'])[1]");
  }
  get searchBar() {
    return $("//input[@id='search']");
  }
  get searchButton() {
    return $("// button[@aria-label='search']");
  }
  get firstItem() {
    return $("(//div[@data-test='product-grid']//child::a//child::div[@title])[1]");
  }
  get productDetail() {
    return $("//div//child::h1");
  }
  get originalPrice() {
    return $("//span[contains(@data-test,'regular-price')]");
  }
  get discountedPrice() {
    return $("//span[@data-test='product-price']");
  }
  get customerSavings() {
    return $("//span[contains(@data-test,'savings-amount')]");
  }

  get discountedItem() {
    return (discounted) => $(
      `((//div[@data-test='urgency-message' and contains(text(),'${discounted}')])[1]//parent::div//parent::div//following-sibling::div//child::a[@data-test])[1]`
    );
  }
  async navigation() {
    await browser.url(process.env.targetBaseURL);
  }

  async checkHomepage() {
    const title = await browser.getTitle();
    const url = await browser.getUrl();
    expect(title).to.be.equal(process.env.targetPageTitle);
    expect(url).to.be.equal(process.env.targetBaseURL);
    helper.logToFile(`Target Application Logs:${helper.getCheckInDates()}`)
    expect(await this.logo.isDisplayed()).to.be.true;

  }


  async searchForAnItem(){
    expect(await this.searchBar.isDisplayed()).to.be.true;
    expect(await this.searchBar.isEnabled()).to.be.true;
    await this.searchBar.setValue(data.itemName);
    await this.searchButton.click()

  }
  async validateTheResults(){
    await browser.pause(process.env.smallTimeOut)
    const currentTitle = await browser.getTitle();
    expect(currentTitle).to.be.equal(process.env.watchPageTitle);;
    const firstItemText = await this.firstItem.getText();
    expect(firstItemText.toLowerCase()).contains(data.itemName);
    helper.logToFile(`First item in result: ${((await this.firstItem.getText()).toLowerCase())}`);
  }

  async selectAProductWithDiscount()
  {
    for (const option of data.discounted) {
      const discountedLocator = this.discountedItem(option);
    expect(await discountedLocator.isDisplayed()).to.be.true;
    expect(await discountedLocator.isEnabled()).to.be.true;
        await discountedLocator.click();  
        break;
 
      }
    }

     async validatePercentageDiscounts(){
      const original = await helper.getParsedPrice(this.originalPrice);  
      const inOffer = await helper.getParsedPrice(this.discountedPrice); 
      const calculatedDiscountPercentage =await helper.calculateDiscountPercentage(original.price,inOffer.price)
    //   const calculatedDiscountPrice =await helper.calculateDiscountPrice(original.price,inOffer.price)
      const result = await helper.getParsedPrice(this.customerSavings); 
    //   expect(calculatedDiscountPrice).toBeCloseTo(result.price,0.05);
      expect(calculatedDiscountPercentage).to.be.equal(result.discount)
    } 

    async validatePriceDiscounts(){
      const original = await helper.getParsedPrice(this.originalPrice);  
      const inOffer = await helper.getParsedPrice(this.discountedPrice); 
      const calculatedDiscountPrice =await helper.calculateDiscountPrice(original.price,inOffer.price)
    expect(await customerSavings.isDisplayed()).to.be.true;
      
      const result = await helper.getParsedPrice(this.customerSavings); 
      expect(calculatedDiscountPrice).toBeCloseTo(result.price,0.05);
    } 
 

}

module.exports = new BookingPage();
