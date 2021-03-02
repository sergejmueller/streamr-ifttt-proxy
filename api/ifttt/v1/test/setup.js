const helpers = require('../helpers')

module.exports = (req, res) => {
    if (req.headers['ifttt-service-key'] !== process.env['IFTTT_KEY']) {
        return helpers.sendError(res, 'Not correct service key received', 401)
    }

    return helpers.sendSuccess(res,{
        data: {
            accessToken: 'd89dcf95874210e7352a8a549d8a3443891417360d3b0f8a86f2606caf150244',
            samples: {
                triggers: {
                    'stream_event_published': {
                        'streamr_stream_id': '0xd468ad3e35c22ad73fbf58d7e40d710a40301cae/ifttt/test/setup'
                    }
                },
                queries: {
                    'list_published_events': {
                        'streamr_stream_id': '0xd468ad3e35c22ad73fbf58d7e40d710a40301cae/ifttt/test/setup'
                    }
                },
                actions: {
                    'publish_stream_event': {
                        'streamr_stream_id': '0xd468ad3e35c22ad73fbf58d7e40d710a40301cae/ifttt/test/setup',
                        'publish_event_data': 'TrackName=24 Hours\nArtistName=Shawn Mendes\nAlbumName=Wonder\nTrackId=385VOmGbguaPG57TgoW8Lh\nTrigger=IFTTT Test Setup'
                    }
                },
                actionRecordSkipping: {
                    'publish_stream_event': {
                        'streamr_stream_id': '',
                        'publish_event_data': ''
                    }
                }
            }
        }
    })
}
