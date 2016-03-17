---
---

[Developer Hub](/) &raquo; [Vacatures plaatsen via XML](/jobs-xml) &raquo; [Documentatie](/jobs-xml/doc) &raquo; Uitleg XML-schema

# Authorisatie

_Let op:_ deze authorisatie is optioneel. Je kunt deze authorisatie gebruiken als je niet wil dat je XML-feed toegankelijk is voor iedereen die de url van je
feed kent.

Er wordt gebruik gemaakt van HTTP-authorisatie. Je zorgt ervoor dat je XML-bestand wordt afgeschermd (dit kan binnen de code, of bijvoorbeeld met `.htaccess`
en `.htpasswd` bij Apache). Er wordt daarbij gecontroleerd op de HTTP-header `Authorization`.

Er zijn verschillende authorisatietypes voor deze header. De meest gangbare is `Basic`, die bijvoorbeeld wordt gebruikt als je een login-popup te zien krijgt
in je browser. Wij ondersteunen ieder type, zolang de authorisatiesleutel niet aan wijzigingen onderhevig is.

Als je de XML-feed wilt valideren of aanmelden, dan moet je de authorisatiesleutel meesturen, zodat wij de feed kunnen openen. Je gebruikt dan de waarde zoals
die letterlijk in de header meegestuurd moet worden (zonder de naam van de header). Bijvoorbeeld:

    Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==

In de praktijk maakt het niet uit welk type je gebruikt, of wat de waarde is van de sleutel. Dit kan ook een willekeurig wachtwoord of token zijn. Wij sturen
de waarde mee, zoals jij aangeeft dat je hem wil ontvangen. Het is dan vrij eenvoudig om vervolgens in je code te controleren of die sleutel gelijk is aan wat
je verwacht.

## Basic authorisatie

Deze informatie kan van pas komen als je de gebruikersnaam en het wachtwoord bijvoorbeeld in een `.htpasswd`-bestand van Apache zet.

Bij `Basic` authorisatie wordt een username en een wachtwoord meegestuurd. Deze worden, gescheiden door een dubbele punt, ge&euml;ncodeerd naar `base64`.
Bijvoorbeeld, als de username `Aladdin` is, en het wachtwoord `open seseme`, dan krijg je de volgende HTTP header:

    Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==

In dat geval moet je ons de volgende waarde toesturen voor de authorisatie:

    Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
