---
---

[Developer Hub](/) &raquo; [Widgets](/widgets/) &raquo; De zoekwidget

# De zoekwidget

Deze widget kun je gratis op jouw website plaatsen, zodat werkzoekenden gemakkelijk en snel hun zoektocht kunnen beginnen!

Wil je liever een lijst met vacatures, op basis van een vaste zoekopdracht aanbieden? Kijk dan eens naar [de vacaturewidget](/widgets/vacaturewidget.html).

## Stap 1. Kies jouw zoekformulier

<form class="form-horizontal">

  <div class="form-group">
    <label for="orientation" class="control-label col-sm-3">Type formulier</label>
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
  <h3>Voorbeeld van jouw zoekformulier</h3>

  <div id="example-body"></div>
</div>

<script src="/javascripts/external/uri.js"></script>
<script src="/javascripts/layout/output-buffer.js"></script>
<script src="/javascripts/widgets/search.js"></script>
<script src="/javascripts/widgets/search-controller.js"></script>
