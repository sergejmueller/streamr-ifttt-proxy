<p align="center">
    <b>Streamr IFTTT Proxy</b>
    <br>
    A service API between IFTTT and Streamr
</p>

Serverless API endpoints for the [IFTTT Streamr service](https://ifttt.com/streamr_network) 


### Triggers
Trigger | Fields | Response | Example
--- | --- | --- | ---
A new stream event was published | <ul><li>`Streamr Private Key`</li><li>`Streamr Stream ID`</li></ul> | Up to 5 values from the published data point object | <ul><li>`CreatedAt`</li><li>`Ingredient1`</li><li>`Ingredient2`</li><li>`Ingredient3`</li><li>`Ingredient4`</li><li>`Ingredient5`</li></ul>

### Actions
Action | Fields | Request | Example
--- | --- | --- | ---
Publish a data point to a custom stream | <ul><li>`Streamr Private Key`</li><li>`Streamr Stream ID`</li><li>`Publish Event Data`</li></ul> | `key={{value}}` pairs wrapped to a new line which will be converted to the data point object | `TrackName={{TrackName}}`<br>`ArtistName={{ArtistName}}`<br>`AlbumName={{AlbumName}}`<br>`TrackId={{TrackId}}`


### Hosting
* https://vercel.com
