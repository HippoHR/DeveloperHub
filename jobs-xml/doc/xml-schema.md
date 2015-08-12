---
layout: default
---

[Developer Hub](/) &raquo; [Vacatures plaatsen via XML](/jobs-xml) &raquo; [Documentatie](/jobs-xml/doc) &raquo; Uitleg XML-schema

[Stap 1: Algemene informatie](/jobs-xml/doc) &middot;
Stap 2: Uitleg XML-schema &middot;
[Stap 3: Validatie](/jobs-xml/doc/validation.html) &middot;
[Stap 4: Aanmelden](/jobs-xml/doc/sign-up.html)

# Uitleg XML-schema

Om te beginnen kun je een [voorbeeld](http://www.uitzendbureau.nl/xml/job-1.0-example1.xml) downloaden. Hopelijk wordt het snel duidelijk waar je welke gegevens
moet invullen. Toch gaan we uitgebreid elk element bespreken en uitleggen hoe je het hoort te gebruiken. Je kunt ook altijd het
[XML-schema (XSD)](http://www.uitzendbureau.nl/xml/job-1.0.xsd) downloaden.

Met PHP, Java of een andere programmeertaal is het mogelijk om een XML-document te genereren. Bekijk eens het
[PHP-voorbeeld](/jobs-xml/doc/examples.html).

## Verplichte velden

Slechts enkele elementen zijn verplicht in te vullen. Als een element verplicht is, staat dit aangegeven bij het betreffende element.

## Alle velden uitgelegd

Ieder XML-bestand begint als volgt. Zorg ervoor dat je de [juiste encoding](/jobs-xml/doc#bestandsformaten) invult.

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8" ?>
{% endhighlight %}

### jobs <span class="label label-warning">verplicht</span>

Dit hoofdelement bevat de lijst met alle vacatures. Het is erg belangrijk om de correcte versie in te vullen. Momenteel wordt alleen gebruik gemaakt van versie
`1.0`.

{% highlight xml %}
<jobs version="1.0">
{% endhighlight %}

### job <span class="label label-warning">verplicht</span>

Dit subelement van `jobs` definieert &eacute;&eacute;n enkele vacature. `jobs` bevat net zoveel `job`-elementen als dat er vacatures zijn.

{% highlight xml %}
<jobs version="1.0">
    <job>(...)</job>
    <job>(...)</job>
</jobs>
{% endhighlight %}

Hieronder staan de elementen die binnen `job` geplaatst dienen te worden.

### jobId <span class="label label-warning">verplicht</span>

Hier moet een uniek id voor iedere vacature worden ingevuld. Je kunt hier bijv. het id van de vacature in de database invullen of het vacaturenummer, zolang
het maar uniek is. Voorkom dat id&#39;s in de toekomst worden hergebruikt.

{% highlight xml %}
<jobId>
  <![CDATA[
    6489
  ]]>
</jobId>
{% endhighlight %}

### alternativeJobId

Soms zijn er voor een vacature meerdere id&#39;s (meestal voor verschillende systemen), of heb je een apart referentienummer. Dan kun je dat hier invullen.

{% highlight xml %}
<alternativeJobId>
  <![CDATA[
    TECH-076
  ]]>
</alternativeJobId>
{% endhighlight %}

### jobAddedDate <span class="label label-warning">verplicht</span>

De datum waarop de vacature is toegevoegd in jullie systeem. Gebruik het formaat `YYYY-MM-DD`.

{% highlight xml %}
<jobAddedDate>
  <![CDATA[
    2008-04-23
  ]]>
</jobAddedDate>
{% endhighlight %}

### hotJob

Je kunt `hotJob` gebruiken als je een overeenkomst hebt met Uitzendbureau.nl voor topvacatures. Voor meer informatie over de mogelijkheden van topvacatures
kun je contact opnemen met [sales@uitzendbureau.nl](mailto:sales@uitzendbureau.nl?subject=DeveloperHub%3A%20Topvacatures), of bellen naar 085-4019579.

{% highlight xml %}
<hotJob>
  <![CDATA[
    false
  ]]>
</hotJob>
{% endhighlight %}

### jobTitle <span class="label label-warning">verplicht</span>

De titel van de vacature.

{% highlight xml %}
<jobTitle>
  <![CDATA[
    Automonteur
  ]]>
</jobTitle>
{% endhighlight %}

### jobDescription <span class="label label-warning">verplicht</span> <a href="/jobs-xml/doc/" class="label label-info">xhtml</a>

Een algemene beschrijving van de vacature. Informatie over bijv. de ervaring of het salaris kan bij andere velden worden ondergebracht.

{% highlight xml %}
<jobDescription>
  <![CDATA[
    1e automonteur met APK ervaring die zelfstandig kan werken.
  ]]>
</jobDescription>
{% endhighlight %}

### jobLocation <span class="label label-warning">verplicht</span>

{% highlight xml %}
<jobLocation>
  <locationPlace>
    <![CDATA[
      Nijmegen
    ]]>
  </locationPlace>
</jobLocation>
{% endhighlight %}

#### locationPlace <span class="label label-warning">verplicht</span>

De standplaats/werklocatie van de vacature.

### jobCategory

De categorie waaronder deze vacature valt. Er kunnen meerdere categori&euml;n worden ingevuld (gescheiden door willekeurige word boundaries), maar de vacature
zal uiteindelijk maar aan &eacute;&eacute;n categorie worden toegewezen. Je kunt gewoon je eigen benamingen gebruiken voor de categori&euml;n. Wij vertalen dit
automatisch naar onze eigen categori&euml;n.

_Let op:_ dit veld is niet de branche. Een vacature voor een ICT&#39;er bij een bank valt onder de categorie `ICT`, en niet onder `financieel`.

{% highlight xml %}
<jobCategory>
  <![CDATA[
    Techniek, productie
  ]]>
</jobCategory>
{% endhighlight %}

### jobEducation

De gewenste vooropleiding(en) voor de functie.

{% highlight xml %}
<jobEducation>
  <![CDATA[
    LTS Motorvoertuigentechniek
  ]]>
</jobEducation>
{% endhighlight %}

### jobUrl

De link naar de vacature op de website van het uitzendbureau.

{% highlight xml %}
<jobUrl>
  <![CDATA[
    http://www.mijnuitzendbureau.nl/vacature/6489-automonteur
  ]]>
</jobUrl>
{% endhighlight %}

### jobOffer

Hieronder een voorbeeld van hoe het totaalplaatje eruit kan zien.

{% highlight xml %}
<jobOffer>
  <offerDescription>
    <![CDATA[
      Goede arbeidsvoorwaarden.
    ]]>
  </offerDescription>
  <offerContract>
    <contractType>
      <![CDATA[
        vast
      ]]>
    </contractType>
    <contractHours>
      <hoursType>
        <![CDATA[
          fulltime
        ]]>
      </hoursType>
      <hoursMin>
        <![CDATA[
          32
        ]]>
      </hoursMin>
      <hoursMax>
        <![CDATA[
          40
        ]]>
      </hoursMax>
      <hoursDescription>
        <![CDATA[
          32-40 uur
        ]]>
    </hoursDescription>
    </contractHours>
    <contractSalaryDescription>
      <![CDATA[
        Marktconform.
      ]]>
    </contractSalaryDescription>
    <contractDescription>
      <![CDATA[
        Wij bieden:
        <ul>
          <li>
            Een uitdagende baan;
          </li>
          <li>
            Een marktconform salaris.
          </li>
        </ul>
      ]]>
    </contractDescription>
  </offerContract>
</jobOffer>
{% endhighlight %}

#### offerDescription <a href="/jobs-xml/doc/" class="label label-info">xhtml</a>

Algemene informatie over wat de werkgever heeft te bieden.

#### offerContract

Feitelijk aanbod van de vacature.

#### contractType

Soort dienstverband. Kies hierbij uit: `tijdelijk`, `vast`, `vakantiewerk` of `studenten`.

#### contractHours

Het aantal uren per week.

{% highlight xml %}
<contractHours>
  <hoursType>
    <![CDATA[
      fulltime
    ]]>
  </hoursType>
  <hoursMin>
    <![CDATA[
      32
    ]]>
  </hoursMin>
  <hoursMax>
    <![CDATA[
      40
    ]]>
  </hoursMax>
  <hoursDescription>
    <![CDATA[
      32-40 uur
    ]]>
  </hoursDescription>
</contractHours>
{% endhighlight %}

##### hoursType

Kies hierbij uit: `parttime` of `fulltime`.

##### hoursMin

Minimaal aantal uren per week.

##### hoursMax

Maximaal aantal uren per week.

##### hoursDescription

Als het niet mogelijk is om het aantal uren onder te brengen bij `hoursMin` en `hoursMax`, vul dan hier een algemene beschrijving in.

#### contractSalaryDescription <a href="/jobs-xml/doc/" class="label label-info">xhtml</a>

Omschrijving van het salarisaanbod.

#### contractDescription <a href="/jobs-xml/doc/" class="label label-info">xhtml</a>

Algemene omschrijving van het contract.

### jobRequirements

Specifiekere informatie over de vereisten.

{% highlight xml %}
<jobRequirements>
    <requirementsDescription>
      <![CDATA[
        Je bent nauwkeurig, flexibel, en een echte
        teamplayer.
      ]]>
    </requirementsDescription>
  <requirementsExperience>
    <![CDATA[
      2 jaar ervaring in de auto- en elektrotechniek.
    ]]>
  </requirementsExperience>
  <requirementsCourses>
    <![CDATA[
      Je hebt de opleiding MTS werktuigbouwkunde,
      motorvoertuigentechniek of gelijkwaardig met
      succes afgerond.
    ]]>
  </requirementsCourses>
</jobRequirements>
{% endhighlight %}

#### requirementsDescription <a href="/jobs-xml/doc/" class="label label-info">xhtml</a>

Algemene omschrijving van de vereisten.

#### requirementsExperience <a href="/jobs-xml/doc/" class="label label-info">xhtml</a>

Omschrijving van de ervaringen die gewenst zijn.

#### requirementsCourses <a href="/jobs-xml/doc/" class="label label-info">xhtml</a>

Omschrijving van de opleidingen/cursussen die gewenst zijn.

### jobEmployerInfo <a href="/jobs-xml/doc/" class="label label-info">xhtml</a>

Algemene informatie over de werkgever.

{% highlight xml %}
<jobEmployerInfo>
  <![CDATA[
    Onze klant is heeft zich ontwikkeld tot een
    gieterij met wereldwijd 1.000 projecten.
  ]]>
</jobEmployerInfo>
{% endhighlight %}

### jobContact

Gegevens over de persoon waarmee contact kan worden opgenomen over de vacature.

{% highlight xml %}
<jobContact>
  <contactName>
    <![CDATA[
      Jan Janssen
    ]]>
  </contactName>
  <contactAddress>
    <addressStreet>
      <![CDATA[
        Dorpsstraat 14
      ]]>
    </addressStreet>
    <addressZipcode>
      <![CDATA[
        1234 AB
      ]]>
    </addressZipcode>
    <addressPlace>
      <![CDATA[
        Arnhem
      ]]>
    </addressPlace>
  </contactAddress>
  <contactPhone>
    <![CDATA[
      0123-456789
    ]]>
  </contactPhone>
  <contactEmail>
    <![CDATA[
      jan.janssen@arnhemmail.nl
    ]]>
  </contactEmail>
  <contactUrl>
    <![CDATA[
      http://www.mijnuitzendbureau.nl/werknemers/jan.janssen
    ]]>
  </contactUrl>
</jobContact>
{% endhighlight %}

### jobBranch

Beschrijving van de vestiging waar de vacature open staat.

{% highlight xml %}
<jobBranch>
  <branchName>
    <![CDATA[
      Mijn Uitzendbureau Amsterdam
    ]]>
  </branchName>
  <branchPlace>
    <![CDATA[
      Amsterdam
    ]]>
  </branchPlace>
</jobBranch>
{% endhighlight %}

#### branchName

Naam van de vestiging.

#### branchPlace

Plaats van de vestiging.

### video

Op dit moment worden alleen video&#39;s van YouTube ondersteund. Mogelijk worden er later nog andere formaten toegevoegd.

{% highlight xml %}
<video>
  <jobDescription>
    <youtube>
      <![CDATA[
        9bZkp7q19f0
      ]]>
    </youtube>
  </jobDescription>
</video>
{% endhighlight %}

#### jobDescription

Binnen `jobDescription` plaats je een lijst met video&#39;s. Deze video&#39;s worden geplaatst bij de beschrijving van de vacature. Mogelijk worden er later
nog andere locaties toegevoegd.

##### youtube

Je video moet al zijn toegevoegd aan YouTube, om deze toe te voegen aan de XML-feed. Vul het id in van de YouTube-video. Het id kun je uit de url van de video
halen. `https://www.youtube.com/watch?v=9bZkp7q19f0` heeft bijvoorbeeld id `9bZkp7q19f0`.

## Heb je de XML-feed af?

[Controleer hem dan op fouten](/jobs-xml/doc/validation.html).
