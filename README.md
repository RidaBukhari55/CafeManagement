# Café Management System – Mobile Application

## Project Objective

The goal of this project is to develop a mobile-based Café Management System that streamlines the food ordering and billing process for both café staff and customers. The application provides an easy-to-use interface optimized for mobile devices, offering core features such as managing menu items, placing orders, and generating bills. The app improves efficiency by enabling users to manage operations on-the-go with a synchronized backend database.

---

##  Functional Requirements

1. Login functionality for secure system access.
2. Manager can add, update, or delete food items.
3. Food categories (Fast Food, Continental, Chinese) displayed for customers.
4. Customers can view menu items with their respective prices.
5. Customers can search food items by name or category.
6. Add or delete items from the cart.
7. Generate a bill containing:
   - Order number
   - Customer name
   - Timestamp
   - List of ordered food items with prices
   - Applicable tax
8. View ordered food and bills for a specific month.
9. Secure logout functionality.

---

## Stakeholders

- **Manager**
- **Customer**

---

##  Technologies Used

- **React Native / Expo** – For cross-platform mobile development
- **JavaScript** – Core programming logic
- **Firebase Realtime Database** – Backend data storage (orders, menu, billing)
- **Tailwind CSS (for styling in web version)** – Optional if web views are used
- **VS Code** – Code editor
- **Git & GitHub** – Version control

---

## 🚀 How to Run the Project

### ⚙️ Prerequisites

- Node.js installed
- Expo CLI installed globally:
  ```bash
  npm install -g expo-cli

## Steps
1.Clone the repository:
git clone https://github.com/your-username/cafe-management-mobile.git
2.Navigate to the project folder:
cd cafe-management-mobile
3.Install dependencies:
npm install
4.Start the project:
expo start
5.Scan the QR code using Expo Go app on your mobile device to launch the application.

Make sure your internet is active as Firebase requires connectivity.
