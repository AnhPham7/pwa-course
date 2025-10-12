# FIXTURE

## Định nghĩa

- Fixture dùng để khởi tạo các environment khác nhau cho các test.
- Fixture là isolate giữa các test.
- Fixture giúp nhóm các test dựa trên ý nghĩa, thay vì common setup

## Built-in fixtures

![alt text]({F159351B-5784-43F2-AFE9-E303A1CFB7A6}.png)
![alt text]({FD2DEAFE-75EF-4E71-B268-E40327277721}.png)

## Tạo mới fixture

![alt text]({C0899945-0D36-48BB-8566-DBB8EA61BB46}.png)
![alt text]({AC4AEE9D-CC1A-4B84-80C9-75FCAC0201B1}.png)
![alt text]({CD825FC5-4FCE-4CB3-91FF-5438C736E4C3}.png)

## Fixture: Overriding -> Ghi đè fixture mặc định

- Overriding cho phép thay đổi hành vi fixture có sẵn
  (built-in hoặc custom).
  ![alt text]({46D43379-AC6C-4CA2-B595-934028DD9AD2}.png)

## Fixture: Scope -> Vòng đời của fixture

- Các loại scope:
  - Test Scope (Mặc định): Tạo/hủy cho mỗi test. Đảm bảo cô lập hoàn toàn. Phù hợp cho UI test.
  - Worker Scope: Tạo/hủy một lần cho mỗi worker (quy trình chạy test parallel). Tái sử dụng tài nguyên trong worker, tiết kiệm thời gian. Phù hợp cho setup tốn kém.

## Fixture: timeout -> Thay đổi giá trị timeout mặc định

![alt text]({E0DFEA81-1927-40F9-B1BF-AE622DFFFF71}.png)

## Fixture: Custom title -> Thay đổi tiêu đề mặc định của fixture

## Fixture: execution order

- Thứ tự thực thi khi có nhiều loại fixture!
- Quy tắc:
  - Dependencies: Fixture A phụ thuộc B thì B setup trước A, teardown sau A.
  - Lazy Execution: Non-automatic fixtures chỉ setup khi được test/hook yêu cầu.
  - Automatic Fixtures: { auto: true } fixtures setup trước, bất kể có được yêu cầu hay không.
  - Scope:
    - Test-scoped: Setup/teardown mỗi test.
    - Worker-scoped: Setup/teardown một lần per worker.
  - Hooks: beforeAll/afterAll chạy một lần per worker, beforeEach/afterEach chạy mỗi test.
  - Teardown: Chạy sau khi fixture không còn cần, theo thứ tự ngược phụ thuộc.

## Fixture: box option

- Tùy chọn giúp ẩn fixture khỏi <b>Playwright report</b>
  ![alt text]({43D618CF-209B-4887-87D9-022B2EEDA5E9}.png)

## Fixture và POM

![alt text]({022AEC60-4D8D-4EBF-AC8E-2226DC3E10C2}.png)

## Mở nhiều tab

Để mở nhiều tab trong Playwright, ta sử dụng fixture context:

```
test('Multiple tab', async ({ context }) => {
	await context.newPage();
});
```

## Mở nhiều browser (nhiều trình duyệt)

Để mở nhiều browser, ta sử dụng fixture browser:

```
test('Multiple browser', async ({ browser }) => {
	const context = await browser.newContext();
	await context.newPage();
});
```

## Worker-scoped fixture: worker index

Khi tạo fixture với scope worker, ta có thể lấy ra thứ tự (index) của worker thông qua parameter workerInfo:

```
export const test = base.extend<{}, { account: string }>({
	account: [async ({ browser }, use, workerInfo) => {
	console.log('Start fixture account in index: ',
	workerInfo.workerIndex);
	const account = `temporary-${workerInfo.workerIndex}`
	await use(account);
	console.log('End fixture account in index: ');
	}, { scope: 'worker' }],
});
export { expect } from '@playwright/test';
```

- Sử dụng workerIndex giúp chúng ta tạo ra các data unique cho từng worker.
- Dựa vào tính chất tự động chạy của automatic fixture, ta có thể sử dụng vào việc setup các hook before-after cho TOÀN BỘ các test

## Create global beforeEach, afterEach

Sử dụng test-scoped automatic fixture:

```
import { test as base } from '@playwright/test';
export const test = base.extend<{ forEachTest: void }>({
forEachTest: [async ({ page }, use) => {
	// Đoạn code này sẽ chạy trước TẤT CẢ các test
	await page.goto('http://playwrightvn.com');
	await use();
	// Đoạn code này sẽ chạy sau TẤT CẢ các test
	console.log('Last URL:', page.url());
	}, { auto: true }], // Tự động chạy
});
```

## Create global beforeAll, afterAll

Sử dụng worker-scoped automatic fixture:
![alt text]({E29F0253-4F2B-4C5E-B599-E1D5510F0506}.png)
