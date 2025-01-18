const { $, browser } = require("@wdio/globals");
const data = require("../../data/testimData.json");
const { expect, assert } = require("chai");
const helper = require("../../utils/helper");
const fs = require("fs");

class TestimPage {
  constructor() {}

  get signInPopUp() {
    return $(
      "//span[text()='Sign in or register']//parent::a//parent::div//parent::div//parent::div"
    );
  }
  get pageLogo() {
    return $(
      "//div[contains(@class,'page-header')]//child::img[contains(@alt,'Testim Logo')]"
    );
  }
  get navigationElements() {
    return $$(
      "//div[contains(@class,'page-header')]//child::li[contains(@class,'has-drop')]"
    );
  }
  get subSection() {
    return (subSectionText) => $$(
      `//span[normalize-space(text()) = '${subSectionText}']`
    );
  }
  
  get companyOption() {
    return $("//a[text()='Company']");
  }
  get customerName() {
    return $("(//div[@class='item-name'])[1]");}
  get customerPosition() {
    return $("(//div[@class='item-position'])[1]")
  }
  get reviewContent() {
    return $("(//div[@class='item-body']//p)[1]")
  }
  get footer() {
    return $("//div[contains(@class,'footer')]")
  }
  get footerLinks() {
    return $$("//div[@class='f-bottom']//child::div//ul[@class='l-list']//li//a")
  }
  async navigation() {
    await browser.url(process.env.testimBaseUrl);
  }
  async checkHomepage() {
    const url = await browser.getUrl();
    expect(url).to.be.equal(process.env.testimBaseUrl);
  }


  async validateTheHeaderOptions() {
    expect(await this.pageLogo.isDisplayed()).to.be.true;
    const navOptions = await this.navigationElements;
    let visibleCount = 0;
    for (const option of navOptions) {
      const isVisible = await option.isDisplayed();
      if (isVisible) {
        visibleCount++;
      }
    }
    fs.writeFileSync(
      "testimOutput.txt",
      `Total visible header options: ${visibleCount}`
    );
  }


    async validateCompanySection() {
        for (const option of data.subSectionTexts) {
          const subSectionElements = await this.subSection(option); 
          for (const subSectionElement of subSectionElements) {
            expect(await subSectionElement.isDisplayed()).to.be.true;
          }
        }
      }
      async validateCustomerSubSection(){
        for (const option of data.subSectionTexts) {
           if((option).includes(data.sectionSelected))
           {
      const subSectionElement = await this.subSection(option); 
      const subSectionElementSelector=subSectionElement.selector
      await $(subSectionElementSelector).click()
           }
         }
        expect(await browser.getUrl()).to.be.equal(process.env.testimCustomerUrl);
        expect(await this.customerName.getText()).to.equal(data.customerSubSection.name, 'Validate the customer name in the review section');
        const reviewName= data.customerSubSection.name;
        const reviewPosition= data.customerSubSection.position;
        const reviewContent= data.customerSubSection.reviewContent;
        const displayedName = await this.customerName.getText();
        const displayedContent = await this.reviewContent.getText();
        const displayedPosition = await this.customerPosition.getText();
        expect(displayedName).to.be.equal(reviewName);
        const cleanedReceivedContent = displayedContent.slice(1, -1);
        expect(cleanedReceivedContent,"comparing the customer review contents stored in the data file with the reveived one from UI").to.be.equal(reviewContent);
        expect(displayedPosition,"comparing the customer review position stored in the data file with the reveived one from UI").to.be.equal(reviewPosition);
      
      }
      async visibilityOfFooter(){
        await this.footer.scrollIntoView()
        expect(await this.footer.isDisplayed(),"validate the footer is not hidden").to.be.true;

      }

      async validateFooterSection(){
       const footOptions = await this.footerLinks;
          let visibleCount = 0;
          for (const option of footOptions) {
            const isVisible = await option.isDisplayed();
            const hrefValue = await option.getAttribute('href');
            expect(hrefValue,"validate the options we have in page footer have an attribute 'href'" ).not.to.be.null; 
            const displayedFooterLink = await option.getText();
          fs.appendFileSync('testimOutput.txt',`\n ${displayedFooterLink}`);
            if (isVisible) {
              visibleCount++;
            }
          }
          fs.appendFileSync('testimOutput.txt', `\nTotal visible  footer link options: ${visibleCount}`);
      
        
      }

    }

module.exports = new TestimPage();
