Feature: Target Application Testing

  Scenario: Open Target Application homepage 
    Given I launch the browser and navigate to target homepage
    When I verify the target landing page details
    Then I searched for watch
    And I verified the results obtaianed
    When I got a product in discount offers and selected that product
    And Verfied wheather the percentage discount given on product matches to the claimed one
    And Verfied wheather the price discount given on product matches to the claimed one