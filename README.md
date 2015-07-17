# signmeup


## Design decisions

 * birthdate is not mandatory

## Testing

### Backend test cases

Backend tests are built with the mocha-chai-sinon triumph, and can be run with
the following command:

     npm test

### Coverage report

To generate a coverage report of the test cases, you can run istanbul with the following
command:

     ./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha

Then you can open the coverage report:

     open coverage/lcov-report/index.html
