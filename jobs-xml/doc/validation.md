---
---

[Developer Hub](/) &raquo; [Vacatures plaatsen via XML](/jobs-xml) &raquo; [Documentatie](/jobs-xml/doc) &raquo; Validatietool

[Stap 1: Algemene informatie](/jobs-xml/doc) &middot;
[Stap 2: Uitleg XML-schema](/jobs-xml/doc/xml-schema.html) &middot;
Stap 3: Validatie &middot;
[Stap 4: Aanmelden](/jobs-xml/doc/sign-up.html)

# Validatietool

Hier kun je controleren of jouw XML-feed conform ons [XML-schema](https://www.uitzendbureau.nl/xml/job-1.0.xsd) is opgesteld. De XML dient op een publieke URL
beschikbaar te zijn.

Indien er [authorisatie](/jobs-xml/doc/auth.html) nodig is, dan kun je de **volledige waarde van de authorisatieheader** invullen bij `authorisatie`, zoals
[hier](/jobs-xml/doc/auth.html) is beschreven.

<form class="form-horizontal" id="validation-form">
    <div class="form-group">
        <label for="url" class="control-label col-sm-3">URL</label>
        <div class="col-sm-6">
            <input type="url" name="url" id="url" class="form-control" required />
        </div>
    </div>

    <div class="form-group">
        <label for="auth" class="control-label col-sm-3">Authorisatie</label>
        <div class="col-sm-6">
            <input type="text" name="auth" id="auth" class="form-control" />
        </div>
        <div class="col-sm-3 help-inline">
            <p class="form-control-static">
                <small class="help-inline">(optioneel)</small>
            </p>
        </div>
    </div>

    <div class="form-group">
        <div class="col-sm-offset-3 col-sm-9">
            <input type="submit" value="Valideren" class="btn btn-primary" />
        </div>
    </div>
</form>

<div id="validation-success" class="hidden">
    <h2>Er zijn geen fouten gevonden!</h2>

    <a href="" id="validation-success-signup-link">Meld de nieuwe feed aan</a> om deze in gebruik te laten nemen.
</div>

<div id="validation-errors-container" class="hidden">
    <h2 id="validation-errors-header"></h2>

    <p id="validation-errors-description"></p>

    <div id="validation-errors">

    </div>
</div>

<script src="/javascripts/external/uri.js"></script>
<script src="/javascripts/external/hex_sha1.js"></script>
<script src="/javascripts/api-clients/uitzendbureau-nl-api.js"></script>
<script src="/javascripts/jobs-xml/validation.js"></script>
