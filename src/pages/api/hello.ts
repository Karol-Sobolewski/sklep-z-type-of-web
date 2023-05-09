// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from 'next'


const handler: NextApiHandler= async (req, res) => {
  // res.status(200).json({ name: 'John Doe' })

if (req.method !== "POST") {
  res.setHeader("Allow", "POST").status(405).json({});
  return
}


const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID

const email = req.body.email;

if(!MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
  return res.status(500).json({error: `Nie podano zmiennych środowiskowych`})
}

const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    'X-MailerLite-ApiKey': MAILERLITE_API_KEY,
  },
  body: JSON.stringify({email,}),
};


const response = await fetch(`https://api.mailerlite.com/api/v2/groups/${MAILERLITE_GROUP_ID}/subscribers`, options)

if(!response.ok) {
  console.log(`error`)
  return res.status(500).json({
    error: `Błąd przy zapisie do newslettera`,
  })
}

return res.status(201).json({});

}

export default handler;