@GG
Feature: google search

  Scenario: Search for cucumber
    Given I am on the google search page
    When I search for "cucumber"
    Then the first result should contain "cucumber.io"