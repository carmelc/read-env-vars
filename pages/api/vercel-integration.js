import qs from 'querystring'

const handler = async function (req, res) {
    const result = await fetch('https://api.vercel.com/v2/oauth/access_token', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        body: qs.stringify({
            client_id: process.env.VERCEL_CLIENT_ID,
            client_secret: process.env.VERCEL_CLIENT_SECRET,
            code: req.body.code,
            redirect_uri: `${process.env.URL}/api/vercel-redirect`
        })
    });

    const body = await result.json();

    const accessToken = body.access_token;
    const teamId = body.team_id;
    const projectsJson = await fetch(`https://api.vercel.com/v4/projects${teamId ? `?teamId=${teamId}` : ''}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    const {projects} = await projectsJson.json();

    const envResult = await fetch(`https://api.vercel.com/v9/projects/${projects[0].id}/env${teamId ? `?teamId=${teamId}` : ''}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        method: 'POST',
        body: JSON.stringify([{
            key: 'BOOKINGS_API_KEY',
            value: req.body.envVars.BOOKINGS_API_KEY,
            type: 'plain',
            target: ['development', 'preview', 'production']
        }, {
            key: 'BOOKINGS_SITE_ID',
            value: req.body.envVars.BOOKINGS_SITE_ID,
            type: 'plain',
            target: ['development', 'preview', 'production']
        },
            {
                key: 'NEXT_PUBLIC_BOOKINGS_CHECKOUT_URL',
                value: req.body.envVars.NEXT_PUBLIC_BOOKINGS_CHECKOUT_URL,
                type: 'plain',
                target: ['development', 'preview', 'production']
            }])
    })
    const bodyEnv = await envResult.json();

    res.status(200).json(bodyEnv);
}

export default handler;
