package pages;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import javax.swing.*;

import static org.openqa.selenium.Keys.ENTER;

public class pages {
    WebDriver driver;

    public pages() {

        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
    }

    public void open() {
        driver.get("https://cucumber.io/");

    }

    public void GoogleSearchPage(String arg0) {
        driver.findElement(By.xpath("//*[@id=\"__docusaurus_skipToContent_fallback\"]/header/div/div/div[1]/div/a[1]")).click();
    }


    public void validateFirstResult(String arg0) {
        driver.close();
    }
}
