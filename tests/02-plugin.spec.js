import { test, expect, chromium } from '@playwright/test';

let url = process.env.ENVIRONMENT_URL
let port = "5000"

test.use({
  viewport: {
    width: 1920,
    height: 1080
  }
});

test.skip(`FMTC Plugin`, async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');

  console.log('Add Model')
  await page.getByText('Models & Data').click();
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.getByText('Upload AI Model').click();
  await page.getByTestId('newmodel-next-button').click();
  await page.getByText('Click to Browse').click();
  // await page.locator("input[name='file']").setInputFiles('./aiverify-test-samples/models/sklearn/1.2.2/multiclass_classification_loan_sklearn.ensemble._bagging.BaggingClassifier.sav');
  await page.locator("input[name='file']").setInputFiles('./fixtures/sample_bc_credit_sklearn_linear.LogisticRegression.sav');
  await page.getByTestId('upload-models-button').click();
  await page.getByRole('button', { name: 'Back to all Models >' }).click();
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Fairness for Classification' }).click();
  await page.getByText('Bar Chart (Selected)').dragTo(page.locator('div.react-grid-layout'));

  console.log('Add a page')
  await page.locator('button:nth-child(3)').first().click();
  await page.getByRole('button', { name: 'Add Page' }).click()
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_bc_credit_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_bc_credit_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'default' }).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  // await page.getByText('multiclass_classification_loan_sklearn.ensemble._bagging.BaggingClassifier.sav').click();
  await page.getByText('sample_bc_credit_sklearn_linear.LogisticRegression.sav').click();
  await page.getByRole('button', { name: 'Use Model' }).click();

  console.log('Fairness Metrics Toolbox for Classification')
  await page.locator('[id="algocard-aiverify\\.stock\\.fairness_metrics_toolbox_for_classification\\:fairness_metrics_toolbox_for_classification"]').getByRole('button', { name: 'Open' }).click();
  await page.getByLabel('sensitive_feature-0 *').click();
  // await page.getByLabel('sensitive_feature-0 *').fill('Gender');
  await page.getByLabel('sensitive_feature-0 *').fill('gender');
  // await page.getByRole('button', { name: 'Add Item' }).click();
  // await page.getByLabel('sensitive_feature-1 *').click();
  // await page.getByLabel('sensitive_feature-1 *').fill('Home_Owner');
  await page.getByRole('button', { name: 'Annotated labels path' }).click();
  await page.getByRole('listbox', { name: 'Annotated labels path' }).filter({ hasText: 'sample_bc_credit_data.sav' }).click();
  await page.getByLabel('Name of column containing image file names *').click();
  await page.getByLabel('Name of column containing image file names *').fill('NA');
  await page.getByRole('button', { name: 'OK' }).click();

  console.log('Fairness Tree')
  await page.locator('[id="ibcard-aiverify\\.stock\\.fairness_metrics_toolbox_for_classification\\:fairness_tree"]').getByRole('button', { name: 'Open' }).click();
  await page.getByLabel('Sensitive Feature Name(s)*').click();
  await page.getByLabel('Sensitive Feature Name(s)*').fill('gender, race');
  await page.getByLabel('Favourable Allocated Resource / Opportunity*').click();
  await page.getByLabel('Favourable Allocated Resource / Opportunity*').fill('low interest rate');
  await page.locator('#qualified').click();
  await page.locator('#qualified').fill('qualified applicants');
  await page.getByLabel('Unqualified Group*').click();
  await page.getByLabel('Unqualified Group*').fill('unqualified applicants');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('[id="outcome-select-n1\\.2"]').check();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('a. loss of opportunity');
  await page.getByRole('textbox').press('Enter');
  await page.getByText('a. loss of opportunity').fill('a. loss of opportunity\nb. increased risk for the bank');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox').click();
  await page.getByLabel('Unqualified applicants receiving the Low interest rate').check();
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().fill('It is more concerning as it is a threat to the bank if applicants are unable to repay loans');
  await page.locator('div:nth-child(3) > div > div:nth-child(2)').first().click();
  await page.getByLabel('Yes').check();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).fill('The algorithm is heavily dependent as it is a human out-of-the-loop decision making process with little human intervention.');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('#aivModal').getByTestId('CloseIcon').click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: 'View Report' }).click()
  ]);
  await page.getByRole('img', { name: 'AI Verify' }).click();

  await browser.close();

  console.log('Test Complete & Report Generated')

})

test.skip(`ALE Plugin`, async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');

  // console.log('Add Model')
  // await page.getByText('Models & Data').click();
  // await page.getByTestId('open-model-list-button').locator('span').click();
  // await page.getByTestId('add-new-models-button').click();
  // await page.getByText('Upload AI Model').click();
  // await page.getByTestId('newmodel-next-button').click();
  // await page.getByText('Click to Browse').click();
  // await page.locator("input[name='file']").setInputFiles('./aiverify-test-samples/models/xgboost/1.7.5/multiclass_classification_loan_xgboost.sklearn.XGBClassifier.sav');
  // await page.locator("input[name='file']").setInputFiles('./fixtures/sample_bc_credit_sklearn_linear.LogisticRegression.sav');
  // await page.getByTestId('upload-models-button').click();
  // await page.getByRole('button', { name: 'Back to all Models >' }).click();
  // await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Accumulated Local Effect' }).click();
  await page.getByText('ALE Line Graphs').dragTo(page.locator('div.react-grid-layout'));

  console.log('Add a page')
  await page.locator('button:nth-child(3)').first().click();
  await page.getByRole('button', { name: 'Add Page' }).click()
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_bc_credit_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_bc_credit_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'default' }).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  // await page.getByText('multiclass_classification_loan_xgboost.sklearn.XGBClassifier.sav').click();
  await page.getByText('sample_bc_credit_sklearn_linear.LogisticRegression.sav').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: 'View Report' }).click()
  ]);
  await page.getByRole('img', { name: 'AI Verify' }).click();

  await browser.close();

  console.log('Test Complete & Report Generated')

})

test.skip(`FMTR Plugin`, async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');

  // console.log('Add Dataset')
  await page.getByText('Models & Data').click();
  // await page.getByTestId('open-dataset-list-button').locator('span').click();
  // await page.getByTestId('add-new-datasets-button').click();
  // await page.getByText('Click to Browse').click();
  // await page.locator("input[name='file-dropbox']").setInputFiles('./fixtures/sample_reg_donation_data.sav');
  // await page.getByTestId('upload-datasets-button').click();
  // await page.getByRole('button', { name: 'Back to all Datasets >' }).click();
  // await page.getByTestId('datasets-back-button').click();

  // console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.getByText('Upload AI Model').click();
  await page.getByTestId('newmodel-next-button').click();
  await page.getByText('Click to Browse').click();
  // await page.locator("input[name='file']").setInputFiles('./aiverify-test-samples/models/sklearn/1.2.2/regression_insurance_sklearn.ensemble._forest.ExtraTreesRegressor.sav');
  await page.locator("input[name='file']").setInputFiles('./fixtures/sample_reg_donation_sklearn_linear.LogisticRegression.sav');
  await page.getByRole('button', { name: 'Classification' }).click();
  await page.getByRole('option', { name: 'Regression' }).click();
  await page.getByTestId('upload-models-button').click();
  await page.getByRole('button', { name: 'Back to all Models >' }).click();
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Fairness for Regression' }).click();
  await page.getByText('Bar Chart (MAE)').dragTo(page.locator('div.react-grid-layout'));

  console.log('Add a page')
  await page.locator('button:nth-child(3)').first().click();
  await page.getByRole('button', { name: 'Add Page' }).click()
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'donation' }).nth(1).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  // await page.getByText('regression_insurance_sklearn.ensemble._forest.ExtraTreesRegressor.sav').click();
  await page.getByText('sample_reg_donation_sklearn_linear.LogisticRegression.sav').click();
  await page.getByRole('button', { name: 'Use Model' }).click();

  console.log('Fairness Metrics Toolbox for Regression')
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByLabel('sensitive_feature-0 *').click();
  await page.getByLabel('sensitive_feature-0 *').fill('gender');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: 'View Report' }).click()
  ]);
  await page.getByRole('img', { name: 'AI Verify' }).click();

  await browser.close();

  console.log('Test Complete & Report Generated')

})

test.skip(`PDP Plugin`, async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');

  // console.log('Add Model')
  // await page.getByText('Models & Data').click();
  // await page.getByTestId('open-model-list-button').locator('span').click();
  // await page.getByTestId('add-new-models-button').click();
  // await page.getByText('Upload AI Model').click();
  // await page.getByTestId('newmodel-next-button').click();
  // await page.getByText('Click to Browse').click();
  // await page.locator("input[name='file']").setInputFiles('./aiverify-test-samples/models/xgboost/1.7.5/binary_classification_compas_xgboost.sklearn.XGBClassifier.sav');
  // await page.locator("input[name='file']").setInputFiles('./fixtures/sample_bc_credit_sklearn_linear.LogisticRegression');
  // await page.getByTestId('upload-models-button').click();
  // await page.getByRole('button', { name: 'Back to all Models >' }).click();
  // await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Partial Dependence Plot' }).click();
  await page.getByText('PDP Line Graphs').dragTo(page.locator('div.react-grid-layout'));

  console.log('Add a page')
  await page.locator('button:nth-child(3)').first().click();
  await page.getByRole('button', { name: 'Add Page' }).click()
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_bc_credit_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_bc_credit_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'default' }).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  // await page.getByText('binary_classification_compas_xgboost.sklearn.XGBClassifier.sav').click();
  await page.getByText('sample_bc_credit_sklearn_linear.LogisticRegression.sav').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: 'View Report' }).click()
  ]);
  await page.getByRole('img', { name: 'AI Verify' }).click();

  await browser.close();

  console.log('Test Complete & Report Generated')

})

test.skip(`Robustness Plugin`, async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');

  // console.log('Add Dataset')
  // await page.getByText('Models & Data').click();
  // await page.getByTestId('open-dataset-list-button').locator('span').click();
  // await page.getByTestId('add-new-datasets-button').click();
  // await page.getByText('Click to Browse').click();
  // await page.locator("input[name='file-dropbox']").setInputFiles('./fixtures/sample_bc_credit_data.sav');
  // await page.locator("input[name='file']").setInputFiles('./fixtures/sample_bc_credit_sklearn_linear.LogisticRegression');
  // await page.getByTestId('upload-datasets-button').click();
  // await page.getByRole('button', { name: 'Back to all Datasets >' }).click();
  // await page.getByTestId('datasets-back-button').click();

  // console.log('Add Model')
  // await page.getByTestId('open-model-list-button').locator('span').click();
  // await page.getByTestId('add-new-models-button').click();
  // await page.getByText('Upload AI Model').click();
  // await page.getByTestId('newmodel-next-button').click();
  // await page.getByText('Click to Browse').click();
  // await page.locator("input[name='file']").setInputFiles('./aiverify-test-samples/models/xgboost/1.7.5/multiclass_classification_loan_xgboost.sklearn.XGBClassifier.sav');
  // await page.getByTestId('upload-models-button').click();
  // await page.getByRole('button', { name: 'Back to all Models >' }).click();
  // await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Robustness Toolbox' }).click();
  await page.getByText('Bar Chart (Accuracy)').dragTo(page.locator('div.react-grid-layout'));

  console.log('Add a page')
  await page.locator('button:nth-child(3)').first().click();
  await page.getByRole('button', { name: 'Add Page' }).click()
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_bc_credit_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_bc_credit_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'default' }).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  // await page.getByText('multiclass_classification_loan_xgboost.sklearn.XGBClassifier.sav').click();
  await page.getByText('sample_bc_credit_sklearn_linear.LogisticRegression.sav').click();
  await page.getByRole('button', { name: 'Use Model' }).click();

  console.log('Robustness ToolBox')
  await page.locator('[id="algocard-aiverify\\.stock\\.robustness_toolbox\\:robustness_toolbox"] div').getByRole('button', { name: 'Open' }).click();
  await page.getByRole('button', { name: 'Annotated ground truth path' }).click();
  await page.getByRole('listbox', { name: 'Annotated ground truth path' }).filter({ hasText: 'sample_bc_credit_data.sav' }).click();
  await page.getByLabel('Name of column containing image file names').click();
  await page.getByLabel('Name of column containing image file names').fill('file_name');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: 'View Report' }).click()
  ]);
  await page.getByRole('img', { name: 'AI Verify' }).click();

  await browser.close();

  console.log('Test Complete & Report Generated')

})

test(`SHAP Toolbox Plugin`, async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');

  console.log('Add Dataset')
  await page.getByText('Models & Data').click();
  await page.getByTestId('open-dataset-list-button').locator('span').click();
  await page.getByTestId('add-new-datasets-button').click();
  await page.getByText('Click to Browse').click();
  await page.locator("input[name='file-dropbox']").setInputFiles('./fixtures/sample_bc_credit_data.sav');
  await page.getByTestId('upload-datasets-button').click();
  await page.getByRole('button', { name: 'Back to all Datasets >' }).click();
  await page.getByTestId('datasets-back-button').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.getByText('Upload AI Model').click();
  await page.getByTestId('newmodel-next-button').click();
  await page.getByText('Click to Browse').click();
  // await page.locator("input[name='file']").setInputFiles('./aiverify-test-samples/models/lightgbm/3.3.5/binary_classification_compas_lightgbm.sklearn.LGBMClassifier.sav');
  await page.locator("input[name='file']").setInputFiles('./fixtures/sample_bc_credit_sklearn_linear.LogisticRegression.sav');
  await page.getByTestId('upload-models-button').click();
  await page.getByRole('button', { name: 'Back to all Models >' }).click();
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'SHAP Toolbox' }).click();
  await page.getByText('Bar Chart (Technical)').dragTo(page.locator('div.react-grid-layout'));

  console.log('Add a page')
  await page.locator('button:nth-child(3)').first().click();
  await page.getByRole('button', { name: 'Add Page' }).click()
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_bc_credit_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_bc_credit_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByLabel('groundTruthSelect').click();
  await page.getByRole('option', { name: 'default' }).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  // await page.getByText('binary_classification_compas_lightgbm.sklearn.LGBMClassifier.sav').click();
  await page.getByText('sample_bc_credit_sklearn_linear.LogisticRegression.sav').click();
  await page.getByRole('button', { name: 'Use Model' }).click();

  console.log('SHAP ToolBox')
  await page.locator('[id="algocard-aiverify\\.stock\\.shap_toolbox\\:shap_toolbox"] div').getByRole('button', { name: 'Open' }).click();
  await page.getByRole('button', { name: 'Path of the Background Path ​' }).click();
  await page.getByRole('option').filter({ hasText: 'sample_bc_credit_data.sav' }).click()

  await page.getByLabel('Size of the Background *').click();
  await page.getByLabel('Size of the Background *').fill('100');
  await page.getByLabel('Size of the Test Dataset *').click();
  await page.getByLabel('Size of the Test Dataset *').fill('100');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: 'View Report' }).click()
  ]);
  await page.getByRole('img', { name: 'AI Verify' }).click();

  await browser.close();

  console.log('Test Complete & Report Generated')

})

test.skip(`Local Shap Toolbox Plugin`, async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'SHAP Toolbox' }).click();
  await page.getByText('Local Explainability Bar Chart').dragTo(page.locator('div.react-grid-layout'));

  console.log('Add a page')
  await page.locator('button:nth-child(3)').first().click();
  await page.getByRole('button', { name: 'Add Page' }).click()
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_bc_credit_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_bc_credit_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'default' }).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('sample_bc_credit_sklearn_linear.LogisticRegression.sav').click();
  await page.getByRole('button', { name: 'Use Model' }).click();

  console.log('Local SHAP ToolBox')
  // await page.locator('[id="algocard-aiverify\\.stock\\.shap_toolbox\\:shap_toolbox"] div').getByRole('button', { name: 'Open' }).click();
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByRole('option').filter({ hasText: 'sample_bc_credit_data.sav' }).click()
  await page.getByLabel('Size of the Background *').click();
  await page.getByLabel('Size of the Background *').fill('25');
  await page.getByLabel('Size of the Test Dataset *').click();
  await page.getByLabel('Size of the Test Dataset *').fill('25');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: 'View Report' }).click()
  ]);
  await page.getByRole('img', { name: 'AI Verify' }).click();

  await browser.close();

  console.log('Test Complete & Report Generated')

})

test.skip(`Create API Model Configuration (Payload with Bearer Token)`, async () => {
  
  const browser = await chromium.launch();
  const context = await browser.newContext();
  
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');
  await page.getByText('Models & Data').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.locator('#api').check();
  await page.getByTestId('newmodel-next-button').click();
  await page.click("button[data-testid=editConfigIconBtn]");
  await page.locator('input[name="name"]').fill("TC001");
  await page.locator('textarea[name="description"]').fill("My test API description");
  await page.click('label[for="modelType"] .aiv__dropdown-indicator');
  await page.getByText("Regression").click();
  await page.locator('input[name="modelAPI.url"]').fill(url + ":" + port + "/predict/tc001");
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('age');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('gender');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('race');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('income');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment_length');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('total_donated');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('num_donation');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.getByText('Authentication Settings').click();
  await page.locator('.newModelApiConfig_tabContent__SMjQa > div > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText('Bearer Token').click();
  await page.getByLabel('Token').fill('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMmY4MTJiNmJlM2IzMjEyMTQzMjBjZiIsImlhdCI6MTY2MDE5Nzg3MCwiZXhwIjoxNjYyNzg5ODcwfQ.cebsoHVMzV4GGwX-QjHFc5CcTkEy7jLQQLaaHlvN2JU');
  await page.click('button[type="submit"]');
  await expect(page.getByText("New API Configuration created")).toBeVisible();
  await page.locator('#aivModal').getByRole('button', { name: 'OK' }).click();
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Fairness for Regression' }).click();
  await page.getByText('Bar Chart (MAE)').dragTo(page.locator('div.react-grid-layout'));
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'donation' }).nth(1).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('TC001').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByRole('button', { name: 'Map API Request Parameters' }).click();
  await page.locator('div:nth-child(8) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator > .mui-style-8mmkcg').click();
  await page.getByText("total_donated_amount").click()
  await page.locator('div:nth-child(9) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("number_of_donation").click()
  await page.getByRole('button', { name: 'OK' }).click();

  console.log('Fairness Metrics Toolbox for Regression')
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByLabel('sensitive_feature-0 *').click();
  await page.getByLabel('sensitive_feature-0 *').fill('donation');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: 'View Report' }).click(),
    expect(page.getByText('Test Completed')).toBeVisible()
  ]);
  await page.getByRole('img', { name: 'AI Verify' }).click();

  await browser.close();

  console.log('Test Complete & Report Generated')
});

test.skip("Create API Model Configuration (Payload with Basic Auth)", async () => {
  
  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');
  await page.getByText('Models & Data').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.locator('#api').check();
  await page.getByTestId('newmodel-next-button').click();
  await page.click("button[data-testid=editConfigIconBtn]");
  await page.locator('input[name="name"]').fill("TC002");
  await page.locator('textarea[name="description"]').fill("My test API description");
  await page.click('label[for="modelType"] .aiv__dropdown-indicator');
  await page.getByText("Regression").click();
  await page.locator('input[name="modelAPI.url"]').fill(url + ":" + port + "/predict/tc002");
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('age');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('gender');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('race');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('income');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment_length');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('total_donated');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('num_donation');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.getByText('Authentication Settings').click();
  await page.locator('.newModelApiConfig_tabContent__SMjQa > div > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText('Basic Auth').click();
  await page.getByLabel('Username').fill('test');
  await page.getByLabel('Password').fill('p@ssword');
  await page.click('button[type="submit"]');
  await expect(page.getByText("New API Configuration created")).toBeVisible();
  await page.locator('#aivModal').getByRole('button', { name: 'OK' }).click();
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();

  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Fairness for Regression' }).click();
  await page.getByText('Bar Chart (MAE)').dragTo(page.locator('div.react-grid-layout'));

  console.log('Add a page')
  await page.locator('button:nth-child(3)').first().click();
  await page.getByRole('button', { name: 'Add Page' }).click()
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'donation' }).nth(1).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('TC002').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByRole('button', { name: 'Map API Request Parameters' }).click();
  await page.locator('div:nth-child(8) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator > .mui-style-8mmkcg').click();
  await page.getByText("total_donated_amount").click()
  await page.locator('div:nth-child(9) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("number_of_donation").click()
  await page.getByRole('button', { name: 'OK' }).click();

  console.log('Fairness Metrics Toolbox for Regression')
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByLabel('sensitive_feature-0 *').click();
  await page.getByLabel('sensitive_feature-0 *').fill('donation');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: 'View Report' }).click()
  ]);
  await page.getByRole('img', { name: 'AI Verify' }).click();

  await browser.close();

  console.log('Test Complete & Report Generated')

});

test.skip("Create API Model Configuration (POST request with x-www-form-urlencoded request body)", async () => {
  
  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');
  await page.getByText('Models & Data').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.locator('#api').check();
  await page.getByTestId('newmodel-next-button').click();
  await page.click("button[data-testid=editConfigIconBtn]");
  await page.locator('input[name="name"]').fill("TC003");
  await page.locator('textarea[name="description"]').fill("My test API description");
  await page.click('label[for="modelType"] .aiv__dropdown-indicator');
  await page.getByText("Regression").click();
  await page.locator('input[name="modelAPI.url"]').fill(url + ":" + port + "/predict/tc003");
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('age');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('gender');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('race');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('income');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment_length');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('total_donated');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('num_donation');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.click('button[type="submit"]');
  await expect(page.getByText("New API Configuration created")).toBeVisible();
  await page.locator('#aivModal').getByRole('button', { name: 'OK' }).click();
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Fairness for Regression' }).click();
  await page.getByText('Bar Chart (MAE)').dragTo(page.locator('div.react-grid-layout'));
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'donation' }).nth(1).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('TC003').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByRole('button', { name: 'Map API Request Parameters' }).click();
  await page.locator('div:nth-child(8) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator > .mui-style-8mmkcg').click();
  await page.getByText("total_donated_amount").click()
  await page.locator('div:nth-child(9) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("number_of_donation").click()
  await page.getByRole('button', { name: 'OK' }).click();

  console.log('Fairness Metrics Toolbox for Regression')
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByLabel('sensitive_feature-0 *').click();
  await page.getByLabel('sensitive_feature-0 *').fill('donation');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: 'View Report' }).click()
  ]);
  await page.getByRole('img', { name: 'AI Verify' }).click();

  await browser.close();

  console.log('Test Complete & Report Generated')

});

test.skip("Create API Model Configuration (POST request with form-data request body)", async () => {
  
  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');
  await page.getByText('Models & Data').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.locator('#api').check();
  await page.getByTestId('newmodel-next-button').click();
  await page.click("button[data-testid=editConfigIconBtn]");
  await page.locator('input[name="name"]').fill("TC004");
  await page.locator('textarea[name="description"]').fill("My test API description");
  await page.click('label[for="modelType"] .aiv__dropdown-indicator');
  await page.getByText("Regression").click();
  await page.locator('input[name="modelAPI.url"]').fill(url + ":" + port + "/predict/tc004");
  await page.locator('.newModelApiConfig_tabContent__SMjQa > div > div > div > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("multipart/form-data").click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('age');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('gender');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('race');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('income');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment_length');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('total_donated');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('num_donation');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.click('button[type="submit"]');
  await expect(page.getByText("New API Configuration created")).toBeVisible();
  await page.locator('#aivModal').getByRole('button', { name: 'OK' }).click();
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Fairness for Regression' }).click();
  await page.getByText('Bar Chart (MAE)').dragTo(page.locator('div.react-grid-layout'));
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'donation' }).nth(1).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('TC004').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByRole('button', { name: 'Map API Request Parameters' }).click();
  await page.locator('div:nth-child(8) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator > .mui-style-8mmkcg').click();
  await page.getByText("total_donated_amount").click()
  await page.locator('div:nth-child(9) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("number_of_donation").click()
  await page.getByRole('button', { name: 'OK' }).click();

  console.log('Fairness Metrics Toolbox for Regression')
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByLabel('sensitive_feature-0 *').click();
  await page.getByLabel('sensitive_feature-0 *').fill('donation');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: 'View Report' }).click()
  ]);
  await page.getByRole('img', { name: 'AI Verify' }).click();

  await browser.close();

  console.log('Test Complete & Report Generated')

});

test.skip("Create API Model Configuration (GET request with query parameters)", async () => {
  
  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');
  await page.getByText('Models & Data').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.locator('#api').check();
  await page.getByTestId('newmodel-next-button').click();
  await page.click("button[data-testid=editConfigIconBtn]");
  await page.locator('input[name="name"]').fill("TC005");
  await page.locator('textarea[name="description"]').fill("My test API description");
  await page.click('label[for="modelType"] .aiv__dropdown-indicator');
  await page.getByText("Regression").click();
  await page.locator('.newModelApiConfig_rightSection__9aQPF > div > div > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("GET").click()
  await page.locator('input[name="modelAPI.url"]').fill(url + ":" + port + "/predict/tc005");
  await page.getByTestId('urlParamInputRow').getByLabel('').fill('age');
  await page.getByTestId('addUrlParamBtn').click();
  await page.locator('input[name="urlParamName"]').fill('gender');
  await page.getByTestId('addUrlParamBtn').click();
  await page.locator('input[name="urlParamName"]').fill('race');
  await page.getByTestId('addUrlParamBtn').click();
  await page.locator('input[name="urlParamName"]').fill('income');
  await page.getByTestId('addUrlParamBtn').click();
  await page.locator('input[name="urlParamName"]').fill('employment');
  await page.getByTestId('addUrlParamBtn').click();
  await page.locator('input[name="urlParamName"]').fill('employment_length');
  await page.getByTestId('addUrlParamBtn').click();
  await page.locator('input[name="urlParamName"]').fill('total_donated');
  await page.getByTestId('addUrlParamBtn').click();
  await page.locator('input[name="urlParamName"]').fill('num_donation');
  await page.getByTestId('addUrlParamBtn').click();
  await page.click('button[type="submit"]');
  await expect(page.getByText("New API Configuration created")).toBeVisible();
  await page.locator('#aivModal').getByRole('button', { name: 'OK' }).click();
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Fairness for Regression' }).click();
  await page.getByText('Bar Chart (MAE)').dragTo(page.locator('div.react-grid-layout'));
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'donation' }).nth(1).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('TC005').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByRole('button', { name: 'Map API Request Parameters' }).click();
  await page.locator('div:nth-child(8) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator > .mui-style-8mmkcg').click();
  await page.getByText("total_donated_amount").click()
  await page.locator('div:nth-child(9) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("number_of_donation").click()
  await page.getByRole('button', { name: 'OK' }).click();

  console.log('Fairness Metrics Toolbox for Regression')
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByLabel('sensitive_feature-0 *').click();
  await page.getByLabel('sensitive_feature-0 *').fill('donation');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: 'View Report' }).click()
  ]);
  await page.getByRole('img', { name: 'AI Verify' }).click();

  await browser.close();

  console.log('Test Complete & Report Generated')

});

test.skip("Create API Model Configuration (GET request with path parameters)", async () => {
  
  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');
  await page.getByText('Models & Data').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.locator('#api').check();
  await page.getByTestId('newmodel-next-button').click();
  await page.click("button[data-testid=editConfigIconBtn]");
  await page.locator('input[name="name"]').fill("TC006");
  await page.locator('textarea[name="description"]').fill("My test API description");
  await page.click('label[for="modelType"] .aiv__dropdown-indicator');
  await page.getByText("Regression").click();
  await page.locator('.newModelApiConfig_rightSection__9aQPF > div > div > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("GET").click()
  await page.locator('input[name="modelAPI.url"]').fill(url + ":" + port + "/predict/tc006");
  await page.locator('.newModelApiConfig_tabContent__SMjQa > div > div > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("Path").click()
  await page.getByTestId('urlParamInputRow').getByLabel('').fill('age');
  await page.getByTestId('addUrlParamBtn').click();
  await page.locator('input[name="urlParamName"]').fill('gender');
  await page.getByTestId('addUrlParamBtn').click();
  await page.locator('input[name="urlParamName"]').fill('race');
  await page.getByTestId('addUrlParamBtn').click();
  await page.locator('input[name="urlParamName"]').fill('income');
  await page.getByTestId('addUrlParamBtn').click();
  await page.locator('input[name="urlParamName"]').fill('employment');
  await page.getByTestId('addUrlParamBtn').click();
  await page.locator('input[name="urlParamName"]').fill('employment_length');
  await page.getByTestId('addUrlParamBtn').click();
  await page.locator('input[name="urlParamName"]').fill('total_donated');
  await page.getByTestId('addUrlParamBtn').click();
  await page.locator('input[name="urlParamName"]').fill('num_donation');
  await page.getByTestId('addUrlParamBtn').click();
  await page.click('button[type="submit"]');
  await expect(page.getByText("New API Configuration created")).toBeVisible();
  await page.locator('#aivModal').getByRole('button', { name: 'OK' }).click();
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Fairness for Regression' }).click();
  await page.getByText('Bar Chart (MAE)').dragTo(page.locator('div.react-grid-layout'));
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'donation' }).nth(1).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('TC006').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByRole('button', { name: 'Map API Request Parameters' }).click();
  await page.locator('div:nth-child(8) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator > .mui-style-8mmkcg').click();
  await page.getByText("total_donated_amount").click()
  await page.locator('div:nth-child(9) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("number_of_donation").click()
  await page.getByRole('button', { name: 'OK' }).click();

  console.log('Fairness Metrics Toolbox for Regression')
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByLabel('sensitive_feature-0 *').click();
  await page.getByLabel('sensitive_feature-0 *').fill('donation');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: 'View Report' }).click()
  ]);
  await page.getByRole('img', { name: 'AI Verify' }).click();

  await browser.close();

  console.log('Test Complete & Report Generated')

});

test.skip("Create API Model Configuration (POST request to read JSON response)", async () => {
  
  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');
  await page.getByText('Models & Data').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.locator('#api').check();
  await page.getByTestId('newmodel-next-button').click();
  await page.click("button[data-testid=editConfigIconBtn]");
  await page.locator('input[name="name"]').fill("TC007");
  await page.locator('textarea[name="description"]').fill("My test API description");
  await page.click('label[for="modelType"] .aiv__dropdown-indicator');
  await page.getByText("Regression").click();
  await page.locator('input[name="modelAPI.url"]').fill(url + ":" + port + "/predict/tc007");
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('age');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('gender');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('race');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('income');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment_length');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('total_donated');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('num_donation');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.getByText('Response Properties').click();
  await page.locator('.tooltip_childWrapper___nucs > div > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("application/json").click()
  await page.locator('.newModelApiConfig_keyValCol__VrEll > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').first().click();
  await page.getByText("object").click()
  await page.click('button[type="submit"]');
  await expect(page.getByText("New API Configuration created")).toBeVisible();
  await page.locator('#aivModal').getByRole('button', { name: 'OK' }).click();
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Fairness for Regression' }).click();
  await page.getByText('Bar Chart (MAE)').dragTo(page.locator('div.react-grid-layout'));
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'donation' }).nth(1).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('TC007').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByRole('button', { name: 'Map API Request Parameters' }).click();
  await page.locator('div:nth-child(8) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator > .mui-style-8mmkcg').click();
  await page.getByText("total_donated_amount").click()
  await page.locator('div:nth-child(9) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("number_of_donation").click()
  await page.getByRole('button', { name: 'OK' }).click();

  console.log('Fairness Metrics Toolbox for Regression')
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByLabel('sensitive_feature-0 *').click();
  await page.getByLabel('sensitive_feature-0 *').fill('donation');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: 'View Report' }).click()
  ]);
  await page.getByRole('img', { name: 'AI Verify' }).click();

  await browser.close();

  console.log('Test Complete & Report Generated')

});

test.skip("Create API Model Configuration (POST request to Test additional headers)", async () => {
  
  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');
  await page.getByText('Models & Data').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.locator('#api').check();
  await page.getByTestId('newmodel-next-button').click();
  await page.click("button[data-testid=editConfigIconBtn]");
  await page.locator('input[name="name"]').fill("TC008");
  await page.locator('textarea[name="description"]').fill("My test API description");
  await page.click('label[for="modelType"] .aiv__dropdown-indicator');
  await page.getByText("Regression").click();
  await page.locator('input[name="modelAPI.url"]').fill(url + ":" + port + "/predict/tc008");
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('age');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('gender');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('race');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('income');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment_length');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('total_donated');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('num_donation');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.getByText('Additional Request Headers').click();
  await page.locator('input[name="headerNameInput"]').fill('foo');
  await page.locator('.newModelApiConfig_keyValCol__VrEll > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("string").click()
  await page.locator('input[name="headerValueInput"]').fill('bar');
  await page.getByTestId('headerAddBtn').click();
  await page.click('button[type="submit"]');
  await expect(page.getByText("New API Configuration created")).toBeVisible();
  await page.locator('#aivModal').getByRole('button', { name: 'OK' }).click();
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Fairness for Regression' }).click();
  await page.getByText('Bar Chart (MAE)').dragTo(page.locator('div.react-grid-layout'));
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'donation' }).nth(1).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('TC008').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByRole('button', { name: 'Map API Request Parameters' }).click();
  await page.locator('div:nth-child(8) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator > .mui-style-8mmkcg').click();
  await page.getByText("total_donated_amount").click()
  await page.locator('div:nth-child(9) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("number_of_donation").click()
  await page.getByRole('button', { name: 'OK' }).click();

  console.log('Fairness Metrics Toolbox for Regression')
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByLabel('sensitive_feature-0 *').click();
  await page.getByLabel('sensitive_feature-0 *').fill('donation');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: 'View Report' }).click()
  ]);
  await page.getByRole('img', { name: 'AI Verify' }).click();

  await browser.close();

  console.log('Test Complete & Report Generated');

});

test.skip("Create API Model Configuration (POST request to test http method and connection errors)", async () => {
  
  const browser = await chromium.launch();
  const context = await browser.newContext();
  
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');
  await page.getByText('Models & Data').click();
  
  console.log('Add Dataset')
  await page.getByTestId('open-dataset-list-button').locator('span').click();
  await page.getByTestId('add-new-datasets-button').click();
  await page.getByText('Click to Browse').click();
  await page.locator("input[name='file-dropbox']").setInputFiles('./fixtures/sample_reg_donation_data.sav');
  await page.getByTestId('upload-datasets-button').click();
  await page.getByRole('button', { name: 'Back to all Datasets >' }).click();
  await page.getByTestId('datasets-back-button').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.locator('#api').check();
  await page.getByTestId('newmodel-next-button').click();
  await page.click("button[data-testid=editConfigIconBtn]");
  await page.locator('input[name="name"]').fill("TC009");
  await page.locator('textarea[name="description"]').fill("My test API description");
  await page.click('label[for="modelType"] .aiv__dropdown-indicator');
  await page.getByText("Regression").click();
  await page.locator('input[name="modelAPI.url"]').fill("https://fake.host/predict/tc009");
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('age');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('gender');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('race');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('income');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment_length');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('total_donated');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('num_donation');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.click('button[type="submit"]');
  await expect(page.getByText("New API Configuration created")).toBeVisible();
  await page.locator('#aivModal').getByRole('button', { name: 'OK' }).click();
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Fairness for Regression' }).click();
  await page.getByText('Bar Chart (MAE)').dragTo(page.locator('div.react-grid-layout'));
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'donation' }).nth(1).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('TC009').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByRole('button', { name: 'Map API Request Parameters' }).click();
  await page.locator('div:nth-child(8) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator > .mui-style-8mmkcg').click();
  await page.getByText("total_donated_amount").click()
  await page.locator('div:nth-child(9) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("number_of_donation").click()
  await page.getByRole('button', { name: 'OK' }).click();

  console.log('Fairness Metrics Toolbox for Regression')
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByLabel('sensitive_feature-0 *').click();
  await page.getByLabel('sensitive_feature-0 *').fill('donation');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    await page.getByText("Error encountered while running test").waitFor({ state: "visible" }),
    expect(page.getByText("Error encountered while running test")).toBeVisible()
  ]);

  await browser.close();
  console.log('Test Complete & Report Generated')

});

test.skip("Create API Model Configuration (POST request with application/json request body with array support and array response of integers)", async () => {

  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');
  await page.getByText('Models & Data').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.locator('#api').check();
  await page.getByTestId('newmodel-next-button').click();
  await page.click("button[data-testid=editConfigIconBtn]");
  await page.locator('input[name="name"]').fill("TC013");
  await page.locator('textarea[name="description"]').fill("My test API description");
  await page.click('label[for="modelType"] .aiv__dropdown-indicator');
  await page.getByText("Regression").click();
  await page.locator('input[name="modelAPI.url"]').fill(url + ":" + port + "/predict/tc013");
  await page.locator('.newModelApiConfig_tabContent__SMjQa > div > div > div:nth-child(2) > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText('enabled').click()
  await page.getByLabel('Batch LimitDefaults to -1, which means there is no limit.').fill('100');
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('age');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('gender');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('race');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('income');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment_length');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('total_donated');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('num_donation');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.getByText('Response Properties').click();
  await page.click('button[type="submit"]');
  await expect(page.getByText("New API Configuration created")).toBeVisible();
  await page.locator('#aivModal').getByRole('button', { name: 'OK' }).click();
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Fairness for Regression' }).click();
  await page.getByText('Bar Chart (MAE)').dragTo(page.locator('div.react-grid-layout'));
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'donation' }).nth(1).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('TC013').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByRole('button', { name: 'Map API Request Parameters' }).click();
  await page.locator('div:nth-child(8) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator > .mui-style-8mmkcg').click();
  await page.getByText("total_donated_amount").click()
  await page.locator('div:nth-child(9) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("number_of_donation").click()
  await page.getByRole('button', { name: 'OK' }).click();

  console.log('Fairness Metrics Toolbox for Regression')
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByLabel('sensitive_feature-0 *').click();
  await page.getByLabel('sensitive_feature-0 *').fill('donation');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: 'View Report' }).click()
  ]);
  await page.getByRole('img', { name: 'AI Verify' }).click();

  await browser.close();
  console.log('Test Complete & Report Generated');

});

test.skip("Create API Model Configuration (POST request with application/json request body with array support and array response of objects)", async () => {

  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');
  await page.getByText('Models & Data').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.locator('#api').check();
  await page.getByTestId('newmodel-next-button').click();
  await page.click("button[data-testid=editConfigIconBtn]");
  await page.locator('input[name="name"]').fill("TC014");
  await page.locator('textarea[name="description"]').fill("My test API description");
  await page.click('label[for="modelType"] .aiv__dropdown-indicator');
  await page.getByText("Regression").click();
  await page.locator('input[name="modelAPI.url"]').fill(url + ":" + port + "/predict/tc014");
  await page.locator('.newModelApiConfig_tabContent__SMjQa > div > div > div:nth-child(2) > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText('enabled').click()
  await page.getByLabel('Batch LimitDefaults to -1, which means there is no limit.').fill('100');
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('age');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('gender');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('race');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('income');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment_length');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('total_donated');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('num_donation');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.getByText('Response Properties').click();
  await page.locator('div:nth-child(4) > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("object").click()
  await page.click('button[type="submit"]');
  await expect(page.getByText("New API Configuration created")).toBeVisible();
  await page.locator('#aivModal').getByRole('button', { name: 'OK' }).click();
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Fairness for Regression' }).click();
  await page.getByText('Bar Chart (MAE)').dragTo(page.locator('div.react-grid-layout'));
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'donation' }).nth(1).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('TC014').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByRole('button', { name: 'Map API Request Parameters' }).click();
  await page.locator('div:nth-child(8) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator > .mui-style-8mmkcg').click();
  await page.getByText("total_donated_amount").click()
  await page.locator('div:nth-child(9) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("number_of_donation").click()
  await page.getByRole('button', { name: 'OK' }).click();

  console.log('Fairness Metrics Toolbox for Regression')
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByLabel('sensitive_feature-0 *').click();
  await page.getByLabel('sensitive_feature-0 *').fill('donation');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: 'View Report' }).click()
  ]);
  await page.getByRole('img', { name: 'AI Verify' }).click();

  await browser.close();
  console.log('Test Complete & Report Generated');

});

test.skip("Create API Model Configuration (POST request with application/json request body with array support and response object of array data)", async () => {

  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');
  await page.getByText('Models & Data').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.locator('#api').check();
  await page.getByTestId('newmodel-next-button').click();
  await page.click("button[data-testid=editConfigIconBtn]");
  await page.locator('input[name="name"]').fill("TC015");
  await page.locator('textarea[name="description"]').fill("My test API description");
  await page.click('label[for="modelType"] .aiv__dropdown-indicator');
  await page.getByText("Regression").click();
  await page.locator('input[name="modelAPI.url"]').fill(url + ":" + port + "/predict/tc015");
  await page.locator('.newModelApiConfig_tabContent__SMjQa > div > div > div:nth-child(2) > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText('enabled').click()
  await page.getByLabel('Batch LimitDefaults to -1, which means there is no limit.').fill('100');
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('age');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('gender');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('race');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('income');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment_length');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('total_donated');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('num_donation');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.getByText('Response Properties').click();
  await page.locator('.newModelApiConfig_keyValCol__VrEll > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').first().click();
  await page.getByText("object").click()
  await page.locator('div:nth-child(5) > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("array").click()
  await page.click('button[type="submit"]');
  await expect(page.getByText("New API Configuration created")).toBeVisible();
  await page.locator('#aivModal').getByRole('button', { name: 'OK' }).click();
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Fairness for Regression' }).click();
  await page.getByText('Bar Chart (MAE)').dragTo(page.locator('div.react-grid-layout'));
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'donation' }).nth(1).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('TC015').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByRole('button', { name: 'Map API Request Parameters' }).click();
  await page.locator('div:nth-child(8) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator > .mui-style-8mmkcg').click();
  await page.getByText("total_donated_amount").click()
  await page.locator('div:nth-child(9) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("number_of_donation").click()
  await page.getByRole('button', { name: 'OK' }).click();

  console.log('Fairness Metrics Toolbox for Regression')
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByLabel('sensitive_feature-0 *').click();
  await page.getByLabel('sensitive_feature-0 *').fill('donation');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: 'View Report' }).click()
  ]);
  await page.getByRole('img', { name: 'AI Verify' }).click();

  await browser.close();
  console.log('Test Complete & Report Generated');

});

test.skip("Wrong Bearer Token", async () => {
  
  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');
  await page.getByText('Models & Data').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.locator('#api').check();
  await page.getByTestId('newmodel-next-button').click();
  await page.click("button[data-testid=editConfigIconBtn]");
  await page.locator('input[name="name"]').fill("Wrong Bearer Token");
  await page.locator('textarea[name="description"]').fill("My test API description");
  await page.click('label[for="modelType"] .aiv__dropdown-indicator');
  await page.getByText("Regression").click();
  await page.locator('input[name="modelAPI.url"]').fill(url + ":" + port + "/predict/tc001");
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('age');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('gender');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('race');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('income');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment_length');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('total_donated');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('num_donation');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.getByText('Authentication Settings').click();
  await page.locator('.newModelApiConfig_tabContent__SMjQa > div > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText('Bearer Token').click();
  await page.getByLabel('Token').fill('Y4MTJiNmJlM2IzMjEyMTQzMjBjZiIsImlhdCI6MTY2MDE5Nzg3MCwiZXhwIjoxNjYyNzg5ODcwfQ.cebsoHVMzV4GGwX-QjHFc5CcTkEy7jLQQLaaHlvN2JU');
  await page.click('button[type="submit"]');
  await expect(page.getByText("New API Configuration created")).toBeVisible();
  await page.locator('#aivModal').getByRole('button', { name: 'OK' }).click();
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Fairness for Regression' }).click();
  await page.getByText('Bar Chart (MAE)').dragTo(page.locator('div.react-grid-layout'));
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'donation' }).nth(1).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('Wrong Bearer Token').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByRole('button', { name: 'Map API Request Parameters' }).click();
  await page.locator('div:nth-child(8) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator > .mui-style-8mmkcg').click();
  await page.getByText("total_donated_amount").click()
  await page.locator('div:nth-child(9) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("number_of_donation").click()
  await page.getByRole('button', { name: 'OK' }).click();

  console.log('Fairness Metrics Toolbox for Regression')
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByLabel('sensitive_feature-0 *').click();
  await page.getByLabel('sensitive_feature-0 *').fill('donation');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    await page.getByText("Error encountered while running test").waitFor({ state: "visible" }),
    expect(page.getByText("Error encountered while running test")).toBeVisible()
  ]);

  await browser.close();
  console.log('Test Complete & Report Generated');

})

test.skip("Wrong Basic Auth", async () => {
  
  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');
  await page.getByText('Models & Data').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.locator('#api').check();
  await page.getByTestId('newmodel-next-button').click();
  await page.click("button[data-testid=editConfigIconBtn]");
  await page.locator('input[name="name"]').fill("Wrong Basic Auth");
  await page.locator('textarea[name="description"]').fill("My test API description");
  await page.click('label[for="modelType"] .aiv__dropdown-indicator');
  await page.getByText("Regression").click();
  await page.locator('input[name="modelAPI.url"]').fill(url + ":" + port + "/predict/tc002");
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('age');
  await page.locator('.newModelApiConfig_keyValCol__VrEll > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("Boolean").click()
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('gender');
  await page.locator('div:nth-child(2) > .newModelApiConfig_keyValRow___qJXP > div:nth-child(2) > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("string").click()
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('race');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('income');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment_length');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('total_donated');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('num_donation');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.getByText('Authentication Settings').click();
  await page.locator('.newModelApiConfig_tabContent__SMjQa > div > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText('Basic Auth').click();
  await page.getByLabel('Username').fill('te');
  await page.getByLabel('Password').fill('psword');
  await page.click('button[type="submit"]');
  await expect(page.getByText("New API Configuration created")).toBeVisible();
  await page.locator('#aivModal').getByRole('button', { name: 'OK' }).click();
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Fairness for Regression' }).click();
  await page.getByText('Bar Chart (MAE)').dragTo(page.locator('div.react-grid-layout'));
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'donation' }).nth(1).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('Wrong Basic Auth').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByRole('button', { name: 'Map API Request Parameters' }).click();
  await page.locator('div:nth-child(8) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator > .mui-style-8mmkcg').click();
  await page.getByText("total_donated_amount").click()
  await page.locator('div:nth-child(9) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("number_of_donation").click()
  await page.getByRole('button', { name: 'OK' }).click();

  console.log('Fairness Metrics Toolbox for Regression')
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByLabel('sensitive_feature-0 *').click();
  await page.getByLabel('sensitive_feature-0 *').fill('donation');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    await page.getByText("Error encountered while running test").waitFor({ state: "visible" }),
    expect(page.getByText("Error encountered while running test")).toBeVisible()
  ]);

  await browser.close();
  console.log('Test Complete & Report Generated');

})

test.skip("Wrong Auth Type", async () => {
  
  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');
  await page.getByText('Models & Data').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.locator('#api').check();
  await page.getByTestId('newmodel-next-button').click();
  await page.click("button[data-testid=editConfigIconBtn]");
  await page.locator('input[name="name"]').fill("Wrong Auth Type");
  await page.locator('textarea[name="description"]').fill("My test API description");
  await page.click('label[for="modelType"] .aiv__dropdown-indicator');
  await page.getByText("Regression").click();
  await page.locator('input[name="modelAPI.url"]').fill(url + ":" + port + "/predict/tc001");
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('age');
  await page.locator('.newModelApiConfig_keyValCol__VrEll > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("Boolean").click()
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('gender');
  await page.locator('div:nth-child(2) > .newModelApiConfig_keyValRow___qJXP > div:nth-child(2) > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("string").click()
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('race');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('income');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment_length');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('total_donated');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('num_donation');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.getByText('Authentication Settings').click();
  await page.locator('.newModelApiConfig_tabContent__SMjQa > div > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText('Basic Auth').click();
  await page.getByLabel('Username').fill('test');
  await page.getByLabel('Password').fill('p@ssword');
  await page.click('button[type="submit"]');
  await expect(page.getByText("New API Configuration created")).toBeVisible();
  await page.locator('#aivModal').getByRole('button', { name: 'OK' }).click();
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Fairness for Regression' }).click();
  await page.getByText('Bar Chart (MAE)').dragTo(page.locator('div.react-grid-layout'));
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'donation' }).nth(1).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('Wrong Auth Type').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByRole('button', { name: 'Map API Request Parameters' }).click();
  await page.locator('div:nth-child(8) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator > .mui-style-8mmkcg').click();
  await page.getByText("total_donated_amount").click()
  await page.locator('div:nth-child(9) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("number_of_donation").click()
  await page.getByRole('button', { name: 'OK' }).click();

  console.log('Fairness Metrics Toolbox for Regression')
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByLabel('sensitive_feature-0 *').click();
  await page.getByLabel('sensitive_feature-0 *').fill('donation');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    await page.getByText("Error encountered while running test").waitFor({ state: "visible" }),
    expect(page.getByText("Error encountered while running test")).toBeVisible()
  ]);

  await browser.close();
  console.log('Test Complete & Report Generated');

})

test.skip("Missing Headers", async () => {

  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');
  await page.getByText('Models & Data').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.locator('#api').check();
  await page.getByTestId('newmodel-next-button').click();
  await page.click("button[data-testid=editConfigIconBtn]");
  await page.locator('input[name="name"]').fill("Missing Headers");
  await page.locator('textarea[name="description"]').fill("My test API description");
  await page.click('label[for="modelType"] .aiv__dropdown-indicator');
  await page.getByText("Regression").click();
  await page.locator('input[name="modelAPI.url"]').fill(url + ":" + port + "/predict/tc008");
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('age');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('gender');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('race');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('income');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment_length');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('total_donated');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('num_donation');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.click('button[type="submit"]');
  await expect(page.getByText("New API Configuration created")).toBeVisible();
  await page.locator('#aivModal').getByRole('button', { name: 'OK' }).click();
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Fairness for Regression' }).click();
  await page.getByText('Bar Chart (MAE)').dragTo(page.locator('div.react-grid-layout'));
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'donation' }).nth(1).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('Missing Headers').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByRole('button', { name: 'Map API Request Parameters' }).click();
  await page.locator('div:nth-child(8) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator > .mui-style-8mmkcg').click();
  await page.getByText("total_donated_amount").click()
  await page.locator('div:nth-child(9) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("number_of_donation").click()
  await page.getByRole('button', { name: 'OK' }).click();

  console.log('Fairness Metrics Toolbox for Regression')
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByLabel('sensitive_feature-0 *').click();
  await page.getByLabel('sensitive_feature-0 *').fill('donation');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    await page.getByText("Error encountered while running test").waitFor({ state: "visible" }),
    expect(page.getByText("Error encountered while running test")).toBeVisible()
  ]);

  await browser.close();
  console.log('Test Complete & Report Generated');

});

test.skip("Wrong Content Type", async () => {

  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');
  await page.getByText('Models & Data').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.locator('#api').check();
  await page.getByTestId('newmodel-next-button').click();
  await page.click("button[data-testid=editConfigIconBtn]");
  await page.locator('input[name="name"]').fill("Wrong Content Type");
  await page.locator('textarea[name="description"]').fill("My test API description");
  await page.click('label[for="modelType"] .aiv__dropdown-indicator');
  await page.getByText("Regression").click();
  await page.locator('input[name="modelAPI.url"]').fill(url + ":" + port + "/predict/tc002");
  await page.locator('.newModelApiConfig_tabContent__SMjQa > div > div > div > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("multipart/form-data").click()
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('age');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('gender');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('race');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('income');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment_length');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('total_donated');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('num_donation');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.getByText('Authentication Settings').click();
  await page.locator('.newModelApiConfig_tabContent__SMjQa > div > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText('Basic Auth').click();
  await page.getByLabel('Username').fill('test');
  await page.getByLabel('Password').fill('p@ssword');
  await page.click('button[type="submit"]');
  await expect(page.getByText("New API Configuration created")).toBeVisible();
  await page.locator('#aivModal').getByRole('button', { name: 'OK' }).click();
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Fairness for Regression' }).click();
  await page.getByText('Bar Chart (MAE)').dragTo(page.locator('div.react-grid-layout'));
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'donation' }).nth(1).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('Wrong Content Type').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByRole('button', { name: 'Map API Request Parameters' }).click();
  await page.locator('div:nth-child(8) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator > .mui-style-8mmkcg').click();
  await page.getByText("total_donated_amount").click()
  await page.locator('div:nth-child(9) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("number_of_donation").click()
  await page.getByRole('button', { name: 'OK' }).click();

  console.log('Fairness Metrics Toolbox for Regression')
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByLabel('sensitive_feature-0 *').click();
  await page.getByLabel('sensitive_feature-0 *').fill('donation');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    await page.getByText("Error encountered while running test").waitFor({ state: "visible" }),
    expect(page.getByText("Error encountered while running test")).toBeVisible()
  ]);

  await browser.close();
  console.log('Test Complete & Report Generated');

});

test.skip("Missing Request Parameters", async () => {
  
  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');
  await page.getByText('Models & Data').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.locator('#api').check();
  await page.getByTestId('newmodel-next-button').click();
  await page.click("button[data-testid=editConfigIconBtn]");
  await page.locator('input[name="name"]').fill("Missing Request Parameters");
  await page.locator('textarea[name="description"]').fill("My test API description");
  await page.click('label[for="modelType"] .aiv__dropdown-indicator');
  await page.getByText("Regression").click();
  await page.locator('.newModelApiConfig_rightSection__9aQPF > div > div > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("GET").click()
  await page.locator('input[name="modelAPI.url"]').fill(url + ":" + port + "/predict/tc005");
  await page.getByTestId('urlParamInputRow').getByLabel('').fill('age');
  await page.getByTestId('addUrlParamBtn').click();
  await page.locator('input[name="urlParamName"]').fill('gender');
  await page.getByTestId('addUrlParamBtn').click();
  await page.locator('input[name="urlParamName"]').fill('race');
  await page.getByTestId('addUrlParamBtn').click();
  await page.locator('input[name="urlParamName"]').fill('income');
  await page.getByTestId('addUrlParamBtn').click();
  await page.locator('input[name="urlParamName"]').fill('employment');
  await page.getByTestId('addUrlParamBtn').click();
  await page.locator('input[name="urlParamName"]').fill('employment_length');
  await page.getByTestId('addUrlParamBtn').click();
  await page.locator('input[name="urlParamName"]').fill('total_donated');
  await page.getByTestId('addUrlParamBtn').click();
  await page.click('button[type="submit"]');
  await expect(page.getByText("New API Configuration created")).toBeVisible();
  await page.locator('#aivModal').getByRole('button', { name: 'OK' }).click();
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Fairness for Regression' }).click();
  await page.getByText('Bar Chart (MAE)').dragTo(page.locator('div.react-grid-layout'));
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'donation' }).nth(1).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('Missing Request Parameters').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByRole('button', { name: 'Map API Request Parameters' }).click();
  await page.locator('div:nth-child(8) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator > .mui-style-8mmkcg').click();
  await page.getByText("total_donated_amount").click()
  await page.getByRole('button', { name: 'OK' }).click();

  console.log('Fairness Metrics Toolbox for Regression')
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByLabel('sensitive_feature-0 *').click();
  await page.getByLabel('sensitive_feature-0 *').fill('donation');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    await page.getByText("Error encountered while running test").waitFor({ state: "visible" }),
    expect(page.getByText("Error encountered while running test")).toBeVisible()
  ]);

  await browser.close();
  console.log('Test Complete & Report Generated');

})

test.skip("Mock Response HTTP 429", async () => {

  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');
  await page.getByText('Models & Data').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.locator('#api').check();
  await page.getByTestId('newmodel-next-button').click();
  await page.click("button[data-testid=editConfigIconBtn]");
  await page.locator('input[name="name"]').fill("Mock Response HTTP 429");
  await page.locator('textarea[name="description"]').fill("My test API description");
  await page.click('label[for="modelType"] .aiv__dropdown-indicator');
  await page.getByText("Regression").click();
  await page.locator('input[name="modelAPI.url"]').fill(url + ":" + port + "/predict/tc020");
  await page.locator('.newModelApiConfig_tabContent__SMjQa > div > div > div > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("multipart/form-data").click()
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('age');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('gender');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('race');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('income');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment_length');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('total_donated');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('num_donation');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.getByText('Authentication Settings').click();
  await page.locator('.newModelApiConfig_tabContent__SMjQa > div > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText('Basic Auth').click();
  await page.getByLabel('Username').fill('test');
  await page.getByLabel('Password').fill('p@ssword');
  await page.click('button[type="submit"]');
  await expect(page.getByText("New API Configuration created")).toBeVisible();
  await page.locator('#aivModal').getByRole('button', { name: 'OK' }).click();
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Fairness for Regression' }).click();
  await page.getByText('Bar Chart (MAE)').dragTo(page.locator('div.react-grid-layout'));
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'donation' }).nth(1).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('Mock Response HTTP 429').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByRole('button', { name: 'Map API Request Parameters' }).click();
  await page.locator('div:nth-child(8) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator > .mui-style-8mmkcg').click();
  await page.getByText("total_donated_amount").click()
  await page.locator('div:nth-child(9) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("number_of_donation").click()
  await page.getByRole('button', { name: 'OK' }).click();

  console.log('Fairness Metrics Toolbox for Regression')
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByLabel('sensitive_feature-0 *').click();
  await page.getByLabel('sensitive_feature-0 *').fill('donation');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    await page.getByText("Error encountered while running test").waitFor({ state: "visible" }),
    expect(page.getByText("Error encountered while running test")).toBeHidden()
  ]);

  await browser.close();
  console.log('Test Complete & Report Generated');
  
})

test.skip("Mock Response HTTP 500", async () => {

  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');
  await page.getByText('Models & Data').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.locator('#api').check()
  await page.getByTestId('newmodel-next-button').click();
  await page.click("button[data-testid=editConfigIconBtn]");
  await page.locator('input[name="name"]').fill("Mock Response HTTP 500");
  await page.locator('textarea[name="description"]').fill("My test API description");
  await page.click('label[for="modelType"] .aiv__dropdown-indicator');
  await page.getByText("Regression").click();
  await page.locator('input[name="modelAPI.url"]').fill(url + ":" + port + "/predict/tc016");
  await page.locator('.newModelApiConfig_tabContent__SMjQa > div > div > div > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("multipart/form-data").click()
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('age');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('gender');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('race');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('income');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment_length');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('total_donated');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('num_donation');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.getByText('Authentication Settings').click();
  await page.locator('.newModelApiConfig_tabContent__SMjQa > div > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText('Basic Auth').click();
  await page.getByLabel('Username').fill('test');
  await page.getByLabel('Password').fill('p@ssword');
  await page.click('button[type="submit"]');
  await expect(page.getByText("New API Configuration created")).toBeVisible();
  await page.locator('#aivModal').getByRole('button', { name: 'OK' }).click();
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Fairness for Regression' }).click();
  await page.getByText('Bar Chart (MAE)').dragTo(page.locator('div.react-grid-layout'));
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'donation' }).nth(1).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('Mock Response HTTP 500').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByRole('button', { name: 'Map API Request Parameters' }).click();
  await page.locator('div:nth-child(8) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator > .mui-style-8mmkcg').click();
  await page.getByText("total_donated_amount").click()
  await page.locator('div:nth-child(9) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("number_of_donation").click()
  await page.getByRole('button', { name: 'OK' }).click();

  console.log('Fairness Metrics Toolbox for Regression')
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByLabel('sensitive_feature-0 *').click();
  await page.getByLabel('sensitive_feature-0 *').fill('donation');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    await page.getByText("Error encountered while running test").waitFor({ state: "visible" }),
    expect(page.getByText("Error encountered while running test")).toBeVisible()
  ]);

  await browser.close();
  console.log('Test Complete & Report Generated');

});

test.skip("Mock Response HTTP 502", async () => {

  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');
  await page.getByText('Models & Data').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.locator('#api').check();
  await page.getByTestId('newmodel-next-button').click();
  await page.click("button[data-testid=editConfigIconBtn]");
  await page.locator('input[name="name"]').fill("Mock Response HTTP 502");
  await page.locator('textarea[name="description"]').fill("My test API description");
  await page.click('label[for="modelType"] .aiv__dropdown-indicator');
  await page.getByText("Regression").click();
  await page.locator('input[name="modelAPI.url"]').fill(url + ":" + port + "/predict/tc017");
  await page.locator('.newModelApiConfig_tabContent__SMjQa > div > div > div > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("multipart/form-data").click()
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('age');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('gender');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('race');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('income');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment_length');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('total_donated');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('num_donation');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.getByText('Authentication Settings').click();
  await page.locator('.newModelApiConfig_tabContent__SMjQa > div > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText('Basic Auth').click();
  await page.getByLabel('Username').fill('test');
  await page.getByLabel('Password').fill('p@ssword');
  await page.click('button[type="submit"]');
  await expect(page.getByText("New API Configuration created")).toBeVisible();
  await page.locator('#aivModal').getByRole('button', { name: 'OK' }).click();
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Fairness for Regression' }).click();
  await page.getByText('Bar Chart (MAE)').dragTo(page.locator('div.react-grid-layout'));
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'donation' }).nth(1).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('Mock Response HTTP 502').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByRole('button', { name: 'Map API Request Parameters' }).click();
  await page.locator('div:nth-child(8) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator > .mui-style-8mmkcg').click();
  await page.getByText("total_donated_amount").click()
  await page.locator('div:nth-child(9) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("number_of_donation").click()
  await page.getByRole('button', { name: 'OK' }).click();

  console.log('Fairness Metrics Toolbox for Regression')
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByLabel('sensitive_feature-0 *').click();
  await page.getByLabel('sensitive_feature-0 *').fill('donation');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    await page.getByText("Error encountered while running test").waitFor({ state: "visible" }),
    expect(page.getByText("Error encountered while running test")).toBeVisible()
  ]);

  await browser.close();
  console.log('Test Complete & Report Generated');

})

test.skip("Mock Response HTTP 503", async () => {

  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');
  await page.getByText('Models & Data').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.locator('#api').check();
  await page.getByTestId('newmodel-next-button').click();
  await page.click("button[data-testid=editConfigIconBtn]");
  await page.locator('input[name="name"]').fill("Mock Response HTTP 503");
  await page.locator('textarea[name="description"]').fill("My test API description");
  await page.click('label[for="modelType"] .aiv__dropdown-indicator');
  await page.getByText("Regression").click();
  await page.locator('input[name="modelAPI.url"]').fill(url + ":" + port + "/predict/tc018");
  await page.locator('.newModelApiConfig_tabContent__SMjQa > div > div > div > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("multipart/form-data").click()
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('age');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('gender');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('race');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('income');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment_length');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('total_donated');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('num_donation');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.getByText('Authentication Settings').click();
  await page.locator('.newModelApiConfig_tabContent__SMjQa > div > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText('Basic Auth').click();
  await page.getByLabel('Username').fill('test');
  await page.getByLabel('Password').fill('p@ssword');
  await page.click('button[type="submit"]');
  await expect(page.getByText("New API Configuration created")).toBeVisible();
  await page.locator('#aivModal').getByRole('button', { name: 'OK' }).click();
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Fairness for Regression' }).click();
  await page.getByText('Bar Chart (MAE)').dragTo(page.locator('div.react-grid-layout'));
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'donation' }).nth(1).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('Mock Response HTTP 503').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByRole('button', { name: 'Map API Request Parameters' }).click();
  await page.locator('div:nth-child(8) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator > .mui-style-8mmkcg').click();
  await page.getByText("total_donated_amount").click()
  await page.locator('div:nth-child(9) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("number_of_donation").click()
  await page.getByRole('button', { name: 'OK' }).click();

  console.log('Fairness Metrics Toolbox for Regression')
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByLabel('sensitive_feature-0 *').click();
  await page.getByLabel('sensitive_feature-0 *').fill('donation');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    await page.getByText("Error encountered while running test").waitFor({ state: "visible" }),
    expect(page.getByText("Error encountered while running test")).toBeVisible()
  ]);

  await browser.close();
  console.log('Test Complete & Report Generated');

})

test.skip("Mock Response HTTP 504", async () => {

  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');
  await page.getByText('Models & Data').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.locator('#api').check();
  await page.getByTestId('newmodel-next-button').click();
  await page.click("button[data-testid=editConfigIconBtn]");
  await page.locator('input[name="name"]').fill("Mock Response HTTP 504");
  await page.locator('textarea[name="description"]').fill("My test API description");
  await page.click('label[for="modelType"] .aiv__dropdown-indicator');
  await page.getByText("Regression").click();
  await page.locator('input[name="modelAPI.url"]').fill(url + ":" + port + "/predict/tc019");
  await page.locator('.newModelApiConfig_tabContent__SMjQa > div > div > div > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("multipart/form-data").click()
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('age');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('gender');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('race');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('income');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('employment_length');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('total_donated');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.locator('input[name="reqBodyParamName"]').click();
  await page.locator('input[name="reqBodyParamName"]').fill('num_donation');
  await page.getByTestId('addRequestPropertyBtn').click();
  await page.getByText('Authentication Settings').click();
  await page.locator('.newModelApiConfig_tabContent__SMjQa > div > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText('Basic Auth').click();
  await page.getByLabel('Username').fill('test');
  await page.getByLabel('Password').fill('p@ssword');
  await page.click('button[type="submit"]');
  await expect(page.getByText("New API Configuration created")).toBeVisible();
  await page.locator('#aivModal').getByRole('button', { name: 'OK' }).click();
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Create A Project')
  await page.getByTestId('new-project-button').getByText('Create New Project').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').click();
  await page.getByPlaceholder('Enter name of this project e.g. Credit Scoring Model Tests').fill('Testing the credit model');
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').click();
  await page.getByPlaceholder('Enter Project Description e.g. To test whether the classification model is fair towards all groups with respect to gender, robust against unexpected input and explainable.').fill('To test how the credit model aligns with the AI Verify Testing Framework');
  await page.getByPlaceholder('Enter the title to be used for the generated report').click();
  await page.getByLabel('Report TitleUse Project Name').check();
  await page.getByPlaceholder('Enter the company name').click();
  await page.getByPlaceholder('Enter the company name').fill('Fake Company Pte Ltd');
  await page.getByText('Next').click();

  console.log('Select Template')
  await page.getByText('Design your own report by dragging widgets onto a blank canvas').click();
  await page.getByText('Next').click();

  console.log('Canvas')
  await page.getByRole('button', { name: 'Fairness for Regression' }).click();
  await page.getByText('Bar Chart (MAE)').dragTo(page.locator('div.react-grid-layout'));
  await page.getByText('Next').click();

  console.log('Select Dataset & Ground Truth')
  await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('sample_reg_donation_data.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'donation' }).nth(1).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('Mock Response HTTP 504').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByRole('button', { name: 'Map API Request Parameters' }).click();
  await page.locator('div:nth-child(8) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator > .mui-style-8mmkcg').click();
  await page.getByText("total_donated_amount").click()
  await page.locator('div:nth-child(9) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
  await page.getByText("number_of_donation").click()
  await page.getByRole('button', { name: 'OK' }).click();

  console.log('Fairness Metrics Toolbox for Regression')
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByLabel('sensitive_feature-0 *').click();
  await page.getByLabel('sensitive_feature-0 *').fill('donation');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    await page.getByText("Error encountered while running test").waitFor({ state: "visible" }),
    expect(page.getByText("Error encountered while running test")).toBeVisible()
  ]);

  await browser.close();
  console.log('Test Complete & Report Generated');

})