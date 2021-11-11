---
---

[Developer Hub]({{ site.baseurl }}/) &raquo; [De vacaturemodule]({{ site.baseurl }}/vacaturemodule/) &raquo; De vacaturemodule toevoegen stap 1

# De vacaturemodule

## Hoe werkt de vacaturemodule?

De vacaturemodule kan via **een paar eenvoudige stappen** in een website ge&iuml;mplementeerd worden.

Kies bij stap 1 de naam van jouw uitzendbureau. Bij stap 2 kun je als je wil elementen bij de module toevoegen en verwijderen en de stijl van de module
aanpassen. Daarna verschijnt er een code waarmee de vacaturemodule aan je website kan worden toegevoegd. Kopieer de code en voeg deze toe aan de HTML van je
website. Je webbouwer kan je hiermee helpen, of bel ons op 085-4019579 voor **gratis hulp**.

**Stap 1**: Kies uitzendbureau
**Stap 2**: Pas de opmaak van de vacaturemodule aan naar je eigen website
**Stap 3**: Kopieer de code naar de HTML van je website

## Stap 1. Kies uitzendbureau

<form class="form-horizontal" id="form-step-one" action="vacaturemodule-stap-twee.html">

  <div class="form-group">
    <div class="col-sm-6">
      <p class="form-control-static" id="recruiter-list-loader">
        <img src="{{ site.baseurl }}/images/loading.gif" alt="Even geduld." class="loader--small" />
        Lijst van uitzendbureaus wordt geladen
      </p>
    </div>
    <div>
      <input type="hidden" name="description" value="true" />
      <input type="hidden" name="placetime" value="true" />
    </div>
    <div class="col-sm-6">
      <input type="submit" class="btn btn-primary" value="Ga naar stap 2" />
    </div>
  </div>

</form>

<script src="{{ site.baseurl }}/javascripts/external/uri.js"></script>
<script src="{{ site.baseurl }}/javascripts/external/hex_sha1.js"></script>
<script src="{{ site.baseurl }}/javascripts/api-clients/uitzendbureau-nl-api.js"></script>
<script src="{{ site.baseurl }}/javascripts/widgets/recruiter.js"></script>
<script src="{{ site.baseurl }}/javascripts/job-module/job-module.js"></script>
<script src="{{ site.baseurl }}/javascripts/job-module/job-module-controller.js"></script>
