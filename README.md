# 🌸 HKT JP Learning - Washi Blossom

Chào mừng bạn đến với dự án **HKT_JP_Learning**! Đây là một ứng dụng web học tiếng Nhật (Từ vựng & Kanji) cá nhân, ứng dụng hệ thống lặp lại ngắt quãng (Spaced Repetition System - SRS).

## 🌟 Tính năng nổi bật (Special Features)

- **Hệ thống Spaced Repetition (SRS)**: Tích hợp thuật toán SM-2 giúp tự động lên lịch ôn tập từ vựng dựa trên mức độ ghi nhớ của bạn, tối ưu hóa quá trình học.
- **Flashcard Ôn tập**: Giao diện flashcard tương tác mượt mà giúp việc học và ghi nhớ hàng ngày trở nên dễ dàng và hiệu quả.
- **Theo dõi lịch học hằng ngày**: Hệ thống tự động tính toán và hiển thị chính xác số lượng từ cần ôn tập trong ngày hôm nay.
- **Quản lý từ vựng (CRUD)**: Cho phép bạn tự do thêm mới, chỉnh sửa, xóa và quản lý danh sách Kanji/Từ vựng của riêng mình.
- **Tra cứu Kana**: Tích hợp sẵn bảng chữ cái Hiragana và Katakana để tiện tra cứu nhanh mà không cần rời khỏi trang web.
- **Giao diện "Washi Blossom" độc đáo**: Trải nghiệm thị giác tuyệt đẹp kết hợp giữa **Glassmorphism**, **Neomorphism**, và **Skeuomorphism** (mô phỏng chất liệu giấy washi, gỗ tre và mực thư pháp). Thiết kế mang lại cảm giác thanh bình, thơ mộng như "đang học bài giữa đêm khuya dưới tán hoa anh đào".

## 🛠️ Công nghệ sử dụng (Technologies Used)

### Frontend (`/frontend`)
- **React 19** & **Vite**: Xây dựng giao diện người dùng hiện đại, cung cấp trải nghiệm mượt mà với tốc độ build cực nhanh.
- **React Router DOM v7**: Xử lý điều hướng trang linh hoạt trong ứng dụng SPA (Single Page Application).
- **Lucide React**: Thư viện icon tối giản, đẹp mắt và nhất quán.
- **Custom CSS**: Giao diện được thiết kế với CSS thuần (Vanilla CSS) tận dụng các biến CSS mạnh mẽ cho hệ thống màu sắc (Color System), hoàn toàn không phụ thuộc vào các UI framework.

### Backend (`/backend`)
- **Node.js** & **Express.js**: Cung cấp kiến trúc RESTful API nhẹ nhàng, ổn định và tốc độ phản hồi cao.
- **SQLite3** (`better-sqlite3`): Cơ sở dữ liệu local (chỉ với 1 file `.db` duy nhất), cực kỳ tối ưu cho ứng dụng cá nhân mà không cần cài đặt hoặc thiết lập database server phức tạp.
- **CORS**: Được cấu hình để đảm bảo kết nối liền mạch và bảo mật giữa Frontend và Backend.

## 📁 Cấu trúc dự án (Project Structure)

- `frontend/`: Chứa mã nguồn của ứng dụng web React (Giao diện người dùng).
- `backend/`: Chứa Express server, logic API, thuật toán xử lý SRS và cơ sở dữ liệu SQLite.
- `Design MD/`: Chứa các tài liệu đặc tả thiết kế chi tiết, kiến trúc hệ thống và hướng dẫn UI/UX (`DesignFE.md`, `DesignBE.md`).

## 🚀 Cài đặt và Chạy dự án (Getting Started)

Dự án này được thiết kế chủ yếu để chạy trên môi trường local.

1. **Khởi động Backend**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Khởi động Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
