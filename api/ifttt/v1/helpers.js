module.exports = {
    getPrivateKeyFromHeaders(headers) {
        const results = /Bearer ([\d\w]{64})/gm.exec(headers['authorization'])

        return results !== null ? results[1] : null
    },

    toBase64(string) {
        return Buffer.from(string).toString('base64').replace(/=/g, '')
    },

    fromBase64(base64) {
        return Buffer.from(base64, 'base64').toString()
    },

    convertStringToObject(data) {
        const regex = new RegExp('^(.+?)=(.+)$', 'gm')
        const output = {}
        let match

        while((match = regex.exec(data)) !== null) {
            // To avoid infinite loops
            if (match.index === regex.lastIndex) {
                regex.lastIndex ++
            }

            output[match[1]] = match[2]
        }

        return output
    },

    sendError(res, msg, code) {
        return res.status(code).json({
            errors: [{ 'status': 'SKIP', 'message': msg }]
        })
    },

    sendSuccess(res, data) {
        return res.status(200).json(data)
    },
}
