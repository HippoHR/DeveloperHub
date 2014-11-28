---
layout: default
---

[Developer Hub](/) &raquo; [Widgets](/widgets/) &raquo; De zoekwidget

# De zoekwidget

Deze widget kun je gratis op jouw website plaatsen, zodat werkzoekenden gemakkelijk en snel hun zoektocht kunnen beginnen!

Wil je liever een lijst met vacatures, op basis van een vaste zoekopdracht aanbieden? Kijk dan eens naar [de vacaturewidget](/widgets/vacaturewidget.html).

## Stap 1. Kies jouw zoekformulier

<form>
  <p>
    <label>Type formulier</label>

    <label>
      <input type="radio" name="orientation" value="horizontal" />
      Horizontaal
    </label>

    <label>
      <input type="radio" name="orientation" value="vertical" />
      Verticaal
    </label>
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
  <h3>Voorbeeld van jouw zoekformulier</h3>

  <div id="example-body"></div>
</div>

<script src="/javascripts/URI.js"></script>
<script src="/javascripts/OutputBuffer.js"></script>
<script src="/javascripts/searchwidget.js"></script>
