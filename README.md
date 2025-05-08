# Grape Game

A fun grape-eating game where players try to eat as many grapes as possible without hitting the poisoned one!

## Features

- User authentication with email/password and Google sign-in
- Global high scores
- Customizable grape quantities
- Pause functionality
- Responsive design

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/grape-game.git
cd grape-game
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

4. Start the development server:
```bash
npm run dev
```

## Deployment

### Deploying to Vercel

1. Create a Vercel account if you haven't already
2. Install Vercel CLI:
```bash
npm install -g vercel
```

3. Deploy:
```bash
vercel
```

4. Add your environment variables in the Vercel dashboard:
   - Go to your project settings
   - Navigate to the "Environment Variables" section
   - Add all the variables from your `.env` file

### Deploying to Netlify

1. Create a Netlify account if you haven't already
2. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

3. Deploy:
```bash
netlify deploy
```

4. Add your environment variables in the Netlify dashboard:
   - Go to your site settings
   - Navigate to "Build & deploy" > "Environment"
   - Add all the variables from your `.env` file

## Security Notes

- Never commit your `.env` file to version control
- Keep your Firebase configuration values secure
- Use Firebase security rules to protect your data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
