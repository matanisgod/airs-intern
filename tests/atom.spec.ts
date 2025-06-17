import { test, expect } from '@playwright/test';

const serverUrl = 'http://192.168.40.203:8000';

test.describe('mock atom client', () => {
  test.describe('mock execution Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.route(`${serverUrl}/executions/`, async (route) => {
        if (route.request().method() === 'GET') {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              data: [
                {
                  id: '1',
                  performer: 'mockTestPerformer1',
                  status: 'running',
                  createdAt: '1',
                },
                {
                  id: '2',
                  performer: 'mockTestPerformer2',
                  status: 'cancelled',
                  createdAt: '2',
                },
              ],
            }),
          });
        }
      });
      await page.goto('/');
    });
    test('compare mock data', async ({ page }) => {
      await expect(page.getByText('mockTestPerformer1')).toBeVisible();
      await expect(page.getByText('mockTestPerformer2')).toBeVisible();
    });
  });
});

test.describe('atom client', () => {
  test.describe('execution Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });
    test.describe('route', () => {
      test('redirect', async ({ page }) => {
        await expect(page).toHaveURL(/\/execution$/);
      });
      test('Header', async ({ page }) => {
        await expect(page.getByText('PQ Automation Test')).toBeVisible();
        const pageButton = page.getByTestId('LastPageIcon');
        await expect(pageButton).toBeVisible();
        await pageButton.click();
        await expect(page).toHaveURL(/\/caseset$/);
      });
    });
    test.describe('stop execution', () => {
      test('Stop all button - Yes', async ({ page }) => {
        const stopAllButton = page.getByTestId('StopCircleIcon');
        await expect(stopAllButton).toBeVisible();
        await stopAllButton.click();
        await expect(page.getByText('Do you really want to stop all?')).toBeVisible();
        const yesButton = page.getByRole('button', { name: 'Yes' });
        await yesButton.click();
        await expect(page.getByText('Do you really want to stop all?')).not.toBeVisible();
      });
      test('Stop all button - No', async ({ page }) => {
        const stopAllButton = page.getByTestId('StopCircleIcon');
        await expect(stopAllButton).toBeVisible();
        await stopAllButton.click();
        await expect(page.getByText('Do you really want to stop all?')).toBeVisible();
        const noButton = page.getByRole('button', { name: 'No' });
        await noButton.click();
        await expect(page.getByText('Do you really want to stop all?')).not.toBeVisible();
      });
      test('Stop button - Yes', async ({ page }) => {
        const stopButton = page.getByRole('button', { name: 'Stop' }).first();
        await expect(stopButton).toBeVisible();
        await stopButton.click();
        await expect(page.getByText('Do you really want to stop?')).toBeVisible();
        const yesButton = page.getByRole('button', { name: 'Yes' });
        await expect(yesButton).toBeVisible();
        await yesButton.click();
        await expect(page.getByText('Do you really want to stop?')).not.toBeVisible();
      });
      test('Stop button - No', async ({ page }) => {
        const stopButton = page.getByRole('button', { name: 'Stop' }).first();
        await expect(stopButton).toBeVisible();
        await stopButton.click();
        await expect(page.getByText('Do you really want to stop?')).toBeVisible();
        const noButton = page.getByRole('button', { name: 'No' });
        await expect(noButton).toBeVisible();
        await noButton.click();
        await expect(page.getByText('Do you really want to stop?')).not.toBeVisible();
      });
    });
    test.describe('create execution', () => {
      test('Create button - Submit - ok', async ({ page }) => {
        const createButton = page.getByTestId('CreateIcon');
        await expect(createButton).toBeVisible();
        await createButton.click();
        await expect(page.getByText('Create execution')).toBeVisible();
        const submitButton = page.getByRole('button', { name: 'Submit' });
        await expect(submitButton).toBeVisible();
        await page.locator('[role="combobox"]').click();
        await page.locator('[role="option"]').first().click();
        await page.keyboard.press('Escape');
        await page.locator('input[name="version"]').fill('1');
        await page.locator('input[name="description"]').fill('1');
        await page.locator('input[name="testPerformer"]').fill('junha');
        await page.locator('input[name="gatePcIp"]').fill('192.168.40.42');
        await page.locator('input[name="dcsApiPort"]').fill('5000');
        await page.locator('input[name="dcsDicomPort"]').fill('30001');
        await page.locator('input[name="hospitalRealm"]').fill('PQ42');
        await page
          .locator('input[name="keycloakUrl"]')
          .fill('https://auth.apne2-dev.airsmed.io/auth/');
        await page.locator('input[name="keycloakLoginId"]').fill('csuser');
        await page.locator('input[name="keycloakLoginPw"]').fill('returnAIRSMEDICAL!23');
        await submitButton.click();
        await expect(page.getByText('Create execution')).not.toBeVisible();
      });
      test('Create button - Submit - error', async ({ page }) => {
        const createButton = page.getByTestId('CreateIcon');
        await expect(createButton).toBeVisible();
        await createButton.click();
        await expect(page.getByText('Create execution')).toBeVisible();
        const submitButton = page.getByRole('button', { name: 'Submit' });
        await expect(submitButton).toBeVisible();
        await submitButton.click();
        await expect(page.getByText('Field required').first()).toBeVisible();
      });
      test('Create button - Cancel', async ({ page }) => {
        const createButton = page.getByTestId('CreateIcon');
        await expect(createButton).toBeVisible();
        await createButton.click();
        await expect(page.getByText('Create execution')).toBeVisible();
        const cancelButton = page.getByRole('button', { name: 'Cancel' });
        await expect(cancelButton).toBeVisible();
        await cancelButton.click();
        await expect(page.getByText('Create execution')).not.toBeVisible();
      });
    });
    test('compare execution page data', async ({ page }) => {
      await expect(
        page.locator('div[role="row"] div[data-field="performer"]'),
      ).not.toHaveCount(0);
      const executionLogRows = page.locator(
        'div[role="row"][data-rowindex] div[data-field="performer"]',
      );
      const rowCount = await executionLogRows.count();
      for (let i = 0; i < rowCount; i++) {
        const row = executionLogRows.nth(i);
        await row.click();
        if (
          (await page.getByText('pass').count()) +
            (await page.getByText('fail').count()) >
          0
        )
          break;
        await page.waitForTimeout(1000);
      }

      const caseLogRow = page
        .locator('div[role="row"][data-rowindex] div[data-field="caseName"]')
        .first();
      await caseLogRow.click();
      await expect(
        page.locator('div[role="row"] div[data-field="checkType"]'),
      ).not.toHaveCount(0);
      const hasTrue = await page.getByText('True').count();
      const hasFalse = await page.getByText('False').count();
      expect(hasTrue + hasFalse).toBeGreaterThan(0);

      const detailRow = page
        .locator('div[role="row"][data-rowindex] div[data-field="checkType"]')
        .first();
      await detailRow.click();
      const rjvs = page.locator('.react-json-view');
      await expect(rjvs).toHaveCount(2);

      await expect(page.getByText('Select execution log')).not.toBeVisible();
      await expect(page.getByText('Select detail')).not.toBeVisible();
    });
  });
  test.describe('caseset Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/caseset');
    });
    test.describe('route', () => {
      test('Header', async ({ page }) => {
        await expect(page.getByText('PQ Automation Test')).toBeVisible();
        const pageButton = page.getByTestId('FirstPageIcon');
        await expect(pageButton).toBeVisible();
        await pageButton.click();
        await expect(page).toHaveURL(/\/execution$/);
      });
    });
    test.describe('create case set', () => {
      test('Create button - Submit - ok', async ({ page }) => {
        const createButton = page.getByTestId('CreateIcon');
        await expect(createButton).toBeVisible();
        await createButton.click();
        await expect(page.getByText('Create case set')).toBeVisible();
        const submitButton = page.getByRole('button', { name: 'Submit' });
        await expect(submitButton).toBeVisible();
        await page.setInputFiles(
          'input#caseYamlFile',
          'data/case/combination_sequences.yml',
        );
        await page.setInputFiles(
          'input#expectedResultYamlFile',
          'data/expected_result/combination_sequences_expected_result.yml',
        );
        await page.locator('input[name="type"]').fill('asdf');
        await page.locator('input[name="title"]').fill('qwer');
        await submitButton.click();
        await expect(page.getByText('Create case set')).not.toBeVisible();
      });
      test('Create button - Submit - error', async ({ page }) => {
        const createButton = page.getByTestId('CreateIcon');
        await expect(createButton).toBeVisible();
        await createButton.click();
        await expect(page.getByText('Create case set')).toBeVisible();
        const submitButton = page.getByRole('button', { name: 'Submit' });
        await expect(submitButton).toBeVisible();
        await submitButton.click();
        await expect(page.getByText('Field required').first()).toBeVisible();
      });
      test('Create button - Cancel', async ({ page }) => {
        const createButton = page.getByTestId('CreateIcon');
        await expect(createButton).toBeVisible();
        await createButton.click();
        await expect(page.getByText('Create case set')).toBeVisible();
        const cancelButton = page.getByRole('button', { name: 'Cancel' });
        await expect(cancelButton).toBeVisible();
        await cancelButton.click();
        await expect(page.getByText('Create case set')).not.toBeVisible();
      });
    });
    test('compare caseset page data', async ({ page }) => {
      await expect(
        page.locator('div[role="row"] div[data-field="type"]'),
      ).not.toHaveCount(0);
      const caseSetRow = page
        .locator('div[role="row"][data-rowindex] div[data-field="type"]')
        .first();
      await caseSetRow.click();
      const caseRow = page
        .locator('div[role="row"][data-rowindex] div[data-field="name"]')
        .first();
      expect(caseRow).toBeVisible();

      await caseRow.click();
      const expectedResultRow = page
        .locator('div[role="row"][data-rowindex] div[data-field="version"]')
        .first();
      expect(expectedResultRow).toBeVisible();
      const rjv = page.locator('.react-json-view');
      await expect(rjv).toHaveCount(1);

      await expectedResultRow.click();
      const rjvs = page.locator('.react-json-view');
      await expect(rjvs).toHaveCount(2);

      await expect(page.getByText('Select case set')).not.toBeVisible();
      await expect(page.getByText('Select case')).not.toBeVisible();
      await expect(page.getByText('Select expected result')).not.toBeVisible();
    });
  });
});
