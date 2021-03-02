const helpers = require('../helpers')
const StreamrClient = require('streamr-client')

module.exports = async (req, res) => {
    if (!'authorization' in req.headers) {
        return helpers.sendError(res, 'No authorization header received', 400)
    }

    const privateKey = helpers.getPrivateKeyFromHeaders(req.headers)

    if (!privateKey) {
        return helpers.sendError(res, 'Invalid private key received', 401)
    }

    if (!req.body) {
        return helpers.sendError(res, 'No data received', 400)
    }

    if (!('queryFields' in req.body)) {
        return helpers.sendError(res, 'No query fields received', 400)
    }

    const queryFields = req.body['queryFields']
    const streamId = queryFields['streamr_stream_id']
    const last = 'limit' in req.body ? req.body['limit'] : 50

    if (!streamId) {
        return helpers.sendError(res, 'No stream id received', 400)
    }

    if (!last) {
        return helpers.sendSuccess(res, {
            data: []
        })
    }

    try {
        const events = []

        const client = new StreamrClient({
            auth: { privateKey },
            verifySignatures: 'never'
        })

        const subscription = await client.resend(
            {
                stream: streamId,
                resend: { last }
            },
            (message, metadata) => {
                const ingredients = {}
                const { timestamp } = metadata.messageId

                ingredients['created_at'] = (new Date(timestamp)).toISOString()

                Object.entries(message).forEach(([key, value], index) => {
                    ingredients[`ingredient_${++index}`] = value
                });

                events.push({ ...ingredients, meta: {
                    id: helpers.toBase64(JSON.stringify(ingredients)),
                    timestamp: Math.floor(timestamp / 1000)
                } })
            }
        )

        subscription.on('initial_resend_done', () => {
            return helpers.sendSuccess(res, {
                data: events.reverse(),
                cursor: last === 1 ? helpers.toBase64(JSON.stringify(events)) : null
            })
        })
    } catch {
        return helpers.sendError(res, 'An error occurred while resending', 400)
    }
}
