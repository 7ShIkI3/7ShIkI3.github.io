/* Articles développés — sociétés secrètes et ordres initiatiques, lot 1
   Format : window.ORG_ARTICLES[id] = {
     intro  : chapeau (1 paragraphe)
     but    : [paragraphes] but et objectifs
     doc    : [paragraphes] doctrine, enseignements et fonctionnement
     hist   : [paragraphes] histoire
     contro : [{k:"fait"|"acc"|"mythe", t:"paragraphe"}]  fait = documenté ; acc = accusation attribuée ; mythe = théorie sans preuve
     lire   : [références bibliographiques]
   } */
window.ORG_ARTICLES = Object.assign(window.ORG_ARTICLES || {}, {

"fm":{
 intro:"La franc-maçonnerie est une association fraternelle et initiatique née en Grande-Bretagne au début du XVIIIe siècle. Elle réunit ses membres en « loges » où l’on pratique des rituels symboliques empruntés au métier de bâtisseur. Elle compte aujourd’hui plusieurs millions de membres dans le monde, répartis entre des centaines d’« obédiences » indépendantes qui ne partagent ni la même doctrine ni la même conception de la religion.",
 but:[
  "Le but affiché de la franc-maçonnerie est le perfectionnement moral de ses membres. L’image centrale est celle de la « pierre brute » que l’apprenti doit tailler pour en faire une « pierre cubique » capable de s’ajuster aux autres dans la construction d’un édifice commun. Le maçon travaille d’abord sur lui-même : maîtrise de soi, réflexion, tolérance, sens du devoir.",
  "Le deuxième objectif est la fraternité. La loge doit réunir des personnes qui, dans la vie ordinaire, ne se seraient pas rencontrées : les Constitutions d’Anderson (1723) parlent d’un « centre d’union » entre hommes de religions et de conditions différentes. Cette fraternité se traduit aussi par l’entraide entre membres et par des œuvres de bienfaisance, très développées dans le monde anglo-saxon (hôpitaux, orphelinats, bourses).",
  "Le troisième objectif dépend des obédiences. La maçonnerie dite « régulière », groupée autour de la Grande Loge unie d’Angleterre, interdit en loge les débats politiques et religieux et exige la croyance en un Être suprême. La maçonnerie dite « libérale » ou « adogmatique », représentée par le Grand Orient de France, revendique au contraire la liberté absolue de conscience et réfléchit aux questions de société (laïcité, bioéthique, droits sociaux), qu’elle transmet parfois au débat public sous forme de propositions."
 ],
 doc:[
  "La franc-maçonnerie n’a pas de dogme commun ni de texte sacré propre. Elle transmet un enseignement par symboles : l’équerre (la rectitude), le compas (la mesure), le niveau (l’égalité), le fil à plomb (la droiture). Chaque symbole est interprété librement par chaque membre, ce qui explique la grande diversité des lectures, chrétiennes, déistes, rationalistes ou ésotériques.",
  "Le parcours commence par trois grades « symboliques » : apprenti, compagnon et maître. Le grade de maître repose sur la légende d’Hiram, architecte du Temple de Salomon, tué par trois compagnons qui voulaient lui arracher le secret du maître ; le récit met en scène une mort et une renaissance symboliques. Au-delà, des « rites » comme le Rite écossais ancien et accepté (33 degrés), le Rite français ou le Rite écossais rectifié proposent des grades supplémentaires, appelés hauts grades.",
  "La vie d’une loge suit un calendrier régulier : « tenues » rituelles, initiations, « planches » (exposés d’un membre suivis d’une discussion), puis repas fraternel, les « agapes ». Les loges sont dirigées par un Vénérable maître élu, et les obédiences par un Grand Maître élu lui aussi. Le secret porte sur les rituels et les signes de reconnaissance ; les sièges, les statuts et les dirigeants des grandes obédiences sont publics."
 ],
 hist:[
  "Les historiens rattachent la franc-maçonnerie aux loges de maçons de métier d’Écosse et d’Angleterre. Au XVIIe siècle, ces loges accueillent des membres étrangers au métier, appelés « acceptés », comme l’antiquaire Elias Ashmole, reçu en 1646. Le 24 juin 1717, quatre loges de Londres forment la première Grande Loge ; ses Constitutions sont publiées en 1723 par le pasteur James Anderson.",
  "Au XVIIIe siècle, la maçonnerie se diffuse très vite en Europe et dans les colonies. Elle devient un lieu de sociabilité des Lumières, fréquenté par des nobles, des bourgeois, des officiers et des savants. Montesquieu, Voltaire (initié en 1778), Mozart, Benjamin Franklin ou George Washington en ont été membres. Le Grand Orient de France est fondé en 1773.",
  "Au XIXe siècle, les chemins se séparent. En 1877, le Grand Orient de France supprime l’obligation de croire en Dieu ; la Grande Loge unie d’Angleterre rompt alors ses relations avec lui, et ce clivage structure encore le monde maçonnique. En France, de nombreux maçons jouent un rôle dans les lois scolaires et dans la loi de séparation des Églises et de l’État de 1905. La maçonnerie s’ouvre ensuite aux femmes, avec l’ordre mixte du Droit humain (1893) et la Grande Loge féminine de France (1945-1952).",
  "Au XXe siècle, plusieurs régimes autoritaires interdisent les loges, saisissent leurs archives et persécutent leurs membres, en Italie, en Espagne, au Portugal et en France sous le régime de Vichy. Depuis la seconde moitié du siècle, les effectifs baissent dans les pays anglo-saxons et progressent en France, en Afrique et en Amérique latine."
 ],
 contro:[
  {k:"fait",t:"L’Église catholique condamne l’appartenance à la franc-maçonnerie depuis la bulle In eminenti de Clément XII (1738). La Congrégation pour la doctrine de la foi a rappelé en 1983, puis en 2023, que cette appartenance reste incompatible avec la foi catholique."},
  {k:"fait",t:"Des affaires réelles ont mis en cause des réseaux d’influence liés à des loges : la loge P2 en Italie, découverte en 1981, ou des affaires de corruption locale en France dans les années 1990-2000, qui ont conduit certaines obédiences à renforcer leurs règles internes. Ces affaires concernent des individus ou des loges précises, pas la maçonnerie dans son ensemble."},
  {k:"acc",t:"On reproche régulièrement aux francs-maçons un manque de transparence, notamment dans la police, la justice ou la politique, où certains pays (Royaume-Uni, Italie) ont débattu d’une déclaration obligatoire d’appartenance. Les obédiences répondent que l’appartenance relève de la liberté d’association et de la vie privée."},
  {k:"mythe",t:"L’idée d’un complot maçonnique mondial remonte à l’abbé Barruel, qui accusa en 1797 les loges d’avoir organisé la Révolution française. Elle a ensuite été reprise par la propagande antisémite, qui inventa le thème de la « judéo-maçonnerie ». Les historiens n’ont jamais trouvé de direction mondiale unique : les obédiences sont souvent rivales et ne se reconnaissent pas toutes entre elles."}
 ],
 lire:["Pierre-Yves Beaurepaire, L’Europe des francs-maçons (XVIIIe-XXIe siècles), Belin, 2002.","Roger Dachez, Histoire de la franc-maçonnerie française, PUF, Que sais-je ?, 2003.","David Stevenson, The Origins of Freemasonry: Scotland’s Century, 1590-1710, Cambridge University Press, 1988."]
},

"rosecroix":{
 intro:"Le rosicrucianisme est un courant mystique et ésotérique né en Allemagne au début du XVIIe siècle avec trois textes anonymes, les « manifestes rose-croix ». Ils annonçaient l’existence d’une fraternité secrète de sages. Aucune trace d’une telle organisation n’a été trouvée à l’époque, mais le mythe a inspiré de nombreux groupes réels du XVIIIe siècle à nos jours.",
 but:[
  "Les manifestes présentent la fraternité comme un groupe de savants chrétiens chargé de préparer une « réforme générale » du monde. Il s’agissait de réconcilier la foi et la connaissance de la nature, de guérir les malades gratuitement et de transmettre une sagesse cachée aux personnes jugées dignes.",
  "Pour les organisations rosicruciennes modernes, le but est plus personnel : chercher l’éveil spirituel par l’étude et la méditation, et comprendre les lois de la nature et de l’esprit. La rose posée au centre d’une croix symbolise cette idée : l’épanouissement de l’âme, la rose, au cœur de l’existence matérielle et de l’épreuve, la croix."
 ],
 doc:[
  "Le rosicrucianisme mélange plusieurs sources : la mystique chrétienne luthérienne, l’alchimie, l’hermétisme (les textes attribués à Hermès Trismégiste), la kabbale chrétienne et la médecine de Paracelse. L’alchimie y est surtout comprise comme une transformation intérieure de l’homme plus que comme la fabrication d’or.",
  "La Fama Fraternitatis raconte la vie légendaire de Christian Rosenkreutz, né en 1378, qui aurait appris la sagesse en Orient puis fondé la fraternité. Son tombeau, découvert intact cent vingt ans après sa mort, aurait été le signal du réveil de l’ordre. Les Noces chymiques (1616) sont un roman allégorique de sept jours, lu comme un récit d’initiation alchimique.",
  "Les groupes modernes enseignent en général par degrés successifs, avec des leçons écrites, des exercices de méditation et des rituels. Ils ne forment pas une organisation unique : AMORC, Rosicrucian Fellowship, Lectorium Rosicrucianum ou les sociétés rosicruciennes maçonniques ont des doctrines et des structures très différentes."
 ],
 hist:[
  "La Fama Fraternitatis paraît à Cassel en 1614, la Confessio Fraternitatis en 1615 et les Noces chymiques de Christian Rosenkreutz en 1616. Les historiens les attribuent au cercle de théologiens luthériens de Tübingen autour de Johann Valentin Andreae, qui reconnut avoir écrit les Noces chymiques et les présenta plus tard comme un « jeu » (ludibrium).",
  "Les manifestes provoquent une avalanche de livres en Europe : des centaines d’auteurs demandent à être admis dans la fraternité ou la dénoncent. En 1623, des affiches parisiennes annoncent la présence des rose-croix dans la ville et créent une petite panique. Descartes, soupçonné d’en faire partie, s’en défendit.",
  "Au XVIIIe siècle apparaissent des groupes réels qui reprennent le nom, comme la Rose-Croix d’or en Allemagne, et des grades rose-croix dans la franc-maçonnerie. Le XIXe et le XXe siècles voient naître de nombreuses organisations : la Societas Rosicruciana in Anglia (1866), l’Ordre kabbalistique de la Rose-Croix en France (1888), l’AMORC (1915), la Rosicrucian Fellowship (1909) et le Lectorium Rosicrucianum (1935)."
 ],
 contro:[
  {k:"fait",t:"Aucun document n’atteste l’existence d’une fraternité rose-croix organisée au XVIIe siècle. Christian Rosenkreutz est considéré par les historiens comme un personnage littéraire."},
  {k:"acc",t:"Certaines organisations rosicruciennes modernes ont été critiquées pour leurs méthodes de recrutement ou leur coût, et quelques-unes figuraient dans le rapport parlementaire français de 1995 sur les sectes. Ce rapport n’avait pas de valeur juridique et sa liste a été abandonnée par le gouvernement en 2005."},
  {k:"mythe",t:"Plusieurs organisations affirment descendre d’une tradition ininterrompue venue de l’Égypte des pharaons ou du Moyen Âge. Les historiens considèrent ces filiations comme des récits fondateurs symboliques, sans preuve documentaire."}
 ],
 lire:["Frances Yates, La Lumière des Rose-Croix, Retz, 1978 (éd. originale 1972).","Roland Edighoffer, Les Rose-Croix, PUF, Que sais-je ?, 1982.","Antoine Faivre, L’Ésotérisme, PUF, Que sais-je ?."]
},

"amorc":{
 intro:"L’Ancien et mystique ordre de la Rose-Croix (AMORC) est une organisation rosicrucienne fondée à New York en 1915 par Harvey Spencer Lewis. Elle se présente comme une école philosophique et initiatique, non religieuse, qui enseigne par correspondance et dans des loges. C’est l’une des organisations ésotériques les plus connues dans le monde francophone.",
 but:[
  "L’AMORC dit vouloir aider ses membres à « développer leurs facultés latentes » et à mieux comprendre les lois de l’univers, de la nature et de la conscience. Elle met en avant la santé, l’harmonie intérieure et la maîtrise de soi.",
  "L’ordre insiste sur le fait qu’il n’est pas une religion : ses membres peuvent appartenir à n’importe quelle confession ou à aucune. Il se décrit comme une tradition de sagesse transmise de manière progressive, chacun avançant à son rythme."
 ],
 doc:[
  "L’enseignement est organisé en « monographies », des leçons envoyées régulièrement aux membres, qui forment une progression en degrés. On y trouve des exercices de concentration, de visualisation et de respiration, des notions de métaphysique, d’alchimie spirituelle, de symbolisme et d’histoire des traditions.",
  "L’AMORC propose aussi des rituels en loge, des conférences et des « convocations ». Il est dirigé par un Imperator et divisé en Grandes Loges par grandes zones linguistiques ; la Grande Loge francophone a son siège au château d’Omonville, dans l’Eure. Le siège mondial est à San José, en Californie, où l’ordre gère aussi le Musée égyptien rosicrucien."
 ],
 hist:[
  "Harvey Spencer Lewis, publicitaire new-yorkais, fonde l’ordre en 1915 en affirmant avoir reçu une charte d’initiés rosicruciens en France. Il développe un enseignement par correspondance diffusé par des publicités dans les magazines, une méthode très moderne pour l’époque. Son fils Ralph Lewis lui succède en 1939.",
  "L’ordre s’implante en France après la Seconde Guerre mondiale. En 1990, une crise interne éclate : l’Imperator Gary Stewart est écarté et remplacé par le Français Christian Bernard, qui dirige l’ordre jusqu’en 2019 ; Claudio Mazzucco lui succède. Plusieurs groupes dissidents se sont formés à cette occasion."
 ],
 contro:[
  {k:"fait",t:"L’AMORC figurait dans la liste du rapport de la commission d’enquête de l’Assemblée nationale sur les sectes (1995). Cette liste a été critiquée et abandonnée par le gouvernement en 2005 ; l’ordre n’a pas fait l’objet de condamnation pénale en France à ce titre."},
  {k:"acc",t:"Des anciens membres et des associations de vigilance ont critiqué le coût de l’abonnement sur plusieurs décennies et le caractère invérifiable de certains enseignements. L’ordre répond que l’adhésion est libre et peut être interrompue à tout moment."},
  {k:"mythe",t:"L’AMORC présente une « histoire traditionnelle » qui fait remonter son origine aux écoles de mystères de l’Égypte ancienne, au pharaon Akhenaton notamment. L’ordre précise lui-même qu’il s’agit d’une tradition et non d’une histoire documentée."}
 ],
 lire:["Massimo Introvigne, Les Rose-Croix, Brepols, 1996.","Rapport de l’Assemblée nationale n° 2468, Les sectes en France, 1995.","Site officiel de l’AMORC francophone (présentation de l’ordre par lui-même)."]
},

"golden-dawn":{
 intro:"L’Ordre hermétique de l’Aube dorée (Hermetic Order of the Golden Dawn) est une société initiatique fondée à Londres en 1888. En une quinzaine d’années d’existence, elle a créé un système de rituels et d’enseignements magiques qui a influencé presque tout l’occultisme du XXe siècle, de la Wicca au tarot moderne.",
 but:[
  "Le but de la Golden Dawn était de conduire ses membres vers une transformation spirituelle par l’étude et la pratique de la « magie cérémonielle ». Dans son vocabulaire, la magie désigne un travail de volonté et d’imagination destiné à élever la conscience vers le divin, ce que l’ordre appelait le « Grand Œuvre ».",
  "L’ordre voulait aussi rassembler et organiser en un seul système les traditions ésotériques occidentales : kabbale, astrologie, alchimie, tarot, symboles égyptiens et rosicruciens. Il se voulait une école plus qu’une religion."
 ],
 doc:[
  "L’enseignement suit l’« Arbre de vie » de la kabbale : chaque grade correspond à une des dix sphères (sephiroth). Le « premier ordre » enseignait la théorie et le symbolisme ; le « second ordre », appelé Rosae Rubeae et Aureae Crucis, réservé aux membres avancés, enseignait la pratique rituelle.",
  "Les membres apprenaient les correspondances entre planètes, éléments, lettres hébraïques et cartes du tarot, les rituels de protection comme le « rituel mineur du pentagramme », la méditation et la visualisation. L’ordre admettait les femmes à égalité avec les hommes, ce qui était rare à l’époque."
 ],
 hist:[
  "L’ordre est fondé en 1888 par trois membres de la Societas Rosicruciana in Anglia : William Wynn Westcott, médecin légiste, Samuel Liddell MacGregor Mathers et William Robert Woodman. Westcott affirme avoir reçu ses rituels d’un manuscrit chiffré et d’une adepte allemande, « Fräulein Sprengel », dont l’existence n’a jamais été prouvée.",
  "Parmi ses membres figurent le poète irlandais W. B. Yeats, futur prix Nobel, l’écrivain Arthur Machen, l’actrice Florence Farr, Moina Mathers et, à partir de 1898, Aleister Crowley. Entre 1900 et 1903, des conflits sur l’autorité de Mathers et l’admission de Crowley font éclater l’ordre en plusieurs groupes, dont la Stella Matutina et l’Alpha et Oméga.",
  "En 1937-1940, Israel Regardie publie l’essentiel des rituels, rendant public ce qui était secret. Des ordres modernes reprennent depuis le nom de Golden Dawn, sans continuité organisationnelle avec l’ordre d’origine."
 ],
 contro:[
  {k:"fait",t:"Les documents censés prouver une filiation avec une ancienne fraternité allemande sont considérés par les historiens comme ayant été fabriqués ou embellis par Westcott. L’ordre est donc une création de la fin du XIXe siècle."},
  {k:"fait",t:"L’ordre a connu de violents conflits internes : en 1900, les membres londoniens refusent l’initiation de Crowley, Mathers les soutient puis les exclut, et une bataille juridique et personnelle s’ensuit."},
  {k:"mythe",t:"La Golden Dawn est souvent décrite dans la fiction comme une société aux pouvoirs surnaturels ou liée à des complots politiques. Les archives montrent un petit groupe d’intellectuels et d’artistes victoriens, d’une centaine de membres actifs au plus."}
 ],
 lire:["Ellic Howe, The Magicians of the Golden Dawn, Routledge, 1972.","Israel Regardie, The Golden Dawn, 1937-1940 (rituels publiés).","Nevill Drury, Histoire de la magie au XXe siècle."]
},

"martinisme":{
 intro:"Le martinisme est un courant de mystique chrétienne né en France au XVIIIe siècle. Il tire son nom de deux hommes, Martinès de Pasqually et son disciple Louis-Claude de Saint-Martin, dit « le Philosophe inconnu ». Il a donné naissance à plusieurs ordres initiatiques, dont l’Ordre martiniste fondé par Papus en 1887.",
 but:[
  "Le but du martinisme est la « réintégration » : selon sa doctrine, l’homme a perdu son état spirituel originel par la chute, et il doit retrouver son union avec Dieu. L’initié cherche à se purifier et à redevenir ce qu’il était à l’origine.",
  "Pour Saint-Martin, ce chemin passe par la prière intérieure, la méditation et la vie morale, ce qu’il appelle la « voie du cœur ». Les ordres martinistes actuels mettent l’accent sur cette quête personnelle et sur l’étude des textes mystiques, dans le respect de la foi chrétienne."
 ],
 doc:[
  "Martinès de Pasqually enseignait une doctrine originale exposée dans son Traité de la réintégration des êtres : avant la chute, l’homme était un être spirituel doté de pouvoirs, chargé de surveiller les esprits déchus. Pour se rapprocher de Dieu, il pratiquait une « théurgie », des opérations rituelles destinées à entrer en contact avec des esprits bénéfiques.",
  "Saint-Martin abandonna ces opérations rituelles pour une mystique intérieure, influencée par le théosophe allemand Jacob Böhme, qu’il traduisit. Les ordres martinistes conservent une initiation simple, à trois degrés, transmise de personne à personne. Leurs symboles sont le masque, le manteau et le cordon, qui signifient l’humilité et le silence de l’initié."
 ],
 hist:[
  "Martinès de Pasqually fonde vers 1754-1761 l’Ordre des chevaliers maçons élus coëns de l’Univers, une société maçonnique pratiquant la théurgie. Il meurt à Saint-Domingue en 1774. Son disciple Saint-Martin (1743-1803) publie Des erreurs et de la vérité (1775) et devient un auteur mystique lu dans toute l’Europe. Un autre disciple, Jean-Baptiste Willermoz, intègre une partie de la doctrine dans le Rite écossais rectifié.",
  "En 1887-1891, le médecin Gérard Encausse, dit Papus, et Augustin Chaboseau fondent l’Ordre martiniste, très actif dans l’occultisme parisien de la Belle Époque. Après la mort de Papus en 1916, l’ordre se divise. Il existe aujourd’hui plusieurs ordres indépendants, comme l’Ordre martiniste traditionnel, lié à l’AMORC, ou l’Ordre martiniste des Élus coëns."
 ],
 contro:[
  {k:"fait",t:"La continuité entre Saint-Martin et les ordres fondés par Papus est discutée : Saint-Martin n’a fondé aucun ordre. La transmission revendiquée par Papus repose sur des initiations individuelles difficiles à vérifier."},
  {k:"acc",t:"L’Église catholique a critiqué l’occultisme de la fin du XIXe siècle, dont Papus était une figure, et les ordres martinistes ont été visés par les mêmes condamnations que la franc-maçonnerie dans certains pays."},
  {k:"mythe",t:"Au début du XXe siècle, Papus fut accusé d’exercer une influence occulte à la cour du tsar Nicolas II, qu’il rencontra. Les historiens jugent cette influence très exagérée : son rôle fut surtout celui d’un conseiller spirituel parmi d’autres."}
 ],
 lire:["Robert Amadou, Le Martinisme, 1979.","Louis-Claude de Saint-Martin, Des erreurs et de la vérité (1775), domaine public.","Martinès de Pasqually, Traité de la réintégration des êtres (XVIIIe s.), domaine public."]
},

"theosophie":{
 intro:"La Société théosophique est fondée à New York en 1875 par Helena Petrovna Blavatsky, Henry Steel Olcott et William Quan Judge. Elle a joué un rôle majeur dans la diffusion des idées religieuses indiennes en Occident et dans la naissance du New Age. Son siège international est à Adyar, en Inde, depuis 1882.",
 but:[
  "La Société a fixé trois buts officiels. Le premier est de former un « noyau de la fraternité universelle de l’humanité, sans distinction de race, de croyance, de sexe, de caste ou de couleur ». Le deuxième est d’encourager l’étude comparée des religions, de la philosophie et de la science. Le troisième est d’étudier les lois inexpliquées de la nature et les pouvoirs latents de l’être humain.",
  "Sa devise est « Il n’y a pas de religion supérieure à la vérité ». La Société n’impose pas de croyance à ses membres : elle se veut un lieu de recherche commun à toutes les traditions."
 ],
 doc:[
  "Dans ses livres, surtout La Doctrine secrète (1888), Blavatsky expose une vaste synthèse : toutes les religions auraient pour source une même « sagesse antique ». Elle reprend des notions indiennes comme le karma et la réincarnation, et décrit une évolution de l’univers et de l’humanité en grands cycles.",
  "Blavatsky affirmait recevoir ses enseignements de « Mahatmas » ou « Maîtres », des sages vivant au Tibet. Après elle, Annie Besant et Charles Leadbeater développent une théosophie plus tournée vers l’attente d’un futur « Instructeur du monde »."
 ],
 hist:[
  "Après sa fondation à New York, la Société s’installe en Inde en 1879, puis à Adyar, près de Madras (Chennai), en 1882. Olcott soutient alors le renouveau du bouddhisme à Ceylan (Sri Lanka) et rédige un Catéchisme bouddhiste. Plusieurs membres participent aussi aux débuts du nationalisme indien : Annie Besant présida le Congrès national indien en 1917.",
  "En 1895, la section américaine se sépare sous la direction de Judge. En 1909, Leadbeater présente le jeune Indien Jiddu Krishnamurti comme le futur « Instructeur du monde » ; Krishnamurti refuse ce rôle en 1929 et dissout l’ordre créé pour lui. En 1913, Rudolf Steiner quitte la section allemande et fonde l’anthroposophie.",
  "La Société existe toujours, avec plusieurs branches indépendantes. Son influence a dépassé ses effectifs : artistes comme Kandinsky et Mondrian, écrivains, et la plupart des courants spirituels du XXe siècle lui doivent des idées."
 ],
 contro:[
  {k:"fait",t:"En 1885, un rapport de Richard Hodgson pour la Society for Psychical Research accuse Blavatsky d’avoir produit frauduleusement des lettres et phénomènes attribués aux Mahatmas. En 1986, la même société a publié un article critiquant la méthode de ce rapport ; le débat reste ouvert."},
  {k:"fait",t:"Des chercheurs ont montré que de nombreux passages des livres de Blavatsky reprennent sans le dire des ouvrages d’orientalistes et d’occultistes de son époque."},
  {k:"acc",t:"Charles Leadbeater a été accusé à plusieurs reprises, à partir de 1906, de comportements inappropriés envers de jeunes garçons qu’il encadrait. Il démissionna en 1906 puis fut réintégré, ce qui divisa la Société."},
  {k:"fait",t:"La théorie des « races-racines » de Blavatsky, une classification spéculative de l’humanité, a ensuite été détournée par des mouvements racistes. La Société a toujours affirmé la fraternité universelle comme premier but."}
 ],
 lire:["Helena P. Blavatsky, La Doctrine secrète (1888), domaine public.","Peter Washington, Le Baboon de Madame Blavatsky, 1993.","Bruce F. Campbell, Ancient Wisdom Revived: A History of the Theosophical Movement, 1980."]
},

"illuminati":{
 intro:"Les Illuminés de Bavière (Illuminatenorden) sont une société secrète fondée le 1er mai 1776 à Ingolstadt par Adam Weishaupt, professeur de droit canon. Elle voulait diffuser les idées des Lumières dans une Bavière très catholique et conservatrice. Interdite dès 1784-1785, elle disparaît rapidement, mais son nom a nourri depuis plus de deux siècles d’innombrables théories du complot.",
 but:[
  "Le but de Weishaupt était de former une élite éclairée capable de combattre la superstition, l’influence de l’Église sur l’enseignement et les abus du pouvoir. Il voulait faire progresser la raison, la morale et l’égalité par l’éducation de ses membres.",
  "À long terme, les textes de l’ordre envisageaient un monde où les princes et les États deviendraient inutiles parce que les hommes seraient devenus raisonnables et vertueux. Ce projet était utopique et n’a jamais été mis en œuvre ; l’ordre comptait au maximum environ deux mille membres."
 ],
 doc:[
  "L’ordre était organisé sur le modèle des Jésuites, que Weishaupt connaissait bien, et de la franc-maçonnerie. Les membres prenaient des pseudonymes tirés de l’Antiquité : Weishaupt s’appelait « Spartacus ». Ils devaient lire des auteurs des Lumières, rédiger des rapports sur eux-mêmes et sur leurs lectures, et obéir à leurs supérieurs.",
  "La hiérarchie comprenait plusieurs classes, du « Minerval » aux grades supérieurs. Sous l’influence du baron Adolph Knigge, qui le rejoint en 1780, l’ordre adopte des grades maçonniques et recrute surtout dans les loges. Il attire des fonctionnaires, des professeurs et des nobles, et quelques figures célèbres comme Goethe ou le philosophe Herder, dont le rôle reste mal connu."
 ],
 hist:[
  "Fondé en 1776 avec quelques étudiants, l’ordre se développe surtout entre 1780 et 1784 grâce à Knigge, puis se divise quand celui-ci s’oppose à Weishaupt et part en 1784.",
  "L’électeur de Bavière, Charles-Théodore, interdit toutes les sociétés secrètes non autorisées en 1784, puis vise directement les Illuminés en 1785. En 1786-1787, le gouvernement publie des documents saisis chez des membres pour démontrer leur dangerosité. Weishaupt s’enfuit à Gotha, où il vit jusqu’à sa mort en 1830. L’ordre cesse alors d’exister.",
  "En 1797, l’abbé Augustin Barruel et le physicien écossais John Robison affirment séparément que les Illuminés ont survécu et provoqué la Révolution française. Ce récit, sans fondement, est à l’origine du mythe moderne des « Illuminati »."
 ],
 contro:[
  {k:"fait",t:"L’ordre a bien été une société secrète, hiérarchisée et opposée à l’influence de l’Église. Il a été interdit par des édits de 1784 et 1785, et ses archives saisies ont été publiées par l’État bavarois."},
  {k:"acc",t:"Le gouvernement bavarois accusa les Illuminés de vouloir renverser la religion et l’État. Les documents publiés montrent un projet d’influence intellectuelle et de placement de membres dans l’administration, mais aucun plan de révolution."},
  {k:"mythe",t:"Aucune preuve historique n’indique que l’ordre ait survécu après 1785. Les théories qui lui attribuent la Révolution française, les grandes guerres, la finance mondiale ou le contrôle de célébrités n’ont aucun fondement. Elles ont souvent servi de véhicule à des discours antisémites et antimaçonniques."},
  {k:"mythe",t:"Des symboles souvent associés aux « Illuminati », comme l’œil dans le triangle du billet d’un dollar américain, n’ont aucun lien avec l’ordre bavarois : cet œil est un symbole chrétien de la Providence, choisi en 1782 pour le Grand Sceau des États-Unis."}
 ],
 lire:["René Le Forestier, Les Illuminés de Bavière et la franc-maçonnerie allemande, 1914.","Pierre-André Taguieff, La Foire aux Illuminés, Mille et une nuits, 2005.","The Public Domain Review, « John Robison and the Birth of the Illuminati Conspiracy »."]
}

});
