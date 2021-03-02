const helpers = require('../helpers')
const StreamrClient = require('streamr-client')

module.exports = async (req, res) => {
    if (!'authorization' in req.headers) {
        return helpers.sendError(res, 'No authorization header received', 400)
    }

    const privateKey = helpers.getPrivateKeyFromHeaders(req.headers)

    if (!privateKey) {
        return helpers.sendError(res, 'Invalid or empty private key received', 401)
    }

    const client = new StreamrClient({
        auth: { privateKey }
    })

    const { name, username: id } = await client.getUserInfo()

    helpers.sendSuccess(res, {
        data: { name, id }
    })
}

