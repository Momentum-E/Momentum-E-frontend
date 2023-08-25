// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const axios = require('axios');
const crypto = require("crypto");

// type Data = {
//   name: string
// }

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: 'John Doe' })

const ENODE_WEBHOOK_SECRET = crypto.randomBytes(32).toString("hex");
// }
const webhookData = {
  secret: ENODE_WEBHOOK_SECRET,
  url: "http://localhost:5000/webhooks/firehose",
}

axios.get(`https://enode-api.sandbox.enode.io/webhooks/firehose`, webhookData)
  .then(response => {
    if (response.status === 204) {
      console.log('Webhook created successfully');
    } else {
      console.error('Unexpected response:', response.status);
    }
  })
  .catch(error => {
    console.error('Error creating webhook:', error.response);
  });

