---
---

[Developer Hub]({{ '/' | relative_url }}) &raquo; [API]({{ '/api' | relative_url }}) &raquo; [Documentatie]({{ '/api/doc.html' | relative_url }}) &raquo; [Requests]({{ '/api/requests' | relative_url }}) &raquo; /applications/tracking-data

# /applications/tracking-data/{trackingDataKey}

This controller fetches tracking data of job external applications.

## Request

|**URL**          |https://www.uitzendbureau.nl/api/applications/tracking-data/{trackingDataKey}
|**HTTP-method** |GET

## Parameters

|**Parameter**          |**Type**                 |**Optional** |**Description**
|**trackingDataKey**    |String (in Path)         |No           |The unique key for tracking data. Place it in the url instead of {trackingDataKey}
|**sessionId**          |String                   |No           |The session identifier (case-sensitive), obtained during authentication.
|**minTrackingDate**    |String (DateTime format) |Yes          |The minimum date for tracking data. If provided, only applications since this date will be fetched. The datetime string should be in ISO 8601 format: 'Y-m-d\TH:i:s'.
|**maxTrackingDate**    |String (DateTime format) |Yes          |The maximum date for tracking data. If provided, only applications up to this date will be fetched. The datetime string should be in ISO 8601 format: 'Y-m-d\TH:i:s'.


## Response

The response is in JSON format, containing an array of object.

## Fields


|**Field**       |**Type**                  |**Optional**   |**Description**
|**id**          |Integer                   |No             |Unique identifier for each job application.
|**jobId**       |Integer                   |No             |An external identifier of the job that has received the application. 
|**cpc**         |Integer                   |No             |CPC value for job application. Value is in cents.
|**dateTracked** |String (DateTime format)  |No             |The date when job application was tracked in 'Y-m-d\\TH:i:sP' format.


## Error Codes
Possible errors are indicated in the form of HTTP status codes. The following error codes may occurs during this request:
<table>
    <tbody>
        <tr>
            <td>
                <strong>400</strong>
            </td>
            <td>
                Check the provided parameters, is anything forgotten or empty
            </td>
        </tr>
        <tr>
            <td>
                <strong>401</strong>
            </td>
            <td>
                You are not authenticated. Maybe the session has expired, follow <a href="/api/auth.html">these steps</a> to login again.
            </td>
        </tr>
        <tr>
            <td>
                <strong>429</strong>
            </td>
            <td>
                Your limit for the number of API requests has been exceeded.
            </td>
        </tr>
        <tr>
            <td>
                <strong>500</strong>
            </td>
            <td>
                An unexpected error occurred. If this error occurs, please contact us.
            </td>
        </tr>
        <tr>
            <td>
                <strong>503</strong>
            </td>
            <td>
                The API is temporarily unavailable due to maintenance.
            </td>
        </tr>
    </tbody>
</table>

## Example Request
```
CURL https://www.uitzendbureau.nl/api/applications/tracking-data/984lytusjmal24aa?minTrackingDate=2024-04-18T04:32:42&maxTrackingDate=2024-04-20T04:32:42&sessionId=whbsiu393amcx023an
```


## Example Response

    [
        {
            "cpc":2300,
            "dateTracked":"2024-04-19T08:04:48+02:00",
            "id":1,
            "jobId":"77047137"
        },
        {
            "cpc":2300,
            "dateTracked":"2024-04-18T08:04:48+02:00",
            "id":2,
            "jobId":"02469584"
        }
    ]