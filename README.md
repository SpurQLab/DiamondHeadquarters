# OrangeHRM Test Automation Framework

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Java](https://img.shields.io/badge/Java-21-orange.svg)]()
[![Playwright](https://img.shields.io/badge/Playwright-1.48.0-blue.svg)]()
[![Cucumber](https://img.shields.io/badge/Cucumber-7.18.1-green.svg)]()
[![TestNG](https://img.shields.io/badge/TestNG-7.10.2-red.svg)]()

A comprehensive test automation framework for OrangeHRM using **Java 21**, **Playwright**, **Cucumber BDD**, and **TestNG**, with full integration to **SpurQuality Test Management** system.

## 🎯 Features

- ✅ **BDD Approach** - Cucumber with Gherkin for business-readable test scenarios
- ✅ **Page Object Model** - Maintainable and reusable page objects
- ✅ **Playwright Integration** - Modern browser automation with Java
- ✅ **Data-Driven Testing** - Externalized test data in JSON format
- ✅ **TestNG Runner** - Parallel execution and comprehensive reporting
- ✅ **SpurQuality Integration** - Automated test management and traceability
- ✅ **Playwright MCP Scripts** - Standalone automation scripts for rapid prototyping
- ✅ **Screenshot Capture** - Automatic evidence collection on test execution
- ✅ **Multi-Browser Support** - Chromium, Firefox, WebKit

## 📁 Project Structure

```
orangehrm-automation-framework/
├── .github/                    # GitHub workflows and copilot instructions
├── requirements/               # User stories and acceptance criteria
├── test-cases/                 # Test case documentation
├── test-executions/           # Execution results and screenshots
├── test-plans/                # Test plan documentation
├── src/
│   └── test/
│       ├── java/
│       │   └── com/spurqlabs/
│       │       ├── pages/     # Page Object Models
│       │       ├── steps/     # Cucumber Step Definitions
│       │       ├── tests/     # TestNG Runners
│       │       └── utils/     # Utility classes
│       └── resources/
│           ├── features/      # Gherkin feature files
│           ├── data/          # Test data (JSON)
│           └── config.json    # Framework configuration
├── pom.xml                    # Maven dependencies
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites

- **Java 21** or higher
- **Maven 3.6+**
- **Git**
- **Node.js** (optional, for MCP scripts)

### Installation

```bash
# Clone the repository
git clone https://github.com/sgarud-spurqlabs/AI-automation-framework.git
cd AI-automation-framework

# Install dependencies (Maven will download Playwright automatically)
mvn clean install
```

### Running Tests

```bash
# Run all smoke tests
mvn test

# Run specific tag
mvn test -Dcucumber.filter.tags="@ORNG-ST-009"

# Run with specific browser
mvn test -Dbrowser=firefox

# Run in headless mode
mvn test -Dheadless=true
```

### Configuration

Edit `src/test/resources/config.json`:

```json
{
  "baseUrl": "https://opensource-demo.orangehrmlive.com",
  "timeout": 30000,
  "headless": false,
  "slowMo": 100,
  "browser": "chromium"
}
```

## 📊 Test Reports

After test execution, reports are generated in:

- **Cucumber HTML Report**: `target/cucumber-reports/cucumber.html`
- **TestNG Report**: `target/surefire-reports/index.html`
- **JSON Results**: `target/cucumber-reports/cucumber.json`
- **Screenshots**: `test-executions/screenshots/`

Open the HTML reports in your browser:

```bash
# Windows
start target/cucumber-reports/cucumber.html

# Mac/Linux
open target/cucumber-reports/cucumber.html
```

## 🧪 Test Coverage

### Current Stories Automated

| Story ID | Feature | Scenarios | Status |
|----------|---------|-----------|--------|
| ORNG-ST-009 | Add Employee | 6 | ✅ Complete |

### Test Scenarios

1. **Add Employee with all fields** - Positive test
2. **Add Employee with minimum fields** - Positive test
3. **Add Employee with custom ID** - Positive test
4. **Validation - No First Name** - Negative test
5. **Validation - No Last Name** - Negative test
6. **Cancel employee creation** - Cancel flow test

## 🏗️ Framework Architecture

### Page Object Model (POM)

All page interactions are encapsulated in reusable page classes:

```java
public class AddEmployeePage {
    public void navigateToPIM() { ... }
    public void fillEmployeeDetails(...) { ... }
    public void clickSave() { ... }
    public boolean isSuccessMessageDisplayed() { ... }
}
```

### Step Definitions

Cucumber steps map Gherkin to page object methods:

```java
@When("I enter the following employee details:")
public void iEnterTheFollowingEmployeeDetails(DataTable dataTable) {
    // Implementation using AddEmployeePage
}
```

### Test Data Management

All test data is externalized in JSON files:

```json
{
  "newEmployee": {
    "firstName": "John",
    "lastName": "Doe",
    "employeeId": "AUTO"
  }
}
```

## 🔧 Technologies Used

| Component | Technology | Version |
|-----------|-----------|---------|
| Language | Java | 21 |
| Browser Automation | Playwright | 1.48.0 |
| BDD Framework | Cucumber | 7.18.1 |
| Test Runner | TestNG | 7.10.2 |
| Build Tool | Maven | 3.x |
| Data Format | JSON | Gson 2.11.0 |

## 🧩 SpurQuality Integration

This framework is fully integrated with **SpurQuality Test Management**:

- ✅ Story retrieval from test management system
- ✅ Automated test case creation from feature files
- ✅ Test execution results upload
- ✅ Requirement traceability
- ✅ Test plan management

### SpurQuality Commands

```bash
# Retrieve story details
# Uses MCP: mcp_spurquality_m_getStoryDetails

# Create test cases from feature file
# Uses: createTestCaseFromFile

# Upload execution results
# Uses: createAutomationExecution
```

## 📝 Writing New Tests

### 1. Create a Feature File

```gherkin
# src/test/resources/features/my-feature.feature
@smoke @my-feature
Feature: My Feature
  
  Scenario: My scenario
    Given I am logged in
    When I perform an action
    Then I should see expected result
```

### 2. Create Page Object

```java
// src/test/java/com/spurqlabs/pages/MyPage.java
public class MyPage {
    private final Page page;
    
    public MyPage(Page page) {
        this.page = page;
    }
    
    public void performAction() {
        page.click("button");
    }
}
```

### 3. Create Step Definitions

```java
// src/test/java/com/spurqlabs/steps/MySteps.java
public class MySteps {
    @When("I perform an action")
    public void iPerformAnAction() {
        myPage.performAction();
    }
}
```

### 4. Run Your Tests

```bash
mvn test -Dcucumber.filter.tags="@my-feature"
```

## 🐛 Debugging

### Enable Debug Mode

```bash
# Run with debug logs
mvn test -X

# Run specific scenario with line number
mvn test -Dcucumber.options="src/test/resources/features/my-feature.feature:10"
```

### Common Issues

**Issue**: Tests failing due to timeout
- **Solution**: Increase timeout in `config.json`

**Issue**: Element not found
- **Solution**: Update locators in Page Object classes

**Issue**: Login failures
- **Solution**: Verify credentials in `src/test/resources/data/loginData.json`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **SpurQuality Labs** - Test Automation Framework

## 📞 Support

For questions or issues:
- Review documentation in `.github/copilot-instructions.md`
- Check SpurQuality guidelines in `.spurquality.instructions.md`
- Open an issue in the GitHub repository

## 🎓 Additional Resources

- [Playwright Java Documentation](https://playwright.dev/java/docs/intro)
- [Cucumber Documentation](https://cucumber.io/docs/cucumber/)
- [TestNG Documentation](https://testng.org/doc/documentation-main.html)
- [SpurQuality Test Management](https://spurqlabs.com)

---

**Last Updated**: December 13, 2025  
**Framework Version**: 1.0.0  
**Status**: ✅ Production Ready
