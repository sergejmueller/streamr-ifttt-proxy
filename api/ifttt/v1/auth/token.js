const helpers = require('../helpers')

module.exports = (req, res) => {
    if (!req.body) {
        return helpers.sendError(res, 'Empty data received', 401)
    }

    if (req.body['client_id'] !== process.env['IFTTT_CLIENT_ID']) {
        return helpers.sendError(res, 'Wrong client id received', 401)
    }

    if (req.body['client_secret'] !== process.env['IFTTT_CLIENT_SECRET']) {
        return helpers.sendError(res, 'Wrong client secret received', 401)
    }

    if (req.body['grant_type'] !== 'authorization_code') {
        return helpers.sendError(res, 'Wrong grant type received', 401)
    }

    const privateKey = helpers.fromBase64(req.body['code'])

    if (/^[\d\w]{64}$/.exec(privateKey) === null) {
        return helpers.sendError(res, 'No valid private key extracted', 401)
    }

    return helpers.sendSuccess(res, {
        'token_type': 'Bearer',
        'access_token': privateKey
    })
}
