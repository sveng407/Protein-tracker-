import { LegalPage, H2, P } from './LegalPage';

export function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <H2>Angaben gemäß § 5 TMG</H2>
      <P>
        Gyrnich<br />
        Deutschland
      </P>

      <H2>Kontakt</H2>
      <P>
        E-Mail: protein@gyrnich.de
      </P>

      <H2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</H2>
      <P>
        Gyrnich
      </P>

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
        Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
        Informationen zu überwachen.
      </P>

      <H2>Urheberrecht</H2>
      <P>
        Die durch den Betreiber dieser App erstellten Inhalte und Werke unterliegen dem deutschen
        Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
        außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
        Betreibers.
      </P>
    </LegalPage>
  );
}
