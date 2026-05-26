import { LegalPage, H2, P, Ul, Note } from './LegalPage';

export function AgbPage() {
  return (
    <LegalPage title="Allgemeine Geschäftsbedingungen">
      <Note>
        Bitte ersetze alle [PLATZHALTER] mit deinen echten Angaben vor dem öffentlichen Launch.
      </Note>

      <H2>§ 1 Geltungsbereich</H2>
      <P>
        Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung der
        Protein Tracker App (nachfolgend „App") zwischen dem Betreiber [Vorname Nachname],
        [Adresse] (nachfolgend „Anbieter") und dem Nutzer.
      </P>

      <H2>§ 2 Leistungen</H2>
      <P>
        Die App bietet ein digitales Tagebuch zur Verfolgung der täglichen Proteinaufnahme.
        Sie wird in zwei Versionen angeboten:
      </P>
      <Ul>
        <li><strong>Free-Version</strong>: 1 Nahrungseintrag pro Tag, 7-Tage-Verlauf, Grundfunktionen</li>
        <li><strong>Pro-Version</strong>: Unbegrenzte Einträge, vollständiger Verlauf, alle Achievements</li>
      </Ul>
      <P>
        Die Verfügbarkeit der App ist nicht garantiert. Der Anbieter behält sich vor, den Dienst
        jederzeit zu ändern, einzuschränken oder einzustellen.
      </P>

      <H2>§ 3 Pro-Abonnement</H2>
      <P>
        Das Pro-Abonnement kostet <strong>4,99 € pro Monat</strong> (inkl. gesetzlicher MwSt.).
        Das Abonnement verlängert sich automatisch um einen Monat, sofern es nicht mindestens
        24 Stunden vor Ablauf gekündigt wird. Die Kündigung ist jederzeit in den Einstellungen
        der App möglich.
      </P>
      <P>
        <strong>Hinweis (Testbetrieb):</strong> Die Zahlungsabwicklung befindet sich derzeit
        im Testmodus. Es werden keine echten Zahlungen verarbeitet. Keine Kreditkartendaten
        werden gespeichert oder übermittelt.
      </P>

      <H2>§ 4 Widerrufsrecht</H2>
      <P>
        <strong>Widerrufsbelehrung</strong>
      </P>
      <P>
        Du hast das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
        Die Widerrufsfrist beträgt 14 Tage ab dem Tag des Vertragsabschlusses.
      </P>
      <P>
        Um dein Widerrufsrecht auszuüben, musst du uns ([Vorname Nachname],
        [deine-email@example.de]) mittels einer eindeutigen Erklärung (z. B. eine E-Mail)
        über deinen Entschluss, diesen Vertrag zu widerrufen, informieren.
      </P>
      <P>
        <strong>Erlöschen des Widerrufsrechts:</strong> Das Widerrufsrecht erlischt bei einem
        Vertrag über die Lieferung von nicht auf einem körperlichen Datenträger befindlichen
        digitalen Inhalten, wenn der Anbieter mit der Ausführung des Vertrags begonnen hat,
        nachdem der Verbraucher ausdrücklich zugestimmt hat, dass der Anbieter mit der
        Ausführung des Vertrags vor Ablauf der Widerrufsfrist beginnt, und seine Kenntnis
        davon bestätigt hat, dass er durch seine Zustimmung mit Beginn der Ausführung des
        Vertrags sein Widerrufsrecht verliert.
      </P>
      <P>
        Beim Abschluss des Pro-Abonnements wird daher deine ausdrückliche Zustimmung
        eingeholt, dass die Pro-Funktionen sofort freigeschaltet werden und du damit dein
        Widerrufsrecht verlierst.
      </P>

      <H2>§ 5 Datenschutz</H2>
      <P>
        Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer Datenschutzerklärung,
        die in der App jederzeit abrufbar ist.
      </P>

      <H2>§ 6 Haftungsbeschränkung</H2>
      <P>
        Die App dient ausschließlich der persönlichen Ernährungsverfolgung und stellt keine
        medizinische Beratung dar. Für die Richtigkeit der Nährstoffangaben (bezogen über
        die Open Food Facts Datenbank) übernimmt der Anbieter keine Haftung.
      </P>

      <H2>§ 7 Schlussbestimmungen</H2>
      <P>
        Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand für Kaufleute und
        juristische Personen ist [Ort des Anbieters]. Sollten einzelne Bestimmungen dieser
        AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
      </P>
    </LegalPage>
  );
}
