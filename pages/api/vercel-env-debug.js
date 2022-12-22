const handler = async function (req, res) {

    const bodyEnv = {
        NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
        VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
        NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
    };

    res.status(200).json(bodyEnv);
}

export default handler;
