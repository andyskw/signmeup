# signmeup

While I was working on the project, I tried to constantly remind myself that it is
a great opportunity for myself to stretch my skills, and it is not just a test to
be done.

The result is probably more detailed than required, but I wanted to learn as much
as possible from this, this way it gave me alot even if the HR decides not to
move forward with me. :)

Anyway, I tried to collect all the required details for testing and running above.

## Prerequisites

A pre-installed node with npm, and bower is required to run the app and the test cases.


## Installation

To install all the dependencies, you just have to run the following commands:

      npm install
      bower install

## Running the app

The application can be run with a simple

      npm start


## Testing

I tried to be consistent here with the tools, hope it worked. :)

### Backend testing

Backend tests are built with the mocha - chai - sinon triumph, and can be run with
the following command:

     npm test

#### Coverage report

To generate a coverage report of the backend test cases, you can run istanbul:

     npm run test:backend:cover

Then you can open the coverage report:

     open coverage/lcov-report/index.html


### Frontend testing

Frontend test cases are build on karma - mocha - chai - sinon - ng-mocks, so that
it is consistent with the backend tests, and it's easier to maintain.

To start the test runner, you can say:

    npm run test:frontend


#### Frontend coverage report

Istanbul is also wired in for the frontend tests, so you can check the coverage report
for angular as well.

    open ./coverage/karma/report-html/index.html
