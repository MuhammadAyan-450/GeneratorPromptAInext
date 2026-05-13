import AiAgent from './AiAgent'

export const metadata = {
  title: 'Try Our Free AI Agent | Ask Any Question - No Signup Required',
  description: 'Chat instantly with our advanced AI agent for free! No signup needed, and unlimited messages await you. Start your conversation today!',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/ai-agent',
  },
  openGraph: {
    title: 'Try Our Free AI Agent | Ask Any Question - No Signup Required',
    description: 'Chat instantly with our advanced AI agent for free! No signup needed, and unlimited messages await you. Start your conversation today!',
    url: 'https://www.generatorpromptai.com/tools/ai-agent',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Try Our Free AI Agent | Ask Any Question - No Signup Required',
    description: 'Chat instantly with our advanced AI agent for free! No signup needed, and unlimited messages await you. Start your conversation today!',
  },
}

export default function Page() {
  return <AiAgent />
}
