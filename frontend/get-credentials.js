#!/usr/bin/env node

/**
 * Script to help format Google Cloud credentials for Vercel deployment
 * 
 * Usage:
 * 1. Download your service account JSON file from Google Cloud Console
 * 2. Run: node get-credentials.js path/to/your/service-account.json
 * 3. Copy the output and paste it as GOOGLE_APPLICATION_CREDENTIALS_JSON in Vercel
 */

const fs = require('fs');
const path = require('path');

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node get-credentials.js <path-to-service-account.json>');
    console.log('');
    console.log('Example:');
    console.log('  node get-credentials.js ./credentials/dialogflow-service-account.json');
    process.exit(1);
  }

  const credentialsPath = args[0];
  
  if (!fs.existsSync(credentialsPath)) {
    console.error(`Error: File not found: ${credentialsPath}`);
    process.exit(1);
  }

  try {
    // Read the JSON file
    const credentialsContent = fs.readFileSync(credentialsPath, 'utf8');
    
    // Parse to validate it's valid JSON
    const credentials = JSON.parse(credentialsContent);
    
    // Convert to single-line string for Vercel
    const credentialsString = JSON.stringify(credentials);
    
    console.log('='.repeat(80));
    console.log('GOOGLE_APPLICATION_CREDENTIALS_JSON for Vercel:');
    console.log('='.repeat(80));
    console.log(credentialsString);
    console.log('='.repeat(80));
    console.log('');
    console.log('Instructions:');
    console.log('1. Copy the above JSON string (everything between the = lines)');
    console.log('2. Go to your Vercel dashboard');
    console.log('3. Navigate to your project → Settings → Environment Variables');
    console.log('4. Add a new variable:');
    console.log('   Name: GOOGLE_APPLICATION_CREDENTIALS_JSON');
    console.log('   Value: [paste the JSON string here]');
    console.log('   Environment: Production, Preview, Development');
    console.log('5. Save and redeploy your project');
    console.log('');
    
  } catch (error) {
    console.error('Error processing credentials file:', error.message);
    process.exit(1);
  }
}

main();
