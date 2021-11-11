---
---

[Developer Hub]({{ '/' | relative_url }}) &raquo; [API]({{ '/api' | relative_url }}) &raquo; [Documentatie]({{ '/api/doc.html' | relative_url }}) &raquo; Requests

# Overzicht API-requests

## Authenticatie

|[/authentication/request-challenge]({{ site.baseurl }}/api/requests/authentication/request-challenge.html) |Eerste stap bij het beginnen van een nieuwe sessie.
|[/authentication/authenticate]({{ site.baseurl }}/api/requests/authentication/authenticate.html)           |Start een nieuwe sessie.
|[/authentication/end-session]({{ site.baseurl }}/api/requests/authentication/end-session.html)             |Be&euml;indig de huidige sessie.

[Meer informatie over de authenticatieprocedure]({{ site.baseurl }}/api/auth.html).

## Sollicitaties

|[/applications]({{ site.baseurl }}/api/requests/applications)                               |Opvragen van lijst met sollicitaties.
|[/application/cv]({{ site.baseurl }}/api/requests/applications/cv.html)                     |Opvragen van een cv-bestand (pdf, doc, docx of rtf)*.
|[/application/cv/extracted]({{ site.baseurl }}/api/requests/applications/cv-extracted.html) |Opvragen van de inhoud van een cv-bestand

\* Mogelijk worden er in de toekomst ook andere formaten ondersteund.
