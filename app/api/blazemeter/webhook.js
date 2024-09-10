// pages/api/webhook.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const webhookData = req.body;
  
    // Log or process the incoming webhook data
    console.log('Received webhook data:', webhookData);
  
    // Example processing
    const { test_name, result, test_run_url } = webhookData;
  
    if (result === 'fail') {
      console.error(`Test failed: ${test_name}. View details at ${test_run_url}`);
    } else {
      console.log(`Test passed: ${test_name}.`);
    }
  
    // Respond to Runscope that the webhook was received successfully
    res.status(200).json({ message: 'Webhook received' });
  }
  