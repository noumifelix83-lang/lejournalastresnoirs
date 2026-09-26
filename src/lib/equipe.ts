// L'équipe de la rédaction, affichée sur /redaction. Liste courte et rare
// à changer : gardée ici plutôt que dans le CMS. Si elle grandit ou change
// souvent, elle pourra migrer vers un type Sanity comme "auteur".

export interface MembreEquipe {
  nom: string;
  role: string;
  descriptifs?: string[];
  photo: string;
}

export const PDG: MembreEquipe = {
  nom: "Félix Njandja",
  role: "Promoteur du journal Astres Noirs Actu",
  descriptifs: ["Enseignant", "Homme d'affaires", "Écrivain", "Dramaturge"],
  photo: "/equipe/felix-njanja.jpeg",
};

export const EQUIPE: MembreEquipe[] = [
  {
    nom: "Tchuisseu Lowé",
    role: "Directeur de la publication",
    descriptifs: ["Journaliste", "Écrivain", "Poète"],
    photo: "/equipe/tchuisseu-lowe.jpeg",
  },
  {
    nom: "Njandja Noumi Félix II",
    role: "Webmaster & Designer",
    photo: "/equipe/njandja-noumi-felix.jpeg",
  },
];
