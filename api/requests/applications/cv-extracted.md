---
---

[Developer Hub]({{ '/' | relative_url }}) &raquo; [API]({{ '/api' | relative_url }}) &raquo; [Documentatie]({{ '/api/doc.html' | relative_url }}) &raquo; [Requests]({{ '/api/requests' | relative_url }}) &raquo; /applications/cv/extracted

# /application/cv/extracted

Vraag de inhoud van een cv-bestand op. De inhoud wordt zo goed mogelijk uit het cv-document gehaald en gemapt naar de beschikbare velden.

_Let op:_ wij kunnen niet garanderen dat bepaalde velden onder `cv` altijd zijn ingevuld. Sommige velden kunnen verkeerd gemapt zijn, of afwijken van de
gegevens die opgevraagd worden bij [/applications]({{ site.baseurl }}/api/requests/applications). Daarnaast kunnen de gegevens in een vreemde taal, incorrect of vreemd worden
getoond. Dit is afhankelijk van de kwaliteit van het cv-bestand en de technologie die de gegevens uit dit bestand verwerkt. Uitzendbureau.nl heeft zelf geen
directe invloed op deze technologie.

_Let op:_ het kan soms enkele minuten duren voordat de inhoud van een cv beschikbaar is na een sollicitatie. Tot die tijd wordt deze request beantwoord met een
HTTP status 404. Na enkele minuten (doorgaans binnen 3 minuten na een sollicitatie) wordt de inhoud beschikbaar gemaakt.

_Let op:_ voor sommige cv&#39;s (geplaatst voor 25 mei 2012, of cv&#39;s waarbij de inhoud niet herleid kon worden) zal dit request geen resultaat opleveren.
Er wordt in dat geval een HTTP status 404 getoond. Ditzelfde geldt voor cv&#39;s die al in een eerder stadium op Uitzendbureau.nl zijn gezet. Denk hierbij aan
cv&#39;s die voor 25 mei 2012 bij een profiel van werkzoekenden zijn gezet, en later zijn gebruikt bij een sollicitatie.

## Request

|**URL**          |https://www.uitzendbureau.nl/api/application/cv/extracted
|**HTTP-methode** |POST (application/x-www-form-urlencoded)

## Parameters

|**Parameter**     |**Type** |**Optioneel** |**Beschrijving**
|**sessionId**     |String   |Nee           |De session identifier (hoofdlettergevoelig), die is verkregen tijdens de authenticatie.
|**cvHash**        |String   |Nee           |De unieke hash van de cv, zoals verkregen bij het [opvragen van de sollicitaties]({{ site.baseurl }}/api/requests/applications).
|**applicationId** |Int      |Nee           |Het unieke id van de sollicitatie, waarbij de betreffende cv is meegestuurd. Het id kan verstuurd worden zoals deze is verkregen bij het [opvragen van de sollicitaties]({{ site.baseurl }}/api/requests/applications).

## Response

De response wordt aangeboden in JSON-formaat.

## Velden

<table>
    <tbody>
        <tr>
            <td>
                <strong>Veld</strong>
            </td>
            <td>
                <strong>Type</strong>
            </td>
            <td>
                <strong>Optioneel</strong>
            </td>
            <td>
                <strong>Beschrijving</strong>
            </td>
        </tr>
        <tr>
            <td>
                <strong>cvHash</strong>
            </td>
            <td>
                String
            </td>
            <td>
                Nee
            </td>
            <td>
                De unieke hash van de cv
            </td>
        </tr>
        <tr>
            <td>
                <strong>applicationId</strong>
            </td>
            <td>
                Int
            </td>
            <td>
                Nee
            </td>
            <td>
                Het unieke id van de sollicitatie, waarbij de betreffende cv is meegestuurd. E&eacute;n cv kan bij meerdere sollicitaties worden meegestuurd.
                De waarde in dit veld is afhankelijk van de meegestuurde parameter.
            </td>
        </tr>
        <tr>
            <td>
                <strong>cv</strong>
            </td>
            <td>
                Object
            </td>
            <td>
                Nee
            </td>
            <td>
                Zie voorbeeldresponse.

                <ul>
                    <li>
                        Datums worden aangeboden in het formaat <code>YYYY-MM-DD</code>. Voor sommige datums is echter geen specifieke dag beschikbaar. In dat
                        geval wordt het formaat <code>YYYY-MM</code>, of zelfs <code>YYYY</code> gebruikt.
                    </li>
                    <li>
                        Geslacht heeft &eacute;&eacute;n van de volgende waarden: <code>M</code> (man), <code>F</code> (vrouw) of <code>null</code> (onbekend)
                    </li>
                    <li>
                        Het veld <code>driverLicences</code> kan de volgende waarden bevatten: <code>CAR</code>, <code>MOTOR</code>, <code>MOPED</code>,
                        <code>BUS</code>, <code>TRUCK</code>, <code>FORKLIFT</code> en <code>TRACTOR</code>
                    </li>
                    <li>
                        Voor de talen gelden de volgende niveaus: <code>AVERAGE</code>, <code>GOOD</code> en <code>EXCELLENT</code>.
                    </li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

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
                Je bent niet geauthenticeerd. Mogelijk is de sessie verlopen. Volg <a href="/api/auth.html">deze stappen</a>, om een nieuwe sessie te starten.
            </td>
        </tr>
        <tr>
            <td>
                <strong>402</strong>
            </td>
            <td>
                Je kunt deze cv niet bekijken. Dit kan enkele oorzaken hebben.

                <ul>
                    <li>
                        Je (proef)abonnement is be&euml;indigd. <a href="https://www.uitzendbureau.nl/login/mijn-account">Bekijk je abonnement</a> (login nodig)
                    </li>
                    <li>
                        Je facturen zijn niet voldaan. <a href="https://www.uitzendbureau.nl/login/mijn-account/facturen">Bekijk je facturen</a> (login nodig)
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
                <strong>404</strong>
            </td>
            <td>
                Er kunnen drie oorzaken zijn:

                <ul>
                    <li>De aangevraagde cv is nog niet beschikbaar (binnen enkele minuten na sollicitatie)</li>
                    <li>De aangevraagde cv bestaat niet</li>
                    <li>Er is geen inhoud beschikbaar voor de opgevraagde cv</li>
                </ul>
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
                <a href="mailto:techniek@uitzendbureau.nl?subject=DeveloperHub%3A%20API%20%2Fapplications%2Fcv-extracted%3A%20status%20500">
                  techniek@uitzendbureau.nl</a>.
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
        "cvHash": "bob-de-bouwer-6fbd8f8e-dc50-4147-8da3-ac94eececc81",
        "applicationId": 1636190,
        "cv":
        {
            "firstName": "Bob",
            "initials": "B.",
            "lastNamePrefix": "de",
            "lastName": "Bouwer",
            "title": "B Eng",
            "dateOfBirth": "1977-01-30",
            "placeOfBirth": "Bobstad",
            "maritalStatus": "Gehuwd",
            "nationality": "Nederlandse",
            "gender": "M",
            "street": "Snoeistraat",
            "streetNumber": "1",
            "zipcode": "1234 BB",
            "place": "Zonnebloemvalei",
            "country": "Nederland",
            "phones":
            [
                "0123456789"
            ],
            "mobilePhones":
            [
                "06-12345678"
            ],
            "faxes":
            [
                "0123456798"
            ],
            "emails":
            [
                "bobdebouwer@uitzendbureau.nl"
            ],
            "availability": "2012-05-24",
            "driverLicences":
            [
                "CAR",
                "MOPED",
                "TRUCK",
                "FORKLIFT",
                "TRACTOR"
            ],
            "educations":
            [
                {
                    "education": "Betontimmerman",
                    "level": "MBO",
                    "startDate": "1993",
                    "endDate": "1998",
                    "school": "College De Gereedschapskist",
                    "graduated": true,
                    "subjects": "beton storten, timmeren",
                    "isHighestEducation": false
                },
                {
                    "education": "Bouwkunde",
                    "level": "HBO",
                    "startDate": null,
                    "endDate": null,
                    "school": "HBO De Zaag in Houtdorp",
                    "graduated": false,
                    "subjects": "tekenen, bouwen, praten met werktuigen",
                    "isHighestEducation": true
                },
                {
                    "education": "VCA Certificaat",
                    "level": "Cursus",
                    "startDate": null,
                    "endDate": null,
                    "school": "De Hamer in Houtdorp",
                    "graduated": true,
                    "subjects": "veiligheid, gezondheid, milieu (VGM) checklist aannemers",
                    "isHighestEducation": false
                }
            ],
            "workExperiences":
            [
                {
                    "jobTitle": "Betontimmerman",
                    "startDate": "2004-08",
                    "endDate": "2008-1",
                    "employer": "Constructiebedrijf De Spijker",
                    "description": "Maken van bekisting en storten van beton.",
                    "quitReason": "Zelfstandig geworden.",
                    "isLastItem": false,
                    "isLastItemWithJobTitle": false
                },
                {
                    "jobTitle": "Baas Constructiebedrijf De Balk",
                    "startDate": "2008-04",
                    "endDate": null,
                    "employer": "Constructiebedrijf De Balk",
                    "description": "Constructie van gebouwen met assistant Wendy en de machines.",
                    "quitReason": "",
                    "isLastItem": true,
                    "isLastItemWithJobTitle": true
                }
            ],
            "computerSkills":
            [
                "Word",
                "Excel",
                "Powerpoint"
            ],
            "languages":
            [
                {
                    "language": "Nederlands",
                    "level": "EXCELLENT"
                },
                {
                    "language": "Engels",
                    "level": "GOOD"
                },
                {
                    "language": "Duits",
                    "level": "AVERAGE"
                }
            ],
            "softSkills":
            [
                "Teamplayer",
                "nauwkeurig",
                "verantwoordelijk"
            ],
            "hobbies":
            [
                "Tuinieren",
                "praten met mijn machines"
            ]
        }
    }
