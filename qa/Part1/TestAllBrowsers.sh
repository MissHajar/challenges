#!/bin/bash
var=$(date +"%FORMAT_STRING")
today=$(date +"%Y-%m-%d")
curr_time=`date +"%H-%M-%S"`
testcafe firefox:headless e2e_tests/* -r st-html:reports/${today}/firefox-${curr_time}.html 
testcafe edge:headless e2e_tests/* -r st-html:reports/${today}/edge-${curr_time}.html 
testcafe chrome:headless e2e_tests/* -r st-html:reports/${today}/chrome-${curr_time}.html 
testcafe opera:headless e2e_tests/* -r st-html:reports/${today}/opera-${curr_time}.html
testcafe edge-legacy:headless e2e_tests/* -r st-html:reports/${today}/edgelegacy-${curr_time}.html --skip-js-errors 
testcafe ie:headless e2e_tests/* -r st-html:reports/${today}/ie-${curr_time}.html --speed 0.1
testcafe safari:headless e2e_tests/* -r st-html:reports/${today}/safari-${curr_time}.html --speed 0.1
testcafe chrome:emulation:device=iphoneX e2e_tests/* -r st-html:reports/${today}/emulatedIphoneX-${curr_time}.html
# -s takeOnFails=true -s pathPattern=reports/screenshots/test-${TEST_INDEX}/${USERAGENT}/${FILE_INDEX}.png
