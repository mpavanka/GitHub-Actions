# AGENTS.md — Guide for AI coding agents

Purpose: give an AI agent the minimal, actionable knowledge to be productive in this repository.
Keep this file short and concrete — assume the agent can read the code referenced.

1) Big picture (architecture & intention)
- This is a small Java-based test/automation project driven by Maven (pom.xml).
- Primary testing stack: Cucumber (v7), JUnit Platform suite runner, Selenium (chromedriver via bonigarcia WebDriverManager). Playwright is present as a dependency but not used in repository code.
- Test code lives under src/test/java; feature files live under src/test/resources/features.
- A lightweight custom GitHub Action lives in .github/actions/qa-helper (Node.js action with utilities to build test commands, parse JSON test reports, and compare files).

2) Key files / entry points (read these first)
- `pom.xml` — declares Java 17, dependencies (selenium, playwright, cucumber, junit, webdrivermanager, etc.), and surefire config. Important bits:
  - maven.compiler.source/target = 17
  - cucumber.version property
  - Surefire include pattern: `**/*test.java` (note lowercase `test` — naming matters)
- `src/test/java/Runner/runner.java` — JUnit Platform Suite that runs Cucumber features. Important annotations:
  - `@SelectClasspathResource("features")` (points at `src/test/resources/features`)
  - `@ConfigurationParameter(key = GLUE_PROPERTY_NAME, value = "steps")` — glue package is `steps`
  - `@ConfigurationParameter(key = FILTER_TAGS_PROPERTY_NAME, value = "@GG")` — by default this suite filters features by tag `@GG` unless overridden
- `src/test/resources/features/googleSearch.feature` — example feature used by steps
- `src/test/java/steps/MyStepdefs.java` — step definitions; uses `pages.pages` to interact with the browser
- `src/test/java/pages/pages.java` — page object (very small): constructs ChromeDriver via WebDriverManager in constructor, implements open(), GoogleSearchPage(...), validateFirstResult(...)
- `.github/actions/qa-helper/*` — Node action useful for CI: `action.yml`, `index.js`, and utils (`tagHandler.js`, `reportParser.js`, `fileCompare.js`). `tagHandler` emits a CLI `mvn test -Dcucumber.filter.tags=...` command.

3) Project-specific conventions and important gotchas
- Test runner/filenames: Surefire is configured to include `**/*test.java` (lowercase). Many files in the repo use lowercase class/file names (e.g. `runner.java`, `pages.java`) — when implementing new test classes match the include pattern or update surefire.
- Runner-enforced tag: `runner.java` sets `FILTER_TAGS_PROPERTY_NAME` to `@GG`. Running `mvn test` without overriding this will only run features with `@GG`. To run other tags, pass a property or run the GitHub action helper's command.
- Two different tag override approaches exist:
  - Maven CLI: `mvn test -Dcucumber.filter.tags="@smoke"`
  - The project's custom action `tagHandler.js` emits `mvn test -Dcucumber.filter.tags="@smoke"`
- Dependency vs usage mismatch: Playwright is declared but not used in tests. H2, Apache POI and many other libraries are present — expect large dependency downloads. Take care in CI to allow time for Maven to fetch artifacts.
- Cucumber PicoContainer is in pom but step definitions are constructed manually (new pages()). So dependency injection via PicoContainer is not currently relied upon.
- Browser handling pattern: `pages.pages` opens ChromeDriver in its constructor and closes the driver in validateFirstResult(). Agents modifying tests should centralize driver lifecycle (setup/teardown) rather than scattering construction/close in page methods.
- Naming and casing: Several classes are lowercased (`prime`, `pages`, `runner`). Java convention isn't followed strictly — an agent should not assume conventional capitalization when locating classes.

4) Developer workflows (build, run, debug)
- Build & run tests (default):
  - mvn test
  - This runs the JUnit Platform suite `Runner.runner`, which runs Cucumber features from `src/test/resources/features`.
- Run with tag filtering (example):
  - mvn test -Dcucumber.filter.tags="@smoke"  (or other tag)
- The project's action helper also expects inputs and can output a recommended test command: see `.github/actions/qa-helper/utils/tagHandler.js`.
- Running a single suite class from IDE: run `Runner.runner` (class contains @Suite). In IntelliJ, Run 'runner' (it is a JUnit Platform suite).
- Debugging: `src/main/java/com/githubActions/Main.java` is a trivial program included by the scaffold — useful as a quick run target in IDE, but not part of tests.

5) Integration points / external dependencies
- ChromeDriver: created by `pages.pages` using WebDriverManager (downloads drivers automatically). CI jobs must allow outbound download or cache drivers.
- GitHub Action `.github/actions/qa-helper`: Node 20 runtime (action.yml) — the action's package.json looks malformed; exercise caution before publishing. The action is used primarily to compute test commands and compare files.
- Test reports: runner config emits multiple report formats via `PLUGIN_PROPERTY_NAME` in `runner.java` (pretty, html:target/cucumber-report.html, json:target/cucumber.json, junit:target/cucumber-reports.xml). Agents can parse `target/cucumber.json` with the action's `reportParser`.

6) Concrete examples an agent should follow when editing or adding code
- When adding a new Cucumber step glue class, place it in package `steps` and ensure `runner.java` GLUE property still points to `steps`.
- To add a new feature, put it under `src/test/resources/features` and tag it if you want it picked up by default (default tag is `@GG`). Example feature present: `googleSearch.feature`.
- To change which tags run by default, update the FILTER_TAGS_PROPERTY_NAME in `src/test/java/Runner/runner.java` or rely on CLI property `-Dcucumber.filter.tags=...`.
- If you modify browser automation, prefer to centralize WebDriver setup/teardown (e.g., JUnit @BeforeAll/@AfterAll or Cucumber hooks) rather than constructing WebDriver in page object constructors.

7) Safety & performance notes
- Large dependencies (Playwright, POI, H2) will increase CI setup time. Consider caching ~/.m2/repository or limiting installed dependencies in CI.
- The repository includes a packaged GitHub Action directory — running or publishing it without fixing `package.json` may fail.

8) Quick checklist for common agent tasks
- To run tests locally: `mvn test`
- To run a specific tag: `mvn test -Dcucumber.filter.tags="@smoke"`
- To inspect the CI helper action: open `.github/actions/qa-helper/index.js` and utils/*.js
- To add a step definition: add class to `src/test/java/steps`, keep package `steps` and signature annotations from `io.cucumber.java.en.*`

---
References (read these files first):
- pom.xml
- src/test/java/Runner/runner.java
- src/test/java/steps/MyStepdefs.java
- src/test/java/pages/pages.java
- src/test/resources/features/googleSearch.feature
- .github/actions/qa-helper/*

End of AGENTS.md

