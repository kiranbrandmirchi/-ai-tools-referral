-- Create the tools table
CREATE TABLE IF NOT EXISTS tools (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    short_description VARCHAR(300) NOT NULL,
    referral_link TEXT NOT NULL,
    official_link TEXT,
    icon_emoji VARCHAR(10) DEFAULT '🔧',
    is_featured BOOLEAN DEFAULT false,
    pricing VARCHAR(100) DEFAULT 'Freemium',
    tags TEXT[] DEFAULT '{}',
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert starter AI & Dev tools (replace referral_link with YOUR actual referral links)
INSERT INTO tools (name, category, description, short_description, referral_link, official_link, icon_emoji, is_featured, pricing, tags, sort_order) VALUES

-- AI WRITING & CONTENT
('ChatGPT Plus', 'AI Assistants', 'ChatGPT by OpenAI is the world''s most popular AI assistant. It can write content, answer questions, generate code, analyze data, create images with DALL-E, and much more. The Plus plan gives you access to GPT-4o, advanced reasoning, and priority access.', 'The world''s most popular AI chatbot — write, code, reason, and create images.', 'https://chat.openai.com/?ref=YOURID', 'https://chat.openai.com', '🤖', true, 'Free / $20 mo', ARRAY['ai','chatbot','writing','coding','productivity'], 1),

('Claude Pro', 'AI Assistants', 'Claude by Anthropic is known for nuanced, safe, and helpful AI conversations. Claude excels at long-form writing, analysis, coding, math, and thoughtful conversation. Claude Pro gives access to the most capable models with higher usage limits.', 'Anthropic''s thoughtful AI assistant — excels at writing, analysis & coding.', 'https://claude.ai/?ref=YOURID', 'https://claude.ai', '🧠', true, 'Free / $20 mo', ARRAY['ai','chatbot','writing','analysis','coding'], 2),

('Jasper AI', 'AI Writing', 'Jasper is an enterprise AI writing platform built for marketing teams. It generates blog posts, social media content, ad copy, emails, and more with brand voice consistency. Jasper integrates with your existing workflows and offers templates for every content type.', 'Enterprise AI writing tool for marketing teams — blogs, ads, emails & more.', 'https://jasper.ai/?ref=YOURID', 'https://jasper.ai', '✍️', true, 'From $49/mo', ARRAY['ai','writing','marketing','content','copywriting'], 3),

('Copy.ai', 'AI Writing', 'Copy.ai automates content creation and sales workflows with AI. Generate blog posts, product descriptions, social captions, and email sequences in seconds. Their workflow automation lets you build multi-step AI pipelines for your team.', 'AI-powered copywriting and workflow automation for sales & marketing.', 'https://copy.ai/?ref=YOURID', 'https://copy.ai', '📝', false, 'Free / From $49/mo', ARRAY['ai','writing','copywriting','sales','automation'], 4),

-- AI IMAGE & VIDEO
('Midjourney', 'AI Image Generation', 'Midjourney is the leading AI image generation tool, known for stunning artistic quality. Create photorealistic images, illustrations, concept art, and designs using simple text prompts. Used by designers, marketers, and creatives worldwide.', 'Create stunning AI art and images with simple text prompts.', 'https://midjourney.com/?ref=YOURID', 'https://midjourney.com', '🎨', true, 'From $10/mo', ARRAY['ai','image','art','design','creative'], 5),

('Runway ML', 'AI Video', 'Runway is the most advanced AI video generation and editing platform. Create videos from text or images, remove backgrounds, apply AI effects, and use Gen-3 Alpha for cinematic AI video generation. Used by Hollywood studios and content creators.', 'Advanced AI video generation and editing — from text to cinematic video.', 'https://runwayml.com/?ref=YOURID', 'https://runwayml.com', '🎬', true, 'Free / From $12/mo', ARRAY['ai','video','editing','creative','generation'], 6),

('Leonardo AI', 'AI Image Generation', 'Leonardo AI offers powerful image generation with fine-tuned models for game assets, concept art, photography, and design. Features include image-to-image generation, real-time canvas, and model training on your own styles.', 'AI image generation with fine-tuned models for games, design & art.', 'https://leonardo.ai/?ref=YOURID', 'https://leonardo.ai', '🖼️', false, 'Free / From $12/mo', ARRAY['ai','image','art','game-design','creative'], 7),

-- AI CODING & DEVELOPMENT
('GitHub Copilot', 'AI Coding', 'GitHub Copilot is the AI pair programmer that helps you write code faster. It suggests entire functions, writes tests, explains code, and supports every major programming language. Integrates directly into VS Code, JetBrains, Neovim, and more.', 'AI pair programmer that writes code, suggests functions & explains logic.', 'https://github.com/features/copilot?ref=YOURID', 'https://github.com/features/copilot', '💻', true, 'Free / From $10/mo', ARRAY['ai','coding','development','github','productivity'], 8),

('Cursor', 'AI Coding', 'Cursor is an AI-first code editor built on VS Code. It understands your entire codebase and can write, edit, debug, and refactor code using natural language. Features Composer mode for multi-file edits and inline chat for quick fixes.', 'AI-first code editor — understands your codebase and writes code for you.', 'https://cursor.sh/?ref=YOURID', 'https://cursor.sh', '⚡', true, 'Free / From $20/mo', ARRAY['ai','coding','editor','development','productivity'], 9),

('Replit', 'AI Coding', 'Replit is a browser-based IDE with built-in AI coding assistance. Write, run, and deploy code in 50+ languages without any setup. Replit Agent can build entire applications from a prompt, and Ghostwriter helps you code faster.', 'Browser-based IDE with AI — code, run & deploy apps without setup.', 'https://replit.com/?ref=YOURID', 'https://replit.com', '🔄', false, 'Free / From $25/mo', ARRAY['ai','coding','ide','deployment','cloud'], 10),

('Bolt.new', 'AI Coding', 'Bolt.new by StackBlitz lets you prompt, run, edit, and deploy full-stack web applications directly in the browser. No local setup needed — just describe what you want, and Bolt builds it with a live preview and one-click deploy.', 'Prompt and deploy full-stack apps in the browser — zero setup needed.', 'https://bolt.new/?ref=YOURID', 'https://bolt.new', '⚡', true, 'Free / From $20/mo', ARRAY['ai','coding','fullstack','deployment','nocode'], 11),

('v0 by Vercel', 'AI Coding', 'v0 is Vercel''s AI-powered UI generation tool. Describe any UI component or page and v0 generates production-ready React/Next.js code with Tailwind CSS and shadcn/ui. Perfect for rapid prototyping and building modern web interfaces.', 'AI UI generator — describe components and get production React code.', 'https://v0.dev/?ref=YOURID', 'https://v0.dev', '🎯', false, 'Free / From $20/mo', ARRAY['ai','coding','ui','react','design'], 12),

-- AI PRODUCTIVITY & BUSINESS
('Notion AI', 'AI Productivity', 'Notion AI supercharges your workspace with AI-powered writing, summarization, and knowledge management. Ask questions across your workspace, auto-fill databases, generate content, and summarize meeting notes — all inside the tool you already use for docs and projects.', 'AI-enhanced workspace — notes, docs, projects with built-in AI assistance.', 'https://notion.so/?ref=YOURID', 'https://notion.so', '📋', true, 'Free / From $10/mo', ARRAY['ai','productivity','notes','project-management','writing'], 13),

('Perplexity AI', 'AI Search', 'Perplexity is the AI-powered search engine that gives you accurate, cited answers instead of links. It searches the web in real-time, synthesizes information from multiple sources, and provides clear answers with proper citations. Pro version offers more powerful models and file analysis.', 'AI search engine with cited answers — replaces traditional web search.', 'https://perplexity.ai/?ref=YOURID', 'https://perplexity.ai', '🔍', true, 'Free / $20 mo', ARRAY['ai','search','research','productivity'], 14),

('Grammarly', 'AI Writing', 'Grammarly is the world''s most trusted AI writing assistant. It checks grammar, spelling, tone, clarity, and style across everything you write — emails, documents, social posts, and messages. The AI features now offer full rewrites, custom tone adjustments, and text generation.', 'AI writing assistant — grammar, clarity, tone & full text generation.', 'https://grammarly.com/?ref=YOURID', 'https://grammarly.com', '📖', false, 'Free / From $12/mo', ARRAY['ai','writing','grammar','productivity','editing'], 15),

-- DEVELOPER TOOLS & HOSTING
('Vercel', 'Hosting & Deployment', 'Vercel is the platform for frontend developers. Deploy Next.js, React, and other frameworks with zero configuration. Features include serverless functions, edge network, analytics, and automatic CI/CD from your Git repository. The gold standard for modern web hosting.', 'Deploy modern web apps instantly — the platform behind Next.js.', 'https://vercel.com/?ref=YOURID', 'https://vercel.com', '▲', true, 'Free / From $20/mo', ARRAY['hosting','deployment','nextjs','frontend','serverless'], 16),

('Netlify', 'Hosting & Deployment', 'Netlify is a powerful platform for deploying and scaling modern web projects. Features include serverless functions, form handling, identity management, edge functions, and a global CDN. Perfect for static sites, Jamstack apps, and full-stack projects.', 'Modern web hosting with serverless functions, forms & edge computing.', 'https://netlify.com/?ref=YOURID', 'https://netlify.com', '🌐', false, 'Free / From $19/mo', ARRAY['hosting','deployment','serverless','jamstack','cdn'], 17),

('Railway', 'Hosting & Deployment', 'Railway is the simplest way to deploy backends, databases, and full-stack apps. Spin up Postgres, Redis, MongoDB, or any Docker container in seconds. Features include automatic deployments from GitHub, environment management, and transparent usage-based pricing.', 'Deploy backends & databases in seconds — Postgres, Redis & more.', 'https://railway.app/?ref=YOURID', 'https://railway.app', '🚂', false, 'Usage-based / From $5/mo', ARRAY['hosting','deployment','database','backend','docker'], 18),

('Supabase', 'Backend & Database', 'Supabase is the open-source Firebase alternative. Get a Postgres database, authentication, file storage, edge functions, and real-time subscriptions out of the box. Build full-stack apps with a complete backend in minutes.', 'Open-source Firebase alternative — database, auth, storage & real-time.', 'https://supabase.com/?ref=YOURID', 'https://supabase.com', '⚡', true, 'Free / From $25/mo', ARRAY['database','backend','auth','storage','api'], 19),

('Neon', 'Backend & Database', 'Neon is serverless Postgres designed for modern applications. Features include autoscaling, branching (like Git for your database), instant provisioning, and a generous free tier. Perfect for AI apps, SaaS products, and development workflows.', 'Serverless Postgres with branching, autoscaling & instant provisioning.', 'https://neon.tech/?ref=YOURID', 'https://neon.tech', '🐘', false, 'Free / From $19/mo', ARRAY['database','postgres','serverless','backend','ai'], 20),

-- AI DESIGN
('Canva AI', 'AI Design', 'Canva''s Magic Studio brings AI to design. Generate images, remove backgrounds, resize for any platform, create presentations, and design anything with AI-powered tools. No design skills needed — perfect for marketers, entrepreneurs, and content creators.', 'AI-powered design platform — create anything visual with no design skills.', 'https://canva.com/?ref=YOURID', 'https://canva.com', '🎨', true, 'Free / From $13/mo', ARRAY['ai','design','graphic-design','marketing','creative'], 21),

('Figma AI', 'AI Design', 'Figma is the industry-standard collaborative design tool, now enhanced with AI features. Design interfaces, create prototypes, and hand off to developers. AI features help generate designs, rename layers, remove backgrounds, and suggest improvements.', 'Collaborative design tool with AI — the industry standard for UI/UX.', 'https://figma.com/?ref=YOURID', 'https://figma.com', '🖌️', false, 'Free / From $15/mo', ARRAY['design','ui-ux','prototyping','collaboration','ai'], 22),

-- AI AUDIO & MUSIC
('ElevenLabs', 'AI Audio', 'ElevenLabs offers the most realistic AI text-to-speech and voice cloning technology. Create voiceovers, audiobooks, podcasts, and dubbed content in 29 languages. Clone your own voice or choose from a vast library of natural-sounding voices.', 'Most realistic AI text-to-speech and voice cloning in 29 languages.', 'https://elevenlabs.io/?ref=YOURID', 'https://elevenlabs.io', '🎙️', true, 'Free / From $5/mo', ARRAY['ai','audio','text-to-speech','voice','content'], 23),

('Descript', 'AI Audio & Video', 'Descript is the all-in-one audio and video editor where editing is as easy as editing a document. Features AI-powered transcription, filler word removal, eye contact correction, voice cloning, screen recording, and social media clip generation.', 'Edit audio & video like a document — AI transcription, cloning & more.', 'https://descript.com/?ref=YOURID', 'https://descript.com', '🎧', false, 'Free / From $24/mo', ARRAY['ai','audio','video','editing','podcast'], 24),

-- AI DATA & ANALYTICS
('Tableau AI', 'AI Analytics', 'Tableau, now enhanced with AI, is the world''s leading visual analytics platform. Ask questions in natural language, get automated insights, and create stunning data visualizations. Tableau Pulse delivers personalized AI-powered metrics to your team.', 'Leading analytics platform with AI — visualize data and get instant insights.', 'https://tableau.com/?ref=YOURID', 'https://tableau.com', '📊', false, 'From $75/user/mo', ARRAY['ai','analytics','data','visualization','business'], 25),

-- AI AUTOMATION
('Zapier AI', 'AI Automation', 'Zapier connects 7,000+ apps and now features AI-powered automation. Build complex workflows without code, use AI to process data between apps, generate content, and automate repetitive tasks. Zapier Central is your AI workforce that works across all your tools.', 'Connect 7,000+ apps with AI automation — no code needed.', 'https://zapier.com/?ref=YOURID', 'https://zapier.com', '⚡', true, 'Free / From $20/mo', ARRAY['ai','automation','nocode','workflow','productivity'], 26),

('Make', 'AI Automation', 'Make (formerly Integromat) is a powerful visual automation platform. Build complex workflows with a drag-and-drop interface, connect hundreds of apps, process data with AI, and automate business processes. More powerful than Zapier for complex scenarios.', 'Visual automation platform — build complex workflows with drag-and-drop.', 'https://make.com/?ref=YOURID', 'https://make.com', '🔧', false, 'Free / From $9/mo', ARRAY['automation','nocode','workflow','integration','productivity'], 27),

-- DOMAIN & EMAIL
('Namecheap', 'Domains & Hosting', 'Namecheap is one of the most affordable and trusted domain registrars. Register domains, get hosting, set up professional email, and secure your site with SSL certificates. Known for excellent customer support and transparent pricing.', 'Affordable domains, hosting & professional email with great support.', 'https://namecheap.com/?ref=YOURID', 'https://namecheap.com', '🌍', false, 'Domains from $6/yr', ARRAY['domain','hosting','email','ssl','web'], 28),

('Cloudflare', 'Security & Performance', 'Cloudflare protects and accelerates your website. Features include free CDN, DDoS protection, SSL, DNS management, Workers (serverless functions), R2 storage, and AI Gateway. The essential layer for any serious web project.', 'Free CDN, security, DNS & edge computing — essential for every website.', 'https://cloudflare.com/?ref=YOURID', 'https://cloudflare.com', '🛡️', true, 'Free / From $20/mo', ARRAY['cdn','security','dns','performance','serverless'], 29),

-- AI LEARNING
('Coursera', 'AI Learning', 'Coursera offers world-class AI and tech courses from Stanford, Google, IBM, and more. Learn machine learning, data science, AI development, cloud computing, and business skills with certificates that boost your career.', 'Learn AI, coding & tech from Stanford, Google & IBM — get certified.', 'https://coursera.org/?ref=YOURID', 'https://coursera.org', '🎓', false, 'Free / From $49/mo', ARRAY['learning','ai','courses','certificates','education'], 30);
