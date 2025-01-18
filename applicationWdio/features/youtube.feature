Feature: YouTube Application Testing

  Scenario: Open YouTube homepage and handle pop-ups
    Given I launch the browser and navigate to YouTube homepage
    When I  verify the page details
    Then the page should have a meta description and viewport

     Scenario: Search for a video with dynamic query handling
    Given I search bar is visible
    When I search for a video with a query 
    And I selected to get only videos recommendations
    Then I should see at least 10 video results

  Scenario: Click on a video from the search results
    Given I click on the first video from the results
    When Any pre-video pop-ups i should handle it successfully
    Then i should see the video successfully playing
    # Then I should see the play or pause button
    And I should see video progress bar
    And I should be able to the settings menu of video
    Then the video should play and pause as expected
    

    

   