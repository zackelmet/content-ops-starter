// Server-side API route to add subscribers to MailerLite.
// Requires these environment variables in .env.local (do NOT commit):
// MAILERLITE_API_KEY - your MailerLite API key
// MAILERLITE_GROUP_ID - (optional) MailerLite group id to add the subscriber to

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { email } = req.body || {};
    if (!email || typeof email !== 'string') {
        return res.status(400).json({ success: false, message: 'Invalid email' });
    }

    const API_KEY = process.env.MAILERLITE_API_KEY;
    const GROUP_ID = process.env.MAILERLITE_GROUP_ID; // optional

    if (!API_KEY) {
        return res.status(500).json({ success: false, message: 'MailerLite API key not configured' });
    }

    try {
        // If a GROUP_ID is provided, add the subscriber to the group (preferred)
        if (GROUP_ID) {
            const groupUrl = `https://api.mailerlite.com/api/v2/groups/${GROUP_ID}/subscribers`;
            const r = await fetch(groupUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-MailerLite-ApiKey': API_KEY
                },
                body: JSON.stringify({ email })
            });
            const data = await r.json();
            if (!r.ok) {
                return res.status(500).json({ success: false, message: data?.error || 'MailerLite error' });
            }
            return res.status(200).json({ success: true, message: 'Subscribed via group' });
        }

        // Otherwise, create or update subscriber at the top-level endpoint
        const url = 'https://api.mailerlite.com/api/v2/subscribers';
        const r = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-MailerLite-ApiKey': API_KEY
            },
            body: JSON.stringify({ email })
        });
        const data = await r.json();
        if (!r.ok) {
            return res.status(500).json({ success: false, message: data?.error || 'MailerLite error' });
        }
        return res.status(200).json({ success: true, message: 'Subscribed' });
    } catch (err) {
        console.error('subscribe error', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}
