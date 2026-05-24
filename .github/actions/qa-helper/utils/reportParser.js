const fs = require('fs');
const core = require('@actions/core');

function parseReport(path) {
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));

  let passed = 0;
  let failed = 0;

  data.forEach(test => {
    if (test.status === 'passed') passed++;
    else failed++;
  });

  const summary = `✅ Passed: ${passed}, ❌ Failed: ${failed}`;

  console.log(summary);
  core.setOutput("report_summary", summary);

  if (failed > 0) {
    core.setFailed("Some tests failed");
  }
}

module.exports = { parseReport };