// Netlify build script - injects API keys from environment variables
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Inject keys from Netlify environment variables
const groqKey = process.env.GROQ_API_KEY || '';
const sunbirdKey = process.env.SUNBIRD_API_KEY || '';

const injection = `
<script>
window.GROQ_KEY = "${groqKey}";
window.SUNBIRD_KEY = "${sunbirdKey}";
</script>
`;

// Inject before first <script> tag
html = html.replace('<script', injection + '<script');

fs.writeFileSync(indexPath, html);
console.log('✅ API keys injected from environment variables');
