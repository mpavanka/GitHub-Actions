const core = require('@actions/core');

function handleTag(tag) {
  console.log(`Selected tag: ${tag}`);

  let command;

  switch (tag) {
    case '@smoke':
      command = 'mvn test -Dcucumber.filter.tags="@smoke"';
      break;

    case '@regression':
      command = 'mvn test -Dcucumber.filter.tags="@regression"';
      break;

    default:
      command = 'mvn test';
  }

  console.log(`Run command: ${command}`);
  core.setOutput("test_command", command);
}

module.exports = { handleTag };