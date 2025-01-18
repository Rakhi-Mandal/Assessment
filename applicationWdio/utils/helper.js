const fs = require('fs');
// const allure = require('allure-commandline');
const allure = require('@wdio/allure-reporter'); 


function logToFile(message) {
  const logFilePath = 'outputLogs/testLogs.txt';
  fs.appendFileSync(logFilePath, message + '\n', 'utf8');
  
}

async function getParsedPrice(element) {
  const text = await element.getText();
  const price = parseFloat(text.replace(/[^\d.-]/g, ''));
  const discountMatch = text.match(/(\d+)% off/);
  const discount = discountMatch ? parseInt(discountMatch[1], 10) : null;
  return { price, discount };
}

function calculateDiscountPercentage(original, discounted) {
  return Math.round(((original - discounted) / original) * 100);
}

function calculateDiscountPrice(original, discounted) {
  return (original - discounted);
}

function getCheckInDates() {
  const today = new Date();
  const date = today.getDate().toString();
  const year = today.getFullYear().toString();
  const month = today.toLocaleString("default", { month: "long" });
  const formattedDate = `${date} ${month} ${year}`;
  return formattedDate;
}
function getCheckOutDates() {
  const today = new Date();
  const date = today.getDate().toString();
  const year = today.getFullYear().toString();
  const month = today.toLocaleString("default", { month: "long" });
  const formattedDate = `${date} ${month} ${year}`;
  return formattedDate;
}
async function assertAllureStep(stepName,stepTask) {
  await allure.step(stepName,async()=>{
    await stepTask()
  })
}



module.exports = {
  logToFile,
  getParsedPrice,
  calculateDiscountPercentage,
  calculateDiscountPrice,
  getCheckInDates,
  getCheckOutDates,
  assertAllureStep
};
