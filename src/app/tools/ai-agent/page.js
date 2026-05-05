import AiAgent from './AiAgent'

export const metadata = {
  title: 'Free AI Chatbot Online | Talk to AI Bot No Login Required | GeneratorPromptAI',
  description: 'Free AI chatbot online! Chat with advanced AI instantly. No signup, unlimited messages!',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/ai-agent',
  },
  openGraph: {
    title: 'Free AI Chatbot Online | Talk to AI Bot No Login Required',
    description: 'Free AI chatbot online! Chat with advanced AI instantly. No signup, unlimited messages!',
    url: 'https://www.generatorpromptai.com/tools/ai-agent',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Chatbot Online | Talk to AI Bot No Login Required',
    description: 'Free AI chatbot online! Chat with advanced AI instantly. No signup, unlimited messages!',
  },
}

export default function Page() {
  return <AiAgent />
}
