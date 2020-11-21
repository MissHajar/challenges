# QA engineering challenge Part 1 Consent Notice Automated tests

<br />
## Tech Stack 
<br />
* Platform: Windows 10
* IDE: Visual Studio Code
* E2E Tests Framework: TestCafé
<br />
I used protractor long ago, but I'm eager to have new technical skills, so I had to choose between TestCafé and cypress.io.
I've chosen TestCafé not only because I love coffee but also because it has a more extended browsers coverage than cypress.io.
TestCafe also :
* handles well Flakiness thanks to his wait mechanisms for assertions and selectors
* has a Parallel Mode and Headless Mode
* has a CI compatibility with Jenkins, Teamcity, Travis, GitHub Actions …
<br />
This page also helped me decide :
https://js.libhunt.com/compare-testcafe-vs-protractor

<br />
I encountered some difficulties when I wanted to close the window to reload it. It seemed it's a known limitation.
https://devexpress.github.io/testcafe/documentation/guides/advanced-guides/multiple-browser-windows.html
<br />

### Deliverables
<br />
The project delivered has 4 tests suites (e2e_tests directory):
1. Load Consent Notice
2. Agree/Decline Consent Notice
3. Close Consent Notice
4. Validate some Get/Post HTTP requests
<br />
## Specifications Tests Coverage Matrix
<br />

Specifications for creating an automated tests suites that validate the correct behavior of the notice was :
1. Go to <https://www.didomi.io/>
2. Validate that the notice is present
3. Give consent by clicking on "Agree and Close"
4. Validate that the notice gets closed
5. Validate that an HTTP POST request is sent to `https://api.privacy-center.org/v1/events` with `type = consent.given`
6. Validate that the function `Didomi.getUserConsentStatusForAll()` (<https://developers.didomi.io/cmp/web-sdk/reference/api#getuserconsentstatusforall>) responds with the correct values
<br /><br />
<table>
<th>
    <td>Covered Spec ID</td>
    <td>Test Fixture</td>
    <td>Test</td>
    <td>Description</td>
</th>
<tr>
    <td>1</td>
    <td>1</td>
    <td>Loading</td>
    <td>Validate Homepage Loading Consistency</td>
    <td>Check page load status and method, Validate redirect to local FR /EN according to browser language, Check Local Cookies.count = 0</td>
</tr>
<tr>
    <td>2</td>
    <td>2</td>
    <td>Loading</td>
    <td>Validate that notice is present</td>
    <td>Validate that the notice is present and all buttons are displayed : "Learn More", "Decline", "Agree and close"</td>
</tr>
<tr>
    <td>3</td>
    <td>1, 3, 4</td>
    <td>Loading</td>
    <td>Validate Homepage launch after consent given</td>
    <td>Give consent and reload page to check Notice isn't displayed anymore</td>
</tr>
<tr>
    <td>4</td>
    <td>1, 3, 4</td>
    <td>Loading</td>
    <td>Validate Homepage launch after consent denied</td>
    <td>Decline consent and reload page to check Notice isn't displayed anymore</td>
</tr>
<tr>
    <td>5</td>
    <td>3, 4</td>
    <td>Consentments</td>
    <td>Give Consent</td>
    <td>Give consent by clicking "Agree and Close" and "Return To Homepage"</td>
</tr>
<tr>
    <td>6</td>
    <td>3, 4</td>
    <td>Consentments</td>
    <td>Deny Consent</td>
    <td>Decline consent by clicking "Decline" and "Return To Homepage"</td>
</tr>
<tr>
    <td>7</td>
    <td>3, 4</td>
    <td>Consentments</td>
    <td>Learn more and Give Consent</td>
    <td>Give consent by clicking "Learn more" and "Agree to all</td>
</tr>
<tr>
    <td>8</td>
    <td>3, 4</td>
    <td>Consentments</td>
    <td>Learn more and Deny Consent</td>
    <td>Decline consent by clicking "Learn more" and "Disagree to all"</td>
</tr>
<tr>
    <td>9</td>
    <td>4</td>
    <td>Closing</td>
    <td>Click Cross button</td>
    <td>Close Notice by clicking twice the "X" button, Check that the Notice isn't displayed anymore</td>
</tr>
<tr>
    <td>10</td>
    <td>3, 4</td>
    <td>Closing</td>
    <td>Close Notice after agreeing</td>
    <td>Close Notice giving consent, Check that the Notice isn't displayed anymore</td>
</tr>
<tr>
    <td>11</td>
    <td>3, 4</td>
    <td>Closing</td>
    <td>Close Notice after denying</td>
    <td>Close Notice declining consent, Check that the Notice isn't displayed anymore</td>
</tr>
<tr>
    <td>12</td>
    <td>3, 4, 5</td>
    <td>HTTP Requests</td>
    <td>Validate POST request after agreeing</td>
    <td>Check that request logger filtered for https://api.privacy-center.org/v1/events with type = consent.given isn't empty</td>
</tr>
<tr>
    <td>13</td>
    <td>3, 4, 5</td>
    <td>HTTP Requests</td>
    <td>Validate POST request after denying</td>
    <td>Check that request logger filtered for https://api.privacy-center.org/v1/events with type = pageview isn't empty</td>
</tr>
<tr>
    <td>14</td>
    <td>3, 4, 6</td>
    <td>HTTP Requests</td>
    <td>Validate Didomi.getUserConsentStatusForAll() response after agreeing</td>
    <td>Get the Didomi object to call User Content Status, and check that purposes and vendors are enabled</td>
</tr>
<tr>
    <td>15</td>
    <td>3, 4, 6</td>
    <td>HTTP Requests</td>
    <td>Validate Didomi.getUserConsentStatusForAll() response after denying</td>
    <td>Get the Didomi object to call User Content Status, and check that purposes and vendors are enabled</td>
</tr>
</table>
<br /><br />

## Browser / Mobile Device Tests Coverage
<br />

Browsers:
* Chrome
* Firefox
* Edge
* Opera
* Edge-legacy
* IE
* Safari

<br />

Mobile Device (chrome:emulated):
* iPhoneX, 
* iPhone 5, iPhone6/7/8, iPhone6/7/8Plus: only in gulp
* Galaxy Fold, Galaxy S5, Nexus 6, Nexus 10: only in gulp

<br />

Tablet (chrome:emulated):
* iPad, iPad Pro (only in gulp)

<br />

## Run tests
<br />

### Prerequisites
<br />


<br />

### Usage
<br />

#### Shell Script
<br />
In a terminal, go to the project directory and execute:
```
./TestAllBrowsers.sh
```
<br />
This will call testcafe command for each browser and create separate reports for each such as edge.html, firefox.html,....
Can take some time especially because of some browsers such as safari and ie that may cause Testcafe failure.

<br />

#### Gulp
<br />

1. In a terminal, go to the project directory and execute:
```
gulp runAllTests
```

This will call testcafe command for every browsers and mobile devices. It generates:
  *  headlessReport.html : browsers runned in headless mode
  *  Report.html : browsers 
  *  appleReport.html : Apple devices
  *  androidReport.html : Android Devices

2. To run only for desktop,
```
gulp runDesktopTests
```
3. To run only for mobile,
```
gulp runMobileTests
```
4. Other gulp tasks are available:
```
gulp --tasks
```
Linter, Minifier, Transpiler ...

<br />

#### VS Code
<br />
Get VS code TestCafe extension.