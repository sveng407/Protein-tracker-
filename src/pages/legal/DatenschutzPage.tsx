import { LegalPage, H2, P, Ul, Note } from './LegalPage';

export function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <Note>
        Bitte ersetze alle [PLATZHALTER] mit deinen echten Angaben vor dem öffentlichen Launch.
      </Note>

      <H2>1. Verantwortlicher</H2>
      <P>
        Verantwortlicher im Sinne der DSGVO ist:<br />
        [Vorname Nachname]<br />
        [Straße Hausnummer]<br />
        [PLZ Ort]<br />
        E-Mail: [deine-email@example.de]
      </P>

      <H2>2. Erhobene Daten</H2>
      <P>
        Wir verarbeiten folgende personenbezogene Daten:
      </P>
      <Ul>
        <li><strong>Google-Kontodaten</strong> (bei Anmeldung): E-Mail-Adresse, Anzeigename, Profilbild-URL, Google-Nutzer-ID</li>
        <li><strong>App-Inhaltsdaten</strong>: Nahrungseinträge (Name, Proteingehalt, Zeitstempel), tägliches Proteinziel, Streak-Daten, Erfolge (Badges), Abo-Status</li>
        <li><strong>Gerätedaten</strong> (nur lokal): Theme-Einstellung, Sprachauswahl (im Browser-Speicher, nicht auf unseren Servern)</li>
      </Ul>
      <P>
        Es werden keine Zahlungsdaten verarbeitet. Die Pro-Abo-Funktion simuliert lediglich eine Zahlung zu Testzwecken — keine echten Kartendaten werden übermittelt oder gespeichert.
      </P>

      <H2>3. Zweck und Rechtsgrundlage</H2>
      <P>
        Die Verarbeitung erfolgt zur Bereitstellung der Protein-Tracking-App und des Pro-Abonnements
        gemäß Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung). Die Anmeldung mit Google dient
        der eindeutigen Identifikation und dem geräteübergreifenden Datenzugriff.
      </P>

      <H2>4. Drittanbieter – Google Firebase</H2>
      <P>
        Wir nutzen Google Firebase (Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA)
        für folgende Dienste:
      </P>
      <Ul>
        <li><strong>Firebase Authentication</strong>: Verwaltung der Nutzeranmeldung via Google</li>
        <li><strong>Cloud Firestore</strong>: Speicherung der App-Daten (Einträge, Ziele, Streak)</li>
      </Ul>
      <P>
        Die Übermittlung in die USA erfolgt auf Grundlage der EU-Standardvertragsklauseln (Art. 46
        Abs. 2 lit. c DSGVO). Mit Google besteht ein Datenverarbeitungsvertrag gemäß Art. 28 DSGVO.
        Weitere Informationen: https://firebase.google.com/terms/data-processing-terms
      </P>

      <H2>5. Speicherdauer</H2>
      <P>
        Deine Daten werden gespeichert, solange ein aktives Nutzerkonto besteht. Nach Löschung
        des Kontos (möglich in den Einstellungen der App) werden alle personenbezogenen Daten
        innerhalb von 30 Tagen endgültig gelöscht. Lokale Browser-Daten kannst du jederzeit
        selbst löschen.
      </P>

      <H2>6. Deine Rechte (Art. 15–22 DSGVO)</H2>
      <P>Du hast das Recht auf:</P>
      <Ul>
        <li><strong>Auskunft</strong> über deine gespeicherten Daten (Art. 15)</li>
        <li><strong>Berichtigung</strong> unrichtiger Daten (Art. 16)</li>
        <li><strong>Löschung</strong> deiner Daten (Art. 17) – direkt in der App über „Account löschen"</li>
        <li><strong>Einschränkung</strong> der Verarbeitung (Art. 18)</li>
        <li><strong>Datenübertragbarkeit</strong> (Art. 20)</li>
        <li><strong>Widerspruch</strong> gegen die Verarbeitung (Art. 21)</li>
      </Ul>
      <P>
        Zur Ausübung deiner Rechte wende dich an: [deine-email@example.de]
      </P>

      <H2>7. Beschwerderecht</H2>
      <P>
        Du hast das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
        Die zuständige Behörde richtet sich nach deinem Wohnort in Deutschland.
        Eine Übersicht aller Behörden findest du unter: https://www.bfdi.bund.de
      </P>

      <H2>8. Aktualität dieser Erklärung</H2>
      <P>
        Stand: Mai 2025. Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen.
        Die jeweils aktuelle Version ist in der App abrufbar.
      </P>
    </LegalPage>
  );
}
