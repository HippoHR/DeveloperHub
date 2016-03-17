---
---

[Developer Hub](/) &raquo; [Widgets](/widgets/) &raquo; De vacaturewidget

# De vacaturewidget

Met deze widget kun je gratis vacatures toevoegen aan je eigen website. Deze vacatures zijn altijd actueel, zonder dat jij hier iets voor hoeft te doen.

Wil je kandidaten op je eigen website laten solliciteren? Gebruik dan [de vacaturemodule](/vacaturemodule).

## Stap 1. Welke vacatures wil je tonen?

<form class="form-horizontal">
  <div class="form-group">
    <label for="s" class="control-label col-sm-3">Wat?</label>
    <div class="col-sm-6">
      <input type="text" name="s" id="s" class="form-control" />
    </div>
    <div class="col-sm-3">
      <p class="form-control-static">
        <small class="help-inline">(optioneel)</small>
      </p>
    </div>
  </div>

  <div class="form-group">
    <label for="p" class="control-label col-sm-3">Waar?</label>
    <div class="col-sm-6">
      <div class="input-group">
        <input type="text" name="p" id="p" class="form-control" />
        <div class="input-group-btn radius-selector">

          <input type="hidden" class="radius-value" name="rad" id="rad" value="30" />
          <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
            <span class="distance">30km</span>
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu pull-right">
            <li><a href="#" data-value="5">5km</a></li>
            <li><a href="#" data-value="10">10km</a></li>
            <li><a href="#" data-value="30">30km</a></li>
            <li><a href="#" data-value="50">50km</a></li>
            <li><a href="#" data-value="">Alles</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-sm-3 help-inline">
      <p class="form-control-static">
        <small class="help-inline">(optioneel)</small>
      </p>
    </div>
  </div>

  <div class="form-group">
    <label for="r" class="control-label col-sm-3">Uitzendbureau</label>
    <div class="col-sm-6">
      <p class="form-control-static" id="recruiter-list-loader">
        <img src="/images/loading.gif" alt="Even geduld." class="loader--small" />
        Lijst van uitzendbureaus wordt geladen
      </p>
    </div>
    <div class="col-sm-3">
      <p class="form-control-static">
        <small class="help-inline">(optioneel)</small>
      </p>
    </div>
  </div>

  <div class="form-group">
    <label for="l" class="control-label col-sm-3">Aantal vacatures</label>
    <div class="col-sm-6">
      <select name="l" id="l" class="form-control">
        <option value="5">5</option>
        <option value="10" selected>10</option>
        <option value="15">15</option>
        <option value="">Alles</option>
      </select>
    </div>
  </div>

  <div class="form-group">
    <label for="w" class="control-label col-sm-3">Breedte in pixels</label>
    <div class="col-sm-6">
      <input type="number" name="w" id="w" value="550" class="form-control" />
    </div>
    <div class="col-sm-3">
      <p class="form-control-static">
        <small class="help-inline">(optioneel)</small>
      </p>
    </div>
    <div class="col-sm-offset-3 col-sm-6">
      <div class="help-block"> Voor een vacaturewidget die de maximaal beschikbare breedte gebruikt, kun je dit veld leeg laten.</div>
    </div>
  </div>

  <div class="form-group">
    <div class="col-sm-offset-3 col-sm-9">
      <input type="submit" value="Maak widget!" class="btn btn-primary" />
    </div>
  </div>
</form>

<div id="code" class="hidden form-group">
  <h2>Stap 2. Kopieer deze code naar de HTML van je website</h2>

  <textarea id="code-body" onclick="this.focus();this.select();" class="form-control"></textarea>
</div>

<div id="example" class="hidden">
  <h3>Voorbeeld</h3>

  <div id="example-body"></div>
</div>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="/javascripts/layout/jquery-custom-select-box.js"></script>
<script src="/javascripts/external/bootstrap/dropdown.min.js"></script>
<script src="/javascripts/external/hex_sha1.js"></script>
<script src="/javascripts/external/uri.js"></script>
<script src="/javascripts/layout/output-buffer.js"></script>
<script src="/javascripts/api-clients/uitzendbureau-nl-api.js"></script>
<script src="/javascripts/widgets/recruiter.js"></script>
<script src="/javascripts/widgets/job.js"></script>
<script src="/javascripts/widgets/job-controller.js"></script>
