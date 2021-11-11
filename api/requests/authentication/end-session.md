---
---

[Developer Hub]({{ '/' | relative_url }}) &raquo; [API]({{ '/api' | relative_url }}) &raquo; [Documentatie]({{ '/api/doc.html' | relative_url }}) &raquo; [Requests]({{ '/api/requests' | relative_url }}) &raquo; /authentication/end-session

# /authentication/end-session

Stop een actieve sessie.

## Request

|**URL**          |https://www.uitzendbureau.nl/api/authentication/end-session
|**HTTP-methode** |POST (application/x-www-form-urlencoded)

## Parameters

|**Parameter** |**Type** |**Optioneel** |**Beschrijving**
|**sessionId** |String   |Nee           |De session identifier (hoofdlettergevoelig), die is verkregen bij het aanvragen van een challenge.

## Response

De response wordt aangeboden in JSON-formaat.

## Velden

|**Veld**         |**Type** |**Optioneel** |**Beschrijving**
|**sessionEnded** |Bool     |Nee           |Retourneert `true` indien de sessie succesvol is gestopt.

## Foutcodes

Eventuele fouten worden aangegeven in de vorm van HTTP status codes. Bij deze request kunnen de volgende foutcodes optreden:

|**400** |Controleer de meegestuurde parameters. Ben je `sessionId` vergeten, of is deze leeg?
|**401** |Je bent niet geauthenticeerd. Mogelijk is de sessie verlopen.
|**500** |Er is een onverwachte fout opgetreden. Indien deze fout optreedt, neem dan contact op met ons via 085-4019579 of [techniek@uitzendbureau.nl](mailto:techniek@uitzendbureau.nl?subject=DeveloperHub%3A%20API%20%2Fauthentication%2Fend-session%3A%20status%20500).
|**503** |Vanwege onderhoud is de API tijdelijk niet beschikbaar.

## Voorbeeldresponse

    {
        "sessionEnded": true
    }
