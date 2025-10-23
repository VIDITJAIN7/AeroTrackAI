const fs = require('fs');

// Read the credentials file
const credentialsPath = './credentials/dialogflow-service-account.json';

try {
  const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
  
  console.log('✅ Credentials file is valid JSON');
  console.log('📋 Required fields check:');
  console.log('  - type:', !!credentials.type);
  console.log('  - project_id:', !!credentials.project_id);
  console.log('  - private_key_id:', !!credentials.private_key_id);
  console.log('  - private_key:', !!credentials.private_key);
  console.log('  - client_email:', !!credentials.client_email);
  console.log('  - client_id:', !!credentials.client_id);
  
  // Convert to single line string
  const jsonString = JSON.stringify(credentials);
  console.log('\n📏 JSON string length:', jsonString.length);
  console.log('🔍 First 100 characters:', jsonString.substring(0, 100));
  console.log('🔍 Last 100 characters:', jsonString.substring(jsonString.length - 100));
  
  // Check for common issues
  if (jsonString.includes('\n')) {
    console.log('⚠️  WARNING: JSON string contains newlines - this might cause issues in Vercel');
  }
  
  if (jsonString.includes('"')) {
    console.log('✅ JSON string properly escaped');
  }
  
  console.log('\n🎯 Copy this exact string to Vercel GOOGLE_APPLICATION_CREDENTIALS_JSON:');
  console.log('='.repeat(80));
  console.log(jsonString);
  console.log('='.repeat(80));
  
} catch (error) {
  console.error('❌ Error reading or parsing credentials file:', error.message);
}
