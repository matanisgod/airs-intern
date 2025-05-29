import { test, expect } from '@playwright/test';

test.describe('execution Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
  test('redirect', async ({ page }) => {
    await expect(page).toHaveURL(/\/execution$/);
  });
  test('Header', async ({ page }) => {
    await expect(page.getByText('PQ Automation Test')).toBeVisible();
    const pageButton = page.getByTestId('LastPageIcon');
    await expect(pageButton).toBeVisible();
    await pageButton.click();
    await page.waitForTimeout(100);
    await expect(page).toHaveURL(/\/caseset$/);
  });
  test('Refresh button', async ({ page }) => {
    const refreshButton = page.getByTestId('RefreshIcon');
    await expect(refreshButton).toBeVisible();
    await refreshButton.click();
    await page.waitForTimeout(100);
    // api
  });
  test('Stop all button - Yes', async ({ page }) => {
    const stopAllButton = page.getByTestId('StopCircleIcon');
    await expect(stopAllButton).toBeVisible();
    await stopAllButton.click();
    await page.waitForTimeout(100);
    await expect(page.getByText('Do you really want to stop all?')).toBeVisible();
    const yesButton = page.getByRole('button', { name: 'Yes' });
    await yesButton.click();
    await page.waitForTimeout(100);
    // api
  });
  test('Stop all button - No', async ({ page }) => {
    const stopAllButton = page.getByTestId('StopCircleIcon');
    await expect(stopAllButton).toBeVisible();
    await stopAllButton.click();
    await page.waitForTimeout(100);
    await expect(page.getByText('Do you really want to stop all?')).toBeVisible();
    const noButton = page.getByRole('button', { name: 'No' });
    await noButton.click();
    await page.waitForTimeout(100);
    await expect(page.getByText('Do you really want to stop all?')).not.toBeVisible();
  });
  test('Create button - Submit - ok', async ({ page }) => {
    const createButton = page.getByTestId('CreateIcon');
    await expect(createButton).toBeVisible();
    await createButton.click();
    await page.waitForTimeout(100);
    await expect(page.getByText('Create execution')).toBeVisible();
    const submitButton = page.getByRole('button', { name: 'Submit' });
    await expect(submitButton).toBeVisible();
    // form 채우기
    await submitButton.click();
    await page.waitForTimeout(100);
    // api
  });
  test('Create button - Submit - error', async ({ page }) => {
    const createButton = page.getByTestId('CreateIcon');
    await expect(createButton).toBeVisible();
    await createButton.click();
    await page.waitForTimeout(100);
    await expect(page.getByText('Create execution')).toBeVisible();
    const submitButton = page.getByRole('button', { name: 'Submit' });
    await expect(submitButton).toBeVisible();
    await submitButton.click();
    await page.waitForTimeout(100);
    await expect(page.getByText('Field required').first()).toBeVisible();
  });
  test('Create button - Cancel', async ({ page }) => {
    const createButton = page.getByTestId('CreateIcon');
    await expect(createButton).toBeVisible();
    await createButton.click();
    await page.waitForTimeout(100);
    await expect(page.getByText('Create execution')).toBeVisible();
    const cancelButton = page.getByRole('button', { name: 'Cancel' });
    await expect(cancelButton).toBeVisible();
    await cancelButton.click();
    await page.waitForTimeout(100);
    await expect(page.getByText('Create execution')).not.toBeVisible();
  });
  test('Stop button - Yes', async ({ page }) => {
    const stopButton = page.getByRole('button', { name: 'Stop' }).first();
    await expect(stopButton).toBeVisible();
    await stopButton.click();
    await page.waitForTimeout(100);
    await expect(page.getByText('Do you really want to stop?')).toBeVisible();
    const yesButton = page.getByRole('button', { name: 'Yes' });
    await expect(yesButton).toBeVisible();
    await yesButton.click();
    await page.waitForTimeout(100);
    // api
  });
  test('Stop button - No', async ({ page }) => {
    const stopButton = page.getByRole('button', { name: 'Stop' }).first();
    await expect(stopButton).toBeVisible();
    await stopButton.click();
    await page.waitForTimeout(100);
    await expect(page.getByText('Do you really want to stop?')).toBeVisible();
    const noButton = page.getByRole('button', { name: 'No' });
    await expect(noButton).toBeVisible();
    await noButton.click();
    await page.waitForTimeout(100);
    await expect(page.getByText('Do you really want to stop?')).not.toBeVisible();
  });
  test('Tables', async ({ page }) => {
    // table 넘어갈 때마다 api
    await page.waitForTimeout(1000);

    const executionLogRows = page.locator(
      'div[role="row"][data-rowindex] div[data-field="performer"]',
    );
    const rowCount = await executionLogRows.count();
    for (let i = 0; i < rowCount; i++) {
      const row = executionLogRows.nth(i);
      await row.click();
      await page.waitForTimeout(100);
      const isNoCaseLog = await page.locator('text=No case log').isVisible();
      const isSelectExecutionLog = await page
        .locator('text=Select execution log')
        .isVisible();
      if (!isNoCaseLog && !isSelectExecutionLog) break;
    }
    const hasPass = await page.getByText('pass').count();
    const hasFail = await page.getByText('fail').count();
    expect(hasPass + hasFail).toBeGreaterThan(0);

    const caseLogRow = page
      .locator('div[role="row"][data-rowindex] div[data-field="caseName"]')
      .first();
    await caseLogRow.click();
    await page.waitForTimeout(100);
    const hasTrue = await page.getByText('True').count();
    const hasFalse = await page.getByText('False').count();
    expect(hasTrue + hasFalse).toBeGreaterThan(0);

    const detailRow = page
      .locator('div[role="row"][data-rowindex] div[data-field="checkType"]')
      .first();
    await detailRow.click();
    await page.waitForTimeout(100);
    const rjvs = page.locator('.react-json-view');
    await expect(rjvs).toHaveCount(2);
  });
});
// test.describe('caseset Page', () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto('/caseset');
//   });
//   test('Header', async ({ page }) => {
//     await expect(page.getByText('PQ Automation Test')).toBeVisible();
//     // page button 누르고 navigate 확인
//   });
//   test('Case set table', async ({ page }) => {
//     // Case set table 내용 보이는지 확인
//   });
//   test('Case table', async ({ page }) => {
//     // Case table 내용 보이는지 확인
//     // ??? 누르고 ??? 확인
//   });
//   test('Expected result table', async ({ page }) => {
//     // Expected result table 내용 보이는지 확인
//     // ??? 누르고 ??? 확인
//   });
//   test('Data json', async ({ page }) => {
//     // Data json 보이는지 확인
//     // ??? 누르고 ??? 확인
//     // ??? 누르고 ??? 확인
//   });
//   test('Refresh button', async ({ page }) => {
//     // refresh button 되는지
//     // button 누르고 api 확인
//   });
//   test('Create button', async ({ page }) => {
//     // create button 되는지
//     // button 누르고 dialog 열리는지 확인
//     // cancel 누르고 dialog 닫히는지 확인
//     // submit 누르고 api 확인
//     // form field error 확인
//     // file upload 확인
//   });
// });
//TODO
/*
    --------------------------------------------------
    page.goto('/') 하면
    --------------------------------------------------
        /execution으로 리다이렉트 되는지 확인

        Header 보이는지
            -> PQ Automation Test 확인
            -> page button 누르고 navigate 확인

        Execution log table 내용 보이는지 
            -> stop button 확인

        Case log table 내용 보이는지 
            -> running 누르고 pass or fail 확인

        Detail table 내용 보이는지 
            -> pass or fail 누르고 True or False 확인

        Data json 보이는지 
            -> True or False 누르고 ??? 확인

        stop button 되는지 
            -> button 누르고 modal 열리는지 확인 
                -> Yes 누르고 api 확인
                -> No 누르고 modal 닫히는지 확인

        stop all button 되는지
            -> button 누르고 modal 열리는지 확인 
                -> Yes 누르고 api 확인
                -> No 누르고 modal 닫히는지 확인

        refresh button 되는지
            -> button 누르고 api 확인

        create button 되는지
            -> button 누르고 dialog 열리는지 확인
                -> cancel 누르고 dialog 닫히는지 확인
                -> submit 누르고 api 확인
                    -> form field error 확인
    --------------------------------------------------
    page.goto('/') 하고 page button 누르면
    --------------------------------------------------
        /caseset인지 확인

        Header 보이는지
            -> PQ Automation Test 확인
            -> page button 누르고 navigate 확인

        Case set table 내용 보이는지 
            -> ??? 확인

        Case table 내용 보이는지 
            -> ??? 누르고 ??? 확인

        Expected result table 내용 보이는지 
            -> ??? 누르고 ??? 확인

        Data json 보이는지 
            -> ??? 누르고 ??? 확인
            -> ??? 누르고 ??? 확인
        refresh button 되는지
            -> button 누르고 api 확인

        create button 되는지
            -> button 누르고 dialog 열리는지 확인
                -> cancel 누르고 dialog 닫히는지 확인
                -> submit 누르고 api 확인
                    -> form field error 확인
                    -> file upload 확인
    --------------------------------------------------
*/
