const { $, browser } = require("@wdio/globals");
const data = require("../../data/youtubeData.json");
const { expect,assert } = require('chai'); 
const helper = require("../../utils/helper");

class YoutubePage  {
    constructor() {
    }
    get searchBar() {
      return $("(//input[contains(@name,'search')])[1]");
  }
  
  get iconSearch() {
      return $("(//button[contains(@title,'Search')])[1]");
  }
  
  get verifyMetaAttribute() {
      return  $("//meta[@name='description' or @name='viewport']");
  }
  
  get onlyVideos() {
      return $("//div[@id='chip-container']//child::yt-formatted-string[text()='Videos']");
  }
  
  get countSuggestedVideos() {
      return $$("//h3[contains(@class,'title')]");
  }
  
  get clickAVideo() {
      return $("(//h3[contains(@class,'title')])[1]");
  }
  get sponsored() {
    return $("//div[contains(@class,'ad-info')]//div[text()='Sponsored']");
}

  get skipAd() {
      return $("//button[contains(@id,'skip')]");
  }
  
  get playPauseButton() {
      return $("//button[contains(@class,'ytp-play-button')]");
  }
  
  get videoProgressBar() {
      return $("//div[contains(@class,'progress-bar-container')]");
  }
  
  get videoSettings() {
      return $("//button[contains(@class,'settings')]");
  }
  
  
    async navigation() {
    await helper.assertAllureStep('Navigating to the application home page', async () => { 
      await browser.url(process.env.youtubeBaseURL);
    helper.logToFile(`Testim Application Logs:${helper.getCheckInDates()}`)

    });
    }
    async checkHomepage() {
      const title = await browser.getTitle();
      const url = await browser.getUrl();
    await helper.assertAllureStep('Verifying the page tittle', async () => { 
      expect(title).to.be.equal(process.env.youtubePageTitle);
    });
    await helper.assertAllureStep('Verifying the page url', async () => { 
      expect(url).to.be.equal(process.env.youtubeBaseURL);
    });
    }
    async verifyMetaDescription() {
    await helper.assertAllureStep('Asserting meta attributes are available and visible', async () => { 
      await this.verifyMetaAttribute.isDisplayed();
    });
   }
  
    async searchForVideo() {
    await helper.assertAllureStep('Setting a query and searching for results', async () => { 
      await this.searchBar.setValue(data.searchQuery);
    helper.logToFile(`Searched query:${data.searchQuery}`)

      await this.iconSearch.click();
    });
    }
  
    async verifySearchResults() {
    await helper.assertAllureStep('Counting the numbers of obtained results and asserting it to be more than 10', async () => { 
      
      const count = await this.countSuggestedVideos.length;
      expect(count).to.be.greaterThanOrEqual(10);
    helper.logToFile(`Number of suggested videos obtained :${count}`)

    });
    }

    async selectAVideo()
    {
    await helper.assertAllureStep('Waiting till the video is visible,clickable and then click', async () => { 
      await this.clickAVideo.waitForDisplayed();
      await browser.pause(process.env.mediumTimeOut)
      await this.clickAVideo.waitForClickable();
	    await this.clickAVideo.click();
      await browser.pause(process.env.smallTimeOut)
    });

    }



    async handleVideoPopups() {
      await helper.assertAllureStep('Waiting till skip add button is visible,clickable and then click', async () => { 
      const Advertisement = await this.sponsored.isDisplayed();
      if(Advertisement){
        const skipAdVisible = await this.skipAd.isDisplayed();
        if (skipAdVisible){
          await this.skipAd.waitForDisplayed();
          await this.skipAd.click();
         helper.logToFile('Advertisements handled successfully')
  
        } 
      }
      
    });
    }
    async verifyVideoLoading() {
    await helper.assertAllureStep('Wait for the video to load and verify it is playin', async () => { 
      const isVisible = await this.sponsored.isDisplayed();
      assert.isFalse(isVisible, "Adds are no more visible and video is playing");
    });
    }
   
  
    async verifyVideoPauseResume() {
    await helper.assertAllureStep('Waiting till video play/pause button is visible and ensuring it works as expected.', async () => { 

      const isVisible = await this.playPauseButton.isDisplayed();
      expect(isVisible).to.be.true;
      let count = 1;
      while (count < 5) {
        await this.playPauseButton.click();
        await browser.pause(parseInt(process.env.miniTimeOut));
        count++;
      }
    });
    }
  }
  
  module.exports = new YoutubePage();
  