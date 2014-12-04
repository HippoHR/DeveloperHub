---
layout: default
---

[Developer Hub](/) &raquo; [API](/api) &raquo; Documentatie

# API-documentatie

## Algemene informatie

De API van Uitzendbureau.nl is bereikbaar vanaf de volgende root-url: http://www.uitzendbureau.nl/api

Er wordt een limiet gehanteerd van 1.000 requests per lopende dag. Dat betekent dat er tussen nu en gisteren om dezelfde tijd maximaal 1.000 requests
uitgevoerd mogen worden. Indien deze limiet wordt overschreden, dan wordt er een foutmelding getoond. Er worden dus geen kosten in rekening gebracht.

De API werkt via HTTP POST. De mee te sturen parameters dienen dus als POST-waarden meegestuurd te worden naar de aangegeven URL&#39;s.

## Aan de slag

1. Vraag een authenticatiesleutel aan door te e-mailen naar
[techniek@uitzendbureau.nl](mailto:techniek@uitzendbureau.nl?subject=DeveloperHub%3A%20Aanvraag%20authenticatiesleutel%20API), of te bellen naar 0478-640204.
Bewaar de sleutel goed, en ga ermee om als een waardevol wachtwoord.

2. De eerste stap bij het implementeren van de API is de authenticatie. Bekijk de [uitgebreide beschrijving](/api/auth.html).

3. Als de authenticatie is gelukt, kun je de gegevens ophalen via de API. Bekijk het overzicht met [alle requests](/api/requests).
