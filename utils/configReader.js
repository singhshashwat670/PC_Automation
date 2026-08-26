const fs = require('fs');
const path = require('path');

function readJson(relativePath) {
  const filePath = path.join(process.cwd(), relativePath);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

/*function getEnvConfig() {
  const env = process.env.TEST_ENV || 'stage';
  return readJson(`test-data/env/${env}.json`);
}
  */

function getEnvConfig() {
  let env = process.env.TEST_ENV;


let filePath;

  if (env === 'stage') {
    console.log('Running on STAGE environment');
    filePath = 'test-data/env/stage.json';

  } else if (env === 'preprod') {
    console.log('Running on PREPROD environment');
    filePath = 'test-data/env/preprod.json';

  } else {
    console.log('Running on TEST environment (default)');
    filePath = 'test-data/env/test.json';
  }

  return readJson(filePath);
}

function getUsers() {
  return readJson('test-data/users.json');
}

function getPackageData() {
  return readJson('test-data/packageData.json');
}

function getStudentData() {
  return readJson('test-data/studentData.json');
}

module.exports = {
  readJson,
  getEnvConfig,
  getUsers,
  getPackageData,
  getStudentData
};