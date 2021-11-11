---
---

[Developer Hub]({{ '/' | relative_url }}) &raquo; [API]({{ '/api' | relative_url }}) &raquo; [Documentatie]({{ '/api/doc.html' | relative_url }}) &raquo; Authenticatie

# Authenticatie

## Authenticatiesleutel

Iedere gebruiker van de API heeft zijn eigen authenticatiesleutel. Heb je nog geen sleutel voor jouw uitzendbureau? Je kunt deze aanvragen via tel. 085-4019579
of [techniek@uitzendbureau.nl](mailto:techniek@uitzendbureau.nl?subject=DeveloperHub%3A%20Aanvraag%20authenticatiesleutel%20API). Bewaar deze sleutel goed, en
ga ermee om als een waardevol wachtwoord.

## Challenge-response

Authenticatie bij de API werkt volgens het challenge-response-principe. Het initi&euml;ren van een sessie bestaat daarom uit twee stappen. Als je een sessie
wil starten, dan stuur je eerst een request naar [/authentication/request-challenge]({{ '/api/requests/authentication/request-challenge.html' | relative_url }}). Je ontvangt
vervolgens een challenge en een session identifier, beide in de vorm van een hash.

Je hebt nu drie hashes. Je hebt de zojuist verkregen challenge en session identifier, en daarnaast had je al een authenticatiesleutel. Je dient de challenge en
de authenticatiesleutel te combineren tot &eacute;&eacute;n nieuwe lowercase SHA1-hash (hoofdlettergevoelig). Dit noemen we een response. Dit kan als volgt:

    response = lowercase(sha1(challenge + authenticatiesleutel))

De zojuist gegenereerde response moet nu weer worden teruggestuurd naar de server, in combinatie met de session identifier (beide hoofdlettergevoelig). Dit
wordt gedaan met behulp van een request naar [/authentication/authenticate]({{ '/api/requests/authentication/authenticate.html' | relative_url }}). Als dit succesvol verloopt,
dan ben je geauthenticeerd. De session identifier dien je vervolgens mee te sturen (hoofdlettergevoelig) met iedere request die je uitvoert gedurende de
sessie. Hoe je dit moet doen, wordt uitgelegd bij de betreffende requests.

Een sessie verloopt automatisch 20 minuten na het initi&euml;ren van de sessie. Indien een sessie is verlopen, kan er een nieuwe sessie worden gestart door
bovengenoemde stappen opnieuw uit te voeren.

## Sessie afsluiten

Verder raden we je aan om de sessie af te sluiten indien alle API-requests zijn uitgevoerd. Dit kun je doen door een request te sturen naar
[/authentication/end-session]({{ '/api/requests/authentication/end-session.html' | relative_url }}). Als een sessie is verlopen, hoeft deze niet meer te worden afgesloten.

## De volgende stap

Nu de authenticatie is gelukt, kunnen je gegevens gaan ophalen met behulp van [verschillende requests]({{ '/api/requests' | relative_url }}).
