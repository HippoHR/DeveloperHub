---
---

[Developer Hub]({{ site.baseurl }}/) &raquo; [Vacatures plaatsen via XML]({{ site.baseurl }}/jobs-xml) &raquo; [Documentatie]({{ site.baseurl }}/jobs-xml/doc) &raquo; Voorbeelden en hulpmiddelen

# Voorbeelden en hulpmiddelen

## Hulpmiddelen

|[XML-voorbeeld](https://www.uitzendbureau.nl/xml/job-1.0-example1.xml)
|[XML-schema (XSD)](https://www.uitzendbureau.nl/xml/job-1.0.xsd)
|[Leeg XML-bestand](https://www.uitzendbureau.nl/xml/job-1.0.xml)

## PHP-voorbeeld

Hieronder volgt een voorbeeld waarin je ziet hoe je een eenvoudig XML-document kunt genereren.

{% highlight php %}
<?php
// Define constants
define( 'EOL', "\n" );

// Connect to the database
$link = mysql_connect( 'localhost', 'gebruikersnaam', 'wachtwoord' );

if( !$link )
{
  echo 'Het was niet mogelijk om verbinding te maken met een database.';
  exit( 1 );
}

// Select a database.
if( !mysql_select_db( 'database', $link ) )
{
  echo 'Het was niet mogelijk om een database te selecteren.';
  exit( 1 );
}

// Execute a query
$query = 'SELECT id, titel, datum, beschrijving, plaats, provincie, postcode FROM vacatures';
$rs = mysql_query( $query, $link );

if( !$rs )
{
  echo 'Het was niet mogelijk om de query uit te voeren.';
  exit( 1 );
}

// Start building the XML content
$xml = '<?xml version="1.0" encoding="UTF-8"?>' . EOL .
'<jobs version="1.0">' . EOL;

while( $row = mysql_fetch_array( $rs ) )
{
  // Loop through all jobs and format all fields correctly.
  // Use CDATA to handle special characters correctly.
  $xml .= '<job>' . EOL;
  $xml .= '  <jobId><![CDATA[' . $row[ 'id' ] . ']]></jobId>' . EOL;
  $xml .= '  <jobAddedDate><![CDATA[' . $row[ 'datum' ] . ']]></jobAddedDate>' . EOL;
  $xml .= '  <jobTitle><![CDATA[' . htmlspecialchars( $row[ 'titel' ] ) . ']]></jobTitle>' . EOL;
  $xml .= '  <jobDescription><![CDATA[' . $row[ 'beschrijving' ] . ']]></jobDescription>' . EOL;
  $xml .= '  <jobLocation>' . EOL;
  $xml .= '    <locationPlace><![CDATA[' . $row[ 'plaats' ] . ']]></locationPlace>' . EOL;
  $xml .= '    <locationProvince><![CDATA[' . $row[ 'provincie' ] . ']]></locationProvince>' . EOL;
  $xml .= '    <locationZipCode><![CDATA[' . $row[ 'postcode' ] . ']]></locationZipCode>' . EOL;
  $xml .= '  </jobLocation>' . EOL;
  $xml .= '</job>' . EOL;
}

$xml .= '</jobs>';

// Close the database connection.
mysql_close( $link );

// Display the build XML-document.
echo $xml;
{% endhighlight %}

Dit genereert een XML-document met de volgende structuur:

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jobs version="1.0">
  <job>
    <jobId><![CDATA[53]]></jobId>
    <jobAddedDate><![CDATA[2008-04-23]]></jobAddedDate>
    <jobTitle><![CDATA[Automonteur]]></jobTitle>
    <jobDescription><![CDATA[Een beschrijving.]]></jobDescription>
    <jobLocation>
      <locationPlace><![CDATA[Eindhoven]]></locationPlace>
      <locationProvince><![CDATA[Noord-Brabant]]></locationProvince>
      <locationZipCode>5611DE</locationZipCode>
    </jobLocation>
  </job>
  <job>
    <jobId><![CDATA[54]]></jobId>
    <jobAddedDate><![CDATA[2008-05-12]]></jobAddedDate>
    <jobTitle><![CDATA[Secretaresse]]></jobTitle>
    <jobDescription><![CDATA[Een beschrijving.]]></jobDescription>
    <jobLocation>
      <locationPlace><![CDATA[Groningen]]></locationPlace>
      <locationProvince><![CDATA[Groningen]]></locationProvince>
      <locationZipCode>9711JB</locationZipCode>
    </jobLocation>
  </job>
  <!-- Etc. -->
</jobs>
{% endhighlight %}
