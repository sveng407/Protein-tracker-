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
      <H2>§ 1 Nutzungsberechtigung – Geschlossener Testbetrieb</H2>
      <P>
        Die Protein Tracker App befindet sich derzeit in einem <strong>geschlossenen
        Testbetrieb</strong>. Die Nutzung ist ausschließlich Personen gestattet, die vom
        Betreiber (Gyrnich) ausdrücklich und individuell zur Teilnahme eingeladen wurden
        (autorisierte Testnutzer).
      </P>
      <P>
        Alle anderen Personen sind von der Nutzung vollständig ausgeschlossen. Eine
        unbefugte Nutzung stellt einen Verstoß gegen diese AGB dar. Der Betreiber behält
        sich vor, nicht autorisierte Accounts ohne Vorankündigung zu sperren oder zu löschen.
      </P>

      <H2>§ 2 Geltungsbereich</H2>
      <P>
        Diese AGB gelten für die Nutzung der Protein Tracker App zwischen dem Betreiber
        Gyrnich und dem autorisierten Testnutzer.
      </P>

      <H2>§ 3 Leistungen</H2>
      <Ul>
        <li><strong>Free-Version</strong>: 1 Nahrungseintrag pro Tag, 7-Tage-Verlauf, Grundfunktionen</li>
        <li><strong>Pro-Version</strong>: Unbegrenzte Einträge, vollständiger Verlauf, alle Achievements</li>
      </Ul>
      <P>
        Die Verfügbarkeit ist während des Testbetriebs nicht garantiert. Der Anbieter behält
        sich vor, den Dienst jederzeit zu ändern oder einzustellen.
      </P>

      <H2>§ 4 Pro-Abonnement</H2>
      <P>
        Das Pro-Abonnement kostet <strong>4,99 € pro Monat</strong> (inkl. MwSt.) und verlängert
        sich automatisch. Kündigung jederzeit in den Einstellungen möglich.
      </P>
      <P>
        <strong>Hinweis (Testbetrieb):</strong> Die Zahlungsabwicklung ist simuliert. Es werden
        keine echten Zahlungen verarbeitet und keine Kartendaten gespeichert.
      </P>

      <H2>§ 5 Widerrufsrecht</H2>
      <P>
        Du hast das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
        Widerruf per E-Mail an: protein@gyrnich.de
      </P>
      <P>
        Das Widerrufsrecht erlischt, wenn du ausdrücklich zustimmst, dass mit der Vertragserfüllung
        vor Ablauf der Widerrufsfrist begonnen wird, und du bestätigst, dass du damit dein
        Widerrufsrecht verlierst.
      </P>

      <H2>§ 6 Haftungsbeschränkung</H2>
      <P>
        Die App stellt keine medizinische Beratung dar. Für die Richtigkeit der Nährstoffangaben
        (Open Food Facts) übernimmt der Anbieter keine Haftung.
      </P>

      <H2>§ 7 Schlussbestimmungen</H2>
      <P>
        Es gilt deutsches Recht. Sollten einzelne Bestimmungen unwirksam sein, bleibt die
        Wirksamkeit der übrigen unberührt.
      </P>
    </>
  ),
  en: (
    <>
      <H2>§ 1 Authorized Use – Closed Beta</H2>
      <P>
        The Protein Tracker App is currently operating as a <strong>closed beta</strong>.
        Use is exclusively permitted for persons who have been explicitly and individually
        invited by the operator (Gyrnich) to participate (authorized test users).
      </P>
      <P>
        All other persons are fully excluded from using the app. Unauthorized use constitutes
        a breach of these Terms. The operator reserves the right to suspend or delete
        unauthorized accounts without prior notice.
      </P>

      <H2>§ 2 Scope</H2>
      <P>
        These Terms of Service apply to the use of the Protein Tracker App between the
        operator Gyrnich and the authorized test user.
      </P>

      <H2>§ 3 Services</H2>
      <Ul>
        <li><strong>Free version</strong>: 1 food entry per day, 7-day history, basic features</li>
        <li><strong>Pro version</strong>: Unlimited entries, full history, all achievements</li>
      </Ul>
      <P>
        Availability is not guaranteed during the beta period. The operator reserves the right
        to modify or discontinue the service at any time.
      </P>

      <H2>§ 4 Pro Subscription</H2>
      <P>
        The Pro subscription costs <strong>€4.99 per month</strong> (incl. VAT) and renews
        automatically. Cancellation is possible at any time in the settings.
      </P>
      <P>
        <strong>Note (beta):</strong> Payment processing is simulated. No real payments are
        processed and no card data is stored.
      </P>

      <H2>§ 5 Right of Withdrawal</H2>
      <P>
        You have the right to withdraw from this contract within 14 days without giving any reason.
        Withdrawal by e-mail to: protein@gyrnich.de
      </P>
      <P>
        The right of withdrawal expires if you expressly agree that performance begins before
        the withdrawal period expires and acknowledge that you thereby lose your right of withdrawal.
      </P>

      <H2>§ 6 Limitation of Liability</H2>
      <P>
        The app does not constitute medical advice. The operator accepts no liability for the
        accuracy of nutritional data sourced from Open Food Facts.
      </P>

      <H2>§ 7 Final Provisions</H2>
      <P>
        German law applies. Should individual provisions be invalid, the validity of the
        remaining provisions shall be unaffected.
      </P>
    </>
  ),
  hu: (
    <>
      <H2>§ 1 Jogosultság – Zárt béta</H2>
      <P>
        A Protein Tracker alkalmazás jelenleg <strong>zárt béta üzemmódban</strong> működik.
        A használat kizárólag olyan személyek számára engedélyezett, akiket az üzemeltető
        (Gyrnich) kifejezetten és egyénileg meghívott a részvételre (jogosult tesztelők).
      </P>
      <P>
        Minden más személy teljes mértékben ki van zárva az alkalmazás használatából.
        A jogosulatlan használat az ÁSZF megsértésének minősül. Az üzemeltető fenntartja
        a jogot, hogy a jogosulatlan fiókokat előzetes értesítés nélkül felfüggessze vagy törölje.
      </P>

      <H2>§ 2 Hatály</H2>
      <P>
        Jelen ÁSZF a Protein Tracker alkalmazás használatára vonatkozik Gyrnich üzemeltető
        és a jogosult tesztelő között.
      </P>

      <H2>§ 3 Szolgáltatások</H2>
      <Ul>
        <li><strong>Ingyenes verzió</strong>: napi 1 étkezési bejegyzés, 7 napos előzmény, alapfunkciók</li>
        <li><strong>Pro verzió</strong>: korlátlan bejegyzések, teljes előzmény, összes achievement</li>
      </Ul>
      <P>
        A rendelkezésre állás nem garantált a béta időszakban. Az üzemeltető fenntartja
        a jogot a szolgáltatás módosítására vagy leállítására.
      </P>

      <H2>§ 4 Pro előfizetés</H2>
      <P>
        A Pro előfizetés ára <strong>4,99 € havonta</strong> (áfával együtt), és automatikusan
        megújul. Lemondás bármikor lehetséges a beállításokban.
      </P>
      <P>
        <strong>Megjegyzés (béta):</strong> A fizetés szimulált. Valódi tranzakció nem történik,
        kártyaadatok nem kerülnek tárolásra.
      </P>

      <H2>§ 5 Elállási jog</H2>
      <P>
        Jogod van 14 napon belül indoklás nélkül elállni a szerződéstől.
        Elállás e-mailben: protein@gyrnich.de
      </P>
      <P>
        Az elállási jog megszűnik, ha kifejezetten beleegyezel, hogy a teljesítés az elállási
        határidő lejárta előtt megkezdődjön, és tudomásul veszed, hogy ezzel elveszíted
        elállási jogodat.
      </P>

      <H2>§ 6 Felelősség korlátozása</H2>
      <P>
        Az alkalmazás nem minősül orvosi tanácsadásnak. Az üzemeltető nem vállal felelősséget
        az Open Food Facts tápanyagadatainak pontosságáért.
      </P>

      <H2>§ 7 Záró rendelkezések</H2>
      <P>
        Német jog alkalmazandó. Ha egyes rendelkezések érvénytelenek, a többi rendelkezés
        érvényessége nem érintett.
      </P>
    </>
  ),
};

export function AgbPage() {
  const { lang } = useLang();
  const title = { de: 'AGB', en: 'Terms of Service', hu: 'ÁSZF' }[lang];
  return (
    <LegalPage title={title}>
      <TranslationNote />
      {content[lang]}
    </LegalPage>
  );
}
