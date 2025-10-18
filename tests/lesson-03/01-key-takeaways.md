# API mocking, global setup & teardown, authentication state

## Network interception: “chặn” request, “chặn” response

![alt text]({F234E377-D0F5-4C82-B4A6-D6AA64E71E2A}.png)

- Network Interception trong Playwright cho phép can thiệp vào các HTTP Request giữa browser và server.
- API Mocking là 1 phần quan trọng giúp giả lập các response API mà không cần gọi server thực tế.
  ![alt text]({F63F5D26-3F9F-458F-963B-E88D6B9389DF}.png)
  ![alt text]({C1327C4F-495B-49FA-9BE4-DF4E279C3263}.png)
  ![alt text]({167617B2-84DF-4919-BEBD-EEFBB74A99AF}.png)
  ![alt text]({AD9BB7AE-423F-4646-9B0D-3F961808C69C}.png)

## Global setup & global teardown

- D/N: Là một test riêng biệt, được chạy trước/sau TẤT CẢ các test.
- Khác gì hook, fixtures?
  - Hooks, fixtures chạy cho mỗi test hoặc mỗi worker
  - Global setup & global teardown chạy 1 lần duy nhất
- Ứng dụng thực tế:
  - Global setup
    - Đăng nhập một lần và lưu lại state (cookie, token) để dùng lại trong các test → giúp giảm thời gian và tài nguyên.
    - Khởi tạo dữ liệu test ban đầu vào database hoặc API. - Thiết lập cấu hình chung (ví dụ: tạo file cấu hình, đọc biến môi trường).
    - Khởi động service bên thứ ba (nếu cần), ví dụ mock server, database giả lập, v.v.
  - Global teardown
    - Xóa dữ liệu test đã tạo ở bước setup.
    - Dừng các service bên thứ ba đã khởi động ở bước setup.
    - Dọn dẹp tài nguyên tạm thời (file, kết nối, cache...).

## Re-use authentication state: Sử dụng lại “trạng thái đăng nhập”

- Reuse authentication state là kỹ thuật lưu trạng thái đăng nhập sau khi login lần đầu, rồi tái sử dụng cho các test sau mà không cần đăng nhập lại.
- Lợi ích: - Tiết kiệm thời gian - Tối ưu resource - Tăng độ tin cậy
  ![alt text]({F9BD8BAA-3E22-4420-B7D5-69DEF803A7D0}.png)
  ![alt text]({66F6EB19-EA6D-4B9F-8304-340F507C910A}.png)

## Auto waiting: Tự động “chờ”

![alt text]({FEA8720C-A182-46B4-82B1-6FAE498DBE01}.png)
![alt text]({FE3AE96F-E050-4504-9D6B-57C3A182BAB3}.png)

- expect.toPass:
  ![alt text]({D741449D-DE6C-43E5-A1ED-CC52E9377D0F}.png)
  ![alt text]({877B2D08-4212-4DD0-8442-7A3D49500DB4}.png)
- expect.poll:
  ![alt text]({F90E8A6B-FEA4-4BAD-99AB-C7EF5A904758}.png)
  ![alt text]({B442243E-56B7-4BD2-8C4B-F1D06685AC04}.png)

## Run test by command line

![alt text]({1DFA8746-ACC1-4B4A-BFDA-4FECDB6DB867}.png)

- Dùng command line:
  - Rất quan trọng: chạy test theo ý muốn (test selection)
  - Xem tất cả lệnh: npx playwright --help
- Cú pháp: npx playwright test [options][test-filter...]
  - [options]: các tuỳ chọn
  - [filers]: điều kiện lọc tests
- Các lệnh thường dùng:
  ![alt text](image.png)
  ![alt text]({A0B79953-4E28-4282-8C85-36ACBA842ACF}.png)

## UI Mode: Giúp bạn run, debug, time travel...

- Chạy test, debug test, filter test, xem time travel
- Lợi ích:
  - Dễ sử dụng
  - Debug hiệu quả
  - Tối ưu phát triển
  - Filter linh hoạt
- Lệnh: ``npx playwright test --ui`

## API context

- Có thể tạo API context thông qua 2 cách: - Sử dụng request import trực tiếp từ @playwright/test - Sử dụng fixture playwright
  ![alt text]({0EAFA8AC-5F4D-4342-B0B2-0A78F697FF63}.png)
  ![alt text]({1B76CF1F-858C-4DE4-B5E8-1861C7749AD9}.png)
