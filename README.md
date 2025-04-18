# ![Updoot Logo](public/favicon.svg) [updoot](https://updoot-jet.vercel.app)

**updoot** is a modern, **Reddit-inspired** community platform where users can **create communities**, publish **rich media posts**, engage in **meaningful discussions**, and participate in a **dynamic voting system** that promotes the most valuable content.

![screenshot](/assets/ss.png)

## Features

- **User Authentication**: Secure login with Kinde Auth
- **Community Creation**: Create and manage your own communities
- **Rich Post Creation**:
  - Tiptap WYSIWYG editor
  - Image uploads via UploadThing
- **Voting System**: Upvote/downvote posts
- **Comments**: Individual comments on posts
- **Theme Toggle**: Light/Dark mode with `next-themes`
- **Pagination**: Fast content loading
- **Toast Notifications**: Smooth user feedback

## Tech Stack

- **Frontend**:
  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS
  - Shadcn UI Components
- **Backend**:
  - Next.js API Routes
  - Prisma ORM
  - PostgreSQL (via Supabase)
- **Authentication**: Kinde
- **File Uploads**: UploadThing
- **Rich Text Editor**: Tiptap
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- PostgreSQL
- Kinde account
- UploadThing account

### Installation

```bash
# Clone the repo and navigate into the project directory
git clone https://github.com/ashish0kumar/updoot.git
cd updoot

# Install dependencies
pnpm install
# or
npm install

# Copy and fill in the environment variables
cp .env.example .env

# Run database migrations to set up the schema
npx prisma migrate dev --name init

# Generate the Prisma Client
npx prisma generate

# Start the dev server
pnpm run dev
```

### Environment Variables

```env
KINDE_CLIENT_ID="your_kinde_client_id"
KINDE_CLIENT_SECRET="your_kinde_client_secret"
KINDE_ISSUER_URL="https://your-subdomain.kinde.com"
KINDE_SITE_URL="http://localhost:3000"
KINDE_POST_LOGOUT_REDIRECT_URL="http://localhost:3000"
KINDE_POST_LOGIN_REDIRECT_URL="http://localhost:3000/api/auth/creation"

DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

UPLOADTHING_TOKEN="your_uploadthing_token"
UPLOADTHING_SECRET="your_uploadthing_secret"
UPLOADTHING_APP_ID="your_uploadthing_app_id"
```

### Project Structure

```txt
app/
  api/            - API routes
  components/     - Reusable UI
  lib/            - Utility functions
  post/           - Post pages
  r/              - Community pages
  settings/       - User settings
  actions.tsx     - Server actions
  globals.css     - Global styles
  layout.tsx      - Root layout
  page.tsx        - Home page
prisma/           - Prisma schema
public/           - Static assets
```

## Contributing

PRs welcome! Feel free to open issues and suggest features.

## License

[MIT License](LICENSE)

## Acknowledgements

- [Kinde](https://kinde.com)
- [Supabase](https://supabase.com/)
- [UploadThing](https://uploadthing.com)
- [Shadcn UI](https://ui.shadcn.com)
- [Tiptap](https://tiptap.dev)
