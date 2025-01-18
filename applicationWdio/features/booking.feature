Feature: Booking Application Testing

  Scenario: Open Booking homepage 
    Given I launch the browser and navigate to booking homepage
    When I verify the booking landing page details
    Then If Popup appears handle it
    Then I validating the provided search blocks
    And Fill the booking requirements
    Then I filtered the results
    And Selected a hotel and verified it
