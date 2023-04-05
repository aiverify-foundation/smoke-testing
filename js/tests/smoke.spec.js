import { test, expect, chromium } from '@playwright/test';
import { MongoClient, ObjectId } from 'mongodb'

const uri =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1";
const mongoClient = new MongoClient(uri)
const database = mongoClient.db('aiverify')
const projects = database.collection('projecttemplatemodels');

test.use({
  ignoreHTTPSErrors: true
});

test('test', async () => {

  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: "./test-results"
    }
  })

  let randomNum = Math.random();

  const page = await context.newPage();
  const projectName = 'Project ' + randomNum
  const projectDescription = 'Project 1'
  const reportTitle = 'Report for Project 1'
  const companyName = 'Reporters'

  await page.goto('http://localhost:3000/home');

  // Add Dataset & Model
  await page.getByText('Models & Data').click();
  await page.getByText('Datasets').click();
  await page.getByRole('button', { name: 'New Dataset +' }).click();
  await page.getByText('Click to Browse').click();
  await page.locator("input[name='file']").setInputFiles('/home/benflop/GitLab/end-to-end-testing/js/fixtures/pickle_pandas_tabular_loan_testing.sav');
  await page.getByRole('button', { name: 'Upload selected files >' }).click();
  await page.getByRole('button', { name: 'Back to all Datasets >' }).click();
  await page.locator('.MuiButtonBase-root').first().click();
  await page.getByTestId('open-model-list-button').locator('div').filter({ hasText: 'AI Models' }).locator('div').click();
  await page.getByRole('button', { name: 'New Model +' }).click();
  await page.getByRole('button', { name: 'upload' }).click();
  await page.getByRole('button', { name: 'Next >' }).click();
  await page.getByText('Click to Browse').click();
  await page.locator("input[name='file']").setInputFiles('/home/benflop/GitLab/end-to-end-testing/js/fixtures/pickle_scikit_multiclasslr_loan.sav');
  await page.getByRole('button', { name: 'Upload selected files >' }).click();
  await page.getByRole('button', { name: 'Back to all Models >' }).click();
  await page.getByText('pickle_scikit_multiclasslr_loan_1.sav').click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'Classification' }).click();
  await page.getByRole('button', { name: 'Save & Close' }).click();
  await page.getByTestId('HomeIcon').click();

  // Create a project
  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Test an AI Model and generate reports').click();
  await page.getByPlaceholder('Enter Project Name').click();
  await page.getByPlaceholder('Enter Project Name').fill(projectName);
  await page.getByPlaceholder('Enter Project Description').click();
  await page.getByPlaceholder('Enter Project Description').fill(projectDescription);
  await page.getByTestId('input-report-title').click();
  await page.getByPlaceholder('Enter Report Title').fill(reportTitle);
  await page.getByPlaceholder('Enter Company Name').click();
  await page.getByPlaceholder('Enter Company Name').fill(companyName);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByText('Use a blank canvas').click();

  // Configure Global Variables
  console.log('Configure Global Variables')
  await page.getByRole('button', { name: 'Configure Global Variables' }).click();
  await page.getByRole('button', { name: 'Add Variable' }).click();
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().fill('20');
  await page.getByRole('textbox').first().press('Tab');
  await page.getByRole('textbox').nth(1).fill('20');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.locator('.react-grid-layout').click();

  // Add a page
  // console.log('Add a page')
  // await page.getByRole('button', { name: 'Add Page' }).click();
  // await page.getByText('Next').click();

  // Drag FMT
  console.log('Drag FMT')
  await page.getByRole('button', { name: 'Widgets Add More' }).click();
  await page.locator('div.droppable-element.MuiBox-root.mui-style-kpdj7g').filter({ hasText: 'Chart for False Discovery Rate metric' }).dragTo(page.locator('div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation3.mui-style-ye2xmv-MuiPaper-root'));
  await page.locator('.react-grid-layout').click()
  await page.getByText('Next').click();

  // Input Blocks & Technical Test
  console.log('Input Blocks & Technical Test')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('pickle_pandas_tabular_loan_testing_1.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('pickle_pandas_tabular_loan_testing_1.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'Interest_Rate' }).click();
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('pickle_scikit_multiclasslr_loan_1.sav').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByRole('button', { name: 'Open' }).first().click();
  await page.getByRole('button', { name: 'Add Item' }).click();
  await page.getByLabel('sensitive_feature-0 *').click();
  await page.getByLabel('sensitive_feature-0 *').fill('Gender');
  await page.getByRole('button', { name: 'Add Item' }).click();
  await page.getByLabel('sensitive_feature-1 *').click();
  await page.getByLabel('sensitive_feature-1 *').fill('Home_Owner');
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Generate Report' }).click();
  await page.getByRole('button', { name: 'Start Report Generation' }).click();
  await page.waitForURL('http://localhost:3000/reportStatus/*');
  await page.getByRole('button', { name: 'View Report' }).click();
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('link', { name: 'Save' }).click()
  ]);

  // Get Project Info directly from MongoDB
  console.log('Asserting Values')
  const projectInfoObj = await projects.find({}).sort({ _id: -1 }).limit(1).toArray();

  // Assert Project Info
  expect(projectInfoObj[0].projectInfo.name).toBe(projectName)
  expect(projectInfoObj[0].projectInfo.description).toBe(projectDescription)
  expect(projectInfoObj[0].projectInfo.reportTitle).toBe(reportTitle)
  expect(projectInfoObj[0].projectInfo.company).toBe(companyName)
  expect(projectInfoObj[0].pages).toBeNull

  // Get Project ID
  const projectId = projectInfoObj[0]._id

  // Assert Global Variables
  expect(projectInfoObj[0].globalVars[0].key).toBe('20')
  expect(projectInfoObj[0].globalVars[0].value).toBe('20')

  await page.getByTestId('HomeIcon').locator('path').click();

  // View Report
  console.log('View Report')
  await page.getByText(projectName).click()
  // await page.locator('div:nth-child(18) > .MuiPaper-root > div:nth-child(3) > button:nth-child(1)').click();

  // // Edit Project
  // console.log('Edit Project')
  // await page.locator('div:nth-child(18) > .MuiPaper-root > div:nth-child(3) > button:nth-child(2)').click();
  // await page.getByText('No input blocks and technical tests required for this report.').isVisible();
  // await page.getByRole('button', { name: 'Home' }).click();

  // // Clone Project
  // console.log('Clone Project')
  // await page.locator('div:nth-child(13) > .MuiPaper-root > div:nth-child(3) > button:nth-child(3)').click();

  // Delete Project
  await browser.close();

});