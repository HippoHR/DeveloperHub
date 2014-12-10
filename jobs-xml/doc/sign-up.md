---
layout: default
---

[Developer Hub](/) &raquo; [Vacatures plaatsen via XML](/jobs-xml) &raquo; [Documentatie](/jobs-xml/doc) &raquo; Aanmelden

[1. Algemene informatie](/jobs-xml/doc) &middot;
[2. Uitleg XML-schema](/jobs-xml/doc/xml-schema.html) &middot;
[3. Validatietool](/jobs-xml/doc/validation.html) &middot;
4\. Aanmelden nieuwe XML-feed &middot;
[Optionele authorisatie](/jobs-xml/doc/auth.html) &middot;
[Voorbeelden en hulpmiddelen](/jobs-xml/doc/examples.html)

# Aanmelden XML-feed

Hier kun je de nieuwe XML-feed bij ons aanmelden. De XML dient op een publieke URL beschikbaar te zijn. Zorg ervoor dat de feed is
[gevalideerd](/jobs-xml/doc/validation.html).

Indien er [authorisatie](/jobs-xml/doc/auth.html) nodig is, dan kun je de **volledige waarde van de authorisatieheader** invullen bij `authorisatie`, zoals
[hier](/jobs-xml/doc/auth.html) is beschreven.

<div id="sign-up-error" class="hidden">
    <div class="alert alert-danger">
        <h4>Aanmelden mislukt</h4>
        Er is een fout opgetreden bij het aanmelden van je XML-document. Probeer het opnieuw.
    </div>
</div>

<div id="sign-up-validation-error" class="hidden">
    <div class="alert alert-danger">
        <h4>Aanmelden mislukt: document bevat validatiefouten</h4>
        Je XML-document kon niet worden aangemeld, omdat deze nog validatiefouten bevat. Controleer je document
        <a href="/jobs-xml/doc/validation.html" class="alert-link">hier</a> op fouten.
    </div>
</div>

<form id="sign-up-form" class="form-horizontal">
    <div class="form-group">
        <label for="recruiterName" class="control-label col-sm-3">Naam uitzendbureau</label>
        <div class="col-sm-6">
            <input type="text" name="recruiterName" id="recruiterName" class="form-control" required />
        </div>
    </div>

    <div class="form-group">
        <label for="phone" class="control-label col-sm-3">Telefoonnummer</label>
        <div class="col-sm-6">
            <input type="text" name="phone" id="phone" class="form-control" />
        </div>
        <div class="col-sm-3 help-inline">
            <p class="form-control-static">
                <small class="help-inline">(optioneel)</small>
            </p>
        </div>
    </div>

    <div class="form-group">
        <label for="email" class="control-label col-sm-3">E-mailadres</label>
        <div class="col-sm-6">
            <input type="text" name="email" id="email" class="form-control" />
        </div>
        <div class="col-sm-3 help-inline">
            <p class="form-control-static">
                <small class="help-inline">(optioneel)</small>
            </p>
        </div>
    </div>

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
            <input type="submit" value="Aanmelden" class="btn btn-primary" />
        </div>
    </div>
</form>

<div id="sign-up-success" class="hidden">
    <h2>Aanmelding verzonden</h2>
    <p>
        De aanmelding voor je nieuwe XML-document is succesvol verzonden naar Uitzendbureau.nl. We zullen de aanmelding zo snel mogelijk in behandeling nemen.
    </p>
</div>

<script src="/javascripts/external/uri.js"></script>
<script src="/javascripts/api-clients/uitzendbureau-nl-api.js"></script>
<script src="/javascripts/jobs-xml/sign-up.js"></script>
