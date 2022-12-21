const handler = async function (req, res) {
    const { code, next } = req.query;
    res.redirect(`https://manage.wix.com/account/site-selector?title=Please Select the site You wish to connect to Vercel&actionUrl=https://manage.wix.com/_api/wix-anywhere-embed/headless-funnel-redirect-vercel/{metaSiteId}%23code=${code}%26next=${next}%26provider=vercel`)
}

export default handler;
