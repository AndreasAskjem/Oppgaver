// view
const dagsNavn = [
    's�ndag', 'mandag', 'tirsdag',
    'onsdag', 'torsdag', 'fredag',
    'l�rdag'
  ];
  
  function visTrekninger() {
    let html = '';
    let cssClass = 'f�rsteTrekning';
    for (let trekning of model.trekninger) {
      const tid = new Date(trekning.tid);
      const datoTekst = lagDatoTekstForVisning(tid);
      const ukedag = dagsNavn[tid.getDay()];
      const vinnere = trekning.vinnere;
      const deltakere = trekning.deltakere;
      const vinnerOrd = vinnere.length === 1 ? 'Vinneren' : 'Vinnerne';
  
      html +=
        `<p>
            <small>${ukedag} ${datoTekst}</small><br/>
            <b class="${cssClass}">${vinnerOrd} er ${lagTekstListe(vinnere)}!</b><br/>
            <small>Trukket fra totalt ${deltakere.length} personer: ${lagTekstListe(deltakere)}</small>
        </p>`;
      cssClass = '';
    }
    document.getElementById('innhold').innerHTML = html;
  }
  
  function lagTekstListe(liste) {
    if (liste.length === 0) return '';
    if (liste.length === 1) return liste[0];
  
    const tekstListe = liste.join(', ');
    const indexSisteKomma = tekstListe.lastIndexOf(',');
    return tekstListe.substr(0, indexSisteKomma)
      + ' og ' + tekstListe.substr(indexSisteKomma + 1);
}