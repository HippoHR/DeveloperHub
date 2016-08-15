---
---

[Developer Hub](/) &raquo; [API](/api) &raquo; [Documentatie](/api/doc.html) &raquo; [Requests](/api/requests) &raquo;
/authentication/request-challenge

# /authentication/request-challenge

Vraag een challenge aan, waarmee een response gegenereerd kan worden. Dit wordt gebruikt bij de authenticatie.

[Meer informatie over de authenticatieprocedure](/api/auth.html).

## Request

|**URL**          |http://www.uitzendbureau.nl/api/authentication/request-challenge
|**HTTP-methode** |POST (application/x-www-form-urlencoded)

## Parameters

Er hoeven geen parameters te worden meegestuurd.

## Response

De response wordt aangeboden in JSON-formaat.

## Velden

|**Veld**      |**Type**    |**Optioneel** |**Beschrijving**
|**sessionId** |String      |Nee           |De session identifier, uniek voor de huidige sessie. Deze waarde dient bij ieder volgend request te worden meegestuurd.
|**challenge** |String      |Nee           |De challenge, welke gebruikt wordt voor het maken van een response. Meer informatie hierover vind je [hier](/api/auth.html).

## Foutcodes

Eventuele fouten worden aangegeven in de vorm van HTTP status codes. Bij deze request kunnen de volgende foutcodes optreden:

|**500** |Er is een onverwachte fout opgetreden. Indien deze fout optreedt, neem dan contact op met ons via 085-4019579 of [techniek@uitzendbureau.nl](mailto:techniek@uitzendbureau.nl?subject=DeveloperHub%3A%20API%20%2Fauthentication%2Frequest-challenge%3A%20status%20500).
|**503** |Vanwege onderhoud is de API tijdelijk niet beschikbaar.

## Voorbeeldresponse

    {
        "sessionId": "Tu7IbNY4wuOveK5P9qk5IdQgQlbAvPi6",
        "challenge": "ETQi8JEH6x3AT1usK2TB69r2GD1CkYJP"
    }
