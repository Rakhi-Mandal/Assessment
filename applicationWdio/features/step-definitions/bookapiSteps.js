const { Given, When, Then } = require('@wdio/cucumber-framework');
const bookApiPage = require('../pageobjects/bookApi.page');
const helper = require("../../utils/helper");
const data = require("../../data/bookApi.json");
const { expect, assert } = require("chai");
const ErrorCodes = require("../../utils/errorCodes");
let response;
let responseStatus;
let responseData;

When(/^I make a GET request to the endpoint in order to fetch all the records$/,async () => {
    helper.logToFile(`\nBook API logs :${helper.getCheckInDates()}`)
    response = await bookApiPage.getAllRecords();
    responseStatus = response.status; 
    responseData = response.data; 
});

Then(/^I get all the records available$/, () => {
    helper.logToFile(`Fetched records :${JSON.stringify(responseData,null,2)}`)

});

Then(/^The response status should be 200$/,async () => {
    expect(responseStatus).to.be.equal(ErrorCodes.SUCCESS_OK); 
    helper.logToFile(`Respose status :${responseStatus}`)

});

Then(/^The response should contain the author property$/, () => {
	expect(responseData.books).not.to.be.undefined;
    expect(responseData.books.length).to.be.greaterThan(0);
    expect(responseData.books[0]).to.have.property(data.property);
});

When(/^I make a GET request to the endpoint in order to fetch a particular record$/,async () => {
    response = await bookApiPage.getBook(data.sampleIsbn);
    if(response!=undefined)
{
    responseStatus = response.status; 
    responseData = response.data; 
}
  
});

Then(/^I get the record$/,async () => {
  helper.logToFile(`Fetched record :${JSON.stringify(responseData,null,2)}`)
});

Then(/^The response status should be 200 Ok$/,async () => {
    if(response!=undefined)
{ 
    await expect(responseStatus).to.be.equal(200); 
    helper.logToFile(`Respose status : ${responseStatus}`)
}
else
{
    helper.logToFile(`Respose status : ${ErrorCodes.NOT_FOUND}`)

}

});


When(/^I make a DELETE request to the endpoint in order to delete a particular record form user collection$/,async () => {
    response = await bookApiPage.deleteBook(data.sampleIsbn,data.userId);
    if(response!=undefined)
   {
    responseStatus = response.status;
   }
});

Then(/^The response status should be 204$/,async () => {
    if(response!=undefined)
        {
             expect(responseStatus).to.be.equal(ErrorCodes.DELETED);
             helper.logToFile(`Respose status : ${responseStatus}`)
            }
            else{
                helper.logToFile(`Respose status : ${ErrorCodes.NOT_FOUND}`)
    
            }

});


When(/^I make a GET request to the endpoint in order to fetch all records related to the user$/, async() => {
    response = await bookApiPage.getBooksOfUser(data.userId);
    responseStatus = response.status;
    helper.logToFile(`Fetched record :${JSON.stringify(response.data,null,2)}`)

    
    
});

When(/^I make a Post request to the endpoint in order to add a new record in user collection$/,async () => {
    response = await bookApiPage.addABookInUserCollection(data.userId,data.sampleIsbn);
    if(response!=undefined)
   {
    responseStatus = response.status;
   } 
});

Then(/^The response status should be 201$/,async () => {
    if(response!=undefined)
    {
         expect(responseStatus).to.be.equal(ErrorCodes.SUCCESS_CREATED);
         helper.logToFile(`Respose status :${responseStatus}`)
        }
        else{
            helper.logToFile(`Respose status :${ErrorCodes.NOT_FOUND}`)

        }

	
});


When(/^I make a PUT request in order to update a record in user collection$/,async () => {
    response = await bookApiPage.updateCollection(data.userId,data.sampleIsbn);
    if(response!=undefined)
   {
    responseStatus = response.status;
   } 
});


Then(/^The response status should be 201 update done$/,async () => {
    if(response!=undefined)
        {
             expect(responseStatus).to.be.equal(ErrorCodes.SUCCESS_CREATED);
             helper.logToFile(`Respose status :${responseStatus}`)
            }
            else{
                helper.logToFile(`Respose status :${ErrorCodes.BAD_REQUEST}`)
            }
});











