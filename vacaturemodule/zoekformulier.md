---
layout: default
---

[Developer Hub](/) &raquo; [De vacaturemodule](/vacaturemodule/) &raquo; Het zoekformulier toevoegen

# Het zoekformulier

Het zoekformulier van de vacaturemodule kun je gratis en in een paar eenvoudige stappen toevoegen op je website.
Zo kunnen werkzoekenden gemakkelijk en snel de vacature vinden waar ze naar op zoek zijn.

Voor hulp bij het toevoegen van het zoekformulier kun je bellen naar 0478-640204.

## Stap 1. Op welke pagina van je website worden de vacatures getoond?
<form class="form-horizontal">
  <div class="form-group">
    <div class="col-sm-9">
      <input type="url" name="url" id="heliosUrl" class="form-control" value="http://" />
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-9">
      <h2>Stap 2. Kies jouw zoekformulier</h2>
      <div class="form-group">
        <div class="col-sm-9">
          <label class="radio-inline">
            <input type="radio" name="orientation" value="horizontal" />
            Horizontaal
          </label>
          <label class="radio-inline">
            <input type="radio" name="orientation" value="vertical" />
            Verticaal
          </label>
        </div>
      </div>
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-9">
      <input type="submit" value="Maak formulier!" class="btn btn-primary" />
    </div>
  </div>
</form>
<div id="url-validation-error" class="hidden">
    <h2>Vul een geldige url in.</h2>
</div>
<div id="code" class="hidden form-group">
  <h2>Stap 3. Kopieer deze code naar de HTML van je website</h2>
  <textarea id="code-body" onclick="this.focus();this.select();" class="form-control"></textarea>
</div>

<div id="example" class="hidden">
  <h3>Voorbeeld van jouw zoekformulier</h3>

  <div id="example-body">
  </div>
</div>

<script src="/javascripts/external/uri.js"></script>
<script src="/javascripts/layout/output-buffer.js"></script>
<script src="/javascripts/job-module/search-form.js"></script>
<script src="/javascripts/job-module/search-form-controller.js"></script>
