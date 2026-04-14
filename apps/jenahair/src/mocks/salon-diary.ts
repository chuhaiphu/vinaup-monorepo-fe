export interface DiaryPost {
  id: string | number;
  image: string;
  title: string;
  description?: string;
  date: string;
}

export const MOCK_DIARY_POSTS: DiaryPost[] = [
  {
    id: 1,
    image:
      "https://plus.unsplash.com/premium_photo-1669675936121-6d3d42244ab5?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Phục hồi tóc hư tổn sau tẩy",
    // description:
    //   "Bí quyết lấy lại mái tóc suôn mượt, chắc khỏe dù đã trải qua nhiều lần hóa chất nặng.",
    date: "20/10/2026",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600&auto=format&fit=crop",
    title: "Uốn sóng lơi Hàn Quốc",
    // description:
    //   "Phong cách tóc uốn nhẹ nhàng, tự nhiên đang làm mưa làm gió trong giới trẻ hiện nay.",
    date: "18/10/2026",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=600&auto=format&fit=crop",
    title: "Nhuộm tóc không cần tẩy",
    // description:
    //   "Tổng hợp những tông màu sáng da, thời thượng mà không lo hỏng cấu trúc tóc.",
    date: "15/10/2026",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=600&auto=format&fit=crop",
    title: "Cắt tóc Bob ngắn cá tính",
    // description:
    //   "Thay đổi diện mạo ngoạn mục với kiểu tóc Bob cắt tầng ôm sát khuôn mặt.",
    date: "12/10/2026",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=600&auto=format&fit=crop",
    title: "Chăm sóc tóc tại nhà",
    // description:
    //   "Hướng dẫn 5 bước gội và dưỡng tóc chuẩn Salon để tóc luôn bồng bềnh.",
    date: "10/10/2026",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=600&auto=format&fit=crop",
    title: "Review Dịch vụ Duỗi Hơi Nước",
    // description:
    //   "Công nghệ duỗi tóc mới nhất giúp tóc thẳng mượt mà vẫn giữ được độ ẩm tự nhiên.",
    date: "08/10/2026",
  },
  {
    id: 7,
    image:
      "https://plus.unsplash.com/premium_photo-1669675936121-6d3d42244ab5?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Phục hồi tóc hư tổn sau tẩy",
    // description:
    //   "Bí quyết lấy lại mái tóc suôn mượt, chắc khỏe dù đã trải qua nhiều lần hóa chất nặng.",
    date: "20/10/2026",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600&auto=format&fit=crop",
    title: "Uốn sóng lơi Hàn Quốc",
    // description:
    //   "Phong cách tóc uốn nhẹ nhàng, tự nhiên đang làm mưa làm gió trong giới trẻ hiện nay.",
    date: "18/10/2026",
  },
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=600&auto=format&fit=crop",
    title: "Nhuộm tóc không cần tẩy",
    // description:
    //   "Tổng hợp những tông màu sáng da, thời thượng mà không lo hỏng cấu trúc tóc.",
    date: "15/10/2026",
  },
  {
    id: 10,
    image:
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=600&auto=format&fit=crop",
    title: "Cắt tóc Bob ngắn cá tính",
    // description:
    //   "Thay đổi diện mạo ngoạn mục với kiểu tóc Bob cắt tầng ôm sát khuôn mặt.",
    date: "12/10/2026",
  },
  {
    id: 11,
    image:
      "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=600&auto=format&fit=crop",
    title: "Chăm sóc tóc tại nhà",
    // description:
    //   "Hướng dẫn 5 bước gội và dưỡng tóc chuẩn Salon để tóc luôn bồng bềnh.",
    date: "10/10/2026",
  },
  {
    id: 12,
    image:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=600&auto=format&fit=crop",
    title: "Review Dịch vụ Duỗi Hơi Nước",
    // description:
    //   "Công nghệ duỗi tóc mới nhất giúp tóc thẳng mượt mà vẫn giữ được độ ẩm tự nhiên.",
    date: "08/10/2026",
  },
  {
    id: 13,
    image:
      "https://plus.unsplash.com/premium_photo-1669675936121-6d3d42244ab5?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Phục hồi tóc hư tổn sau tẩy",
    // description:
    //   "Bí quyết lấy lại mái tóc suôn mượt, chắc khỏe dù đã trải qua nhiều lần hóa chất nặng.",
    date: "20/10/2026",
  },
  {
    id: 14,
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600&auto=format&fit=crop",
    title: "Uốn sóng lơi Hàn Quốc",
    // description:
    //   "Phong cách tóc uốn nhẹ nhàng, tự nhiên đang làm mưa làm gió trong giới trẻ hiện nay.",
    date: "18/10/2026",
  },
  {
    id: 15,
    image:
      "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=600&auto=format&fit=crop",
    title: "Nhuộm tóc không cần tẩy",
    // description:
    //   "Tổng hợp những tông màu sáng da, thời thượng mà không lo hỏng cấu trúc tóc.",
    date: "15/10/2026",
  },
  {
    id: 16,
    image:
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=600&auto=format&fit=crop",
    title: "Cắt tóc Bob ngắn cá tính",
    // description:
    //   "Thay đổi diện mạo ngoạn mục với kiểu tóc Bob cắt tầng ôm sát khuôn mặt.",
    date: "12/10/2026",
  },
  {
    id: 17,
    image:
      "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=600&auto=format&fit=crop",
    title: "Chăm sóc tóc tại nhà",
    // description:
    //   "Hướng dẫn 5 bước gội và dưỡng tóc chuẩn Salon để tóc luôn bồng bềnh.",
    date: "10/10/2026",
  },
  {
    id: 18,
    image:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=600&auto=format&fit=crop",
    title: "Review Dịch vụ Duỗi Hơi Nước",
    // description:
    //   "Công nghệ duỗi tóc mới nhất giúp tóc thẳng mượt mà vẫn giữ được độ ẩm tự nhiên.",
    date: "08/10/2026",
  },
];
