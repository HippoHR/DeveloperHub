---
---

[Developer Hub](/) &raquo; [API](/api) &raquo; [Documentatie](/api/doc.html) &raquo; [Requests](/api/requests) &raquo; /applications/cv

# /application/cv

Download een cv, dat is meegestuurd bij een sollicitatie.

## Request

|**URL**          |http://www.uitzendbureau.nl/api/application/cv
|**HTTP-methode** |POST

## Parameters

|**Parameter**     |**Type** |**Optioneel** |**Beschrijving**
|**sessionId**     |String   |Nee           |De session identifier (hoofdlettergevoelig), die is verkregen tijdens de authenticatie.
|**cvHash**        |String   |Nee           |De unieke hash van de cv, zoals verkregen bij het [opvragen van de sollicitaties](/api/requests/applications).
|**applicationId** |Integer  |Nee           |Het unieke id van de sollicitatie, waarbij de betreffende cv is meegestuurd. Het id kan verstuurd worden zoals deze is verkregen bij het [opvragen van de sollicitaties](/api/requests/applications).

## Response

De gegevens worden aangeboden in JSON-formaat.

## Velden

|**Veld**          |**Type** |**Optioneel** |**Beschrijving**
|**cvHash**        |String   |Nee           |De unieke hash van de cv
|**applicationId** |Integer  |Nee           |Het unieke id van de sollicitatie, waarbij de betreffende cv is meegestuurd. E&eacute;n cv kan bij meerdere sollicitaties worden meegestuurd. De waarde in dit veld is afhankelijk van de meegestuurde parameter.
|**fileName**      |String   |Nee           |De bestandsnaam van de cv. Dit een combinatie van de `cvHash` en `fileType`.
|**fileSize**      |Integer  |Nee           |De grootte van het bestand in aantal bytes.
|**fileType**      |String   |Nee           |Het type bestand. Op dit moment worden ondersteund: `doc`, `docx`, `pdf` en `rtf`. Mogelijk worden er in de toekomst ook andere formaten toegevoegd.
|**file**          |String   |Nee           |Het bestand zelf. Het binary-bestand wordt gecodeerd via `base64`. Deze dient dus gedecodeerd te worden, zodat de binary-waarde verkregen wordt.


## Foutcodes

Eventuele fouten worden aangegeven in de vorm van HTTP status codes. Bij deze request kunnen de volgende foutcodes optreden:

<table>
    <tbody>
        <tr>
            <td>
                <strong>400</strong>
            </td>
            <td>
                Controleer de meegestuurde parameters.
                <ul>
                    <li>Ben je een parameter vergeten of is deze leeg?</li>
                    <li>Is <code>applicationId</code> niet numeriek?</li>
                    <li>Is <code>applicationId</code> wel een bestaande sollicitatie?</li>
                    <li>Hoort de <code>cvHash</code> wel bij de meegestuurde <code>applicationId</code>?</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>
                <strong>401</strong>
            </td>
            <td>
                Je bent niet geauthenticeerd. Mogelijk is de sessie verlopen. Volg <a href="/api/auth.html">deze stappen</a> opnieuw, om jezelf in te loggen.
            </td>
        </tr>
        <tr>
            <td>
                <strong>402</strong>
            </td>
            <td>
                Je kunt deze sollicitaties niet bekijken. Dit kan enkele oorzaken hebben:
                <ul>
                    <li>
                        Je (proef)abonnement is be&euml;indigd. <a href="http://uitzendbureau.nl/login/mijn-account">Bekijk je abonnement</a> (login nodig).
                    </li>
                    <li>
                        Je facturen zijn niet voldaan. <a href="http://uitzendbureau.nl/login/mijn-account/facturen">Bekijk je facturen</a> (login nodig).
                    </li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>
                <strong>403</strong>
            </td>
            <td>
                Deze aanvraag is voor jou helaas niet toegankelijk.
            </td>
        </tr>
        <tr>
            <td>
                <strong>429</strong>
            </td>
            <td>
                Je hebt je limiet voor het aantal API-requests overschreden.
            </td>
        </tr>
        <tr>
            <td>
                <strong>500</strong>
            </td>
            <td>
                Er is een onverwachte fout opgetreden. Indien deze fout optreedt, neem dan contact op met ons via 085-4019579 of
                <a href="mailto:techniek@uitzendbureau.nl?subject=DeveloperHub%3A%20API%20%2Fapplications%2Fcv%3A%20status%20500">techniek@uitzendbureau.nl</a>.
            </td>
        </tr>
        <tr>
            <td>
                <strong>503</strong>
            </td>
            <td>
                Vanwege onderhoud is de API tijdelijk niet beschikbaar.
            </td>
        </tr>
    </tbody>
</table>

## Voorbeeldresponse

    {
        "cvHash": "dennis123-broe-7bc26",
        "applicationId": 1636189,
        "fileName": "dennis123-broe-7bc26.docx",
        "fileSize": 52286,
        "fileType": "docx",
        "file": "SGVsbG8gd29ybGQh"
    }
