# Master Plan: Monorepo Migration & Refactoring

## 🎯 Tình trạng hiện tại: STABLE & DEPLOYABLE

Cả 2 ứng dụng (`jenahair` và `the-local-travel`) đều đã build thành công (Exit code 0) mà không còn lỗi TypeScript, Turbopack hay SCSS. Cấu trúc Git và Docker đã sẵn sàng để triển khai.

---

## ✅ GIAI ĐOẠN 1 & 2: Khởi tạo Monorepo & Chuẩn hóa UI (ĐÃ HOÀN THÀNH)

- [x] **Setup Monorepo Structure:** Cấu hình thư mục rễ với NPM Workspaces chứa `apps/` và `packages/`.
- [x] **Chuẩn hoá Git Tracking:** Xoá bỏ toàn bộ thư mục `.git` bị lồng ghép bên trong các app con, khởi tạo một Git repository duy nhất ở cấu trúc root và thiết lập `.gitignore` chuẩn.
- [x] **Trích xuất UI Package (`@vinaup/ui`):** Gom toàn bộ các components chung (Button, Carousel, Card, Table, Icons, v.v.) vào một thư viện nội bộ.
- [x] **Trích xuất Utils Package (`@vinaup/utils`):** Gom các hàm helpers dùng chung (format price, get embedded video, parsing cookie, v.v.).
- [x] **Refactor Imports:** Viết Scripts tự động quét và thay thế hàng loạt đường dẫn import cũ (`@/components/...`) sang module cục bộ (`@vinaup/ui` và `@vinaup/utils`) cho cả 2 dự án.
- [x] **Fix Lỗi Next.js Build:** Khắc phục triệt để các lỗi SCSS relative depths (`../../../../`) và thêm chỉ thị `'use client'` vào các UI Component có xài hooks (`recaptcha-enterprise.tsx`).
- [x] **Cấu hình DevOps / CI-CD:**
  - Đưa `.github/workflows/deploy-jenahair.yml` ra thư mục root.
  - Viết lại `Dockerfile` multi-stage, sử dụng layer caching từ `package.json` của từng workspace, hỗ trợ Next.js Standalone build.

---

## ⏳ GIAI ĐOẠN 2.5: Triển khai & Xác nhận (SẼ LÀM NGAY TIẾP THEO)

_Mục tiêu:_ Đảm bảo những thay đổi khổng lồ về mặt cấu trúc không làm gãy (break) ứng dụng khi đẩy lên môi trường Server/VPS thực tế. Bạn nên làm bước này **TRƯỚC KHI** tiếp tục Phase 3.

- [ ] **Commit Code & Push:** Setup Git chuẩn và push lên kho lưu trữ.
- [ ] **Test CI/CD Pipeline:** Theo dõi tab Actions trên GitHub để xem script deploy lên VPS chạy có trơn tru với file Docker mới không.
- [ ] **Sanity Check (Kiểm tra thực tế):** Truy cập website staging/production để click thử các chức năng, đảm bảo UI load đúng, không gãy layout do di chuyển SCSS.

---

## 🚧 GIAI ĐOẠN 3: Tái cấu trúc API, Logic & Authentication (CHƯA LÀM)

_Mục tiêu:_ Hiện tại thư mục `src/actions`, `src/apis`, `src/interfaces`, và `constants.ts` vẫn nằm rời rạc trong từng App. Cần trích xuất để tái sử dụng tối đa.

- [ ] **Tạo Package Core/Shared (`@vinaup/core` hoặc `@vinaup/api`):** Khởi tạo một workspace tĩnh trong `packages/` để chứa logic dùng chung.
- [ ] **Gom Interfaces & Types:** Chuyển các data model (VD: User, Blog, Tour, Booking) vào package Core để cả Admin lẫn Client / App khác đều gọi đúng 1 type chung. Xoá `global.d.ts` thừa.
- [ ] **Refactor Constants:** Gom các cấu hình tĩnh (Route names, API endpoints, Error Codes) về một file chung có thể export ra cho mọi app.
- [ ] **Trích xuất Network/Fetch Client:** Nếu có config chung cho Axios / Fetch (interceptors đính kèm token cookie), hãy mang xuống package Core.
- [ ] **Migrate API Services:** Đưa các custom hooks gọi data chung hoặc Server Actions dùng chung (VD: Auth Actions, Base Action, Logging, SMTP config) vào thư viện nội bộ.
- [ ] **Xoá tệp trùng lặp:** Dọn dẹp hoàn toàn logic cũ khỏi `apps/*/src/apis`.

---

## 🚀 GIAI ĐOẠN 4: Chuẩn hóa Code Quality & Tối ưu (KẾ HOẠCH TƯƠNG LAI)

_Mục tiêu:_ Tăng trải nghiệm Developer (DX), đảm bảo code sạch trước khi lên tính năng mới.

- [ ] **Tập trung hoá ESLint & Prettier:** Giữ duy nhất một file `eslint.config.mjs` (và prettier) ở mức root để lint toàn bộ dự án thay vì mỗi app định nghĩa một kiểu.
- [ ] **Setup Husky & Lint-Staged:** Buộc dev phải format và pass type-check / build-check cục bộ cho những file có sự thay đổi trước khi được phép gõ `git commit`.
- [ ] **Tối ưu hoá Bundle Size:**
  - Xem xét `packages/ui` liệu nó đang được đánh giá là `tree-shakeable` chưa (để Next.js không load toàn bộ components ngay cả khi trang đó chỉ dùng 1 nút bấm).
  - Config `barrel files` chuẩn cho package library.
- [ ] **Chạy e2e Test:** Setup Playwright hoặc Cypress ở mức root cho luồng Auth và Booking chính.
