import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL(/\/execution$/);
  await expect(page.getByText('PQ Automation Test')).toBeVisible();
});

//TODO
/*
    --------------------------------------------------
    page.goto('/') 하면
    --------------------------------------------------
        /execution으로 리다이렉트 되는지 확인

        Execution log table 내용 보이는지 
            -> stop button 확인

        case log table 내용 보이는지 
            -> running 누르고 pass or fail 확인

        detail table 내용 보이는지 
            -> pass or fail 누르고 True or False 확인

        json 내용 보이는지 
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
        
        page button 되는지
            -> button 누르고 navigate 확인
    --------------------------------------------------
    page.goto('/') 하고 page button 누르면
    --------------------------------------------------
        /caseset인지 확인

        (...)
*/
