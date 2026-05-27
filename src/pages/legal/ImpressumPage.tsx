import { useLang } from '../../context/LanguageContext';
import { LegalPage, H2, P } from './LegalPage';

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
      <H2>Angaben gemäß § 5 TMG</H2>
      <P>Gyrnich<br />Deutschland</P>
      <H2>Kontakt</H2>
      <P>E-Mail: protein@gyrnich.de</P>
      <H2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</H2>
      <P>Gyrnich</P>
      <H2>Streitschlichtung</H2>
      <P>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
        https://ec.europa.eu/consumers/odr/. Wir sind nicht bereit oder verpflichtet, an
        Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </P>
      <H2>Haftung für Inhalte</H2>
      <P>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
        nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
        Diensteanbieter nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen
        zu überwachen.
      </P>
      <H2>Drittanbieter – Nährwertdaten</H2>
      <P>
        Nährwertinformationen werden von Open Food Facts (openfoodfacts.org) bezogen,
        einer gemeinschaftlich gepflegten freien Lebensmitteldatenbank unter der Open
        Database Licence (ODbL) v1.0. Die Daten werden ohne Gewähr bereitgestellt.
        Für die Richtigkeit, Vollständigkeit und Aktualität der abgerufenen Nährwertangaben
        sowie für sonstige externe Inhalte wird keine Haftung übernommen.
      </P>
      <H2>Urheberrecht</H2>
      <P>
        Die durch den Betreiber erstellten Inhalte unterliegen dem deutschen Urheberrecht.
        Die Vervielfältigung, Bearbeitung und Verbreitung bedürfen der schriftlichen Zustimmung
        des Betreibers.
      </P>
    </>
  ),
  en: (
    <>
      <H2>Legal Notice (Impressum)</H2>
      <P>
        The Impressum is a mandatory disclosure required by German law (§ 5 TMG).
      </P>
      <H2>Operator</H2>
      <P>Gyrnich<br />Germany</P>
      <H2>Contact</H2>
      <P>E-Mail: protein@gyrnich.de</P>
      <H2>Responsible for Content (§ 55 Abs. 2 RStV)</H2>
      <P>Gyrnich</P>
      <H2>Dispute Resolution</H2>
      <P>
        The European Commission provides an online dispute resolution platform:
        https://ec.europa.eu/consumers/odr/. We are neither willing nor obligated to participate
        in dispute resolution proceedings before a consumer arbitration board.
      </P>
      <H2>Third-Party Data – Nutritional Information</H2>
      <P>
        Nutritional information is sourced from Open Food Facts (openfoodfacts.org),
        a collaborative free food database under the Open Database Licence (ODbL) v1.0.
        Data is provided as-is without warranty. No liability is accepted for the accuracy,
        completeness or currency of nutritional data retrieved from this external source,
        nor for any other external content.
      </P>
      <H2>Copyright</H2>
      <P>
        All content created by the operator is subject to German copyright law.
        Reproduction or distribution requires the written consent of the operator.
      </P>
    </>
  ),
  hu: (
    <>
      <H2>Jogi nyilatkozat (Impressum)</H2>
      <P>
        Az Impressum a német jog (§ 5 TMG) által előírt kötelező jogi közlemény.
      </P>
      <H2>Üzemeltető</H2>
      <P>Gyrnich<br />Németország</P>
      <H2>Kapcsolat</H2>
      <P>E-mail: protein@gyrnich.de</P>
      <H2>Tartalomért felelős (§ 55 Abs. 2 RStV)</H2>
      <P>Gyrnich</P>
      <H2>Vitarendezés</H2>
      <P>
        Az Európai Bizottság online vitarendezési platformot biztosít:
        https://ec.europa.eu/consumers/odr/. Nem vagyunk hajlandók és nem vagyunk kötelezve
        fogyasztói választottbírósági eljárásban részt venni.
      </P>
      <H2>Harmadik fél – Tápértékadatok</H2>
      <P>
        A tápértékadatok az Open Food Facts (openfoodfacts.org) forrásból származnak,
        egy közösségi szabad élelmiszer-adatbázisból az Open Database Licence (ODbL) v1.0 alatt.
        Az adatok szavatosság nélkül kerülnek felhasználásra. Az ebből a külső forrásból
        lekért tápanyagadatok pontosságáért, teljességéért és naprakészségéért, valamint
        egyéb külső tartalmakért felelősség nem vállalható.
      </P>
      <H2>Szerzői jogok</H2>
      <P>
        Az üzemeltető által létrehozott tartalmak a német szerzői jog hatálya alá tartoznak.
        Másoláshoz vagy terjesztéshez az üzemeltető írásos beleegyezése szükséges.
      </P>
    </>
  ),
};

export function ImpressumPage() {
  const { lang } = useLang();
  const title = { de: 'Impressum', en: 'Legal Notice', hu: 'Jogi nyilatkozat' }[lang];
  return (
    <LegalPage title={title}>
      <TranslationNote />
      {content[lang]}
    </LegalPage>
  );
}
