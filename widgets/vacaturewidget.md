---
layout: default
---

[Developer Hub](/) &raquo; [Widgets](/widgets/) &raquo; De vacaturewidget

# De vacaturewidget

Met deze widget kun je gratis vacatures toevoegen aan je eigen website. Deze vacatures zijn altijd actueel, zonder dat jij hier iets voor hoeft te doen.

Wil je kandidaten op je eigen website laten solliciteren? Gebruik dan [de vacaturemodule](/vacaturemodule.html).

## Stap 1. Welke vacatures wil je tonen?

<form>

  <p>
    <label for="s">Wat?</label>
    <input type="text" name="s" id="s" />
    <small>(optioneel)</small>
  </p>

  <p>
    <label for="p">Waar?</label>
    <input type="text" name="p" id="p" />
    <select name="rad" id="rad">
      <option value="5">5km</option>
      <option value="10">10km</option>
      <option value="30" selected>30km</option>
      <option value="50">50km</option>
      <option value="Alles">Alles</option>
    </select>
    <small>(optioneel)</small>
  </p>

  <p>
    <label for="r">Uitzendbureau</label>
    <input type="text" name="r" id="r" />
    <small>(optioneel)</small>
  </p>

  <p>
    <label for="l">Aantal vacatures</label>
    <select name="l" id="l">
      <option value="5">5</option>
      <option value="10" selected>10</option>
      <option value="15">15</option>
      <option value="">Alles</option>
    </select>
  </p>

  <div>
    <label for="w">Breedte in pixels</label>
    <input type="text" name="w" id="w" value="550" />
    <small>(optioneel)</small>
  </div>

  <p>
    Voor een vacaturewidget die de maximaal beschikbare breedte gebruikt, kun je dit veld leeg laten.
  </p>

  <p>
    <input type="submit" value="Maak widget!" />
  </p>

</form>

<div id="code" class="hidden">
  <h2>Stap 2. Kopieer deze code naar de HTML van je website</h2>

  <textarea id="code-body" onclick="this.focus();this.select();" style="width:100%;"></textarea>
</div>

<div id="example" class="hidden">
  <h3>Voorbeeld</h3>

  <div id="example-body"></div>
</div>

<script src="/javascripts/URI.js"></script>
<script src="/javascripts/OutputBuffer.js"></script>
<script src="/javascripts/jobwidget.js"></script>
