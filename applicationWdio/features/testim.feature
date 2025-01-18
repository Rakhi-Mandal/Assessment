Feature: Testim Application Testing

  Scenario: Open Testim homepage 
    Given I launch the browser and navigate to Testim homepage
    When I verify the Testim landing page details
    Then I validate the header options

 Scenario: Interacting with header options 
    Given In header company option is visible
    When I select company option from header
    Then All sub options under company are visible
    And All of them are validated
    When Footer section is visible 
    Then They are validated
