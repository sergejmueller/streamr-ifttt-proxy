module.exports = (req, res) => {
    res.status(
        (req.headers['ifttt-service-key'] === process.env['IFTTT_KEY']) ? 200 : 401
    ).send()
}
