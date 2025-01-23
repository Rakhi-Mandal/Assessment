const axios = require("axios");
const data = require("../../data/bookApi.json");
const helper = require("../../utils/helper");

const authToken = data.authenticationToken;
const authHeader = `Bearer ${authToken}`;
const axiosInstance = axios.create({
  baseURL: process.env.fakeStore,
  headers: {
    Authorization: authHeader,
    "Content-Type": "application/json",
  },
});
class ApiPage {
  async getAllRecords() {
    const endPoint = process.env.getAllBooks;
    const response = await axiosInstance.get(endPoint);
    return response;
  }
  async getBook(isbn) {
    const endPoint = `${process.env.getABook}${isbn}`;
    try{
        const response = await axiosInstance.get(endPoint);
        return response;
    }  catch (error) {
        helper.logToFile("Error fetching a book with ISBN");
      }
    
  }
  async deleteBook(isbn, userId) {
    const endPoint = process.env.bookDelete;
    const payload = {
      isbn: isbn,
      userId: userId,
    };
    try {
      const response = await axiosInstance.delete(endPoint, {
        data: payload,
      });
      return response;
    } catch (error) {
      helper.logToFile("Error deleting the book");
    }
  }
  async getBooksOfUser(userId) {
    const base = process.env.fakeStore;
    const endPoint = `${process.env.getBooksOfUser}${userId}`;
    const response = await axiosInstance.get(base + endPoint);
    return response;
  }

  async addABookInUserCollection(userId, isbn) {
    const endPoint = process.env.getAllBooks;
    const payload = {
      userId: userId,
      collectionOfIsbns: [{ isbn: isbn }],
    };
    try {
      const response = await axiosInstance.post(endPoint, payload);
      helper.logToFile("Response:", response.data);

      return response;
    } catch (error) {
      helper.logToFile("Error while adding the book to the collection");
      
    }
  }
  async updateCollection(userId, isbn) {
    const payload = {
      userId: userId,
      isbn: "9781491000000",
    };
    const endPoint = `${process.env.updateUserBookCollection}${isbn}`;

    try {
      const response = await axiosInstance.put(endPoint, payload);
      helper.logToFile("Response:", response.data);
      return response;
    } catch (error) {
      payload;
      helper.logToFile("Error while updating a book to the collection");
    //   throw error;
    }
  }
}
module.exports = new ApiPage();
