# Contact Management RESTful APIv2

A modern, high-performance RESTful API 2nd Version built with **Hono** and **Bun** for managing contacts and addresses. This API provides a complete contact management system with user authentication, JWT-based authorization, and comprehensive CRUD operations.

## 🚀 Features

- **Fast & Lightweight**: Built on Hono and Bun for exceptional performance
- **User Management**: User registration, login, and authentication
- **Contact Management**: Full CRUD operations for contacts
- **Address Management**: Multiple addresses per contact
- **JWT Authentication**: Secure token-based authentication with refresh tokens
- **Token Versioning**: Enhanced security with token version control
- **Input Validation**: Type-safe validation using Zod
- **Database ORM**: Prisma with MySQL support
- **CORS Support**: Configurable cross-origin resource sharing
- **Error Handling**: Centralized error handling with detailed responses
- **Logging**: Winston-based structured logging

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Bun](https://bun.sh/) (v1.0 or higher)
- [MySQL](https://www.mysql.com/) (v8.0 or higher)
- [Git](https://git-scm.com/)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd learn-hono-restful-api
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/your_database"
   DATABASE_HOST=localhost
   DATABASE_PORT=3306
   DATABASE_USER=root
   DATABASE_PASSWORD="your_db_password"
   DATABASE_NAME="your_database"

   JWT_SECRET_KEY="your-super-secret-jwt-key"
   (run => bun -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
   ```

4. **Run database migrations**

   ```bash
   bun run prisma:push
   ```

5. **Generate Prisma client**
   ```bash
   bun run prisma:generate
   ```

## 🚀 Running the Application

### Development Mode

Start the development server with hot reload:

```bash
bun run dev
```

The API will be available at `http://localhost:3000`

### Production Mode

For production deployment, you can use the provided Vercel configuration:

```bash
vercel deploy
```

## 📚 API Documentation

The API provides the following endpoints:

### Authentication & User Management

- `POST /api/users` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/current` - Get current user profile
- `PATCH /api/users/current` - Update user profile
- `DELETE /api/users/logout` - Logout user
- `POST /api/users/refresh` - Refresh access token

### Contact Management

- `POST /api/contacts` - Create a new contact
- `GET /api/contacts/:contactId` - Get contact by ID
- `PUT /api/contacts/:contactId` - Update contact
- `DELETE /api/contacts/:contactId` - Delete contact
- `GET /api/contacts` - Search contacts with pagination

### Address Management

- `POST /api/contacts/:contactId/addresses` - Create address for contact
- `GET /api/contacts/:contactId/addresses/:addressId` - Get specific address
- `PUT /api/contacts/:contactId/addresses/:addressId` - Update address
- `DELETE /api/contacts/:contactId/addresses/:addressId` - Delete address
- `GET /api/contacts/:contactId/addresses` - List all addresses for contact

### Guest Endpoints

- `GET /api/total-users` - Get total number of registered users
- `GET /api/total-contacts/:userId` - Get total contacts for a user

For detailed API specifications, please refer to the documentation in the `/docs` folder:

- [User API Documentation](docs/user.md)
- [Contact API Documentation](docs/contact.md)
- [Address API Documentation](docs/address.md)
- [Guest API Documentation](docs/guest.md)

## 🏗️ Project Structure

```
learn-hono-restful-api/
├── src/
│   ├── api/                # API entry point
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Authentication middleware
│   ├── models/             # Type definitions
│   ├── repositories/       # Database access layer
│   ├── services/           # Business logic
│   ├── utils/              # Utility functions
│   └── validations/        # Zod validation schemas
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migrations
├── docs/                   # API documentation
├── package.json
└── README.md
```

## 🛡️ Architecture

This project follows a clean, layered architecture:

1. **Controllers**: Handle HTTP requests and responses
2. **Services**: Contain business logic and orchestrate operations
3. **Repositories**: Manage database operations
4. **Middleware**: Handle authentication and authorization
5. **Validations**: Ensure data integrity with Zod schemas

## 🔐 Authentication

The API uses JWT-based authentication with refresh tokens:

- **Access Token**: Short-lived token for API access (stored in HTTP-only cookie)
- **Refresh Token**: Long-lived token for obtaining new access tokens (stored in HTTP-only cookie)
- **Token Versioning**: Automatically invalidates all tokens when user logs out

## 🗄️ Database Schema

The application uses three main entities:

- **Users**: Store user credentials and profile information
- **Contacts**: Store contact details linked to users
- **Addresses**: Store multiple addresses for each contact

## 🧪 Technologies Used

- **[Bun](https://bun.sh/)** - Fast JavaScript runtime
- **[Hono](https://hono.dev/)** - Lightweight web framework
- **[Prisma](https://www.prisma.io/)** - Modern ORM
- **[Zod](https://zod.dev/)** - Schema validation
- **[Winston](https://github.com/winstonjs/winston)** - Logging
- **[JWT](https://jwt.io/)** - JSON Web Tokens
- **MySQL** - Relational database

## 🔧 Available Scripts

- `bun run dev` - Start development server with hot reload
- `bun run prisma:generate` - Generate Prisma client
- `bun run prisma:push` - Push schema changes to database

## 👤 Author

Created by Arief MB

## 🙏 Acknowledgments

- Built with [Hono](https://hono.dev/)
- Powered by [Bun](https://bun.sh/)
- Database management with [Prisma](https://www.prisma.io/)

---

**Live Demo**: [https://contact-management-ariefmb.vercel.app](https://contact-management-ariefmb.vercel.app)

For questions or support, please open an issue in the repository.
