---
---

[Developer Hub](/) &raquo; [Vacatures plaatsen via XML](/jobs-xml) &raquo; Documentatie

Stap 1: Algemene informatie &middot;
[Stap 2: Uitleg XML-schema](/jobs-xml/doc/xml-schema.html) &middot;
[Stap 3: Validatie](/jobs-xml/doc/validation.html) &middot;
[Stap 4: Aanmelden](/jobs-xml/doc/sign-up.html)

# Algemene informatie

## Aanbieden van de XML-feed

De XML-feed dient door het uitzendbureau gehost te worden. Doorgaans gebeurt dit door het bestand toe te voegen aan de website. Uitzendbureau.nl zal het
bestand dan benaderen via een HTTP-request.

Uitzendbureau.nl gebruikt flexibele ip-adressen. Het bestand dient dus toegankelijk zijn voor ieder ip-adres. Wil je liever niet dat dit bestand publiekelijk
benaderbaar is, dan kun je [deze authorisatie](/jobs-xml/doc/auth.html) implementeren.

## Toegestane (X)HTML-tags

Bij sommige XML-elementen is het toegestaan om (X)HTML-tags te gebruiken. Bij de [betreffende elementen](/jobs-xml/doc/xml-schema.html) wordt dit aangegeven.

Niet alle tags zijn toegestaan. Niet toegestane tags worden verwijderd. Daarnaast worden ook alle attributen verwijderd. De volgende tags zijn w&eacute;l
toegestaan:

* `<p>`
* `<br>`
* `<ul>` en `<ol>`
* `<li>`
* `<b>` en `<strong>`
* `<i>` en `<em>`
* `<u>`

## Hoe (X)HTML-tags en vreemde karakters te gebruiken

HTML-tags en vreemde karakters kunnen op verschillende manieren worden gebruikt in een XML-bestand. De gemakkelijkste manier is om
[CDATA](http://stackoverflow.com/a/2784200) te gebruiken. Je kunt CDATA bij ieder veld gebruiken, ook als er geen HTML of vreemde karakters in staan.

{% highlight xml %}
<description>
    <![CDATA[
        <p>Vanwege exponenti&euml;le groei zijn wij op zoek naar nieuwe monteurs.</p>
    ]]>
</description>
{% endhighlight %}

Zorg ervoor dat je, ook binnen `CDATA`, vreemde karakters omzet naar HTML-entiteiten.

Normaal gesproken zijn HTML-entiteiten in het formaat `&euml;` niet toegestaan in XML. Wij zetten deze entiteiten echter automatisch om naar numerieke
entiteiten, waardoor je dit formaat gewoon kunt gebruiken.

## Bestandsformaten

Het gebruik van vreemde karakters kan problemen opleveren bij het valideren van het XML-bestand en de juiste weergave op Uitzendbureau.nl. Bij het gebruik van
zulke karakters is het van belang de juiste encodering aan te geven. Een XML-bestand kan bijvoorbeeld gecodeerd zijn als `UTF-8` of `ISO-8859-1`, afhankelijk
van het programma waarmee het bestand gegenereerd wordt.

Als je bestand bijvoorbeeld ingedeeld is als `UTF-8`, dan gebruik je als XML-header:

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8" ?>
{% endhighlight %}

## Duidelijk! En nu?

Bekijk de [uitleg van het XML-schema](/jobs-xml/doc/xml-schema.html).
