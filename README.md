<p align="center">
    <b>Streamr IFTTT Proxy</b>
    <br>
    A service API between IFTTT and Streamr
</p>

Serverless API endpoints for the [IFTTT Streamr service](https://ifttt.com/streamr_network) 


### Triggers

#### Trigger
A new stream event was published

#### Fields
* `Streamr Stream ID` 

#### Response
Up to 5 values from the published data point object

#### Example
* `CreatedAt`
* `Ingredient1`
* `Ingredient2`
* `Ingredient3`
* `Ingredient4`
* `Ingredient5`


### Actions

#### Action
Publish a data point to a custom stream

#### Fields
* `Streamr Stream ID`
* `Publish Event Data`

#### Request
`key={{value}}` pairs wrapped to a new line which will be converted to the data point object

#### Example
```
TrackName={{TrackName}}
ArtistName={{ArtistName}}
AlbumName={{AlbumName}}
TrackId={{TrackId}}
```


### Hosting
* https://vercel.com
