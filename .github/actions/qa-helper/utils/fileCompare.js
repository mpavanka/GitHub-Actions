const fs = require('fs');
const core = require('@actions/core');

function compareFiles(file1, file2) {
  const f1 = fs.readFileSync(file1, 'utf8').split('\n');
  const f2 = fs.readFileSync(file2, 'utf8').split('\n');

  let differences = [];

  const maxLength = Math.max(f1.length, f2.length);

  for (let i = 0; i < maxLength; i++) {
    if (f1[i] !== f2[i]) {
      differences.push({
        line: i + 1,
        file1: f1[i] || '',
        file2: f2[i] || ''
      });
    }
  }

  if (differences.length === 0) {
    console.log("✅ Files are identical");
    return;
  }

  console.log("❌ Differences found:\n");

  differences.forEach(diff => {
    console.log(`Line ${diff.line}`);
    console.log(`File1: ${diff.file1}`);
    console.log(`File2: ${diff.file2}`);
    console.log('----------------------');
  });

  core.setFailed(`Files differ at ${differences.length} places`);
}

module.exports = { compareFiles };