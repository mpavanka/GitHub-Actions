const core = require('@actions/core');

const { handleTag } = require('./utils/tagHandler');
const { parseReport } = require('./utils/reportParser');
const { compareFiles } = require('./utils/fileCompare');

try {
  const tag = core.getInput('tag');
  const reportPath = core.getInput('report_path');
  const file1 = core.getInput('file1');
  const file2 = core.getInput('file2');

//  if (tag) {
//    handleTag(tag);
//  }
//
//  if (reportPath) {
//    parseReport(reportPath);
//  }

  if (file1 && file2) {
    compareFiles(file1, file2);
  }

} catch (err) {
  core.setFailed(err.message);
}