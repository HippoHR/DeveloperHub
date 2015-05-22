---
layout: default
---

[Developer Hub](/) &raquo; [De vacaturemodule](/vacaturemodule/) &raquo; De vacaturemodule toevoegen

# De vacaturemodule

## Hoe werkt de vacaturemodule?

De vacaturemodule kan via **twee eenvoudige stappen** ge&iuml;mplementeerd worden. Kies bij stap 1 de naam van jouw uitzendbureau.
Na het selecteren verschijnt er een code waarmee de vacaturemodule aan je website kan worden toegevoegd.
Kopieer de code en voeg deze toe aan de HTML van je website. Je webbouwer kan je hiermee helpen, of bel ons op 0478-640204 voor gratis hulp.

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
<script src="/javascripts/job-module/job-module.js"></script>
