# GeneratorPromptAI - Next.js Project

## Yeh ZIP mein kya hai?
- src/app/ - Saare pages ready hain
- src/components/ - Navbar aur Footer placeholder
- sitemap.js - Auto sitemap
- robots.js - SEO robots file

## Setup Kaise Karo?

### Step 1 - Is ZIP se sirf src folder copy karo
Apne Next.js project ke src folder mein paste karo (replace karo)

### Step 2 - npm install karo
```
npm install
```

### Step 3 - Apna code paste karo
Har tool ke liye:
- src/app/tools/TOOL-NAME/ToolNameClient.js
- Yahan apna purana React code paste karo
- 'use client' sabse upar rakho
- Helmet import aur Helmet tags hatao

### Step 4 - Navbar aur Footer
- src/components/Navbar.js mein apna Navbar paste karo
- src/components/Footer.js mein apna Footer paste karo
- react-router-dom Link ko next/link Link se replace karo
- <Link to=""> ko <Link href=""> se replace karo

### Step 5 - layout.js mein uncomment karo
src/app/layout.js mein Navbar aur Footer ki lines uncomment karo

### Step 6 - Test karo
```
npm run dev
```

## Common Errors

### Error: useState is not defined
Solution: File ke upar 'use client' likho

### Error: Link not found
Solution: import { Link } from 'react-router-dom' hatao
import Link from 'next/link' lagao

### Error: useNavigate not found  
Solution: import { useRouter } from 'next/navigation' use karo
const router = useRouter()
router.push('/path')
