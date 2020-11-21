# QA engineering challenge Part 1 Consent Notice Automated tests


## Tech Stack 
Platform Windows 10
IDE VS Code
E2E Tests Framework TestCafé
I chose to use TestCafé because it has a more extended browser coverage than cypress.io.

### Deliverables

The project delivered has 4 tests suites :
1- Load Consent Notice
2- Agree/Refuse Consent Notice
3- Close Consent Notice
4- Validate some Get/Post HTTP requests

### Prerequisites


## Specifications Tests Coverage
Specifications for creating an automate test suite that validates the correct behavior of the notice was :
1 Go to <https://www.didomi.io/>
2 Validate that the notice is present
3 Give consent by clicking on "Agree and Close"
4 Validate that the notice gets closed
5 Validate that an HTTP POST request is sent to `https://api.privacy-center.org/v1/events` with `type = consent.given`
6 Validate that the function `Didomi.getUserConsentStatusForAll()` (<https://developers.didomi.io/cmp/web-sdk/reference/api#getuserconsentstatusforall>) responds with the correct values

<table>
<th>
    <td>Covered Spec ID</td>
    <td>Test Fixture</td>
    <td>Test</td>
    <td>Description</td>
</th>
<tr>
    <td>1</td>
    <td>Consent Notice: Loading</td>
    <td>Validate Homepage Loading Consistency</td>
    <td>Description</td>
</tr>
<tr>
    <td>2</td>
    <td>Consent Notice: Loading</td>
    <td>Validate that notice is present</td>
    <td>Description</td>
</tr>
<tr>
    <td>3</td>
    <td>Consent Notice: Loading</td>
    <td>Validate Homepage launch after consent given</td>
    <td>Description</td>
</tr>
<tr>
    <td>4</td>
    <td>Consent Notice: Loading</td>
    <td>Validate Homepage launch after consent denied</td>
    <td>Description</td>
</tr>
<tr>
    <td>5</td>
    <td>Consent Notice: Consentments</td>
    <td>Give Consent</td>
    <td>Description</td>
</tr>
<tr>
    <td>6</td>
    <td>Consent Notice: Consentments</td>
    <td>Deny Consent</td>
    <td>Description</td>
</tr>
<tr>
    <td>7</td>
    <td>Consent Notice: Consentments</td>
    <td>Learn more and Give Consent</td>
    <td>Description</td>
</tr>
<tr>
    <td>8</td>
    <td>Consent Notice: Consentments</td>
    <td>Learn more and Deny Consent</td>
    <td>Description</td>
</tr>
<tr>
    <td>1</td>
    <td>Consent Notice: Closing</td>
    <td>Click Cross button</td>
    <td>Description</td>
</tr>
<tr>
    <td>1</td>
    <td>Consent Notice: Closing</td>
    <td>Close Notice after agreeing</td>
    <td>Description</td>
</tr>
<tr>
    <td>1</td>
    <td>Consent Notice: Closing</td>
    <td>Close Notice after denying</td>
    <td>Description</td>
</tr>
<tr>
    <td>5</td>
    <td>Consent Notice: HTTP Requests</td>
    <td>Validate POST request after agreeing</td>
    <td>Description</td>
</tr>
<tr>
    <td>6</td>
    <td>Consent Notice: HTTP Requests</td>
    <td>Validate POST request after denying</td>
    <td>Description</td>
</tr>
<tr>
    <td>7</td>
    <td>Consent Notice: HTTP Requests</td>
    <td>Validate Didomi.getUserConsentStatusForAll() response after agreeing</td>
    <td>Description</td>
</tr>
<tr>
    <td>8</td>
    <td>Consent Notice: HTTP Requests</td>
    <td>Validate Didomi.getUserConsentStatusForAll() response after denying</td>
    <td>Description</td>
</tr>
</table>


