# Smart Healthcare Appointment System

A modern healthcare appointment and symptom checking platform built with Next.js 14, featuring AI-powered health assistance through Gemini AI and secure authentication via Supabase.

## 🚀 Features

- **AI Health Assistant**: Powered by Google's Gemini AI for intelligent symptom analysis
- **Secure Authentication**: Google OAuth integration via Supabase
- **Responsive Design**: Modern UI with Tailwind CSS and Framer Motion
- **Symptom Checker**: AI-powered health analysis and recommendations
- **Appointment Booking**: Streamlined healthcare appointment management
- **Multi-language Support**: Internationalization ready
- **Dark/Light Theme**: User preference theming

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Framer Motion
- **Authentication**: Supabase Auth
- **Database**: Supabase
- **AI**: Google Gemini AI
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Google Gemini AI API key

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Deepjyoti1307/Smart-Healthcare-Appointment.git
   cd Smart-Healthcare-Appointment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
   - `GEMINI_API_KEY`: Your Google Gemini AI API key
   - `NEXTAUTH_SECRET`: A secure random string
   - `NEXTAUTH_URL`: Your deployment URL

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗 Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
├── components/             # React components
│   ├── chatbot/           # AI chatbot components
│   ├── pages/             # Page components
│   ├── ui/                # UI components
│   └── ...
├── context/               # React context providers
├── lib/                   # Utility functions
├── types/                 # TypeScript type definitions
└── hooks/                 # Custom React hooks
```

## 🚀 Deployment

This application is ready for deployment on:
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **Railway**
- **Digital Ocean**

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `GEMINI_API_KEY` | Google Gemini AI API key | Yes |
| `NEXTAUTH_SECRET` | NextAuth secret key | Yes |
| `NEXTAUTH_URL` | Your application URL | Yes |

## 📱 Features Overview

### AI Health Assistant
- Intelligent symptom analysis
- Health recommendations
- Emergency situation detection
- Professional medical guidance

### Authentication
- Google OAuth login
- Secure session management
- Route protection
- User profile management

### Appointment System
- Doctor discovery
- Appointment booking
- Schedule management
- Notification system

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@smarthealth.com or create an issue in this repository.

## ⚠️ Medical Disclaimer

This application provides general health information and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical concerns.

---

Made with ❤️ by [Deepjyoti1307](https://github.com/Deepjyoti1307)
