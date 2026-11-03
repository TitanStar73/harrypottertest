/**
 * Harry Potter's Known Spells Database
 * Comprehensive list of spells Harry has used or is known for
 */

export const spells = [
  {
    id: 'expelliarmus',
    name: 'Expelliarmus',
    incantation: 'ex-pel-ee-AR-mus',
    category: 'Defense Against the Dark Arts',
    type: 'Disarming Charm',
    effect: 'Disarms opponent by forcing whatever they are holding to fly out of their hand',
    light: 'Red/Scarlet',
    difficulty: 'Moderate',
    firstUsed: 'Harry Potter and the Chamber of Secrets',
    notableUse: 'Harry\'s signature spell; used to defeat Voldemort in final duel',
    description: 'The Disarming Charm causes whatever an opponent is holding (usually a wand) to fly high out of reach. Harry Potter became famous for using this as his signature spell, employing it in virtually every duel he fought. It was the spell that ultimately won him the final battle against Voldemort when the Elder Wand recognized Harry as its true master.'
  },
  {
    id: 'expecto-patronum',
    name: 'Expecto Patronum',
    incantation: 'ex-PEK-toh pa-TRO-num',
    category: 'Charms',
    type: 'Patronus Charm',
    effect: 'Conjures a corporeal Patronus (silver stag) to repel Dementors and Lethifolds',
    light: 'Silver/White',
    difficulty: 'Very Advanced',
    firstUsed: 'Harry Potter and the Prisoner of Azkaban',
    notableUse: 'Saved himself and Sirius from 100+ Dementors at the Great Lake; taught to D.A. members',
    description: 'One of the most powerful defensive charms known to wizardkind. The Patronus Charm conjures a guardian spirit that takes the form of an animal representing the caster\'s happiest memory. Harry\'s Patronus is a stag, the same as his father James Potter\'s Animagus form. He learned this at age 13 from Remus Lupin, making him one of the youngest wizards to produce a corporeal Patronus.'
  },
  {
    id: 'stupefy',
    name: 'Stupefy',
    incantation: 'STOO-pee-fy',
    category: 'Defense Against the Dark Arts',
    type: 'Stunning Spell',
    effect: 'Renders target unconscious; red jet of light',
    light: 'Red',
    difficulty: 'Moderate',
    firstUsed: 'Harry Potter and the Goblet of Fire',
    notableUse: 'Used extensively in Battle of the Department of Mysteries and Battle of Hogwarts',
    description: 'The Stunning Spell is a staple of dueling. It emits a jet of red light that knocks the target unconscious. Harry used this spell frequently during the Second Wizarding War, particularly during the Battle of the Department of Mysteries and the Battle of Hogwarts.'
  },
  {
    id: 'protego',
    name: 'Protego',
    incantation: 'pro-TAY-go',
    category: 'Defense Against the Dark Arts',
    type: 'Shield Charm',
    effect: 'Creates invisible magical barrier that deflects spells and physical projectiles',
    light: 'Invisible (shimmer on impact)',
    difficulty: 'Moderate to Advanced',
    firstUsed: 'Harry Potter and the Order of the Phoenix',
    notableUse: 'Protected D.A. members during training; used in Battle of Hogwarts',
    description: 'The Shield Charm creates an invisible barrier that protects the caster from minor to moderate jinxes, hexes, and curses. Advanced users can create stronger variants like Protego Maxima. Harry taught this to Dumbledore\'s Army and used it extensively in combat.'
  },
  {
    id: 'protego-horribilis',
    name: 'Protego Horribilis',
    incantation: 'pro-TAY-go hor-RIB-il-is',
    category: 'Defense Against the Dark Arts',
    type: 'Advanced Shield Charm',
    effect: 'Powerful shield against Dark magic and curses',
    light: 'Golden shimmer',
    difficulty: 'Advanced',
    firstUsed: 'Harry Potter and the Deathly Hallows',
    notableUse: 'Used during Battle of Hogwarts to protect defenders',
    description: 'A more powerful version of the Shield Charm specifically designed to withstand Dark Magic. Used by Hogwarts defenders during the final battle.'
  },
  {
    id: 'reducto',
    name: 'Reducto',
    incantation: 're-DUK-toh',
    category: 'Transfiguration/Charms',
    type: 'Blasting Curse',
    effect: 'Blasts solid objects into pieces; orange/red light',
    light: 'Orange-Red',
    difficulty: 'Advanced',
    firstUsed: 'Harry Potter and the Order of the Phoenix',
    notableUse: 'Used in Department of Mysteries to shatter shelves and objects',
    description: 'The Reductor Curse blasts solid objects apart. It is particularly useful for breaking through barriers or destroying obstacles. Harry became proficient with this spell during D.A. training.'
  },
  {
    id: 'levioso',
    name: 'Levioso',
    incantation: 'lev-ee-OH-soh',
    category: 'Charms',
    type: 'Levitation Charm',
    effect: 'Levitates objects; makes them hover in place',
    light: 'None (subtle glow)',
    difficulty: 'Beginner',
    firstUsed: 'Harry Potter and the Philosopher\'s Stone',
    notableUse: 'First spell learned in Charms class; used on troll\'s club',
    description: 'The Levitation Charm is one of the first spells taught at Hogwarts. It causes objects to float a few feet off the ground. Not to be confused with Wingardium Leviosa which allows controlled movement.'
  },
  {
    id: 'wingardium-leviosa',
    name: 'Wingardium Leviosa',
    incantation: 'win-GAR-dee-um levi-OH-sa',
    category: 'Charms',
    type: 'Levitation Charm (Advanced)',
    effect: 'Levitates and moves objects with precise control',
    light: 'None (subtle glow)',
    difficulty: 'Beginner to Moderate',
    firstUsed: 'Harry Potter and the Philosopher\'s Stone',
    notableUse: 'Used on troll\'s club in first year; "swish and flick" technique',
    description: 'The advanced Levitation Charm allows the caster to move objects through the air with precision. The key is the "swish and flick" wrist movement and proper pronunciation. Hermione famously corrected Ron\'s pronunciation in their first year.'
  },
  {
    id: 'accio',
    name: 'Accio',
    incantation: 'AK-ee-oh',
    category: 'Charms',
    type: 'Summoning Charm',
    effect: 'Summons an object to the caster\'s hand from a distance',
    light: 'None',
    difficulty: 'Moderate',
    firstUsed: 'Harry Potter and the Goblet of Fire',
    notableUse: 'Summoned Firebolt during First Task; used to retrieve Triwizard Cup',
    description: 'The Summoning Charm brings an object to the caster. The caster must concentrate on the desired object. Harry used this to summon his Firebolt broomstick during the First Task of the Triwizard Tournament, and later to retrieve the Triwizard Cup (which was a Portkey).'
  },
  {
    id: 'lumos',
    name: 'Lumos',
    incantation: 'LOO-mos',
    category: 'Charms',
    type: 'Wand-Lighting Charm',
    effect: 'Illuminates wand tip; provides light',
    light: 'Warm white/yellow',
    difficulty: 'Beginner',
    firstUsed: 'Harry Potter and the Philosopher\'s Stone',
    notableUse: 'Used constantly throughout series for light in dark places',
    description: 'The Wand-Lighting Charm causes the tip of the wand to emit a bright light. The counter-charm is Nox. Harry used this spell countless times throughout his adventures.'
  },
  {
    id: 'nox',
    name: 'Nox',
    incantation: 'NOKS',
    category: 'Charms',
    type: 'Wand-Extinguishing Charm',
    effect: 'Extinguishes wand light',
    light: 'None (removes light)',
    difficulty: 'Beginner',
    firstUsed: 'Harry Potter and the Prisoner of Azkaban',
    notableUse: 'Counter-charm to Lumos',
    description: 'The counter-charm to Lumos, extinguishing the light at the wand tip.'
  },
  {
    id: 'riddikulus',
    name: 'Riddikulus',
    incantation: 'ri-DIK-yoo-lus',
    category: 'Defense Against the Dark Arts',
    type: 'Boggart-Banishing Spell',
    effect: 'Transforms a Boggart into something amusing',
    light: 'None (transformation)',
    difficulty: 'Moderate',
    firstUsed: 'Harry Potter and the Prisoner of Azkaban',
    notableUse: 'Learned from Lupin; used on Boggart in wardrobe and Dementor-Boggart',
    description: 'The spell used to defeat a Boggart by forcing it to assume a shape the caster finds funny. Laughter is what truly defeats a Boggart. Harry\'s Boggart took the form of a Dementor.'
  },
  {
    id: 'petrificus-totalus',
    name: 'Petrificus Totalus',
    incantation: 'pe-TRI-fi-kus to-TAH-lus',
    category: 'Defense Against the Dark Arts',
    type: 'Full Body-Bind Curse',
    effect: 'Paralyzes victim completely; body becomes rigid',
    light: 'White/Blue flash',
    difficulty: 'Moderate to Advanced',
    firstUsed: 'Harry Potter and the Philosopher\'s Stone',
    notableUse: 'Hermione used on Neville; Harry used on Death Eaters',
    description: 'The Full Body-Bind Curse temporarily paralyzes the victim, causing their limbs to snap together and making them fall rigid. The victim remains conscious but unable to move or speak.'
  },
  {
    id: 'sectumsempra',
    name: 'Sectumsempra',
    incantation: 'sek-tum-SEM-pra',
    category: 'Dark Arts',
    type: 'Severing Curse',
    effect: 'Deep lacerations appear on target as if cut by invisible sword',
    light: 'White flash',
    difficulty: 'Advanced (Dark)',
    firstUsed: 'Harry Potter and the Half-Blood Prince',
    notableUse: 'Used on Draco Malfoy in bathroom duel; learned from Half-Blood Prince\'s book',
    description: 'A dark curse invented by Severus Snape (as the Half-Blood Prince). It causes deep, bleeding cuts on the victim as if they had been slashed by an invisible sword. Harry used it unknowingly on Draco Malfoy and was horrified by the results. Snape later healed Draco and gave Harry detention.'
  },
  {
    id: 'crucio',
    name: 'Crucio',
    incantation: 'KROO-see-oh',
    category: 'Dark Arts (Unforgivable)',
    type: 'Cruciatus Curse',
    effect: 'Inflicts excruciating pain on victim',
    light: 'None (invisible)',
    difficulty: 'Advanced (Dark)',
    firstUsed: 'Harry Potter and the Order of the Phoenix',
    notableUse: 'Used on Amycus Carrow (spit on McGonagall); used on Bellatrix (briefly)',
    description: 'One of the three Unforgivable Curses. Causes unbearable pain to the victim. Use on a human carries a life sentence in Azkaban. Harry used it only twice: on Amycus Carrow after he spat on McGonagall, and briefly on Bellatrix Lestrange after she killed Sirius. He found he couldn\'t sustain it effectively because he lacked the desire to cause pain for its own sake.'
  },
  {
    id: 'imperio',
    name: 'Imperio',
    incantation: 'im-PEER-ee-oh',
    category: 'Dark Arts (Unforgivable)',
    type: 'Imperius Curse',
    effect: 'Places victim under complete control of caster',
    light: 'None (invisible)',
    difficulty: 'Advanced (Dark)',
    firstUsed: 'Harry Potter and the Goblet of Fire',
    notableUse: 'Harry resisted Moody\'s (Crouch Jr.) Imperius in class; threw off Voldemort\'s in graveyard',
    description: 'One of the three Unforgivable Curses. Places the victim completely under the caster\'s control. Harry demonstrated exceptional willpower by resisting both Barty Crouch Jr. (disguised as Moody) and Voldemort himself.'
  },
  {
    id: 'avada-kedavra',
    name: 'Avada Kedavra',
    incantation: 'a-VAH-da ke-DAV-ra',
    category: 'Dark Arts (Unforgivable)',
    type: 'Killing Curse',
    effect: 'Instant, painless death; green flash of light',
    light: 'Green',
    difficulty: 'Advanced (Dark)',
    firstUsed: 'Harry Potter and the Philosopher\'s Stone (backstory)',
    notableUse: 'Survived as infant (scar); Voldemort used on Harry multiple times; Harry never used it',
    description: 'The most dreaded of the Unforgivable Curses. Causes instant death with a flash of green light. There is no counter-curse and no blocking it (except by sacrificial protection or Priori Incantatem). Harry is the only known survivor, protected by his mother\'s sacrificial love.'
  },
  {
    id: 'expulso',
    name: 'Expulso',
    incantation: 'ex-PUL-soh',
    category: 'Charms/Transfiguration',
    type: 'Exploding Curse',
    effect: 'Causes target to explode with great force',
    light: 'Blue/White flash',
    difficulty: 'Advanced',
    firstUsed: 'Harry Potter and the Deathly Hallows',
    notableUse: 'Used by Death Eaters; Harry encountered it during escape from Malfoy Manor',
    description: 'A powerful curse that causes the target to explode violently. Different from Reducto which blasts objects apart; Expulso creates an actual explosion.'
  },
  {
    id: 'diffindo',
    name: 'Diffindo',
    incantation: 'dif-FIN-doh',
    category: 'Charms',
    type: 'Severing Charm',
    effect: 'Precisely cuts or slices target',
    light: 'None (cutting effect)',
    difficulty: 'Moderate',
    firstUsed: 'Harry Potter and the Goblet of Fire',
    notableUse: 'Used to cut open dragon egg; used in Department of Mysteries',
    description: 'The Severing Charm makes precise cuts. Harry used it to cut open the golden egg clue in the Triwizard Tournament and during the Battle of the Department of Mysteries.'
  },
  {
    id: 'confringo',
    name: 'Confringo',
    incantation: 'kon-FRIN-go',
    category: 'Charms/Transfiguration',
    type: 'Blasting Curse',
    effect: 'Causes target to explode in flames',
    light: 'Orange/Red flame',
    difficulty: 'Advanced',
    firstUsed: 'Harry Potter and the Deathly Hallows',
    notableUse: 'Used by Hermione to blast through floor at Lovegood house; Harry used in Gringotts',
    description: 'The Blasting Curse causes anything it hits to explode in flames. More destructive than Reducto.'
  },
  {
    id: 'aguamenti',
    name: 'Aguamenti',
    incantation: 'ah-gwa-MEN-tee',
    category: 'Charms',
    type: 'Water-Making Spell',
    effect: 'Produces jet of clean water from wand tip',
    light: 'None (water)',
    difficulty: 'Moderate',
    firstUsed: 'Harry Potter and the Half-Blood Prince',
    notableUse: 'Used to fill goblet in cave; attempted to extinguish Fiendfyre',
    description: 'Produces a jet of clear water from the wand tip. Harry used it in the cave with Dumbledore to fill the goblet, and later attempted to use it against Fiendfyre in the Room of Requirement (unsuccessfully).'
  },
  {
    id: 'finestra',
    name: 'Finestra',
    incantation: 'fi-NES-tra',
    category: 'Charms',
    type: 'Window-Breaking Charm',
    effect: 'Shatters glass/windows',
    light: 'None',
    difficulty: 'Moderate',
    firstUsed: 'Harry Potter and the Deathly Hallows',
    notableUse: 'Used to escape Ministry courtroom',
    description: 'A specialized charm for breaking glass. Harry used it during his escape from the Ministry courtroom hearing.'
  },
  {
    id: 'ferula',
    name: 'Ferula',
    incantation: 'feh-ROO-lah',
    category: 'Healing/Charms',
    type: 'Bandaging Charm',
    effect: 'Conjures bandages and splints for injuries',
    light: 'White',
    difficulty: 'Moderate',
    firstUsed: 'Harry Potter and the Prisoner of Azkaban',
    notableUse: 'Lupin used on Ron\'s broken leg; Harry learned for D.A.',
    description: 'Conjures bandages and a splint for broken bones. Useful for emergency first aid.'
  },
  {
    id: 'rennervate',
    name: 'Rennervate',
    incantation: 'ren-ER-vayt',
    category: 'Healing/Charms',
    type: 'Reviving Spell',
    effect: 'Revives unconscious person',
    light: 'Red/orange',
    difficulty: 'Moderate',
    firstUsed: 'Harry Potter and the Goblet of Fire',
    notableUse: 'Used on Krum in maze; used on stunned Death Eaters',
    description: 'Revives someone who has been stunned or knocked unconscious. Counter to Stupefy.'
  },
  {
    id: 'episkey',
    name: 'Episkey',
    incantation: 'eh-PIS-kee',
    category: 'Healing/Charms',
    type: 'Minor Healing Charm',
    effect: 'Heals minor injuries (broken nose, cuts, bruises)',
    light: 'White/golden',
    difficulty: 'Moderate',
    firstUsed: 'Harry Potter and the Half-Blood Prince',
    notableUse: 'Tonks used on Harry\'s broken nose; Harry used on Demelza Robins',
    description: 'Heals minor injuries like broken noses, cuts, and bruises. Not effective for serious trauma.'
  },
  {
    id: 'muffliato',
    name: 'Muffliato',
    incantation: 'muf-lee-AH-toh',
    category: 'Charms',
    type: 'Privacy Charm',
    effect: 'Fills ears of nearby people with buzzing so they cannot overhear',
    light: 'None',
    difficulty: 'Moderate',
    firstUsed: 'Harry Potter and the Half-Blood Prince',
    notableUse: 'Used by Harry, Ron, Hermione for private conversations; learned from Half-Blood Prince\'s book',
    description: 'Creates a buzzing sound in the ears of anyone nearby, preventing them from overhearing conversations. Invented by Severus Snape.'
  },
  {
    id: 'langlock',
    name: 'Langlock',
    incantation: 'LANG-lok',
    category: 'Jinxes',
    type: 'Tongue-Tying Jinx',
    effect: 'Gluest victim\'s tongue to roof of mouth',
    light: 'None',
    difficulty: 'Moderate',
    firstUsed: 'Harry Potter and the Half-Blood Prince',
    notableUse: 'Used on Peeves; invented by Snape',
    description: 'Causes the victim\'s tongue to stick to the roof of their mouth, preventing speech. Another of Snape\'s inventions.'
  },
  {
    id: 'levi-corpus',
    name: 'Levicorpus',
    incantation: 'lev-i-KOR-pus',
    category: 'Jinxes',
    type: 'Dangling Jinx',
    effect: 'Lifts victim upside down by ankle',
    light: 'None',
    difficulty: 'Moderate',
    firstUsed: 'Harry Potter and the Half-Blood Prince',
    notableUse: 'Harry used on Ron (accidentally); James used on Snape (memory); invented by Snape',
    description: 'Causes the victim to be lifted upside down by their ankle, dangling helplessly. The counter-jinx is Liberacorpus. Invented by Snape; Harry accidentally used it on Ron after reading it in the Half-Blood Prince\'s book.'
  },
  {
    id: 'liberacorpus',
    name: 'Liberacorpus',
    incantation: 'lib-er-a-KOR-pus',
    category: 'Counter-Jinxes',
    type: 'Counter to Levicorpus',
    effect: 'Releases victim from Levicorpus',
    light: 'None',
    difficulty: 'Moderate',
    firstUsed: 'Harry Potter and the Half-Blood Prince',
    notableUse: 'Counter-jinx for Levicorpus',
    description: 'The counter-jinx to Levicorpus, releasing the victim from being dangled upside down.'
  },
  {
    id: 'specialis-revelio',
    name: 'Specialis Revelio',
    incantation: 'spe-see-AH-lis rev-EL-ee-oh',
    category: 'Charms',
    type: 'Scarpin\'s Revelaspell',
    effect: 'Reveals hidden magical properties of objects/potions',
    light: 'Golden',
    difficulty: 'Advanced',
    firstUsed: 'Harry Potter and the Half-Blood Prince',
    notableUse: 'Hermione used on Half-Blood Prince\'s book',
    description: 'Reveals the specific magical properties and ingredients of a potion or enchanted object.'
  },
  {
    id: 'point-me',
    name: 'Point Me',
    incantation: 'POINT mee',
    category: 'Charms',
    type: 'Four-Point Spell',
    effect: 'Wand acts as compass, pointing North',
    light: 'None (wand rotates)',
    difficulty: 'Moderate',
    firstUsed: 'Harry Potter and the Goblet of Fire',
    notableUse: 'Used in Triwizard Tournament maze',
    description: 'The Four-Point Spell causes the wand to spin and point due North, acting as a magical compass. Harry used this in the Triwizard maze.'
  },
  {
    id: 'flagrate',
    name: 'Flagrate',
    incantation: 'fla-GRAH-tay',
    category: 'Charms',
    type: 'Fire-Marking Charm',
    effect: 'Creates fiery rope/mark from wand tip',
    light: 'Red/Orange flame',
    difficulty: 'Moderate',
    firstUsed: 'Harry Potter and the Order of the Phoenix',
    notableUse: 'Used to mark doors in Department of Mysteries',
    description: 'Allows the caster to draw fiery marks in the air. Harry used it to mark doors they had already tried in the Department of Mysteries.'
  },
  {
    id: 'orchideous',
    name: 'Orchideous',
    incantation: 'or-kid-EE-us',
    category: 'Transfiguration/Charms',
    type: 'Flower-Conjuring Charm',
    effect: 'Conjures bouquet of flowers from wand tip',
    light: 'Pink/Colorful',
    difficulty: 'Moderate',
    firstUsed: 'Harry Potter and the Goblet of Fire',
    notableUse: 'Ollivander tested wands with this; Harry witnessed',
    description: 'Conjures a bouquet of flowers (typically orchids) from the wand tip. Used by Ollivander to test wand functionality.'
  }
]

export const spellCategories = [
  { id: 'all', name: 'All Spells', count: spells.length },
  { id: 'charms', name: 'Charms', count: spells.filter(s => s.category.includes('Charms')).length },
  { id: 'defense', name: 'Defense Against the Dark Arts', count: spells.filter(s => s.category.includes('Defense')).length },
  { id: 'dark-arts', name: 'Dark Arts', count: spells.filter(s => s.category.includes('Dark Arts')).length },
  { id: 'transfiguration', name: 'Transfiguration', count: spells.filter(s => s.category.includes('Transfiguration')).length },
  { id: 'healing', name: 'Healing', count: spells.filter(s => s.category.includes('Healing')).length },
  { id: 'jinxes', name: 'Jinxes', count: spells.filter(s => s.category === 'Jinxes').length },
  { id: 'unforgivable', name: 'Unforgivable Curses', count: spells.filter(s => s.category.includes('Unforgivable')).length }
]

export const getSpellsByCategory = (category) => {
  if (category === 'all' || !category) return spells
  if (category === 'unforgivable') return spells.filter(s => s.category.includes('Unforgivable'))
  return spells.filter(s => s.category.toLowerCase().includes(category.toLowerCase()))
}

export const getSpellById = (id) => spells.find(s => s.id === id)

export const searchSpells = (query) => {
  const q = query.toLowerCase()
  return spells.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.incantation.toLowerCase().includes(q) ||
    s.effect.toLowerCase().includes(q) ||
    s.category.toLowerCase().includes(q)
  )
}