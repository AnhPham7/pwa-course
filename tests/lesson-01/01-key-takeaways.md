## Playwright - Tương tác với phần tử

- Navigate: page.goto(url)
- Text Input, Textarea: page.fill(selector, value)
- Radio Button & Checkbox: page.check(selector) / page.uncheck(selector)
- Button: page.click(selector)
- Focus: page.focus(selector)
- Hover: page.hover(selector)
- Drag and Drop: page.dragAndDrop(source, target)
- Upload Files: page.setInputFiles(selector, filePath)
- Iframe: page.frameLocator(selector).locator(childSelector)

## Playwright - Suite

- test.describe
- test
- test.step

## Playwright - Hooks

- Các hooks:
  - beforeAll: Chạy 1 lần trước cả suite.
  - beforeEach: Chạy trước mỗi test.
  - afterEach: Chạy sau mỗi test.
  - afterAll: Chạy 1 lần sau cả suite.

## Environments

- Môi trường phổ biến:
  - DEV
  - staging
  - production
- Biến môi trg:
  - Là các gtri động đc lưu trữ trong hệ thống or ứng dụng
  - Cung cấp thông tin cấu hình cho chương trình mà không cần “hard-code”
- Tại sao cần biến mtrg:
  - Bảo mật
  - Linh hoạt
  - Tái sử dụng
- sử dụng biến mtrg trong playwright:
  ```
  npm install -D dotenv
  import dotenv from 'dotenv';
  dotenv.config();
  ```

## Test management

- Annotation & tag
  - Annotation: Các đánh dấu đặc biệt được thêm vào code để cung cấp thông tin bổ sung hoặc kiểm soát hành vi của các test case
  - Tag là các nhãn được gắn vào test case để phân loại và nhóm các test case theo các tiêu chí nhất định.
  - Annotation built-in:
    - test.skip: đánh dấu 1 test là bỏ qua (chưa cần fix)
    - test.fixme: đánh dấu 1 test là bỏ qua (cần fix nhưng chưa có thời gian, đánh dấu để test không fail nữa)
    - test.slow: Test được đánh dấu là chậm, thời gian timeout sẽ nhân 3
    - thêm ttin cho test:
      - Tạo thêm 1 object nữa trong function test:
        - type: loại annotation
        - description: mô tả
      - Annotation sẽ được hiển thị trong report

## Emulation

- Emulation = giả lập:
  - Devices
  - Viewport
  - Locale & Timezone
  - Permissions

## clock

- Clock API giúp thay đổi hành vi mặc định của đồng hồ, phục vụ cho các test cần “chờ”
- Một số function sẽ sử dụng:

  - setFixedTime(): đặt tgian cố định
  - install: khởi tạo clock
  - fastForward: tua nhanh
  - pauseAt: tạm dừng tại thời điểm
  - runFor: tick thủ công

  ## Accessibility testing

  - tại sao cần:
    - Tuân thủ pháp lý: Tránh kiện tụng
    - Cải thiện UX: Làm web thân thiện hơn cho tất cả người dùng.
    - Tăng phạm vi tiếp cận: Hỗ trợ người dùng với công nghệ hỗ trợ (screen readers, keyboard navigation).
    - Tích hợp sớm: Phát hiện lỗi sớm trong CI/CD để tiết kiệm chi phí sửa chữa.
