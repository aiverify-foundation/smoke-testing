import { test, expect, chromium } from '@playwright/test';

test.use({
  viewport: {
    width: 1920,
    height: 1080
  }
});

test(`FMTC Plugin`, async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: "./test-results"
    }
  })

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');

  console.log('Add Dataset')
  await page.getByText('Models & Data').click();
  await page.getByTestId('open-dataset-list-button').locator('span').click();
  await page.getByTestId('add-new-datasets-button').click();
  await page.getByText('Click to Browse').click();
  await page.locator("input[name='file-dropbox']").setInputFiles('./aiverify-test-samples/data/pickle_pandas_tabular_loan_testing.sav');
  await page.getByTestId('upload-datasets-button').click();
  await page.getByRole('button', { name: 'Back to all Datasets >' }).click();
  await page.getByTestId('datasets-back-button').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.getByText('Upload AI Model').click();
  await page.getByTestId('newmodel-next-button').click();
  await page.getByText('Click to Browse').click();
  await page.locator("input[name='file']").setInputFiles('./aiverify-test-samples/models/sklearn/1.2.2/multiclass_classification_loan_sklearn.ensemble._bagging.BaggingClassifier.sav');
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
  await page.locator('div:nth-child(4) > .header_reportNavBtn__0fDU_').click();

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
  await page.getByText('pickle_pandas_tabular_loan_testing.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('pickle_pandas_tabular_loan_testing.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'Interest_Rate' }).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('multiclass_classification_loan_sklearn.ensemble._bagging.BaggingClassifier.sav').click();
  await page.getByRole('button', { name: 'Use Model' }).click();

  console.log('Fairness Metrics Toolbox for Classification')
  await page.locator('[id="algocard-aiverify\\.stock\\.fairness_metrics_toolbox_for_classification\\:fairness_metrics_toolbox_for_classification"]').getByRole('button', { name: 'Open' }).click();
  await page.getByLabel('sensitive_feature-0 *').click();
  await page.getByLabel('sensitive_feature-0 *').fill('Gender');
  await page.getByRole('button', { name: 'Add Item' }).click();
  await page.getByLabel('sensitive_feature-1 *').click();
  await page.getByLabel('sensitive_feature-1 *').fill('Home_Owner');
  await page.getByRole('button', { name: 'Annotated labels path' }).click();
  await page.getByRole('listbox', { name: 'Annotated labels path' }).filter({ hasText: 'loan'}).click();
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

  console.log('Test Complete & Report Generated')

})

test(`ALE Plugin`, async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: "./test-results"
    }
  })

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');

  console.log('Add Model')
  await page.getByText('Models & Data').click();
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.getByText('Upload AI Model').click();
  await page.getByTestId('newmodel-next-button').click();
  await page.getByText('Click to Browse').click();
  await page.locator("input[name='file']").setInputFiles('./aiverify-test-samples/models/xgboost/1.7.5/multiclass_classification_loan_xgboost.sklearn.XGBClassifier.sav');
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
  await page.locator('div:nth-child(4) > .header_reportNavBtn__0fDU_').click();

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
  await page.getByText('pickle_pandas_tabular_loan_testing.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('pickle_pandas_tabular_loan_testing.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'Interest_Rate' }).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('multiclass_classification_loan_xgboost.sklearn.XGBClassifier.sav').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: 'View Report' }).click()
  ]);
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Test Complete & Report Generated')

})

test(`FMTR Plugin`, async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: "./test-results"
    }
  })

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');

  console.log('Add Dataset')
  await page.getByText('Models & Data').click();
  await page.getByTestId('open-dataset-list-button').locator('span').click();
  await page.getByTestId('add-new-datasets-button').click();
  await page.getByText('Click to Browse').click();
  await page.locator("input[name='file-dropbox']").setInputFiles('./aiverify-test-samples/data/pickle_pandas_tabular_insurance_testing.sav');
  await page.getByTestId('upload-datasets-button').click();
  await page.getByRole('button', { name: 'Back to all Datasets >' }).click();
  await page.getByTestId('datasets-back-button').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.getByText('Upload AI Model').click();
  await page.getByTestId('newmodel-next-button').click();
  await page.getByText('Click to Browse').click();
  await page.locator("input[name='file']").setInputFiles('./aiverify-test-samples/models/sklearn/1.2.2/regression_insurance_sklearn.ensemble._forest.ExtraTreesRegressor.sav');
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
  await page.locator('div:nth-child(4) > .header_reportNavBtn__0fDU_').click();

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
  await page.getByText('pickle_pandas_tabular_insurance_testing.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('pickle_pandas_tabular_insurance_testing.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'charges' }).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('regression_insurance_sklearn.ensemble._forest.ExtraTreesRegressor.sav').click();
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

  console.log('Test Complete & Report Generated')

})

test(`PDP Plugin`, async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: "./test-results"
    }
  })

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');

  console.log('Add Dataset')
  await page.getByText('Models & Data').click();
  await page.getByTestId('open-dataset-list-button').locator('span').click();
  await page.getByTestId('add-new-datasets-button').click();
  await page.getByText('Click to Browse').click();
  await page.locator("input[name='file-dropbox']").setInputFiles('./aiverify-test-samples/data/pickle_pandas_tabular_compas_testing.sav');
  await page.getByTestId('upload-datasets-button').click();
  await page.getByRole('button', { name: 'Back to all Datasets >' }).click();
  await page.getByTestId('datasets-back-button').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.getByText('Upload AI Model').click();
  await page.getByTestId('newmodel-next-button').click();
  await page.getByText('Click to Browse').click();
  await page.locator("input[name='file']").setInputFiles('./aiverify-test-samples/models/xgboost/1.7.5/binary_classification_compas_xgboost.sklearn.XGBClassifier.sav');
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
  await page.locator('div:nth-child(4) > .header_reportNavBtn__0fDU_').click();

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
  await page.getByText('pickle_pandas_tabular_compas_testing.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('pickle_pandas_tabular_compas_testing.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'two_year_recid' }).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('binary_classification_compas_xgboost.sklearn.XGBClassifier.sav').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  await page.getByText('Next').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  console.log('Running Tests & Generating Report')
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: 'View Report' }).click()
  ]);
  await page.getByRole('img', { name: 'AI Verify' }).click();

  console.log('Test Complete & Report Generated')

})

test(`Robustness Plugin`, async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: "./test-results"
    }
  })

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');

  console.log('Add Dataset')
  await page.getByText('Models & Data').click();
  await page.getByTestId('open-dataset-list-button').locator('span').click();
  await page.getByTestId('add-new-datasets-button').click();
  await page.getByText('Click to Browse').click();
  await page.locator("input[name='file-dropbox']").setInputFiles('./fixtures/pickle_pandas_tabular_loan_testing_100.sav');
  await page.getByTestId('upload-datasets-button').click();
  await page.getByRole('button', { name: 'Back to all Datasets >' }).click();
  await page.getByTestId('datasets-back-button').click();

  console.log('Add Model')
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.getByText('Upload AI Model').click();
  await page.getByTestId('newmodel-next-button').click();
  await page.getByText('Click to Browse').click();
  await page.locator("input[name='file']").setInputFiles('./aiverify-test-samples/models/xgboost/1.7.5/multiclass_classification_loan_xgboost.sklearn.XGBClassifier.sav');
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
  await page.locator('div:nth-child(4) > .header_reportNavBtn__0fDU_').click();

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
  await page.getByText('pickle_pandas_tabular_loan_testing_100.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('pickle_pandas_tabular_loan_testing_100.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'Interest_Rate' }).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('multiclass_classification_loan_xgboost.sklearn.XGBClassifier.sav').click();
  await page.getByRole('button', { name: 'Use Model' }).click();
  
  console.log('Robustness ToolBox')
  await page.locator('[id="algocard-aiverify\\.stock\\.robustness_toolbox\\:robustness_toolbox"] div').getByRole('button', { name: 'Open' }).click();
  await page.getByRole('button', { name: 'Annotated ground truth path' }).click();
  await page.getByRole('listbox', { name: 'Annotated ground truth path' }).filter({ hasText: '100' }).click();
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

  console.log('Test Complete & Report Generated')

})

test(`SHAP Toolbox Plugin`, async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: "./test-results"
    }
  })

  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/home');

  console.log('Add Model')
  await page.getByText('Models & Data').click();
  await page.getByTestId('open-model-list-button').locator('span').click();
  await page.getByTestId('add-new-models-button').click();
  await page.getByText('Upload AI Model').click();
  await page.getByTestId('newmodel-next-button').click();
  await page.getByText('Click to Browse').click();
  await page.locator("input[name='file']").setInputFiles('./aiverify-test-samples/models/lightgbm/3.3.5/binary_classification_compas_lightgbm.sklearn.LGBMClassifier.sav');
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
  await page.locator('div:nth-child(4) > .header_reportNavBtn__0fDU_').click();

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
  await page.getByText('pickle_pandas_tabular_compas_testing.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: 'Choose Dataset' }).click();
  await page.getByText('pickle_pandas_tabular_compas_testing.sav').click();
  await page.getByRole('button', { name: 'Use Dataset' }).click();
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'two_year_recid' }).click();

  console.log('Select Model')
  await page.getByRole('button', { name: 'Choose Model' }).click();
  await page.getByText('binary_classification_compas_lightgbm.sklearn.LGBMClassifier.sav').click();
  await page.getByRole('button', { name: 'Use Model' }).click();

  console.log('SHAP ToolBox')
  await page.locator('[id="algocard-aiverify\\.stock\\.shap_toolbox\\:shap_toolbox"] div').getByRole('button', { name: 'Open' }).click();
  await page.getByRole('button', { name: 'Path of the Background Path ​' }).click();
  await page.getByRole('option').filter({ hasText: 'compas'}).click()
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

  console.log('Test Complete & Report Generated')

})