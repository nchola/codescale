### CodeScale - SaaS & Web Development Services

## Overview
CodeScale is a modern web application that offers SaaS and web development services with a focus on high-performance, responsive design, and seamless payment integration. This project showcases a complete service-based business platform with features like project showcasing, pricing calculator, payment processing, and subscription management.

## Features
- 🚀 **Modern Design** - Sleek UI with the latest design trends
- 💻 **Responsive Layout** - Optimized for all device sizes
- 💳 **Payment Integration** - Secure payment processing with Midtrans
- 📊 **Dynamic Pricing Calculator** - Interactive tool for project cost estimation
- 🔐 **User Authentication** - Secure login and account management
- 📱 **Project Showcase** - Portfolio display with filtering options
- 📄 **Invoice Generation** - PDF invoice creation and management
- 💼 **Subscription Management** - Recurring payment handling
- 🌙 **Dark Mode Support** - Toggle between light and dark themes

## Tech Stack
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Lucide React icons
- **State Management**: React Hooks
- **Database**: Supabase
- **Payment Processing**: Midtrans
- **PDF Generation**: jsPDF
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS with custom animations
- **Deployment**: Vercel

## Getting Started
### Prerequisites
- Node.js (v18.x or newer)
- npm or yarn
- Git

### Installation
1. Clone the repository:
```shellscript
git clone https://github.com/yourusername/codescale.git
cd codescale
```

2. Install dependencies:
```shellscript
npm install
# or
yarn install
```


3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```plaintext
# Midtrans API Keys
MIDTRANS_SERVER_KEY=your-midtrans-server-key
MIDTRANS_CLIENT_KEY=your-midtrans-client-key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

4. Set up the database:
```shellscript
npx tsx scripts/setup-database.ts
```
Alternatively, you can manually create the required tables in Supabase using the SQL queries provided in the documentation.

5. Start the development server:
```shellscript
npm run dev
# or
yarn dev
```
6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.
## Project Structure
```plaintext
codescale/
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   ├── checkout/         # Checkout page
│   ├── dashboard/        # Dashboard pages
│   ├── invoices/         # Invoice pages
│   ├── payment/          # Payment status pages
│   └── layout.tsx        # Root layout
├── components/           # React components
│   ├── payment/          # Payment-related components
│   ├── subscription/     # Subscription components
│   ├── ui/               # UI components (shadcn)
│   └── ...               # Other components
├── lib/                  # Utility functions
│   ├── email.ts          # Email utilities
│   ├── midtrans.ts       # Midtrans integration
│   ├── orders.ts         # Order management
│   ├── subscriptions.ts  # Subscription management
│   └── supabase.ts       # Supabase client
├── public/               # Static assets
├── scripts/              # Setup scripts
└── ...                   # Configuration files
```

## Payment Integration
This project uses Midtrans for payment processing. To test the payment integration:

### Sandbox Testing
1. Use the following test cards for credit card payments:
Card Number: `4811 1111 1111 1114`
Expiry Date: Any future date (e.g., `01/25`)
CVV: Any 3 digits (e.g., `123`)
OTP/3D Secure: `112233`
2. For bank transfer payments, you'll receive a virtual account number. In the sandbox environment, no actual transfer is needed.
3. For e-wallet payments (GoPay, etc.), you'll see a QR code or redirection link. In the sandbox environment, you can simulate the payment.

## Deployment
The application can be easily deployed to Vercel:
1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Configure the environment variables in the Vercel dashboard
4. Deploy

## ESLint Configuration
This project uses ESLint for code quality. To run the linter:
```shellscript
npm run lint
# or
npx eslint . --ext .js,.jsx,.ts,.tsx
```

To automatically fix issues:
```shellscript
npx eslint . --ext .js,.jsx,.ts,.tsx --fix
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.
## Acknowledgements
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Supabase](https://supabase.io/)
- [Midtrans](https://midtrans.com/)
- [Lucide Icons](https://lucide.dev/)
- [jsPDF](https://github.com/MrRio/jsPDF)
