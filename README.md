
# 💸 Expense Tracker Frontend

Welcome to the **Expense Tracker Frontend** – a modern web application built with **Next.js** and **TypeScript** that empowers you to manage your personal finances with ease. Track your expenses, categorize spending, scan receipts, and gain insights into your financial habits—all from one intuitive interface.

---

## 🚀 Features

- 🔐 **User Authentication**: Secure signup and login.
- 📊 **Dashboard**: Visual overview of expenses and trends.
- 💼 **Expense Management**: Add, edit, and delete expenses.
- 🏷️ **Category Management**: Organize your expenses by categories.
- 💳 **Payment Methods**: Manage and track different payment methods.
- 📈 **Analytics**: Visualize spending patterns and monthly breakdowns.
- 🧾 **Receipt Scanner**: Upload and scan receipts for automatic entry.

---

## 🗂 Project Structure

```
src/
  app/
    dashboard/       # Dashboard pages
    login/           # Login page
    signup/          # Signup page
    settings/        # Settings page
  components/
    auth/            # Authentication components
    categories/      # Category management components
    dashboard/       # Dashboard components
    expenses/        # Expense management components
    payments/        # Payment method components
    ui/              # Reusable UI componentsx
  contexts/          # Context providers (e.g., AuthContext)
  hooks/             # Custom React hooks
  lib/               # Utility functions and helpers
  services/          # API service functions
  types/             # TypeScript type definitions
  utils/             # Constants and helper functions
```

---

## 🛠️ Getting Started

### ✅ Prerequisites

Ensure the following are installed on your machine:

- **Node.js** `v14+`
- **npm** `v6+`

### 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ramchandra3101/ExpenseTracker_Frontend.git
   cd ExpenseTracker_Frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. Open your browser and go to:
   ```
   http://localhost:3000
   ```

---

## 🧠 Backend Integration

This project requires the backend service for full functionality.

🔗 [Expense Tracker Backend Repository](https://github.com/ramchandra3101/ExpenseTracker_Backend)

Make sure to set up and run the backend before using the frontend features.

---

## 🧱 Application Architecture

![Application Architecture](public/readmeImages/Architectiure.png)

---

## 🎬 Demo Video

Watch the Expense Tracker in action:

[![Demo Video](public/readmeImages/Demo.mp4)](public/readmeImages/Demo.mp4)

---

## 📜 Available Scripts

- `npm run dev` – Launch development server  
- `npm run build` – Build the app for production  
- `npm run start` – Start the production server  
- `npm run lint` – Run ESLint to analyze code quality  

---

## ⚙️ Technologies Used

| Technology      | Description                                  |
|-----------------|----------------------------------------------|
| **Next.js**     | React framework for SSR and static generation |
| **TypeScript**  | Strongly typed superset of JavaScript        |
| **Tailwind CSS**| Utility-first CSS framework                  |
| **ESLint**      | Code linter for JavaScript/TypeScript        |

---

## 🤝 Contributing

Contributions are always welcome!  
Please feel free to submit a pull request or open an issue if you have ideas for improvements.

---

## 📄 License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for more information.

---

**Happy Expense Tracking! 🎉**
