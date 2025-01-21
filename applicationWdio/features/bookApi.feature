Feature: Book API interactions
    
  Scenario: Fetch all recrods
  When I make a GET request to the endpoint in order to fetch all the records 
  Then I get all the records available
  Then The response status should be 200
  And The response should contain the author property

  # Scenario: Fetch a  recrods
  # When I make a GET request to the endpoint in order to fetch a particular record
  # Then I get the record 
  # Then The response status should be 200 ok

 
   