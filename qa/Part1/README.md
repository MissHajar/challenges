# QA engineering challenge Part 1 Consent Notice Automated tests


## Tech Stack 

* Platform: Windows 10
* IDE: Visual Studio Code
* E2E Tests Framework: TestCafé

I chose to use TestCafé because it has a more extended browsers coverage than cypress.io.

### Deliverables

The project delivered has 4 tests suites :
1. Load Consent Notice
2. Agree/Refuse Consent Notice
3. Close Consent Notice
4. Validate some Get/Post HTTP requests

## Specifications Tests Coverage Matrix
Specifications for creating an automate test suite that validates the correct behavior of the notice was :
1. Go to <https://www.didomi.io/>
2. Validate that the notice is present
3. Give consent by clicking on "Agree and Close"
4. Validate that the notice gets closed
5. Validate that an HTTP POST request is sent to `https://api.privacy-center.org/v1/events` with `type = consent.given`
6. Validate that the function `Didomi.getUserConsentStatusForAll()` (<https://developers.didomi.io/cmp/web-sdk/reference/api#getuserconsentstatusforall>) responds with the correct values

<table>
<th>
    <td>Covered Spec ID</td>
    <td>Test Fixture</td>
    <td>Test</td>
    <td>Description</td>
</th>
<tr>
    <td></td>
    <td>1</td>
    <td>Consent Notice: Loading</td>
    <td>Validate Homepage Loading Consistency</td>
    <td>Check page load status and method, Validate redirect to local FR /EN according to browser language, Check Local Cookies.count = 0</td>
</tr>
<tr>
    <td></td>
    <td>2</td>
    <td>Consent Notice: Loading</td>
    <td>Validate that notice is present</td>
    <td>Validate that the notice is present and all buttons are displayed : "Learn More", "Decline", "Agree and close"</td>
</tr>
<tr>
    <td></td>
    <td>1, 3, 4</td>
    <td>Consent Notice: Loading</td>
    <td>Validate Homepage launch after consent given</td>
    <td>Give consent and reload page to check Notice isn't displayed anymore</td>
</tr>
<tr>
    <td></td>
    <td>1, 3, 4</td>
    <td>Consent Notice: Loading</td>
    <td>Validate Homepage launch after consent denied</td>
    <td>Decline consent and reload page to check Notice isn't displayed anymore</td>
</tr>
<tr>
    <td></td>
    <td>3, 4</td>
    <td>Consent Notice: Consentments</td>
    <td>Give Consent</td>
    <td>Give consent by clicking "Agree and Close" and "Return To Homepage"</td>
</tr>
<tr>
    <td></td>
    <td>3, 4</td>
    <td>Consent Notice: Consentments</td>
    <td>Deny Consent</td>
    <td>Decline consent by clicking "Decline" and "Return To Homepage"</td>
</tr>
<tr>
    <td></td>
    <td>3, 4</td>
    <td>Consent Notice: Consentments</td>
    <td>Learn more and Give Consent</td>
    <td>Give consent by clicking "Learn more" and "Agree to all</td>
</tr>
<tr>
    <td></td>
    <td>3, 4</td>
    <td>Consent Notice: Consentments</td>
    <td>Learn more and Deny Consent</td>
    <td>Decline consent by clicking "Learn more" and "Disagree to all"</td>
</tr>
<tr>
    <td></td>
    <td>4</td>
    <td>Consent Notice: Closing</td>
    <td>Click Cross button</td>
    <td>Close Notice by clicking twice the "X" button, Check that the Notice isn't displayed anymore</td>
</tr>
<tr>
    <td></td>
    <td>3, 4</td>
    <td>Consent Notice: Closing</td>
    <td>Close Notice after agreeing</td>
    <td>Close Notice giving consent, Check that the Notice isn't displayed anymore</td>
</tr>
<tr>
    <td></td>
    <td>3, 4</td>
    <td>Consent Notice: Closing</td>
    <td>Close Notice after denying</td>
    <td>Close Notice declining consent, Check that the Notice isn't displayed anymore</td>
</tr>
<tr>
    <td></td>
    <td>3, 4, 5</td>
    <td>Consent Notice: HTTP Requests</td>
    <td>Validate POST request after agreeing</td>
    <td>Check that request logger filtered for https://api.privacy-center.org/v1/events with type = consent.given isn't empty</td>
</tr>
<tr>
    <td></td>
    <td>3, 4, 5</td>
    <td>Consent Notice: HTTP Requests</td>
    <td>Validate POST request after denying</td>
    <td>Check that request logger filtered for https://api.privacy-center.org/v1/events with type = pageview isn't empty</td>
</tr>
<tr>
    <td></td>
    <td>3, 4, 6</td>
    <td>Consent Notice: HTTP Requests</td>
    <td>Validate Didomi.getUserConsentStatusForAll() response after agreeing</td>
    <td>Get the Didomi object to call User Content Status, and check that purposes and vendors are enabled</td>
</tr>
<tr>
    <td></td>
    <td>3, 4, 6</td>
    <td>Consent Notice: HTTP Requests</td>
    <td>Validate Didomi.getUserConsentStatusForAll() response after denying</td>
    <td>Get the Didomi object to call User Content Status, and check that purposes and vendors are enabled</td>
</tr>
</table>


## Browser / Mobile Device Tests Coverage

Browsers:
* Chrome
* Firefox
* Edge
* Opera
* Edge-legacy
* IE
* Safari


Mobile Device (chrome:emulated):
* iPhoneX, iPhone 5, iPhone6/7/8, iPhone6/7/8Plus
* Galaxy Fold, Galaxy S5, Nexus 6, Nexus 10

Tablet:
* iPad, iPad Pro

## Run tests
### Prerequisites


### Usage

* Shell Script

* Gulp

* VS Code
