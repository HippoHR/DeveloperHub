---
---

[Developer Hub](/) &raquo; [API](/api) &raquo; [Documentatie](/api/doc.html) &raquo; [Requests](/api/requests) &raquo; /applications

# /applications

Vraag een lijst met sollicitaties op.

_Let op:_ Er worden maximaal 50 resultaten getoond per request.

## Request

|**URL**          |https://www.uitzendbureau.nl/api/applications
|**HTTP-methode** |POST (application/x-www-form-urlencoded)
|**Limiet**       |Maximaal 50 resultaten per request

## Parameters

|**Parameter** |**Type** |**Optioneel** |**Beschrijving**
|**sessionId** |String   |Nee           |De session identifier (hoofdlettergevoelig), die is verkregen tijdens de authenticatie.
|**fromDate**  |Date     |Ja            |Deze datum beschrijft de startdatum voor het opvragen van sollicaties. Indien de startdatum bijvoorbeeld `2012-04-11 15:13:21` is, dan worden de eerste sollicitaties op en na dit tijdstip opgevraagd. De waarde is altijd in het formaat `YYYY-MM-DD HH:MM:SS`. `fromDate` mag niet in de toekomst liggen, of meer dan een jaar geleden zijn. Indien deze parameter niet wordt meegestuurd, worden de laatste sollicitaties opgevraagd.
|**offset**    |Integer  |Ja            |Vanwege het limiet in het aantal resultaten in de lijst, kan de offset-parameter worden gebruikt. Deze parameter heeft alleen nut indien ook de parameter `fromDate` wordt gebruikt. Als de parameter niet wordt meegestuurd, wordt de offsetwaarde `1` gebruikt. Dit is het eerste element uit de resultatenlijst. Indien je door alle sollicitaties wil bladeren, dien je de offset dus telkens met de hoogte van het limiet te verhogen. Een logische sequentie zou dus zijn: `1` - `51` - `101` - `151` etc.

## Response

De resultaten worden aangeboden in JSON-formaat, en gesorteerd op de datum van de sollicitatie.

## Velden

|**Veld**             |**Type** |**Optioneel** |**Beschrijving**
|**id**               |Integer  |Nee           |Identifier van de sollicitatie. Iedere sollicitatie heeft een uniek id.
|**applicationDate**  |Date     |Nee           |Datum en tijdstip van de sollicitatie. Wordt aangeboden in het formaat `YYYY-MM-DD HH:MM:SS`
|**name**             |String   |Nee           |De naam van de sollicitant.
|**firstName**        |String   |Ja***         |De voornaam van de sollicitant.
|**lastName**         |String   |Ja***         |De achternaam van de sollicitant.
|**phone**            |String   |Nee           |Telefoonnummer van de sollicitant.
|**email**            |String   |Nee           |E-mailadres van de sollicitant.
|**motivation**       |String   |Nee           |Motivatietekst, geschreven door de sollicitant bij de sollicitatie.
|**cvHash**           |String   |Nee           |De cv-hash voor het bekijken van de cv van de kandidaat. De cv kan ook [via de API worden opgehaald](/api/requests/applications/cv.html).
|**emailReceiver**    |String   |Nee           |Het e-mailadres van de intercedent of vestiging waarnaar de sollicitatie is verzonden.
|**uzbJobId**         |Integer  |Nee           |Het unieke vacature id van de vacature waarop is gesolliciteerd.
|**jobId**            |String   |Ja*           |Indien vacatures automatisch worden doorgeplaatst naar Uitzendbureau.nl (bijvoorbeeld via een XML-koppeling), dan is er ook een id beschibaar dat wordt gehanteerd door het uitzendbureau zelf. Dit id wordt hier getoond.
|**alternativeJobId** |String   |Ja*           |Vergelijkbaar met `jobId`, echter is bij sommige uitzendbureaus sprake van meerdere id&#39;s (of referentienummers). In dat geval wordt het alternatief hier getoond.
|**jobTitle**         |String   |Ja**          |De titel van de vacature waarop is gesolliciteerd.
|**jobPlace**         |String   |Ja**          |De standplaats van de vacature waarop is gesolliciteerd.

\* Indien er geen waarde bekend is, wordt een `null`-waarde geretourneerd.

** In zeer exclusieve gevallen kunnen deze waarden niet beschibaar zijn, waardoor de waarde `null` is.

*** Bij oudere sollicitaties kan dit veld de volledige naam bevatten.

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
                    <li>Ben je <code>sessionId</code> vergeten of is deze leeg?</li>
                    <li>Is <code>fromDate</code> van het juiste formaat <code>YYYY-MM-DD HH:MM:SS</code>?</li>
                    <li>Is <code>fromDate</code> misschien een datum in de toekomst?</li>
                    <li>Of is <code>fromDate</code> langer dan een jaar geleden?</li>
                    <li>Is <code>offset</code> wel numeriek?</li>
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
                        Je (proef)abonnement is be&euml;indigd. <a href="https://uitzendbureau.nl/login/mijn-account">Bekijk je abonnement</a> (login nodig).
                    </li>
                    <li>
                        Je facturen zijn niet voldaan. <a href="https://uitzendbureau.nl/login/mijn-account/facturen">Bekijk je facturen</a> (login nodig).
                    </li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>
                <strong>403</strong>
            </td>
            <td>
                Deze aanvraag is voor jou helaas niet toegankelijk. Indien deze fout optreedt, neem dan contact op met ons via 085-4019579 of
                <a href="mailto:techniek@uitzendbureau.nl?subject=DeveloperHub%3A%20API%20%2Fapplications%3A%20status%20403">techniek@uitzendbureau.nl</a>.
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
                <a href="mailto:techniek@uitzendbureau.nl?subject=DeveloperHub%3A%20API%20%2Fapplications%3A%20status%20500">techniek@uitzendbureau.nl</a>.
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

    [
        {
            "id": 1636189,
            "applicationDate": "2017-08-17 11:31:50",
            "name": "Jan Jansen",
            "firstName": "Jan",
            "lastName": "Jansen",
            "phone": "06-12345678",
            "email": "sollicitant@hotmail.com",
            "motivation": "Ik heb 10 jaar ervaring als buschauffeur. (...)",
            "cvHash": "jan-jansen-7bc26",
            "emailReceiver": "intercedent@mijnuitzendbureau.nl",
            "uzbJobId": 4102191,
            "jobId": "382910",
            "alternativeJobId": "V-002910",
            "jobTitle": "Buschauffeur",
            "jobPlace": "Amsterdam"
        },
        {
            "id": 1636190,
            "applicationDate": "2017-08-17 11:31:51",
            "name": "Bob de Bouwer",
            "firstName": "Bob",
            "lastName": "de Bouwer",
            "phone": "06-12345678",
            "email": "bobdebouwer@uitzendbureau.nl",
            "motivation": "Ik heb 8 jaar ervaring als monteur. (...)",
            "cvHash": "bob-de-bouwer-6fbd8f8e-dc50-4147-8da3-ac94eececc81",
            "emailReceiver": "intercedent@mijnuitzendbureau.nl",
            "uzbJobId": 4102459,
            "jobId": "382912",
            "alternativeJobId": "V-002912",
            "jobTitle": "Monteur",
            "jobPlace": "Rotterdam"
        }
    ]
