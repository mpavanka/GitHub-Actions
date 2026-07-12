package utils;

import net.masterthought.cucumber.ReportBuilder;
import net.masterthought.cucumber.Configuration;

import java.io.File;
import java.util.Collections;

public class generateCucumberReport {

    public static void main(String[] args) {
        File reportOutputDirectory = new File("target/reports");
        String jsonReportPath = "target/cucumber.json";

        Configuration config = new Configuration(reportOutputDirectory, "Rest-Assuered API Testing");
        ReportBuilder reportBuilder = new ReportBuilder(Collections.singletonList(jsonReportPath), config);
        reportBuilder.generateReports();
    }
}
