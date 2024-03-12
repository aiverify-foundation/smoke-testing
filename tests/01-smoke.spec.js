import { test, expect, chromium } from '@playwright/test';

let url = process.env.ENVIRONMENT_URL

test.use({
  viewport: {
    width: 1920,
    height: 1080
  }
});

const TESTCASEPARAMS = [
  {
    port: "5001",
    name: "Classification 1",
    dataFileName: "sample_bc_credit_data.sav",
    dataFilePath: "./fixtures/sample_bc_credit_data.sav",
    modelFileName: "Classification 1",
    groundTruthFileName: "sample_bc_credit_data.sav",
    groundTruthFilePath: "./fixtures/sample_bc_credit_data.sav",
    modelType: "classification",
    groundTruth: "default",
    labels: ["age", "gender", "income", "race", "home_ownership", "prior_count", "loan_amount", "loan_interests"]
  },
  {
    port: "5001",
    name: "ALE, PDP and FMTC",
    dataFileName: "sample_bc_credit_data.sav",
    dataFilePath: "./fixtures/sample_bc_credit_data.sav",
    modelFileName: "Classification 1",
    groundTruthFileName: "sample_bc_credit_data.sav",
    groundTruthFilePath: "./fixtures/sample_bc_credit_data.sav",
    modelType: "classification",
    groundTruth: "default",
    labels: ["age", "gender", "income", "race", "home_ownership", "prior_count", "loan_amount", "loan_interests"]
  },
  {
    port: "5000",
    name: "Regression 2",
    dataFileName: "sample_reg_donation_data.sav",
    dataFilePath: "./fixtures/sample_reg_donation_data.sav",
    modelFileName: "Regression 2",
    groundTruthFileName: 'sample_reg_donation_data.sav',
    groundTruthFilePath: "./fixtures/sample_reg_donation_data.sav",
    modelType: "regression",
    groundTruth: "donation",
    labels: ["age", "gender", "race", "income", "employment", "employment_length", "total_donated", "num_donation"]
  },
]

TESTCASEPARAMS.forEach(testCase =>
  test(testCase.name, async () => {

    const browser = await chromium.launch();
    const context = await browser.newContext({
    })

    const page = await context.newPage();
    await page.goto('http://127.0.0.1:3000/home');

    if (testCase.name != "ALE, PDP and FMTC") {
      console.log('Add Dataset')
      await page.getByText('Models & Data').click();
      expect.soft(page.getByText('Models & Data')).toBeVisible()
      await page.getByTestId('open-dataset-list-button').locator('span').click();
      await page.getByTestId('add-new-datasets-button').click();
      await page.getByText('Click to Browse').click();
      await page.locator("input[name='file-dropbox']").setInputFiles(testCase.dataFilePath);
      await page.getByTestId('upload-datasets-button').click();
      await page.getByRole('button', { name: 'Back to all Datasets >' }).click();
      await page.getByTestId('datasets-back-button').click();

      console.log('Add Model')
      await page.getByTestId('open-model-list-button').locator('span').click();
      await page.getByTestId('add-new-models-button').click();
      await page.locator('#api').check();
      await page.getByTestId('newmodel-next-button').click();
      await page.click("button[data-testid=editConfigIconBtn]");
      await page.locator('input[name="name"]').fill(testCase.modelFileName);
      await page.locator('textarea[name="description"]').fill("My test API description");
      await page.click('label[for="modelType"] .aiv__dropdown-indicator');
      if (testCase.name != "Classification 1")
        await page.getByText("Regression").click();
      await page.locator('input[name="modelAPI.url"]').fill(url + ":" + testCase.port + "/predict/tc013");
      await page.locator('.newModelApiConfig_tabContent__SMjQa > div > div > div:nth-child(2) > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
      await page.getByText('enabled').click()
      await page.getByLabel('Batch LimitDefaults to -1, which means there is no limit.').fill('100');
      await page.locator('input[name="reqBodyParamName"]').click();
      await page.locator('input[name="reqBodyParamName"]').fill(testCase.labels[0]);
      await page.getByTestId('addRequestPropertyBtn').click();
      await page.locator('input[name="reqBodyParamName"]').click();
      await page.locator('input[name="reqBodyParamName"]').fill(testCase.labels[1]);
      await page.getByTestId('addRequestPropertyBtn').click();
      await page.locator('input[name="reqBodyParamName"]').click();
      await page.locator('input[name="reqBodyParamName"]').fill(testCase.labels[2]);
      await page.getByTestId('addRequestPropertyBtn').click();
      await page.locator('input[name="reqBodyParamName"]').click();
      await page.locator('input[name="reqBodyParamName"]').fill(testCase.labels[3]);
      await page.getByTestId('addRequestPropertyBtn').click();
      await page.locator('input[name="reqBodyParamName"]').click();
      await page.locator('input[name="reqBodyParamName"]').fill(testCase.labels[4]);
      await page.getByTestId('addRequestPropertyBtn').click();
      await page.locator('input[name="reqBodyParamName"]').click();
      await page.locator('input[name="reqBodyParamName"]').fill(testCase.labels[5]);
      await page.getByTestId('addRequestPropertyBtn').click();
      await page.locator('input[name="reqBodyParamName"]').click();
      await page.locator('input[name="reqBodyParamName"]').fill(testCase.labels[6]);
      await page.getByTestId('addRequestPropertyBtn').click();
      await page.locator('input[name="reqBodyParamName"]').click();
      await page.locator('input[name="reqBodyParamName"]').fill(testCase.labels[7]);
      await page.getByTestId('addRequestPropertyBtn').click();
      await page.getByText('Authentication Settings').click();
      await page.getByText('Response Properties').click();
      await page.getByText('Connection Settings').nth(1).click();
      await page.getByLabel('Connection Timeout (seconds)The connection timeout when connecting to the server (in seconds). Defaults to -1, which means the timeout is set to httpx‘s default timeout.').click();
      await page.getByLabel('Connection Timeout (seconds)The connection timeout when connecting to the server (in seconds). Defaults to -1, which means the timeout is set to httpx‘s default timeout.').fill('10');
      await page.getByLabel('Max ConnectionsThe maximum number of concurrent connection(s) that can be made to the server. Defaults to -1, which means there is no maximum number of connection(s).').click();
      await page.getByLabel('Max ConnectionsThe maximum number of concurrent connection(s) that can be made to the server. Defaults to -1, which means there is no maximum number of connection(s).').fill('50');
      await page.getByLabel('Rate LimitThe maximum number of request(s) allowed to be made to the server per second. Defaults to -1, which means there is no limit to the number of requests(s) made to the server.').click();
      await page.getByLabel('Rate LimitThe maximum number of request(s) allowed to be made to the server per second. Defaults to -1, which means there is no limit to the number of requests(s) made to the server.').fill('300');
      await page.getByLabel('Rate Limit Timeout (seconds)The connection timeout when connecting to the server(in seconds) when there is rate limiting. Defaults to -1, which means the timeout is set to httpx‘s default timeout.').click();
      await page.getByLabel('Rate Limit Timeout (seconds)The connection timeout when connecting to the server(in seconds) when there is rate limiting. Defaults to -1, which means the timeout is set to httpx‘s default timeout.').fill('300');
      await page.click('button[type="submit"]');
      await expect(page.getByText("New API Configuration created")).toBeVisible();
      await page.locator('#aivModal').getByRole('button', { name: 'OK' }).click();
      await page.getByRole('img', { name: 'AI Verify' }).click();
    }

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

    if (testCase.name == "Classification 1")
      await page.getByText('AI Verify Summary Report for Classification Model').nth(1).click();
    else if (testCase.name == "Regression 2")
      await page.getByText('AI Verify Summary Report for Regression Model').nth(1).click();
    else
      await page.getByText('Blank CanvasDesign your own report by dragging widgets onto a blank canvas').click();

    await page.getByText('Next').click();

    console.log('Canvas')

    if (testCase.name == "ALE, PDP and FMTC") {
      await page.getByRole('button', { name: 'Accumulated Local Effect' }).click();
      await page.getByText('ALE Line Graphs').dragTo(page.locator('div.react-grid-layout'));
      await page.locator('button:nth-child(3)').first().click();
      await page.getByRole('button', { name: 'Add Page' }).click();
      await page.getByRole('button', { name: 'Partial Dependence Plot' }).click();
      await page.getByText('PDP Line Graphs').dragTo(page.locator('div.react-grid-layout'));
      await page.locator('button:nth-child(3)').first().click();
      await page.getByRole('button', { name: 'Add Page' }).click();
      await page.getByRole('button', { name: 'Fairness for Classification' }).click();
      await page.getByText('Bar Chart (Selected)').dragTo(page.locator('div.react-grid-layout'));
      await page.getByText('Next').click();
    }
    else {
      await page.getByText('Next').click();
      await page.getByText('Next').click();
    }

    console.log('Select Dataset & Ground Truth')
    await page.getByRole('button', { name: 'Choose Dataset' }).first().click();
    await page.getByText(testCase.dataFileName).click();
    await page.getByRole('button', { name: 'Use Dataset' }).click();
    await page.getByRole('button', { name: 'Choose Dataset' }).click();
    await page.getByText(testCase.groundTruthFileName).click();
    await page.getByRole('button', { name: 'Use Dataset' }).click();
    await page.getByRole('button', { name: '​' }).click();

    if (testCase.modelType == "classification")
      await page.getByRole('option', { name: testCase.groundTruth }).click()
    else
      await page.getByRole('option', { name: testCase.groundTruth }).nth(1).click()

    console.log('Select Model')
    await page.getByRole('button', { name: 'Choose Model' }).click();
    await page.getByText(testCase.modelFileName).click();
    await page.getByRole('button', { name: 'Use Model' }).click();
    await page.getByRole('button', { name: 'Map API Request Parameters' }).click();

    if (testCase.modelType != "classification") {
      await page.locator('div:nth-child(8) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator > .mui-style-8mmkcg').click();
      await page.getByText("total_donated_amount").click()
      await page.locator('div:nth-child(9) > .requestParamsMapModal_datasetCell__A1Ti7 > .selectInput_selectInput__Dtfb2 > label > .mui-style-fyq6mk-container > .aiv__control > .aiv__indicators > .aiv__indicator').click();
      await page.getByText("number_of_donation").click()
    }

    await page.getByRole('button', { name: 'OK' }).click();

    if (testCase.name != "ALE, PDP and FMTC") {
      console.log('SHAP ToolBox')
      await page.locator('[id="algocard-aiverify\\.stock\\.shap_toolbox\\:shap_toolbox"] div').getByRole('button', { name: 'Open' }).click();
      await page.getByRole('button', { name: 'Path of the Background Path ​' }).click();
      await page.getByRole('option').filter({ hasText: testCase.dataFileName }).click()
      await page.getByLabel('Size of the Background *').click();
      await page.getByLabel('Size of the Background *').fill('5');
      await page.getByLabel('Size of the Test Dataset *').click();
      await page.getByLabel('Size of the Test Dataset *').fill('5');
      await page.getByRole('button', { name: 'OK' }).click();

      console.log('Robustness Toolbox')
      await page.locator('[id="algocard-aiverify\\.stock\\.robustness_toolbox\\:robustness_toolbox"] div').getByRole('button', { name: 'Open' }).click();
      await page.getByRole('button', { name: 'Annotated ground truth path' }).click();
      await page.getByRole('option').filter({ hasText: testCase.dataFileName }).click();
      await page.getByLabel('Name of column containing image file names').click();
      await page.getByLabel('Name of column containing image file names').fill('NA');
      await page.getByRole('button', { name: 'OK' }).click();
    }

    if (testCase.modelType == "classification") {
      await page.locator('[id="algocard-aiverify\\.stock\\.fairness_metrics_toolbox_for_classification\\:fairness_metrics_toolbox_for_classification"]').getByRole('button', { name: 'Open' }).click();
      await page.getByLabel('sensitive_feature-0 *').click();
      await page.getByLabel('sensitive_feature-0 *').fill('gender');
      await page.getByRole('button', { name: 'Annotated labels path ​' }).click();
      await page.getByRole('option').filter({ hasText: testCase.dataFileName }).click();
      await page.getByLabel('Name of column containing image file names *').fill('NA');
    }
    else {
      console.log('Fairness Metrics Toolbox for Regression')
      await page.locator('[id="algocard-aiverify\\.stock\\.fairness_metrics_toolbox_for_regression\\:fairness_metrics_toolbox_for_regression"]').getByRole('button', { name: 'Open' }).click();
      await page.getByLabel('sensitive_feature-0 *').click();
      await page.getByLabel('sensitive_feature-0 *').fill('gender');
    }
    await page.getByRole('button', { name: 'OK' }).click();

    if (testCase.name != "ALE, PDP and FMTC") {
      console.log('Transparency Process Checklist')
      await page.locator('[id="ibcard-aiverify\\.stock\\.process_checklist\\:transparency_process_checklist"]').getByRole('button', { name: 'Open' }).click();
      await page.getByTestId('completed-1.1.1').nth(1).click();
      await page.getByTestId('completed-1.1.2').nth(1).click();
      await page.getByTestId('completed-1.2.1').nth(1).click();
      await page.getByTestId('completed-1.2.2').nth(1).click();
      await page.getByTestId('completed-1.2.3').nth(1).click();
      await page.getByTestId('completed-1.2.4').nth(1).click();
      await page.getByTestId('completed-1.2.5').nth(1).click();
      await page.getByTestId('completed-1.3.1').nth(1).click();
      await page.locator('#aivModal').getByTestId('CloseIcon').click();

      console.log('Explainability Process Checklist')
      await page.locator('[id="ibcard-aiverify\\.stock\\.process_checklist\\:explainability_process_checklist"]').getByRole('button', { name: 'Open' }).click();
      await page.getByTestId('completed-2.1.1').nth(1).click();
      await page.locator('#aivModal path').click();

      console.log('Reproducibility Process Checklist')
      await page.locator('[id="ibcard-aiverify\\.stock\\.process_checklist\\:reproducibility_process_checklist"]').getByRole('button', { name: 'Open' }).click();
      await page.getByTestId('completed-3.1.1').nth(1).click();
      await page.getByTestId('completed-3.2.1').nth(1).click();
      await page.getByTestId('completed-3.3.1').nth(1).click();
      await page.getByTestId('completed-3.4.1').nth(1).click();
      await page.getByTestId('completed-3.5.1').nth(1).click();
      await page.getByTestId('completed-3.6.1').nth(1).click();
      await page.getByTestId('completed-3.7.1').nth(1).click();
      await page.getByTestId('completed-3.8.1').nth(1).click();
      await page.getByTestId('completed-3.9.1').nth(1).click();
      await page.getByTestId('completed-3.9.2').nth(1).click();
      await page.getByTestId('completed-3.10.1').nth(1).click();
      await page.getByTestId('completed-3.11.1').nth(1).click();
      await page.getByTestId('completed-3.12.1').nth(1).click();
      await page.getByTestId('completed-3.13.1').nth(1).click();
      await page.getByTestId('completed-3.14.1').nth(1).click();
      await page.locator('#aivModal').getByTestId('CloseIcon').click();

      console.log('Safety Process Checklist')
      await page.locator('[id="ibcard-aiverify\\.stock\\.process_checklist\\:safety_process_checklist"]').getByRole('button', { name: 'Open' }).click();
      await page.getByTestId('completed-4.1.1').nth(1).click();
      await page.getByTestId('completed-4.2.1').nth(1).click();
      await page.getByTestId('completed-4.3.1').nth(1).click();
      await page.getByTestId('completed-4.4.1').nth(1).click();
      await page.getByTestId('completed-4.5.1').nth(1).click();
      await page.getByTestId('completed-4.5.2').nth(1).click();
      await page.getByTestId('completed-4.5.3').nth(1).click();
      await page.getByTestId('completed-4.5.4').nth(1).click();
      await page.getByTestId('completed-4.6.1').nth(1).click();
      await page.locator('#aivModal path').click();

      console.log('Robustness Process Checklist')
      await page.locator('[id="ibcard-aiverify\\.stock\\.process_checklist\\:robustness_process_checklist"]').getByRole('button', { name: 'Open' }).click();
      await page.getByTestId('completed-6.1.1').nth(1).click();
      await page.getByTestId('completed-6.2.1').nth(1).click();
      await page.getByTestId('completed-6.3.1').nth(1).click();
      await page.getByTestId('completed-6.4.1').nth(1).click();
      await page.getByTestId('completed-6.5.1').nth(1).click();
      await page.getByTestId('completed-6.5.2').nth(1).click();
      await page.getByTestId('completed-6.5.3').nth(1).click();
      await page.locator('#aivModal').getByTestId('CloseIcon').click();

      console.log('Fairness Process Checklist')
      await page.locator('[id="ibcard-aiverify\\.stock\\.process_checklist\\:fairness_process_checklist"]').getByRole('button', { name: 'Open' }).click();
      await page.getByTestId('completed-7.1.1').nth(1).click();
      await page.getByTestId('completed-7.2.1').nth(1).click();
      await page.getByTestId('completed-7.3.1').nth(1).click();
      await page.getByTestId('completed-7.4.1').nth(1).click();
      await page.getByTestId('completed-7.4.2').nth(1).click();
      await page.getByTestId('completed-7.5.1').nth(1).click();
      await page.getByTestId('completed-7.6.1').nth(1).click();
      await page.getByTestId('completed-7.7.1').nth(1).click();
      await page.getByTestId('completed-7.8.1').nth(1).click();
      await page.getByTestId('completed-7.9.1').nth(1).click();
      await page.locator('#aivModal path').click();

      console.log('Accountability Process Checklist')
      await page.locator('[id="ibcard-aiverify\\.stock\\.process_checklist\\:accountability_process_checklist"]').getByRole('button', { name: 'Open' }).click();
      await page.getByTestId('completed-9.1.1').nth(1).click();
      await page.getByTestId('completed-9.1.2').nth(1).click();
      await page.getByTestId('completed-9.1.3').nth(1).click();
      await page.getByTestId('completed-9.2.1').nth(1).click();
      await page.getByTestId('completed-9.3.1').nth(1).click();
      await page.getByTestId('completed-9.4.1').nth(1).click();
      await page.getByTestId('completed-9.5.1').nth(1).click();
      await page.getByTestId('completed-9.5.2').nth(1).click();
      await page.locator('#aivModal').getByTestId('CloseIcon').click();

      console.log('Human Agency & Oversight Process Checklist')
      await page.locator('[id="ibcard-aiverify\\.stock\\.process_checklist\\:human_agency_oversight_process_checklist"]').getByRole('button', { name: 'Open' }).click();
      await page.getByTestId('completed-10.1.1').nth(1).click();
      await page.getByTestId('completed-10.1.2').nth(1).click();
      await page.getByTestId('completed-10.2.1').nth(1).click();
      await page.getByTestId('completed-10.2.2').nth(1).click();
      await page.getByTestId('completed-10.2.3').nth(1).click();
      await page.getByTestId('completed-10.3.1').nth(1).click();
      await page.getByTestId('completed-10.4.1').nth(1).click();
      await page.getByTestId('completed-10.5.1').nth(1).click();
      await page.locator('#aivModal').getByTestId('CloseIcon').click();

      console.log('Security Process Checklist')
      await page.locator('[id="ibcard-aiverify\\.stock\\.process_checklist\\:security_process_checklist"]').getByRole('button', { name: 'Open' }).click();
      await page.getByTestId('completed-5.1.1').nth(1).click();
      await page.getByTestId('completed-5.2.1').nth(1).click();
      await page.getByTestId('completed-5.3.1').nth(1).click();
      await page.getByTestId('completed-5.3.2').nth(1).click();
      await page.getByTestId('completed-5.4.1').nth(1).click();
      await page.getByTestId('completed-5.4.2').nth(1).click();
      await page.getByTestId('completed-5.4.3').nth(1).click();
      await page.getByTestId('completed-5.4.4').nth(1).click();
      await page.getByTestId('completed-5.5.1').nth(1).click();
      await page.getByTestId('completed-5.5.2').nth(1).click();
      await page.getByTestId('completed-5.5.3').nth(1).click();
      await page.getByTestId('completed-5.6.1').nth(1).click();
      await page.getByTestId('completed-5.6.2').nth(1).click();
      await page.getByTestId('completed-5.7.1').nth(1).click();
      await page.locator('#aivModal path').click();

      console.log('Data Governance Process Checklist')
      await page.locator('[id="ibcard-aiverify\\.stock\\.process_checklist\\:data_governance_process_checklist"]').getByRole('button', { name: 'Open' }).click();
      await page.getByTestId('completed-8.1.1').nth(1).click();
      await page.getByTestId('completed-8.2.1').nth(1).click();
      await page.getByTestId('completed-8.3.1').nth(1).click();
      await page.getByTestId('completed-8.4.1').nth(1).click();
      await page.locator('#aivModal').getByTestId('CloseIcon').click();

      console.log('Inclusive Growth, Societal & Environmental Well-being Process Checklist')
      await page.locator('[id="ibcard-aiverify\\.stock\\.process_checklist\\:inclusive_growth_process_checklist"]').getByRole('button', { name: 'Open' }).click();
      await page.getByTestId('completed-11.1.1').nth(1).click();
      await page.locator('#aivModal path').click();

      console.log('Organisational Considerations Process Checklist')
      await page.locator('[id="ibcard-aiverify\\.stock\\.process_checklist\\:organisational_considerations_process_checklist"]').getByRole('button', { name: 'Open' }).click();
      await page.getByTestId('completed-12.1.1').first().click();
      await page.getByTestId('completed-12.2.1').first().click();
      await page.getByTestId('completed-12.3.1').first().click();
      await page.getByTestId('completed-12.4.1').first().click();
      await page.getByTestId('completed-12.5.1').nth(1).click();
      await page.getByTestId('completed-12.6.1').first().click();
      await page.locator('#aivModal path').click();
    }

    if (testCase.modelType == "classification") {
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
    }
    await page.getByText('Next').click();
    await page.getByRole('button', { name: 'Proceed' }).click();

    console.log('Running Tests & Generating Report')
    const [page1] = await Promise.all([
      page.getByText("Test Error").waitFor({ state: "hidden" }),
      expect(page.getByText("Test Error")).toBeHidden(),
      page.waitForEvent('popup'),
      page.getByRole('button', { name: 'View Report' }).click()
    ]);
    await page.getByRole('img', { name: 'AI Verify' }).click();

    await browser.close();

    console.log('Test Complete & Report Generated')

    // console.log('Clean Up')

    // console.log('Delete Project')
    // await page.goto('http://127.0.0.1:3000/home');
    // await page.getByTestId('aiv-projectcard-delete-project').click();
    // await page.getByRole('button', { name: 'Proceed' }).click();

    // console.log('Delete Dataset')
    // await page.getByText('Models & Data').click();
    // await page.getByTestId('open-dataset-list-button').locator('span').click();
    // await page.getByRole('checkbox', { name: 'Select row' }).check();
    // await page.getByRole('button', { name: 'Delete' }).click();
    // await page.getByRole('button', { name: 'Delete Files' }).click();
    // await page.getByTestId('datasets-back-button').click();

    // console.log('Delete Model')
    // await page.getByTestId('open-model-list-button').locator('span').click();
    // await page.getByRole('checkbox', { name: 'Select all rows' }).check();
    // await page.getByRole('button', { name: 'Delete' }).click();
    // await page.getByRole('button', { name: 'Delete Files' }).click();
    // await page.getByRole('img', { name: 'AI Verify' }).click();
  })
)