import { useLang } from '../../context/LanguageContext';
import { LegalPage, H2, P, Ul } from './LegalPage';

function TranslationNote() {
  const { lang } = useLang();
  if (lang === 'de') return null;
  const text = lang === 'en'
    ? 'This page is provided as a translation for user convenience. Only the German version is legally binding.'
    : 'Ez az oldal fordításként jelenik meg a felhasználói kényelem érdekében. Kizárólag a német változat bír jogi kötőerővel.';
  return (
    <div className="rounded-2xl px-4 py-3 mb-5 text-xs font-semibold leading-relaxed"
      style={{ background: 'var(--pt-surface)', border: '2px solid var(--pt-border)', color: 'var(--pt-text-sec)' }}>
      ℹ️ {text}
    </div>
  );
}

const content = {
  de: (
    <>
      <H2>1. Verantwortlicher</H2>
      <P>Verantwortlicher im Sinne der DSGVO ist:<br />Gyrnich<br />E-Mail: protein@gyrnich.de</P>

      <H2>2. Erhobene Daten</H2>
      <Ul>
        <li><strong>Google-Kontodaten</strong>: E-Mail-Adresse, Anzeigename, Profilbild-URL, Google-Nutzer-ID</li>
        <li><strong>App-Inhaltsdaten</strong>: Nahrungseinträge, Proteinziel, Streak-Daten, Badges, Abo-Status</li>
        <li><strong>Gerätedaten (lokal)</strong>: Theme-Einstellung, Sprachauswahl</li>
      </Ul>
      <P>
        Es werden keine Zahlungsdaten verarbeitet. Die Pro-Funktion simuliert lediglich eine
        Zahlung zu Testzwecken.
      </P>

      <H2>3. Zweck und Rechtsgrundlage</H2>
      <P>
        Die Verarbeitung erfolgt zur Bereitstellung der App gemäß Art. 6 Abs. 1 lit. b DSGVO
        (Vertragserfüllung).
      </P>

      <H2>4. Drittanbieter – Google Firebase</H2>
      <P>
        Wir nutzen Google Firebase (Google LLC, USA) für Authentication und Cloud Firestore.
        Die Übermittlung in die USA erfolgt auf Grundlage der EU-Standardvertragsklauseln
        (Art. 46 Abs. 2 lit. c DSGVO). Datenverarbeitungsvertrag gemäß Art. 28 DSGVO besteht.
        Weitere Infos: https://firebase.google.com/terms/data-processing-terms
      </P>

      <H2>5. Speicherdauer</H2>
      <P>
        Daten werden gespeichert, solange ein aktives Konto besteht. Nach Kontolöschung
        (in den Einstellungen möglich) werden alle Daten innerhalb von 30 Tagen gelöscht.
      </P>

      <H2>6. Deine Rechte (Art. 15–22 DSGVO)</H2>
      <Ul>
        <li><strong>Auskunft</strong> (Art. 15)</li>
        <li><strong>Berichtigung</strong> (Art. 16)</li>
        <li><strong>Löschung</strong> (Art. 17) – direkt über „Account löschen" in den Einstellungen</li>
        <li><strong>Einschränkung</strong> (Art. 18)</li>
        <li><strong>Datenübertragbarkeit</strong> (Art. 20)</li>
        <li><strong>Widerspruch</strong> (Art. 21)</li>
      </Ul>
      <P>Anfragen an: protein@gyrnich.de</P>

      <H2>7. Beschwerderecht</H2>
      <P>
        Du kannst dich bei einer deutschen Datenschutz-Aufsichtsbehörde beschweren.
        Übersicht: https://www.bfdi.bund.de
      </P>

      <H2>8. Stand</H2>
      <P>Mai 2025. Änderungen vorbehalten.</P>
    </>
  ),
  en: (
    <>
      <H2>1. Controller</H2>
      <P>The controller within the meaning of the GDPR is:<br />Gyrnich<br />E-Mail: protein@gyrnich.de</P>

      <H2>2. Data Collected</H2>
      <Ul>
        <li><strong>Google account data</strong>: email address, display name, profile picture URL, Google user ID</li>
        <li><strong>App content data</strong>: food entries, protein goal, streak data, badges, subscription status</li>
        <li><strong>Device data (local only)</strong>: theme setting, language preference</li>
      </Ul>
      <P>
        No payment data is processed. The Pro feature simulates a payment for testing purposes only.
      </P>

      <H2>3. Purpose and Legal Basis</H2>
      <P>
        Processing is carried out to provide the app in accordance with Art. 6(1)(b) GDPR
        (performance of a contract).
      </P>

      <H2>4. Third Party – Google Firebase</H2>
      <P>
        We use Google Firebase (Google LLC, USA) for authentication and Cloud Firestore storage.
        Data transfer to the USA is based on EU Standard Contractual Clauses (Art. 46(2)(c) GDPR).
        A data processing agreement per Art. 28 GDPR is in place.
        More info: https://firebase.google.com/terms/data-processing-terms
      </P>

      <H2>5. Retention Period</H2>
      <P>
        Data is stored as long as an active account exists. After account deletion
        (available in settings), all data is permanently deleted within 30 days.
      </P>

      <H2>6. Your Rights (Art. 15–22 GDPR)</H2>
      <Ul>
        <li><strong>Access</strong> (Art. 15)</li>
        <li><strong>Rectification</strong> (Art. 16)</li>
        <li><strong>Erasure</strong> (Art. 17) – directly via "Delete account" in settings</li>
        <li><strong>Restriction</strong> (Art. 18)</li>
        <li><strong>Data portability</strong> (Art. 20)</li>
        <li><strong>Objection</strong> (Art. 21)</li>
      </Ul>
      <P>Requests to: protein@gyrnich.de</P>

      <H2>7. Right to Lodge a Complaint</H2>
      <P>
        You have the right to lodge a complaint with a German data protection supervisory authority.
        Overview: https://www.bfdi.bund.de
      </P>

      <H2>8. Last Updated</H2>
      <P>May 2025. Subject to change.</P>
    </>
  ),
  hu: (
    <>
      <H2>1. Adatkezelő</H2>
      <P>A GDPR értelmében az adatkezelő:<br />Gyrnich<br />E-mail: protein@gyrnich.de</P>

      <H2>2. Gyűjtött adatok</H2>
      <Ul>
        <li><strong>Google-fiók adatok</strong>: e-mail cím, megjelenítési név, profilkép URL, Google felhasználói azonosító</li>
        <li><strong>Alkalmazás tartalmi adatok</strong>: étkezési bejegyzések, fehérjecél, streak adatok, jelvények, előfizetési állapot</li>
        <li><strong>Eszközadatok (csak helyi)</strong>: téma beállítása, nyelvi preferencia</li>
      </Ul>
      <P>
        Fizetési adatok nem kerülnek feldolgozásra. A Pro funkció csak tesztelési célból szimulál fizetést.
      </P>

      <H2>3. Cél és jogalap</H2>
      <P>
        Az adatkezelés az alkalmazás nyújtásához szükséges a GDPR 6. cikk (1) bek. b) pontja
        (szerződés teljesítése) alapján.
      </P>

      <H2>4. Harmadik fél – Google Firebase</H2>
      <P>
        A Google Firebase-t (Google LLC, USA) használjuk hitelesítéshez és Cloud Firestore
        adattároláshoz. Az USA-ba történő adattovábbítás az EU standard szerződési
        záradékok alapján történik (GDPR 46. cikk (2) bek. c) pont).
        Több info: https://firebase.google.com/terms/data-processing-terms
      </P>

      <H2>5. Megőrzési idő</H2>
      <P>
        Az adatok addig kerülnek tárolásra, amíg aktív fiók áll fenn. A fiók törlése után
        (a beállításokban elérhető) minden adat 30 napon belül véglegesen törlődik.
      </P>

      <H2>6. Jogaid (GDPR 15–22. cikk)</H2>
      <Ul>
        <li><strong>Hozzáférés</strong> (15. cikk)</li>
        <li><strong>Helyesbítés</strong> (16. cikk)</li>
        <li><strong>Törlés</strong> (17. cikk) – közvetlenül a beállításokban a „Fiók törlése" gombbal</li>
        <li><strong>Korlátozás</strong> (18. cikk)</li>
        <li><strong>Adathordozhatóság</strong> (20. cikk)</li>
        <li><strong>Tiltakozás</strong> (21. cikk)</li>
      </Ul>
      <P>Megkeresések: protein@gyrnich.de</P>

      <H2>7. Panasztétel joga</H2>
      <P>
        Jogod van panaszt tenni egy német adatvédelmi felügyeleti hatóságnál.
        Áttekintés: https://www.bfdi.bund.de
      </P>

      <H2>8. Utolsó frissítés</H2>
      <P>2025. május. Változtatás joga fenntartva.</P>
    </>
  ),
};

export function DatenschutzPage() {
  const { lang } = useLang();
  const title = { de: 'Datenschutzerklärung', en: 'Privacy Policy', hu: 'Adatvédelmi tájékoztató' }[lang];
  return (
    <LegalPage title={title}>
      <TranslationNote />
      {content[lang]}
    </LegalPage>
  );
}
