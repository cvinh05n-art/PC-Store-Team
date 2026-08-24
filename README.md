<div align="center">

# 🖥️ PC STORE TEAM

### Website thương mại điện tử bán linh kiện & phụ kiện máy tính

<p>
  <strong>Software Engineering Project</strong>
</p>

<p>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

<p>
  <img src="https://img.shields.io/badge/JWT-Authentication-purple?style=flat-square" />
  <img src="https://img.shields.io/badge/Axios-API-blue?style=flat-square&logo=axios" />
  <img src="https://img.shields.io/badge/Mongoose-ODM-red?style=flat-square" />
  <img src="https://img.shields.io/badge/Docker-Containerization-2496ED?style=flat-square&logo=docker&logoColor=white" />
</p>

---

**PC Store Team** là website thương mại điện tử được xây dựng nhằm cung cấp
một nền tảng mua bán linh kiện và phụ kiện máy tính trực tuyến.

</div>

---

## 📌 Mục lục

- [✨ Giới thiệu](#-giới-thiệu)
- [🎯 Mục tiêu](#-mục-tiêu)
- [🚀 Chức năng](#-chức-năng)
- [🛠️ Công nghệ](#️-công-nghệ)
- [🏗️ Kiến trúc hệ thống](#️-kiến-trúc-hệ-thống)
- [📂 Cấu trúc dự án](#-cấu-trúc-dự-án)
- [⚙️ Cài đặt](#️-cài-đặt)
- [🔐 Xác thực & phân quyền](#-xác-thực--phân-quyền)
- [📧 Quên mật khẩu](#-quên-mật-khẩu)
- [🛒 Quy trình mua hàng](#-quy-trình-mua-hàng)
- [🔌 API](#-api)
- [👨‍💻 Thành viên](#-thành-viên)
- [📄 License](#-license)

---

# ✨ Giới thiệu

**PC Store Team** là một website thương mại điện tử chuyên cung cấp:

- 🧩 CPU
- 🎮 GPU
- 💾 RAM
- 💿 SSD
- 🖥️ Mainboard
- 🔌 Nguồn máy tính
- 🧊 Tản nhiệt
- ⌨️ Phụ kiện máy tính

Hệ thống được xây dựng theo mô hình **Frontend - Backend - Database**, trong đó:

```text
                    ┌─────────────────────┐
                    │      PC STORE       │
                    │       WEBSITE       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      ReactJS        │
                    │      Frontend       │
                    └──────────┬──────────┘
                               │
                          REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │     Node.js         │
                    │     Express.js      │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
                          Mongoose
                               │
                               ▼
                    ┌─────────────────────┐
                    │      MongoDB        │
                    │      Database       │
                    └─────────────────────┘