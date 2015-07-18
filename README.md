# signmeup


## Design decisions

 * birthdate is not mandatory

## Testing

### Backend test coverage

Backend tests are built with the mocha - chai - sinon triumph, and can be run with
the following command:

     npm test

#### Coverage report

To generate a coverage report of the test cases, you can run istanbul with the following
command:

     ./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha

Then you can open the coverage report:

     open coverage/lcov-report/index.html


### Frontend test cases

Frontend test cases are build on karma - mocha - chai - sinon - ng-mocks, so that
it is consistent with the backend, and it's easier to maintain.

To start the test runner, you can say:

    ./node_modules/.bin/karma start


### Frontend test coverage

Istanbul is also wired in for the frontend, so you can check the coverage report
for angular as well.

    open ./coverage/karma/report-html/index.html
