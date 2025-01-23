Feature: Book API interactions
    
  Scenario: Fetch all recrods
  When I make a GET request to the endpoint in order to fetch all the records 
  Then I get all the records available
  Then The response status should be 200
  And The response should contain the author property

  Scenario: Fetch a record
  When I make a GET request to the endpoint in order to fetch a particular record
  Then I get the record 
  Then The response status should be 200 Ok

#  Scenario: Add a book to users collection
#   When I make a Post request to the endpoint in order to add a new record in user collection
#   Then The response status should be 201

  # Scenario: Delete a record
  # When I make a DELETE request to the endpoint in order to delete a particular record form user collection
  # Then The response status should be 204


#  Scenario: Fetch all the books that the user have
#   When I make a GET request to the endpoint in order to fetch all records related to the user
#   Then The response status should be 200 Ok


  # Scenario: Update book in users collection
  # When I make a PUT request in order to update a record in user collection
  # Then The response status should be 201 update done

  # Scenario: Fetch all the books that the user have
  # When I make a GET request to the endpoint in order to fetch all records related to the user
  # Then The response status should be 200 Ok

 

 
   