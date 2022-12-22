import qs from 'querystring'

const handler = async function (req, res) {
    const oauthInput = {
        client_id: process.env.VERCEL_CLIENT_ID,
        client_secret: process.env.VERCEL_CLIENT_SECRET,
        code: req.body.code,
        redirect_uri: process.env.INTEGRATION_OAUTH_REDIRECT_URL,
    };
    const result = await fetch('https://api.vercel.com/v2/oauth/access_token', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        body: qs.stringify(oauthInput)
    });

    const body = await result.json();
    if (!body.access_token) {
        body.debug = oauthInput;
        res.status(400).json(body);
        return;
    }

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
        body: JSON.stringify(
            Object.keys(req.body.envVars).map(key => ({
                key,
                value: req.body.envVars[key],
                type: 'plain',
                target: ['development', 'preview', 'production']
            }))
        ),
    });
    const bodyEnv = await envResult.json();

    res.status(200).json(bodyEnv);
}

export default handler;
