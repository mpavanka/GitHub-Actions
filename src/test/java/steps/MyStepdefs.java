package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import pages.pages;

public class MyStepdefs {

    pages pages = new pages();

    @Given("I am on the google search page")
    public void iAmOnTheGoogleSearchPage() {
        pages.open();
    }

    @When("I search for {string}")
    public void iSearchFor(String arg0) {
        pages.GoogleSearchPage(arg0);
    }

    @Then("the first result should contain {string}")
    public void theFirstResultShouldContain(String arg0) {
        pages.validateFirstResult(arg0);
    }
}
