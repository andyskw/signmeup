"use strict"

var moment = require("moment");
var validator = require("validator");

var CONST_ISSUE_TYPES = {
  MISSING: "MISSING",
  INVALID: "INVALID"
};

function SignupRequestValidator() {
  return {
    issues: CONST_ISSUE_TYPES,
    validateRequest: validateRequest
  };
}

module.exports = SignupRequestValidator;



function validateRequest(data) {
  //Check if all the required fields are there
  var issues = [];
  if (!data.name) {
    issues.push(new RequestIssue("name", CONST_ISSUE_TYPES.MISSING));
  }
  if (!data.email) {
    issues.push(new RequestIssue("email", CONST_ISSUE_TYPES.MISSING));
  }
  if (!data.birthdate) {
    issues.push(new RequestIssue("birthdate", CONST_ISSUE_TYPES.MISSING));
  }

  //validate e-mail address:
  if (data.email && !validator.isEmail(data.email)) {
    issues.push(new RequestIssue("email", CONST_ISSUE_TYPES.INVALID));
  }

  //validate if age is > 18 ?
  if (data.birthdate) {
    var age = moment().diff(data.birthdate, 'years');
    if (age < 18) {
      issues.push(new RequestIssue("birthdate", CONST_ISSUE_TYPES.INVALID));
    }
  }

  return new ValidateResultBuilder().build(issues);
}

function RequestIssue(field, issue) {
  return {
    field: field,
    issue: issue
  };
};

function ValidateResultBuilder() {
  return {
    build: function(issues) {
      if (issues.length == 0) {
        return {
          isValid: true
        };
      } else {
        return {
          isValid: false,
          issues: issues
        };
      }
    }
  }

}
