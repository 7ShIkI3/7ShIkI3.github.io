/* Compléments par fiche
   b  : but, finalité et doctrine
   l  : textes de référence [{t titre, au auteur, d date, desc, pd domaine public (true/false)}]
   e  : extraits courts de textes du domaine public [{q citation, s référence, tr note de traduction}]
   h  : chronologie détaillée des faits et controverses [[date, fait]]
   doc: documents publics utiles [{t titre, desc, u lien direct éventuel}]
   Les traductions marquées « traduction libre » sont faites pour ce fichier à partir du texte original. */
window.ORG_EXTRA = {

/* ---------- Franc-maçonnerie ---------- */
"fm":{
 b:"Se perfectionner moralement par un travail symbolique sur soi, à partir des outils du bâtisseur (équerre, compas, niveau), et pratiquer la fraternité entre des hommes, puis des femmes, d’opinions diverses. Selon les obédiences, l’accent porte sur la spiritualité (Grand Architecte de l’Univers) ou sur la liberté de conscience et l’engagement dans la cité.",
 l:[{t:"Constitutions d’Anderson",au:"James Anderson",d:"1723",desc:"Texte fondateur de la Grande Loge de Londres : histoire légendaire du métier, « Obligations » (Charges) et règlements généraux.",pd:true},
    {t:"Manuscrits des Old Charges (Regius, Cooke)",d:"vers 1390-1450",desc:"Plus anciens règlements de maçons opératifs anglais, en vers pour le Regius.",pd:true},
    {t:"Rituels (Rite écossais, Rite français, Émulation)",d:"XVIIIe-XIXe s.",desc:"Nombreuses éditions historiques publiées ; les rituels actuels sont internes aux obédiences.",pd:true}],
 e:[{q:"A Mason is oblig’d by his Tenure, to obey the moral Law ; and if he rightly understands the Art, he will never be a stupid Atheist nor an irreligious Libertine.",s:"Constitutions d’Anderson (1723), Charge I",tr:"Texte original anglais. En français : « Un maçon est obligé par son engagement d’obéir à la loi morale ; et s’il comprend bien l’Art, il ne sera jamais un athée stupide ni un libertin irréligieux. »"}],
 h:[["1717","Quatre loges de Londres fondent la première Grande Loge."],["1723","Publication des Constitutions d’Anderson."],["1738","Bulle In eminenti de Clément XII : excommunication des catholiques maçons."],["1797","Barruel (Mémoires pour servir à l’histoire du jacobinisme) et Robison accusent les maçons et les Illuminés d’avoir provoqué la Révolution française. Thèse rejetée par les historiens."],["1877","Le Grand Orient de France supprime l’obligation de croire en Dieu ; rupture avec la maçonnerie anglaise."],["1904","Affaire des fiches en France."],["1925-1945","Interdictions et persécutions par les régimes fasciste, nazi, franquiste et par Vichy (lois de 1940, fichage, déportations)."],["1981","Scandale de la loge P2 en Italie."],["1983","La Congrégation pour la doctrine de la foi confirme l’incompatibilité entre catholicisme et maçonnerie, rappelée en 2023."]],
 doc:[{t:"Exposition « La franc-maçonnerie » (BnF, 2016-2017)",desc:"Dossier pédagogique et catalogue de la Bibliothèque nationale de France."},{t:"Musée de la franc-maçonnerie (Paris)",desc:"Collections du Grand Orient de France, rue Cadet."}]},
"godf":{
 b:"Travailler à « l’amélioration matérielle et morale » de l’humanité, défendre la liberté absolue de conscience et la laïcité.",
 h:[["1773","Fondation, comme réorganisation de la première Grande Loge de France."],["1877","Suppression de l’obligation de croire en Dieu et en l’immortalité de l’âme."],["1901-1904","Affaire des fiches : le général André, ministre de la Guerre, fait ficher les opinions religieuses des officiers avec l’aide du GODF ; scandale révélé à la Chambre en octobre 1904, démission du ministre."],["1940","Dissolution par Vichy, saisie des archives (emportées ensuite à Moscou, restituées en 2000)."]],
 doc:[{t:"Débats de la Chambre des députés, 28 octobre 1904",desc:"Interpellation de Jean Guyot de Villeneuve sur l’affaire des fiches (Journal officiel)."}]},
"p2":{
 b:"Officiellement loge maçonnique ; selon la commission parlementaire, réseau d’influence visant à peser sur les institutions italiennes. Le « Plan de renaissance démocratique » saisi chez la fille de Gelli (1982) prévoyait le contrôle de partis, de médias et de syndicats.",
 h:[["17 mars 1981","Perquisition à Castiglion Fibocchi : saisie de la liste de 962 membres (ministres, parlementaires, généraux, chefs des services secrets, Silvio Berlusconi)."],["Mai 1981","Chute du gouvernement Forlani."],["Juin 1982","Mort de Roberto Calvi (Banco Ambrosiano) à Londres."],["25 janvier 1982","Loi n° 17 sur les associations secrètes, qui dissout la P2."],["1984","Rapport final de la commission présidée par Tina Anselmi."],["1987-1998","Licio Gelli condamné notamment pour la banqueroute frauduleuse de l’Ambrosiano et pour avoir égaré l’enquête sur l’attentat de Bologne (1980)."]],
 doc:[{t:"Rapport de la commission parlementaire d’enquête sur la loge P2 (1984)",desc:"Archives de la Chambre des députés italienne (legislature.camera.it)."}]},

/* ---------- Rosicrucianisme et ésotérisme ---------- */
"rosecroix":{
 b:"Réforme spirituelle universelle annoncée par les manifestes : union de la science, de la foi chrétienne et de la sagesse hermétique, sous l’égide d’une fraternité invisible fondée par le légendaire Christian Rosenkreutz.",
 l:[{t:"Fama Fraternitatis",d:"1614",desc:"Récit de la vie de Christian Rosenkreutz et découverte de son tombeau.",pd:true},{t:"Confessio Fraternitatis",d:"1615",desc:"Profession de foi de la fraternité.",pd:true},{t:"Les Noces chymiques de Christian Rosenkreutz",au:"Johann Valentin Andreae",d:"1616",desc:"Roman alchimique allégorique en sept journées.",pd:true}],
 h:[["1614-1616","Publication des trois manifestes à Kassel et Strasbourg."],["1623","Affiches « rosicruciennes » placardées à Paris, qui provoquent une panique pamphlétaire."],["XVIIIe s.","Ordre de la Rose-Croix d’Or en Allemagne, lié aux milieux maçonniques."]]},
"amorc":{
 b:"Enseigner une « philosophie mystique » pour le développement des facultés intérieures, par des monographies envoyées aux membres.",
 l:[{t:"Monographies de l’AMORC",d:"XXe s.",desc:"Enseignement interne par degrés, non public.",pd:false},{t:"Mastery of Life",desc:"Brochure de présentation de l’ordre.",pd:false}],
 h:[["1915","Fondation à New York par H. Spencer Lewis."],["1990","Conflit de succession : l’imperator Gary Stewart est destitué et poursuivi par l’ordre ; procédure civile en Californie."],["1995","Inscrit sur la liste du rapport parlementaire français."]]},
"hermetisme":{
 b:"Connaître Dieu, le cosmos et soi-même par la gnose ; transformation intérieure de l’initié (« régénération ») à travers l’étude des correspondances entre le microcosme et le macrocosme.",
 l:[{t:"Corpus Hermeticum",d:"IIe-IIIe s.",desc:"Traités grecs attribués à Hermès Trismégiste, traduits en latin par Marsile Ficin (1471).",pd:true},{t:"Table d’émeraude",d:"VIe-VIIIe s. (version arabe)",desc:"Court texte alchimique fondateur.",pd:true},{t:"Asclépius",desc:"Dialogue hermétique conservé en latin.",pd:true}],
 e:[{q:"Ce qui est en bas est comme ce qui est en haut, et ce qui est en haut est comme ce qui est en bas, pour accomplir les miracles de la chose unique.",s:"Table d’émeraude",tr:"Traduction libre d’après la version latine médiévale."}]},
"golden-dawn":{
 b:"Former des magiciens par une progression en grades : étude de la kabbale, de l’astrologie, du tarot et de la géomancie, puis pratique de la magie rituelle.",
 l:[{t:"Manuscrits chiffrés (Cipher Manuscripts)",d:"Années 1880",desc:"Documents à l’origine de l’ordre, d’authenticité discutée.",pd:true},{t:"The Golden Dawn",au:"Israel Regardie",d:"1937-1940",desc:"Publication des rituels de l’ordre, toujours protégée par le droit d’auteur.",pd:false}],
 h:[["1888","Fondation du temple Isis-Urania à Londres."],["1900","Bataille de Blythe Road : Crowley, envoyé par Mathers, tente de prendre le local de l’ordre."],["1903","Éclatement en Stella Matutina et Alpha et Omega."]]},
"thelema":{
 b:"Chaque individu doit découvrir et accomplir sa « Vraie Volonté » ; Crowley annonce un nouvel « Éon d’Horus » remplaçant les religions anciennes.",
 l:[{t:"Liber AL vel Legis (Le Livre de la Loi)",au:"Aleister Crowley",d:"1904",desc:"Texte dicté, selon Crowley, par l’entité Aiwass au Caire. Ses droits restent revendiqués par l’O.T.O. aux États-Unis.",pd:false},{t:"Magick in Theory and Practice",au:"Aleister Crowley",d:"1929",desc:"Traité de magie.",pd:false}],
 e:[{q:"Do what thou wilt shall be the whole of the Law.",s:"Liber AL vel Legis, I, 40",tr:"« Fais ce que tu voudras sera le tout de la Loi. » Formule déjà présente chez Rabelais (« Fay ce que vouldras », abbaye de Thélème, 1534)."}],
 h:[["1904","Rédaction du Livre de la Loi au Caire."],["1920-1923","Abbaye de Thélème à Cefalù (Sicile)."],["1923","Mort du disciple Raoul Loveday ; campagne de presse britannique (« l’homme le plus pervers du monde ») ; expulsion de Crowley par le gouvernement de Mussolini."]]},
"theosophie":{
 b:"Devise : « Il n’y a pas de religion supérieure à la Vérité ». Former un noyau de fraternité universelle, encourager l’étude comparée des religions et explorer les pouvoirs latents de l’homme.",
 l:[{t:"Isis dévoilée",au:"Helena Blavatsky",d:"1877",desc:"Critique de la science et de la religion de son temps.",pd:true},{t:"La Doctrine secrète",au:"Helena Blavatsky",d:"1888",desc:"Cosmogenèse et anthropogenèse, théorie des « races-racines ».",pd:true},{t:"La Clef de la théosophie",au:"Helena Blavatsky",d:"1889",desc:"Présentation sous forme de questions-réponses.",pd:true}],
 e:[{q:"Il n’y a pas de religion supérieure à la Vérité.",s:"Devise de la Société théosophique (Satyāt nāsti paro dharmaḥ)"}],
 h:[["1875","Fondation à New York."],["1882","Installation du siège à Adyar."],["1885","Rapport Hodgson de la Society for Psychical Research accusant Blavatsky de fraude (lettres des « Mahatmas ») ; la SPR a publié en 1986 une réévaluation critique de ce rapport."],["1909-1929","Annie Besant présente Jiddu Krishnamurti comme futur « Instructeur du monde » ; Krishnamurti dissout l’Ordre de l’Étoile en 1929."]],
 doc:[{t:"Théorie des races-racines",desc:"Les historiens signalent que cette théorie a été reprise par des courants racistes de l’ésotérisme allemand (ariosophie)."}]},
"anthroposophie":{
 b:"Connaissance du monde spirituel par une « science de l’esprit » fondée sur l’entraînement de la pensée, appliquée à l’éducation, à l’agriculture, à la médecine et aux arts.",
 l:[{t:"La Philosophie de la liberté",au:"Rudolf Steiner",d:"1894",desc:"Ouvrage philosophique fondateur.",pd:true},{t:"Théosophie",au:"Rudolf Steiner",d:"1904",pd:true},{t:"Comment acquérir des connaissances sur les mondes supérieurs ?",au:"Rudolf Steiner",d:"1904-1905",pd:true}],
 h:[["1913","Rupture avec la Société théosophique."],["1919","Première école Waldorf à Stuttgart."],["1922-1923","Incendie du premier Goetheanum, reconstruit en béton."],["1924","Cours aux agriculteurs, origine de la biodynamie."],["XXIe s.","Débats publics sur la médecine anthroposophique et sur certains propos raciaux de Steiner, dont des organisations anthroposophiques se sont démarquées."]]},

/* ---------- Sociétés politiques et cercles ---------- */
"illuminati":{
 b:"Diffuser les Lumières (raison, morale laïque) et combattre l’influence du clergé et de l’absolutisme en plaçant des membres éclairés dans les postes clés.",
 l:[{t:"Écrits originaux de l’ordre (Einige Originalschriften)",d:"1787",desc:"Documents saisis chez des membres et publiés par le gouvernement bavarois pour discréditer l’ordre.",pd:true},{t:"Mémoires pour servir à l’histoire du jacobinisme",au:"Augustin Barruel",d:"1797-1798",desc:"Source principale du mythe d’un complot illuministe.",pd:true},{t:"Proofs of a Conspiracy",au:"John Robison",d:"1797",pd:true}],
 h:[["1776","Fondation par Adam Weishaupt, professeur de droit canon."],["1780","Le baron Adolph Knigge développe l’ordre dans les loges ; quelques milliers de membres au plus fort."],["1784-1785","Édits d’interdiction de l’électeur de Bavière."],["1787","Publication des documents saisis."],["1797","Barruel et Robison font des Illuminés les instigateurs de la Révolution française."]]},
"bilderberg":{
 b:"Favoriser le dialogue entre l’Europe et l’Amérique du Nord sur l’économie, la défense et la géopolitique, hors de toute décision ou communiqué.",
 h:[["1954","Première réunion à Oosterbeek."],["1976","Pas de réunion, à la suite du scandale Lockheed qui touche le prince Bernhard."],["Années 2010","Publication régulière de la liste des participants et des thèmes."]]},
"skull-bones":{
 b:"Créer une fraternité d’anciens étudiants parmi les futures élites, autour d’un « tombeau » (le bâtiment de la société) et de rituels privés.",
 h:[["1832","Fondation."],["1876","Cambriolage du « Tombeau » par une société rivale, publication de documents."],["1991","Admission des femmes, après un vote contesté des anciens."],["2004","Les deux candidats à la présidence américaine, George W. Bush et John Kerry, en sont membres."]]},
"kkk":{
 b:"Maintenir la suprématie blanche protestante par l’intimidation et la violence, contre les Afro-Américains, puis aussi contre les catholiques, les Juifs et les immigrés.",
 h:[["1865","Fondation à Pulaski par d’anciens soldats confédérés."],["1871","Ku Klux Klan Act : répression fédérale, déclin du premier Klan."],["1915","Renaissance à Stone Mountain, dans le sillage du film « Naissance d’une nation »."],["1925","Défilé de dizaines de milliers de membres à Washington ; scandale D. C. Stephenson et déclin."],["1963","Attentat de l’église baptiste de la 16e rue à Birmingham : quatre fillettes tuées ; condamnations tardives (1977, 2001, 2002)."],["1964","Meurtre de trois militants des droits civiques au Mississippi."],["1981","Lynchage de Michael Donald à Mobile ; procès civil qui ruine les United Klans of America (1987)."]],
 doc:[{t:"Southern Poverty Law Center, « Ku Klux Klan: A History of Racism and Violence »",desc:"Rapport historique."}]},
"templiers":{
 b:"Protéger les pèlerins en Terre sainte et défendre les États latins d’Orient, en conciliant vie monastique et combat.",
 l:[{t:"Règle du Temple",d:"1129, complétée jusqu’au XIIIe s.",desc:"Règle approuvée au concile de Troyes.",pd:true},{t:"De laude novae militiae (Éloge de la nouvelle chevalerie)",au:"Bernard de Clairvaux",d:"vers 1130",pd:true},{t:"Procès des Templiers",d:"1307-1312",desc:"Actes des interrogatoires, édités par Jules Michelet (1841-1851).",pd:true}],
 h:[["1120","Fondation à Jérusalem."],["1129","Concile de Troyes."],["13 octobre 1307","Arrestation des Templiers du royaume de France ; aveux obtenus sous la torture (hérésie, reniement du Christ)."],["1308","Parchemin de Chinon : le pape Clément V absout les dignitaires (document redécouvert dans les archives vaticanes en 2001)."],["1312","Suppression de l’ordre par la bulle Vox in excelso ; biens transférés aux Hospitaliers."],["18 mars 1314","Jacques de Molay brûlé à Paris."]],
 doc:[{t:"Processus contra Templarios (Archives apostoliques vaticanes, 2007)",desc:"Édition en fac-similé des actes du procès, dont le parchemin de Chinon."}]},
"jesuites":{
 b:"« Aider les âmes » et servir l’Église sous l’autorité du pape, par l’éducation, la mission et les Exercices spirituels ; devise « Ad maiorem Dei gloriam ».",
 l:[{t:"Exercices spirituels",au:"Ignace de Loyola",d:"1548",desc:"Retraite de quatre semaines de méditation.",pd:true},{t:"Constitutions de la Compagnie de Jésus",d:"1558",pd:true},{t:"Ratio Studiorum",d:"1599",desc:"Programme des collèges jésuites.",pd:true}],
 h:[["1540","Approbation par Paul III."],["1759-1767","Expulsion du Portugal, de France puis d’Espagne."],["1773","Suppression par Clément XIV."],["1814","Rétablissement par Pie VII."],["1989","Assassinat de six jésuites à l’Université centraméricaine du Salvador par l’armée."],["2013","Élection du premier pape jésuite, François."]],
 doc:[{t:"Monita secreta (1614)",desc:"Pamphlet présenté comme les instructions secrètes de l’ordre ; reconnu comme un faux dès le XVIIe s."}]},
"opus-dei":{
 b:"Rappeler que chacun peut devenir saint dans son travail ordinaire et sa vie familiale, en sanctifiant le travail quotidien.",
 l:[{t:"Chemin",au:"Josemaría Escrivá",d:"1934 (version augmentée en 1939)",desc:"Recueil de 999 maximes spirituelles.",pd:false}],
 h:[["1928","Fondation à Madrid."],["1950","Approbation définitive par Pie XII."],["1982","Prélature personnelle (Jean-Paul II)."],["2002","Canonisation d’Escrivá."],["2022","Motu proprio Ad charisma tuendum de François : le prélat n’est plus évêque et l’institution relève du dicastère pour le Clergé."],["2021-2024","Plaintes d’anciennes numéraires auxiliaires d’Argentine et du Paraguay pour exploitation au travail, contestées par l’Opus Dei."]]},
"assassins":{
 b:"Défendre la communauté ismaélienne nizârite, minoritaire et menacée, face aux Seldjoukides sunnites, en tenant des forteresses et en éliminant des dirigeants hostiles.",
 h:[["1090","Prise d’Alamut par Hassan-i Sabbah."],["1092","Assassinat du vizir seldjoukide Nizam al-Mulk, attribué aux nizârites."],["1192","Assassinat de Conrad de Montferrat, roi de Jérusalem."],["1256","Reddition d’Alamut aux Mongols de Hülegü."],["1273","Chute des dernières places fortes syriennes devant les Mamelouks."]]},

/* ---------- Nouveaux mouvements ---------- */
"scientologie":{
 b:"Libérer l’être spirituel, le « thétan », de ses traumatismes (« engrammes ») par l’« audition », jusqu’à l’état de « Clair » puis aux niveaux de « Thétan opérant » ; « clarifier la planète ».",
 l:[{t:"La Dianétique : la science moderne de la santé mentale",au:"L. Ron Hubbard",d:"1950",desc:"Ouvrage fondateur.",pd:false},{t:"Scientologie : les fondements de la pensée",au:"L. Ron Hubbard",d:"1956",pd:false},{t:"Documents OT (niveaux supérieurs)",desc:"Textes réservés ; produits comme pièces dans des procès (affaire Fishman, 1995).",pd:false}],
 h:[["1950","Publication de la Dianétique."],["1954","Première Église à Los Angeles."],["1967","Création de la Sea Org."],["1977","Perquisitions du FBI : opération Blanche-Neige (infiltration du fisc et d’agences fédérales)."],["1979","Onze dirigeants, dont Mary Sue Hubbard, condamnés aux États-Unis."],["1993","L’IRS reconnaît l’exonération fiscale."],["1995","Mort de Lisa McPherson à Clearwater ; poursuites pénales abandonnées en 2000, accord civil en 2004."],["2009","Condamnation en France de l’Église (Celebrity Centre) et de dirigeants pour escroquerie en bande organisée, confirmée par la Cour de cassation en 2013."],["2023","L’acteur Danny Masterson, membre, condamné pour viols ; des victimes accusent l’organisation de harcèlement."]],
 doc:[{t:"Cour de cassation, chambre criminelle, 16 octobre 2013, n° 12-81.532",desc:"Arrêt confirmant la condamnation pour escroquerie."},{t:"Rapport annuel du Bundesamt für Verfassungsschutz",desc:"Chapitre sur la scientologie (Allemagne)."}]},
"temoins-jehovah":{
 b:"Annoncer l’établissement prochain du Royaume de Dieu sur terre après Harmaguédon, restaurer le christianisme primitif et sanctifier le nom de Jéhovah.",
 l:[{t:"Les Saintes Écritures, Traduction du monde nouveau",d:"1950-1961, révisée en 2013",desc:"Bible propre au mouvement, critiquée par des biblistes pour certaines traductions.",pd:false},{t:"La Tour de Garde ; Réveillez-vous !",d:"depuis 1879",desc:"Périodiques de la Watch Tower.",pd:false},{t:"Études des Écritures",au:"Charles Taze Russell",d:"1886-1904",pd:true}],
 h:[["1879","Lancement du périodique Zion’s Watch Tower."],["1914, 1925, 1975","Dates attendues comme décisives pour la fin du monde ou le retour du Christ."],["1931","Adoption du nom de Témoins de Jéhovah."],["1933-1945","Persécution sous le nazisme : déportation dans les camps (triangle violet), environ 1 500 morts selon les historiens."],["1945","Interdiction de la transfusion sanguine (doctrine formalisée)."],["2015-2017","Commission royale australienne : 1 006 auteurs présumés d’abus sur enfants recensés dans les dossiers internes depuis 1950, aucun signalé aux autorités par l’organisation."],["2017","Interdiction en Russie (Cour suprême) ; perquisitions et peines de prison."],["2022","La CEDH condamne la Russie pour cette interdiction."],["2023","Hambourg : un ancien membre tue sept personnes, dont un enfant à naître, dans une salle du Royaume."]],
 doc:[{t:"Royal Commission into Institutional Responses to Child Sexual Abuse, Case Study 29",desc:"Rapport australien (2016)."},{t:"CEDH, Taganrog LRO et autres c. Russie, 7 juin 2022",desc:"Arrêt sur l’interdiction en Russie."}]},
"lds":{
 b:"Restaurer l’Église primitive par la révélation moderne : prêtrise restaurée, temples, ordonnances pour les vivants et les morts, famille éternelle.",
 l:[{t:"Le Livre de Mormon",au:"Joseph Smith (traducteur selon la foi mormone)",d:"1830",desc:"Récit de peuples américains anciens, présenté comme traduit de plaques d’or.",pd:true},{t:"Doctrine et Alliances",d:"1835",desc:"Révélations modernes.",pd:true},{t:"La Perle de grand prix",d:"1851",desc:"Dont le Livre d’Abraham, dont la traduction égyptienne est contestée par les égyptologues.",pd:true}],
 e:[{q:"Adam fell that men might be ; and men are, that they might have joy.",s:"Livre de Mormon, 2 Néphi 2:25 (édition de 1830)",tr:"« Adam tomba pour que les hommes fussent, et les hommes sont pour avoir la joie. »"}],
 h:[["1830","Publication du Livre de Mormon et fondation."],["1844","Assassinat de Joseph Smith à Carthage (Illinois)."],["1847","Arrivée en Utah sous Brigham Young."],["1857","Massacre de Mountain Meadows : environ 120 émigrants tués par des miliciens mormons."],["1890","Manifeste de Wilford Woodruff mettant fin à la polygamie."],["1978","Fin de l’exclusion des hommes noirs de la prêtrise."],["2023","Amende de 5 millions de dollars de la SEC pour la dissimulation des actifs du fonds Ensign Peak."]]},
"unification":{
 b:"Réaliser le Royaume de Dieu sur terre par des familles « bénies » (mariages collectifs) ; Sun Myung Moon et Hak Ja Han se présentent comme les « Vrais Parents » de l’humanité.",
 l:[{t:"Le Principe divin (Wolli Kangron)",au:"Sun Myung Moon et ses disciples",d:"1966",desc:"Exposé doctrinal.",pd:false}],
 h:[["1954","Fondation à Séoul."],["1982","Mariage collectif au Madison Square Garden ; Moon condamné pour fraude fiscale aux États-Unis (18 mois de prison)."],["1980-2010","Au Japon, vente de « biens spirituels » (vases, sceaux) à prix exorbitants : des milliers de plaintes recensées par le Réseau national des avocats contre les ventes spirituelles."],["2022","Assassinat de Shinzo Abe par Tetsuya Yamagami, dont la mère avait été ruinée par ses dons à l’Église."],["2023","Le gouvernement japonais demande la dissolution."],["2025","Ordonnance de dissolution prononcée par le tribunal de district de Tokyo ; en Corée, enquête et poursuites dans une affaire de corruption visant la direction."]]},
"peoples-temple":{
 b:"Bâtir une communauté interraciale et socialiste fondée sur l’Évangile social, puis, sous l’emprise croissante de Jim Jones, une « terre promise » en Guyana à l’abri d’un monde présenté comme hostile.",
 h:[["1955","Fondation à Indianapolis."],["1965-1977","Installation en Californie (Ukiah, San Francisco) ; influence politique locale."],["1977","Départ vers Jonestown après une enquête du magazine New West."],["17-18 novembre 1978","Visite du député Leo Ryan ; Ryan et quatre autres personnes tués à la piste de Port Kaituma. Le même jour, plus de 900 membres meurent à Jonestown par empoisonnement au cyanure, dont environ 300 enfants."]],
 doc:[{t:"Bande « Death tape » (FBI Q042)",desc:"Enregistrement des dernières heures, conservé par le FBI et transcrit par le Jonestown Institute."}]},
"branch-davidians":{
 b:"Se préparer à l’accomplissement imminent des prophéties de l’Apocalypse et à l’ouverture des « sept sceaux », dont David Koresh se disait le révélateur.",
 h:[["1987","Fusillade entre Koresh et George Roden pour le contrôle de Mount Carmel."],["28 février 1993","Assaut de l’ATF : quatre agents et six Davidiens tués."],["19 avril 1993","Assaut du FBI au gaz CS ; incendie ; environ 76 morts dont 25 enfants."],["1994","Condamnation de plusieurs survivants."],["2000","Rapport Danforth : les Davidiens ont allumé les incendies ; le gouvernement n’a pas tiré sur le bâtiment le dernier jour."]],
 doc:[{t:"Report to the Deputy Attorney General on the Events at Waco (1993)",desc:"Département de la Justice des États-Unis."},{t:"Rapport final de l’avocat spécial John C. Danforth (2000)",desc:"Enquête indépendante."}]},
"ots":{
 b:"Préparer le retour du Christ « solaire » et le « transit » des élus vers l’étoile Sirius, dans un cadre néo-templier, écologiste et apocalyptique.",
 h:[["1984","Fondation par Di Mambro et Jouret, à partir de l’Ordre rénové du Temple."],["1993","Arrestations au Québec pour trafic d’armes ; enquête médiatique."],["30 septembre 1994","Meurtre d’un couple et de leur bébé à Morin-Heights (Québec)."],["4-5 octobre 1994","48 morts à Cheiry et Salvan (Suisse), dont Di Mambro et Jouret."],["23 décembre 1995","16 morts dans le Vercors (France), dont trois enfants."],["Mars 1997","5 morts à Saint-Casimir (Québec)."],["2001 et 2006","Procès en France du chef d’orchestre Michel Tabachnik, relaxé."]]},
"aum":{
 b:"Atteindre l’éveil sous la direction absolue d’Asahara et survivre à un « Armageddon » annoncé ; la doctrine justifie le meurtre (« poa ») pour « sauver » les âmes.",
 h:[["1984","Création d’un club de yoga par Chizuo Matsumoto."],["1989","Assassinat de l’avocat Tsutsumi Sakamoto et de sa famille."],["1990","Échec électoral du parti Shinrito."],["27 juin 1994","Attentat au sarin de Matsumoto : 8 morts."],["20 mars 1995","Attentat au sarin dans le métro de Tokyo."],["1995","Arrestation d’Asahara ; perte du statut de personne morale religieuse."],["2004","Condamnation à mort d’Asahara."],["6 et 26 juillet 2018","Exécution d’Asahara et de douze membres."]],
 doc:[{t:"Underground",au:"Haruki Murakami",desc:"Entretiens avec des victimes et des membres (1997-1998), œuvre protégée."}]},
"heavens-gate":{
 b:"Quitter le « véhicule » humain pour accéder au « niveau au-dessus de l’humain », grâce à un vaisseau spatial censé suivre la comète Hale-Bopp.",
 h:[["1975","Disparition médiatisée d’une vingtaine d’adeptes en Oregon."],["1985","Mort de Bonnie Nettles."],["1996-1997","Site web du groupe, conservé depuis par d’anciens membres."],["26 mars 1997","Découverte de 39 corps à Rancho Santa Fe."]]},
"children-of-god":{
 b:"Annoncer la fin des temps et vivre en communautés « révolutionnaires » détachées du « Système », selon les « Lettres de Mo » de David Berg.",
 l:[{t:"Lettres de Mo (MO Letters)",au:"David Berg",d:"1969-1994",desc:"Plus de 3 000 lettres, dont certaines prônant le « flirty fishing » et des relations sexuelles avec des mineurs.",pd:false}],
 h:[["1968","Fondation en Californie."],["1974-1987","Pratique du flirty fishing."],["1991-1993","Enlèvements d’enfants par les autorités en Espagne, en Australie, en France et en Argentine ; la plupart rendus faute de preuves suffisantes."],["1995","Jugement britannique (juge Ward) reconnaissant des abus passés tout en laissant un enfant à sa mère membre."],["2005","Meurtre-suicide de Ricky Rodriguez, fils adoptif de la dirigeante Karen Zerby, qui dénonce les abus subis."]]},
"iskcon":{
 b:"Répandre la dévotion (bhakti) à Krishna par le chant du mantra Hare Krishna, le végétarisme et l’étude de la Bhagavad-Gita, dans la lignée de Chaitanya.",
 l:[{t:"La Bhagavad-Gita telle qu’elle est",au:"A. C. Bhaktivedanta Swami Prabhupada",d:"1968-1972",desc:"Traduction commentée.",pd:false},{t:"Srimad-Bhagavatam (Bhagavata Purana)",d:"IXe-Xe s. (texte original)",pd:true}],
 e:[{q:"Hare Krishna Hare Krishna, Krishna Krishna Hare Hare, Hare Rama Hare Rama, Rama Rama Hare Hare.",s:"Maha-mantra (Kali-Santarana Upanishad)"}],
 h:[["1966","Fondation à New York."],["1977","Mort de Prabhupada ; crises de succession entre gourous initiateurs."],["1986","Excommunication de Kirtanananda (New Vrindaban), condamné en 1996 pour racket."],["1998","Rapport interne reconnaissant des abus dans les gurukulas."],["2000-2005","Plainte collective aux États-Unis (affaire Turley) ; règlement dans le cadre d’une faillite des temples concernés."]]},
"osho":{
 b:"Libérer l’individu des conditionnements par la méditation active et une spiritualité joyeuse et sensuelle (« Zorba le Bouddha »).",
 h:[["1974","Ashram de Pune."],["1981","Achat du Big Muddy Ranch : Rajneeshpuram (Oregon)."],["Septembre 1984","Contamination à la salmonelle de dix restaurants de The Dalles : 751 malades, pour fausser une élection locale."],["1985","Fuite de Ma Anand Sheela ; arrestation de Rajneesh, expulsé des États-Unis après plaider-coupable pour fraude à l’immigration."],["1986","Sheela condamnée pour tentative de meurtre et empoisonnement."],["2018","Série documentaire « Wild Wild Country »."]],
 doc:[{t:"Török et al., « A Large Community Outbreak of Salmonellosis… », JAMA, 1997",desc:"Étude épidémiologique de l’attentat."}]},
"falun-gong":{
 b:"Cultiver le corps et l’esprit par cinq exercices et par les principes « Vérité, Compassion, Tolérance », selon l’enseignement de Li Hongzhi.",
 l:[{t:"Zhuan Falun",au:"Li Hongzhi",d:"1995",desc:"Texte principal.",pd:false}],
 h:[["1992","Lancement public à Changchun."],["25 avril 1999","Rassemblement de 10 000 pratiquants à Zhongnanhai (Pékin)."],["Juillet 1999","Interdiction en Chine, campagne de répression, camps de « rééducation »."],["2001","Immolations de la place Tiananmen, présentées par Pékin comme le fait de pratiquants, ce que le mouvement conteste."],["2019","China Tribunal (Londres, ONG) : conclut au prélèvement forcé d’organes sur des détenus, dont des pratiquants."],["2024","Enquêtes du New York Times et plainte d’anciens danseurs de Shen Yun pour travail forcé."]]},
"raeliens":{
 b:"Accueillir les Élohim, créateurs extraterrestres de l’humanité, en construisant une « ambassade » ; promouvoir la géniocratie et le clonage comme voie d’immortalité.",
 l:[{t:"Le Livre qui dit la vérité",au:"Claude Vorilhon (Raël)",d:"1974",pd:false}],
 h:[["1973","Récit de la rencontre de Raël avec un extraterrestre près de Clermont-Ferrand."],["1995","Inscrit sur la liste du rapport parlementaire français."],["2002","Clonaid annonce la naissance d’un bébé cloné, « Ève », sans aucune preuve."]]},
"nxivm":{
 b:"Officiellement, aider les personnes à surmonter leurs blocages par la méthode « Rational Inquiry » ; en réalité, selon la justice, servir le pouvoir personnel de Keith Raniere.",
 h:[["1998","Fondation."],["2015","Création du groupe secret DOS par Raniere."],["2017","Article du New York Times (marquage au fer de femmes)."],["2018","Arrestation de Raniere au Mexique ; plaider-coupable de l’actrice Allison Mack."],["Juin 2019","Raniere reconnu coupable de racket, trafic sexuel et pédopornographie."],["Octobre 2020","Condamné à 120 ans de prison."]]},
"mrtcg":{
 b:"Respecter strictement les dix commandements en attendant la fin du monde annoncée pour le 31 décembre 1999, puis repoussée.",
 h:[["1989","Fondation après des apparitions mariales revendiquées par Credonia Mwerinde."],["1999","La fin du monde annoncée n’advient pas."],["17 mars 2000","Incendie de l’église de Kanungu : environ 530 morts."],["Mars-avril 2000","Découverte de fosses communes sur d’autres sites : plus de 700 morts au total."]]},
"good-news-kenya":{
 b:"Selon l’accusation, mourir de faim pour « rencontrer Jésus » avant la fin du monde, sur les instructions de Paul Mackenzie.",
 h:[["2019","Fermeture de l’église de Malindi, installation dans la forêt de Shakahola."],["Avril 2023","Découverte des premières fosses."],["2023-2024","Plus de 400 corps exhumés ; autopsies révélant aussi des étranglements."],["2024","Ouverture du procès de Mackenzie et de dizaines de coaccusés."]]},

/* ---------- Religions ---------- */
"christianisme":{
 b:"Le salut offert par Dieu en Jésus-Christ, mort et ressuscité ; l’amour de Dieu et du prochain comme commandement principal ; attente du Royaume de Dieu.",
 l:[{t:"La Bible (Ancien et Nouveau Testament)",d:"Xe s. av. J.-C. – IIe s. apr. J.-C.",desc:"Canon variable selon les Églises (livres deutérocanoniques). Traductions françaises anciennes dans le domaine public : Louis Segond (1910), Lemaistre de Sacy, Crampon (1923).",pd:true},{t:"Symbole de Nicée-Constantinople",d:"325-381",desc:"Profession de foi commune à la plupart des Églises.",pd:true},{t:"Les Confessions",au:"Augustin d’Hippone",d:"397-401",pd:true}],
 e:[{q:"Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu.",s:"Évangile selon Jean 1:1",tr:"Bible Louis Segond (1910)."},{q:"Tu aimeras ton prochain comme toi-même.",s:"Évangile selon Matthieu 22:39",tr:"Bible Louis Segond (1910)."}]},
"protestantisme":{
 b:"Retour à l’Écriture seule (sola scriptura), au salut par la grâce seule et par la foi seule ; sacerdoce universel des croyants.",
 l:[{t:"Les 95 thèses",au:"Martin Luther",d:"1517",pd:true},{t:"Institution de la religion chrétienne",au:"Jean Calvin",d:"1536 (latin), 1541 (français)",pd:true},{t:"Confession d’Augsbourg",d:"1530",pd:true}],
 e:[{q:"Notre Seigneur et Maître Jésus-Christ, en disant : « Faites pénitence », a voulu que la vie entière des fidèles fût une pénitence.",s:"Martin Luther, 95 thèses (1517), thèse 1",tr:"Traduction française courante."}]},
"eglise-catholique":{
 b:"Annoncer l’Évangile et administrer les sept sacrements, dans la communion des évêques avec le pape, successeur de l’apôtre Pierre.",
 l:[{t:"Catéchisme de l’Église catholique",d:"1992",pd:false},{t:"Documents du concile Vatican II",d:"1962-1965",pd:false},{t:"Somme théologique",au:"Thomas d’Aquin",d:"1265-1273",pd:true}],
 h:[["2002","Enquête du Boston Globe sur la dissimulation d’abus dans l’archidiocèse de Boston."],["2009","Rapports Ryan et Murphy en Irlande."],["2018","Rapport du grand jury de Pennsylvanie : plus de 300 prêtres mis en cause."],["2019","Sommet du Vatican sur la protection des mineurs ; motu proprio Vos estis lux mundi."],["Octobre 2021","Rapport de la CIASE (France)."]],
 doc:[{t:"Rapport de la CIASE, « Les violences sexuelles dans l’Église catholique, France 1950-2020 »",desc:"Commission présidée par Jean-Marc Sauvé, octobre 2021."}]},
"islam":{
 b:"Soumission (islam) au Dieu unique ; témoigner de l’unicité de Dieu et de la mission de Mahomet ; pratiquer les cinq piliers (profession de foi, prière, aumône, jeûne du ramadan, pèlerinage à La Mecque).",
 l:[{t:"Le Coran",d:"VIIe s. (compilation sous le calife Uthman, vers 650)",desc:"Traductions françaises anciennes dans le domaine public : Kasimirski (1840), Savary (1783).",pd:true},{t:"Recueils de hadiths (Sahih al-Bukhari, Sahih Muslim)",d:"IXe s.",pd:true},{t:"Sîra (biographie du Prophète) d’Ibn Ishaq",d:"VIIIe s.",pd:true}],
 e:[{q:"Au nom de Dieu clément et miséricordieux. Louange à Dieu, maître de l’univers, le clément, le miséricordieux, souverain au jour de la rétribution. C’est toi que nous adorons, c’est toi dont nous implorons le secours. Dirige-nous dans le sentier droit.",s:"Coran, sourate 1 (Al-Fâtiha), versets 1-6",tr:"D’après la traduction de Kasimirski (1840)."}]},
"soufisme":{
 b:"Se rapprocher de Dieu par la purification du cœur, le souvenir de Dieu (dhikr) et l’accompagnement d’un maître spirituel.",
 l:[{t:"Masnavi",au:"Djalâl al-Dîn Rûmî",d:"XIIIe s.",pd:true},{t:"La Revivification des sciences de la religion (Ihya’)",au:"Al-Ghazâlî",d:"XIe-XIIe s.",pd:true},{t:"Le Langage des oiseaux (Mantiq al-Tayr)",au:"Farîd al-Dîn ‘Attâr",d:"XIIe s.",pd:true}],
 e:[{q:"Écoute la flûte de roseau, comme elle se plaint, comme elle raconte la séparation.",s:"Rûmî, Masnavi, vers d’ouverture",tr:"Traduction libre."}]},
"judaisme":{
 b:"Vivre l’alliance entre Dieu et le peuple d’Israël par l’étude de la Torah et l’observance des commandements (mitsvot).",
 l:[{t:"Tanakh (Bible hébraïque) : Torah, Prophètes, Écrits",d:"Ier millénaire av. J.-C.",desc:"Traduction du rabbinat français (dite Bible Zadoc Kahn, 1899-1906), dans le domaine public.",pd:true},{t:"Mishna",d:"vers 200",pd:true},{t:"Talmud de Babylone",d:"Ve-VIe s.",pd:true},{t:"Mishné Torah",au:"Maïmonide",d:"XIIe s.",pd:true},{t:"Zohar",d:"XIIIe s.",desc:"Texte central de la kabbale.",pd:true}],
 e:[{q:"Écoute, Israël ! l’Éternel, notre Dieu, est le seul Éternel.",s:"Deutéronome 6:4 (Shema Israël)",tr:"Bible Louis Segond (1910)."},{q:"Ce qui t’est odieux, ne le fais pas à ton prochain : c’est là toute la Torah, le reste n’est que commentaire.",s:"Talmud de Babylone, Shabbat 31a (parole attribuée à Hillel)",tr:"Traduction libre."}]},
"hindouisme":{
 b:"Accomplir son dharma (devoir et ordre du monde) et, ultimement, se libérer (moksha) du cycle des renaissances (samsara) régi par le karma, par la connaissance, la dévotion ou l’action désintéressée.",
 l:[{t:"Védas (Rig, Sama, Yajur, Atharva)",d:"vers 1500-500 av. J.-C.",pd:true},{t:"Upanishads",d:"VIIIe s. av. J.-C. et après",pd:true},{t:"Bhagavad-Gita (dans le Mahabharata)",d:"IIe s. av. J.-C. – IIe s. apr. J.-C.",desc:"Traduction française d’Émile Burnouf (1861) dans le domaine public.",pd:true},{t:"Ramayana",au:"Valmiki (tradition)",pd:true},{t:"Lois de Manu (Manusmriti)",d:"IIe s. av. J.-C. – IIIe s. apr. J.-C.",desc:"Texte juridique, critiqué pour sa justification des castes et du statut des femmes.",pd:true}],
 e:[{q:"Tu as droit à l’action seule, jamais à ses fruits. Que le fruit de l’action ne soit pas ton mobile, mais ne t’attache pas non plus à l’inaction.",s:"Bhagavad-Gita 2:47",tr:"Traduction libre du sanskrit."},{q:"Tu es Cela (tat tvam asi).",s:"Chandogya Upanishad 6.8.7",tr:"Grande parole (mahavakya) de l’Advaita."}]},
"bouddhisme":{
 b:"Mettre fin à la souffrance (dukkha) en comprenant les quatre nobles vérités et en suivant le noble chemin octuple jusqu’à l’éveil et au nirvana.",
 l:[{t:"Canon pali (Tipitaka)",d:"Ier s. av. J.-C. (mise par écrit au Sri Lanka)",pd:true},{t:"Dhammapada",desc:"423 versets de sagesse, très traduits.",pd:true},{t:"Sutra du Lotus",d:"Ier-IIe s.",pd:true},{t:"Sutra du Cœur",pd:true},{t:"Bardo Thödol (« Livre des morts tibétain »)",d:"XIVe s.",pd:true}],
 e:[{q:"Les phénomènes ont l’esprit pour guide, l’esprit pour maître, ils sont faits par l’esprit. Si l’on parle ou agit avec un esprit pur, le bonheur suit, comme l’ombre qui ne quitte pas.",s:"Dhammapada, verset 2",tr:"Traduction libre du pali."},{q:"La forme est vide, la vacuité est forme.",s:"Sutra du Cœur",tr:"Traduction libre."}]},
"sikhisme":{
 b:"Se souvenir constamment du Dieu unique (nam simran), gagner sa vie honnêtement (kirat karni) et partager (vand chakna) ; égalité de tous les humains, sans castes.",
 l:[{t:"Guru Granth Sahib",d:"1604 (Adi Granth), forme finale en 1708",desc:"Écriture et « gourou éternel » des sikhs.",pd:true},{t:"Dasam Granth",d:"XVIIIe s.",pd:true}],
 e:[{q:"Il n’y a qu’un Être, Vérité est son nom. Créateur, sans peur, sans haine, intemporel, non né, existant par lui-même, connu par la grâce du Guru.",s:"Mul Mantar, ouverture du Guru Granth Sahib",tr:"Traduction libre du gurmukhi."}],
 h:[["1984","Opération Blue Star contre le Temple d’or d’Amritsar, puis assassinat d’Indira Gandhi et massacres anti-sikhs à Delhi (des milliers de morts)."]]},
"jainisme":{
 b:"Libérer l’âme (jiva) de la matière karmique par la non-violence absolue (ahimsa), la vérité, l’ascèse et le non-attachement.",
 l:[{t:"Agamas (Acaranga Sutra, Kalpa Sutra)",d:"IIIe s. av. J.-C. – Ve s.",pd:true},{t:"Tattvartha Sutra",au:"Umasvati",d:"IIe-Ve s.",desc:"Reconnu par toutes les branches.",pd:true}],
 e:[{q:"Tous les êtres aiment la vie, aiment le plaisir et haïssent la douleur ; nul ne doit tuer, maltraiter ni opprimer aucun être vivant.",s:"Acaranga Sutra, I, 2, 3",tr:"Traduction libre."}]},
"taoisme":{
 b:"S’accorder au Tao, principe ineffable de toutes choses, par la simplicité, le non-agir (wu wei) et, dans le taoïsme religieux, par des rites et des pratiques de longévité.",
 l:[{t:"Tao Te King (Daodejing)",au:"Laozi (attribution)",d:"IVe s. av. J.-C.",desc:"Traduction française de Stanislas Julien (1842) dans le domaine public.",pd:true},{t:"Zhuangzi",d:"IVe-IIIe s. av. J.-C.",pd:true},{t:"Canon taoïste (Daozang)",d:"compilé en 1445",pd:true}],
 e:[{q:"La voie qui peut être dite n’est pas la Voie éternelle ; le nom qui peut être nommé n’est pas le Nom éternel.",s:"Tao Te King, chapitre 1",tr:"Traduction libre."}]},
"confucianisme":{
 b:"Harmoniser la société par la vertu d’humanité (ren), les rites (li), la piété filiale et le gouvernement par l’exemple moral.",
 l:[{t:"Entretiens (Lunyu)",au:"Disciples de Confucius",d:"Ve-IVe s. av. J.-C.",pd:true},{t:"Mencius",pd:true},{t:"Les Cinq Classiques (Yijing, Shijing, Shujing, Liji, Chunqiu)",pd:true}],
 e:[{q:"Ce que tu ne désires pas pour toi-même, ne l’impose pas aux autres.",s:"Entretiens de Confucius, XV, 24",tr:"Traduction libre."}]},
"shinto":{
 b:"Vénérer les kami (divinités, ancêtres, forces de la nature) par la pureté rituelle, les offrandes et les fêtes (matsuri) des sanctuaires.",
 l:[{t:"Kojiki",d:"712",desc:"Chronique des mythes et de la lignée impériale.",pd:true},{t:"Nihon shoki",d:"720",pd:true},{t:"Engishiki",d:"927",desc:"Prescriptions rituelles.",pd:true}]},
"zoroastrisme":{
 b:"Choisir le bien (Ahura Mazda) contre le mal (Angra Mainyu) par les bonnes pensées, les bonnes paroles et les bonnes actions, jusqu’à la rénovation finale du monde.",
 l:[{t:"Avesta (dont les Gathas attribuées à Zarathoustra)",pd:true},{t:"Bundahishn",d:"IXe s.",pd:true}],
 e:[{q:"Humata, hukhta, hvarshta : bonnes pensées, bonnes paroles, bonnes actions.",s:"Formule avestique"}]},
"bahai":{
 b:"Unité de Dieu, unité des religions et unité de l’humanité ; égalité des femmes et des hommes, harmonie de la science et de la religion, gouvernement mondial.",
 l:[{t:"Kitáb-i-Aqdas (le Très-Saint Livre)",au:"Bahá’u’lláh",d:"1873",pd:true},{t:"Kitáb-i-Íqán (Livre de la certitude)",au:"Bahá’u’lláh",d:"1862",pd:true}],
 e:[{q:"La terre n’est qu’un seul pays, et l’humanité en est les citoyens.",s:"Bahá’u’lláh, Tablettes",tr:"Traduction libre."}],
 h:[["1850","Exécution du Báb à Tabriz."],["1853-1868","Exil de Bahá’u’lláh à Bagdad, Constantinople, Andrinople puis Acre."],["1979-1998","Plus de 200 bahá’ís exécutés en Iran après la révolution ; exclusion de l’université."],["2008","Arrestation des sept membres de la direction informelle iranienne (Yaran)."]]},
"yezidisme":{
 b:"Vénérer un Dieu unique et ses sept anges, dont Melek Taous (l’Ange-Paon) ; tradition orale transmise par des castes religieuses ; pèlerinage à Lalish.",
 l:[{t:"Hymnes (qewl)",desc:"Tradition essentiellement orale.",pd:true}],
 h:[["Août 2014","L’État islamique attaque le Sinjar : massacres d’hommes, réduction en esclavage de milliers de femmes et d’enfants."],["2016","La commission d’enquête de l’ONU sur la Syrie qualifie ces crimes de génocide (« They came to destroy »)."]],
 doc:[{t:"« They came to destroy: ISIS Crimes Against the Yazidis » (ONU, juin 2016)",desc:"Rapport de la commission d’enquête internationale indépendante sur la Syrie."}]},
"spiritisme":{
 b:"Prouver la survie de l’âme et la communication avec les esprits des morts ; progrès moral de l’esprit à travers des réincarnations successives.",
 l:[{t:"Le Livre des Esprits",au:"Allan Kardec",d:"1857",pd:true},{t:"Le Livre des médiums",au:"Allan Kardec",d:"1861",pd:true},{t:"L’Évangile selon le spiritisme",au:"Allan Kardec",d:"1864",pd:true}],
 e:[{q:"Qu’est-ce que Dieu ? Dieu est l’intelligence suprême, cause première de toutes choses.",s:"Allan Kardec, Le Livre des Esprits (1857), question 1"}]},
"christian-science":{
 b:"Démontrer la guérison spirituelle par la prière, la matière et la maladie étant considérées comme des illusions de la pensée mortelle.",
 l:[{t:"Science et santé avec la clef des Écritures",au:"Mary Baker Eddy",d:"1875",pd:true}],
 h:[["1879","Fondation à Boston."],["1908","Création du Christian Science Monitor."],["1980-1990","Poursuites aux États-Unis pour la mort d’enfants non soignés (affaire Twitchell, Massachusetts, 1990, condamnation annulée en appel)."]]},
"rastafari":{
 b:"Reconnaître Haïlé Sélassié Ier comme incarnation divine (Jah), retourner spirituellement ou physiquement en Afrique (Sion) et rejeter « Babylone », le système oppresseur.",
 l:[{t:"La Bible (version du roi Jacques)",pd:true},{t:"Kebra Nagast",d:"XIVe s.",desc:"Épopée éthiopienne de la reine de Saba et de Ménélik.",pd:true},{t:"The Promised Key",au:"Leonard Howell",d:"vers 1935",pd:false}],
 h:[["1930","Couronnement de Haïlé Sélassié."],["1963","Événement de Coral Gardens : répression des rastas en Jamaïque."],["1966","Visite de Haïlé Sélassié en Jamaïque."]]},
"wicca":{
 b:"Célébrer la Déesse et le Dieu cornu, les cycles de la nature (huit sabbats) et pratiquer la magie dans le respect de la « Rede » : « Fais ce que tu veux, si cela ne nuit à personne ».",
 l:[{t:"Witchcraft Today",au:"Gerald Gardner",d:"1954",pd:false},{t:"Livre des Ombres",desc:"Recueil rituel propre à chaque coven.",pd:false}]}
};

/* Emblèmes : symbole par famille (racine de l’arborescence) */
window.EMBLEMS = {
 "fm":"compass","rosecroix":"rosecross","hermetisme":"hexagram","martinisme":"hexagram","esoterisme-autres":"eye","s-pol":"dagger","s-elite":"table","s-etud":"skull","s-frat":"chain","s-ord":"cross-patty","s-crim":"rose","s-trad":"mask",
 "m-chr":"cross","m-hin":"om","m-bou":"wheel","m-eso":"star","m-isl":"crescent","m-dp":"spiral",
 "christianisme":"cross","islam":"crescent","judaisme":"david","hindouisme":"om","bouddhisme":"wheel","sikhisme":"khanda","jainisme":"hand","rel-chinoises":"yinyang","rel-japonaises":"torii","rel-proche-orient":"flame","rel-traditionnelles":"spiral","nouveaux-courants":"pentagram"
};
