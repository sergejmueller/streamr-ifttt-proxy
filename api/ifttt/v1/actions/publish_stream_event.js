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

    if (!('actionFields' in req.body)) {
        return helpers.sendError(res, 'No action fields received', 400)
    }

    const actionFields = req.body['actionFields']
    const streamId = actionFields['streamr_stream_id']
    const eventData = actionFields['publish_event_data']

    if (!streamId) {
        return helpers.sendError(res, 'No stream id received', 400)
    }

    if (!eventData) {
        return helpers.sendError(res, 'No event data received', 400)
    }

    const eventDataObject = helpers.convertStringToObject(actionFields['publish_event_data'])

    if (!Object.keys(eventDataObject).length) {
        return helpers.sendError(res, 'No valid event data received', 400)
    }

    try {
        const client = new StreamrClient({
            auth: { privateKey }
        })

        const stream = await client.getStream(streamId)

        if (!stream) {
            return helpers.sendError(res, 'The stream was not found', 400)
        }

        const response = await client.publish(streamId, eventDataObject)

        return helpers.sendSuccess(res, {
            data: [{ id: response['requestId'] }]
        })
    } catch (error) {
        return helpers.sendError(res, 'An error occurred while publishing', 400)
    }
}
