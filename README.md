1. Đây là ứng dụng quản lí profile đơn giản với giao diện cơ bản và tối giản chỉ gồm những thông tin ngắn gọn như tên, tuổi, nghề nghiệp và tiểu sử.
2. Đầu tiên tạo repo trên github sau đó clone repo trống đó về máy bằng lệnh gitclone và dùng các lệnh:
npx create-expo-app@latest MMA_Assignment1 để tạo dự án
npm install @react-navigation/native @react-navigation/native-stack để cài thư viện điều hướng
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-native-async-storage/async-storage expo-status-bar
cài thêm các thư viện cho dự án
Tiếp theo là tạo cấu trúc cơ bản của dự án bao gồm các thư mục src, components, screen và các file bên trong, thêm file App.js để làm file chạy quản lí dự án
-Chạy dự án bằng lệnh npm start đã cấu hình trong packge.json start là expo start
3. 
Sơ đồ màn hình gồm 5 màn hình 
Home |-> profile -> edit profile
     |-> activity
     |-> settings.

Đây là workflow sử dụng ứng dụng:

Mở ứng dụng → vào Home.
Từ Home, chọn một chức năng:
Xem hồ sơ → xem thông tin cá nhân → chọn Edit Profile:
Nhập thông tin → Lưu để cập nhật hồ sơ, hoặc
Chọn Hủy để bỏ thay đổi.
Xem hoạt động → chạm vào hoạt động để đánh dấu/bỏ đánh dấu hoàn thành → chạm bộ lọc để xem các hoạt động đã hoàn thành.
Cài đặt → bật/tắt giao diện sáng hoặc tối.
Dùng nút Back để quay về màn hình trước hoặc trở lại Home.
4. 
Các yêu cầu đã hoàn thành:
- Có trang profile, có trang chỉnh sửa profile, trang xem hoạt động, trang cài đặt, trang home, lưu dữ liệu,..
5. Sử dụng AI:
-Sử dụng AI gợi í về cầu trúc thư mục: prompt: Kiểm tra cấu trúc thư mục này và tính khả thi để triển khai project expo cơ bản trên nó.
-Sử dụng AI để gợi í nhanh các lệnh cài thư viện: prompt: Cho tôi tổ hợp lệnh cài đặt nhanh các thư viện react native, native-stack...
-Sử dụng AI để cấu hình file gitignore.
-Sử dụng AI để gà soát nhanh 1 số lỗi giao diện như lệch hàng ....
