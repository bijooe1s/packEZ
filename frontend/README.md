# packEZ - Logistics & Package Management System

A modern, fullstack web application for logistics and package delivery management built with React, TypeScript, TailwindCSS, and Supabase.

## 🚀 Features

### For Kurir (Couriers)
- **Dashboard**: View assigned bags (karung) and packages
- **Package Management**: Select bags, view package details, and mark deliveries as complete
- **Search & Filter**: Advanced filtering by status, date range, and search terms
- **Real-time Updates**: Live status updates and package tracking
- **Mobile-friendly**: Responsive design for mobile couriers

### For Admin
- **Analytics Dashboard**: Comprehensive charts and statistics
- **Bag Management**: Create, edit, and manage delivery bags (karung)
- **Package Management**: Full CRUD operations for packages
- **Schedule Management**: Plan and manage delivery schedules
- **Regional Analytics**: Track performance by region
- **User Management**: Manage couriers and admin users

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **shadcn/ui** for UI components
- **Lucide React** for icons
- **Framer Motion** for animations
- **React Hook Form** with Zod validation
- **Zustand** for state management
- **Chart.js** for data visualization

### Backend & Database
- **Supabase** (PostgreSQL + Auth + Storage)
- **Row Level Security (RLS)** for data protection
- **Real-time subscriptions** for live updates

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for production)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd packez
```

### 2. Install Dependencies
```bash
cd frontend
npm install
```

### 3. Environment Setup
Create a `.env` file in the frontend directory:
```bash
cp .env.example .env
```

Update the environment variables:
```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. Database Setup

#### Option A: Using Supabase (Recommended)
1. Create a new Supabase project
2. Go to SQL Editor in your Supabase dashboard
3. Run the schema file:
   ```sql
   -- Copy and paste the contents of database/schema.sql
   ```
4. Run the seed data:
   ```sql
   -- Copy and paste the contents of database/seed.sql
   ```

#### Option B: Local Development (Mock Data)
The application works with mock data out of the box. No database setup required for local development.

### 5. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔐 Demo Accounts

The application comes with pre-seeded demo accounts:

### Admin Account
- **Username**: `admin`
- **Password**: `adminpackEZ`
- **Access**: Full admin dashboard with analytics, CRUD operations, and management features

### Kurir Account
- **Username**: `kurir`
- **Password**: `kurirpackEZ`
- **Access**: Courier dashboard with package management and delivery tracking

## 📊 Database Schema

### Core Tables
- **wilayah**: Delivery regions/areas
- **users_packez**: User accounts (admin/kurir)
- **karung**: Delivery bags/containers
- **produk**: Individual packages
- **history_pengiriman**: Delivery history and tracking

### Key Relationships
- Each `karung` belongs to a `wilayah` and can be assigned to a `kurir`
- Each `produk` belongs to a `karung`
- `history_pengiriman` tracks all package status changes

## 🎨 UI/UX Design

### Design System
- **Color Scheme**: Clean white background with red/orange accents
- **Typography**: Urbanist/Inter fonts for modern, professional look
- **Spacing**: Comfortable padding and spacing throughout
- **Components**: Consistent, accessible UI components
- **Responsive**: Mobile-first design approach

### Key UI Features
- **Dark/Light Mode**: Automatic theme detection
- **Smooth Animations**: Framer Motion for delightful interactions
- **Loading States**: Proper loading indicators and skeleton screens
- **Error Handling**: User-friendly error messages and validation

## 📱 Mobile Support

The application is fully responsive and optimized for mobile devices:
- Touch-friendly interface
- Mobile-optimized navigation
- Responsive charts and tables
- Offline-capable (with service workers)

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

### Supabase Hosting
1. Use Supabase Edge Functions for API endpoints
2. Deploy frontend to Supabase hosting
3. Configure custom domain if needed

## 🔧 Development

### Project Structure
```
packez/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── stores/        # Zustand state management
│   │   ├── types/         # TypeScript type definitions
│   │   ├── lib/           # Utility functions
│   │   └── hooks/         # Custom React hooks
│   ├── database/          # SQL schema and seed files
│   └── public/            # Static assets
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### State Management
The application uses Zustand for state management with two main stores:
- **authStore**: Handles authentication and user data
- **appStore**: Manages application data (packages, bags, regions)

### API Integration
- Supabase client for database operations
- Real-time subscriptions for live updates
- Optimistic updates for better UX
- Error handling and retry logic

## 📈 Analytics & Reporting

### Admin Dashboard Features
- **Package Statistics**: Total, pending, delivered packages
- **Regional Performance**: Delivery metrics by region
- **Status Distribution**: Visual breakdown of package statuses
- **Trend Analysis**: Historical data and trends
- **Export Functionality**: CSV export for reports

### Charts & Visualizations
- Bar charts for regional comparisons
- Doughnut charts for status distribution
- Line charts for trend analysis
- Real-time updates

## 🔒 Security

### Authentication
- Supabase Auth integration
- JWT token management
- Role-based access control
- Session management

### Data Protection
- Row Level Security (RLS) policies
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## 🧪 Testing

### Test Coverage
- Unit tests for utility functions
- Component tests for UI components
- Integration tests for API calls
- E2E tests for critical user flows

### Running Tests
```bash
npm run test          # Run unit tests
npm run test:e2e      # Run E2E tests
npm run test:coverage # Run with coverage report
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Write tests for new features
- Update documentation as needed
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Contact the development team

## 🗺 Roadmap

### Upcoming Features
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] GPS tracking integration
- [ ] Push notifications
- [ ] Multi-language support
- [ ] API documentation
- [ ] Webhook integrations
- [ ] Advanced reporting tools

### Performance Improvements
- [ ] Code splitting and lazy loading
- [ ] Image optimization
- [ ] Caching strategies
- [ ] Database query optimization
- [ ] CDN integration

---

**packEZ** - Streamlining logistics, one package at a time. 📦✨
