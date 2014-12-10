---
layout: default
---

[Developer Hub](/) &raquo; De vacaturemodule

# Vacatures gratis op je website

## Toon jouw vacatures professioneel op je eigen website

Je kan **gratis** al jouw vacatures die op Uitzendbureau.nl staan op je eigen website tonen met de vacaturemodule van Uitzendbureau.nl. Kandidaten solliciteren
op jouw website. Sollicitaties versturen we direct via e-mail en kun je verwerken via het RecruitmentCenter van Uitzendbureau.nl.

## Hoe werkt het?
Kies de naam van jouw uitzendbureau. Kopieer de code en voeg deze toe aan de HTML van je website. Jouw webbouwer kan hiermee helpen. Het kost slechts **een paar
minuten**.

Jouw vacatures blijven altijd up-to-date. Als je een vacature op Uitzendbureau.nl toevoegt, verschijnt deze automatisch op je eigen website. Je hebt dus **geen
zorgen over de techniek of updates**.

Bel 0478-640204 voor meer informatie over de vacaturemodule.

## Stap 1. Kies uitzendbureau

<form class="form-horizontal">

  <div class="form-group">
    <div class="col-sm-6">
      <p class="form-control-static" id="recruiter-list-loader">
        <img src="/images/loading.gif" alt="Even geduld." class="loader--small" />
        Lijst van uitzendbureaus wordt geladen
      </p>
    </div>

    <div class="col-sm-6">
      <input type="submit" class="btn btn-primary" value="Toon de module!" />
    </div>
  </div>

</form>

<div id="code" class="hidden">
  <h2>Stap 2. Kopieer deze code naar de HTML van je website</h2>

  <p>
    <textarea id="code-body" class="form-control" onclick="this.focus();this.select();" rows="15"></textarea>
  </p>
</div>

<div id="example" class="hidden">
  <h3>Zo zien jouw vacatures eruit op jouw website</h3>

  <div id="example-body"></div>
</div>

<script src="/javascripts/external/uri.js"></script>
<script src="/javascripts/api-clients/uitzendbureau-nl-api.js"></script>
<script src="/javascripts/widgets/recruiter.js"></script>
<script src="/javascripts/widgets/job-module.js"></script>
