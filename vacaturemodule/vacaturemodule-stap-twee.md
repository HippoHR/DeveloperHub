---
layout: default
---

[Developer Hub](/) &raquo; [De vacaturemodule](/vacaturemodule/) &raquo; De vacaturemodule toevoegen stap 2

# De vacaturemodule

## Stap 2. Vacatures in de stijl van jouw website

Op deze pagina kun je, als je wil, de vacaturemodule aanpassen naar je eigen stijl.

Je kunt de vacaturemodule op twee manieren personaliseren: je kunt onderdelen kiezen die je wil tonen en je kunt de stijl van de module aanpassen.

Hieronder kun je aangeven welke onderdelen van de module je wil tonen op je website.

<form action="vacaturemodule-stap-drie.html" class="form-horizontal">
  <input id="informationform-recruiterId" type="hidden" name="r" class="form-control" />
  <div class="form-group">
    <div class="col-sm-9 checkbox">
      <h3> Deze onderdelen wil ik tonen bij mijn vacaturemodule: </h3>
      <label class="control-label">
        <input id="informationform-hidedescription" type="checkbox" name="description" value="true"> Een preview van de vacaturetekst is zichtbaar in het
        vacatureoverzicht
      </label>
      <label class="control-label">
        <input id="informationform-hideplacetime" type="checkbox" name="placetime" value="true"> De standplaats & plaatsingsdatum zijn zichtbaar in het
        vacatureoverzicht
      </label>
      <label class="control-label">
        <input id="informationform-searchform" type="checkbox" name="searchform" value="true"> Toon een zoekformulier boven het vacatureoverzicht
      </label>
    </div>
  </div>
  <p>
    Onder deze knoppen zie je een preview van de vacaturemodule met de standaardinstellingen.
    Je kunt deze zo laten en meteen naar de laatste stap gaan, of je kunt de opmaak naar je eigen stijl aanpassen!
  </p>
  <div class="form-group">
    <div class="col-sm-12">
      <button type="button" id="chooseDesign" class="btn btn-primary">Opmaak kiezen</button>
      <input id="default-design-button" type="submit" value="Ik vind het goed zo!" class="btn btn-primary"/>
    </div>
  </div>
</form>

<form name="designform" action="#example" id="designform" class="form-horizontal hidden">
  <input id="recruiterId" type="hidden" name="r" class="form-control" />
  <h3> Tekst </h3>
  <div class="col-sm-offset-1 ">
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
      <label for="titlecolor" class="control-label col-sm-3">Tekstkleur vacaturetitel</label>
      <div class="col-sm-3">
        <input id="titlecolor" name="titlecolor" class="color form-control" />
      </div>
    </div>
    <div class="form-group">
      <label for="textcolor" class="control-label col-sm-3">Tekstkleur standaardtekst</label>
      <div class="col-sm-3">
        <input id="textcolor" name="textcolor" class="color form-control" />
      </div>
    </div>
    <div class="form-group">
      <label for="footercolor" class="control-label col-sm-3">Tekstkleur locatie & plaatsingsdatum</label>
      <div class="col-sm-3">
        <input id="footercolor" name="footercolor" class="color form-control" />
      </div>
    </div>
  </div>

  <h3> Vacatureoverzicht </h3>
  <div class="col-sm-offset-1">
    <div class="form-group">
      <div class="col-sm-9 checkbox">
        <label class="control-label">
          <input id="hidedescription" type="checkbox" name="description" value="true"> Een preview van de vacaturetekst is zichtbaar in het vacatureoverzicht
        </label>
        <label class="control-label">
          <input id="hideplacetime" type="checkbox" name="placetime" value="true"> De standplaats & plaatsingsdatum zijn zichtbaar in het vacatureoverzicht
        </label>
        <label class="control-label">
          <input id="searchform" type="checkbox" name="searchform" value="true"> Toon een zoekformulier boven het vacatureoverzicht
        </label>
      </div>
    </div>
  </div>

  <h3> Knoppen </h3>
  <div class="col-sm-offset-1">
    <div class="form-group">
      <label for="buttoncolor" class="control-label col-sm-3">Opvulkleur knoppen</label>
      <div class="col-sm-3">
        <input id="buttoncolor" name="buttoncolor" class="color form-control" />
      </div>
    </div>
    <div class="form-group">
      <label for="buttontextcolor" class="control-label col-sm-3">Tekstkleur knoppen</label>
      <div class="col-sm-3">
        <label class="radio-inline">
          <input id="buttontextcolorwhite" type="radio" name="buttontextcolor" value="FFFFFF"> wit
        </label>
        <label class="radio-inline col-sm-offset-1">
          <input id="buttontextcolorblack" type="radio" name="buttontextcolor" value="000000"> zwart
        </label>
      </div>
    </div>
  </div>

  <a id="advancedOptionsLink" class="advanced">+ Geavanceerde instellingen</a>

  <div id="advancedOptions" class="hidden">
    <h3> Achtergrond </h3>
    <div class="col-sm-offset-1 ">
      <div class="form-group">
        <label for="bgcolor" class="control-label col-sm-3">Achtergrondkleur</label>
        <div class="col-sm-3">
          <input id="bgcolor" name="bgcolor" class="color form-control" />
        </div>
      </div>
    </div>
    <div class="col-sm-offset-1 ">
      <div class="form-group">
        <label for="hovercolor" class="control-label col-sm-3">Hoverkleur</label>
        <div class="col-sm-3">
          <input id="hovercolor" name="hovercolor" class="color form-control" />
        </div>
      </div>
    </div>

    <h3> Paginering </h3>
    <div class="col-sm-offset-1 ">
      <div class="form-group">
        <label for="pagebuttoncolor" class="control-label col-sm-3">Kleur paginering</label>
        <div class="col-sm-3">
          <input id="pagebuttoncolor" name="pagebuttoncolor" class="color form-control" />
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-3">Kleur tekst paginering</label>
        <div class="col-sm-3">
          <label class="radio-inline">
            <input id="pagebuttontextcolorwhite" type="radio" name="pagebuttontextcolor" value="FFFFFF"> wit
          </label>
          <label class="radio-inline col-sm-offset-1">
            <input id="pagebuttontextcolorblack" type="radio" name="pagebuttontextcolor" value="000000"> zwart
          </label>
        </div>
      </div>
    </div>

    <h3> Laad icoon </h3>
    <div class="col-sm-offset-1 ">
      <div class="form-group">
        <label for="loadingcolor" class="control-label col-sm-3">Laad icoon kleur</label>
        <div class="col-sm-3">
          <input id="loadingcolor" name="loadingcolor" class="color form-control" />
        </div>
      </div>
      <div class="form-group">
        <label for="loadingcolorbackground" class="control-label col-sm-3">Achtergrondkleur</label>
        <div class="col-sm-3">
          <input id="loadingcolorbackground" name="loadingcolorbackground" class="color form-control" />
        </div>
      </div>
    </div>
  </div>
  <br>
  <a id="default" href="#designform">Terug naar standaardinstellingen</a>
  <br>
  <br>
  <div class="form-group">
    <div class="col-sm-12">
      <input type="submit" value="Toon de module!" class="btn btn-primary" />
      <input id="buttonDone" type="submit" value="Verder naar volgende stap" class="btn btn-primary" />
    </div>
  </div>
</form>

<div class="example" id="example">
  <h3>Zo zien jouw vacatures eruit op jouw website</h3>

  <div id="example-body"></div>
</div>

<script src="/javascripts/external/uri.js"></script>
<script src="/javascripts/external/hex_sha1.js"></script>
<script src="/javascripts/api-clients/uitzendbureau-nl-api.js"></script>
<script src="/javascripts/widgets/recruiter.js"></script>
<script src="/javascripts/job-module/job-module.js"></script>
<script src="/javascripts/external/jscolor/jscolor.js"></script>
<script src="/javascripts/job-module/job-module-controller.js"></script>
