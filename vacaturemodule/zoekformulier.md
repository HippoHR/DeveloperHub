---
---

[Developer Hub](/) &raquo; [De vacaturemodule](/vacaturemodule/) &raquo; Het zoekformulier toevoegen

# Het zoekformulier

Het zoekformulier van de vacaturemodule kun je gratis en in een paar eenvoudige stappen toevoegen op je website.
Zo kunnen werkzoekenden gemakkelijk en snel de vacature vinden waar ze naar op zoek zijn.

Voor hulp bij het toevoegen van het zoekformulier kun je bellen naar 085-4019579.

## Stap 1. Op welke pagina van je website worden de vacatures getoond?
<form name="searchwidgetform" action="#design" class="form-horizontal">
  <div class="form-group">
    <div class="col-sm-9">
      <input type="url" name="url" id="heliosUrl" class="form-control" value="http://" />
    </div>
  </div>
  <div id="orientation" class="form-group">
    <div class="col-sm-9">
      <h2>Stap 2. Kies jouw zoekformulier</h2>
      <div class="form-group">
        <div class="col-sm-9">
          <label class="radio-inline">
            <input id="orientationOptionOne" type="radio" name="orientation" value="horizontal" />
            Horizontaal
          </label>
          <label class="radio-inline">
            <input id="orientationOptionTwo" type="radio" name="orientation" value="vertical" />
            Verticaal
          </label>
        </div>
      </div>
    </div>
  </div>
  <div id="design">
    <h2>Stap 3. Pas de opmaak van het zoekformulier aan</h2>
    <div class="form-group">
      <label for="fonttype" class="control-label col-sm-3">Lettertype</label>
      <div class="col-sm-3">
        <select id="fonttype" name="fonttype" class="form-control">
          <option value="Arial">Arial</option>
          <option value="Times">Times new roman</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Calibri">Calibri</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label for="fontsize" class="control-label col-sm-3">Lettergrootte</label>
      <div class="col-sm-3">
        <input id="fontsize" type="number" name="fontsize" min="10" max="20" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label for="buttoncolor" class="control-label col-sm-3">Achtergrondkleur knop</label>
      <div class="col-sm-3">
        <input id="buttoncolor" name="buttoncolor" class="color form-control" />
      </div>
    </div>
    <div class="form-group">
      <label for="buttontextcolor" class="control-label col-sm-3">Tekstkleur knop</label>
      <div class="col-sm-3">
        <label class="radio-inline">
          <input id="buttontextcolorOptionOne" type="radio" name="buttontextcolor" value="FFFFFF"> wit
        </label>
        <label class="radio-inline col-sm-offset-1">
          <input id="buttontextcolorOptionTwo" type="radio" name="buttontextcolor" value="000000"> zwart
        </label>
      </div>
    </div>
    <div class="form-group">
      <label for="placeholder" class="control-label col-sm-3">Titel in invoerveld</label>
      <div class="col-sm-3">
        <label class="radio-inline">
          <input id="placeholderOptionOne" type="radio" name="placeholder" value="true"> Ja
        </label>
        <label class="radio-inline col-sm-offset-1">
          <input id="placeholderOptionTwo" type="radio" name="placeholder" value="false"> Nee
        </label>
      </div>
    </div>
    <div>
      <a id="default" href="#">Terug naar standaardinstellingen</a>
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

<div id="example-code">
  <div id="code" class="hidden form-group">
    <h2>Stap 4. Kopieer deze code naar de HTML van je website</h2>
    <textarea id="code-body" onclick="this.focus();this.select();" class="form-control" rows="6"></textarea>
  </div>

  <div id="example" class="hidden">
    <h3>Voorbeeld van jouw zoekformulier</h3>

    <div id="example-body">
    </div>
  </div>
</div>

<script src="/javascripts/external/uri.js"></script>
<script src="/javascripts/layout/output-buffer.js"></script>
<script src="/javascripts/job-module/search-form.js"></script>
<script src="/javascripts/job-module/search-form-controller.js"></script>
<script src="/javascripts/external/jscolor/jscolor.js"></script>
