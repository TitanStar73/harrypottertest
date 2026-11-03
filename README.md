# Harry Potter Website

A comprehensive, interactive personal website for Harry Potter — The Boy Who Lived. Explore his life, magic, friends, enemies, and legacy through an immersive, magical web experience.

![Harry Potter Website](public/og-image.jpg)

## Features

### 📖 Biography
Complete life story from the cupboard under the stairs to the defeat of the Dark Lord, with key facts, timeline, and memorable quotes.

### 🏰 Hogwarts Years
Interactive year-by-year breakdown of all seven years at Hogwarts, including:
- Key events and milestones
- Characters met
- Spells learned
- Outcomes and consequences

### 🤝 Friends & Allies
Detailed profiles of 30+ characters including:
- The Golden Trio (Harry, Ron, Hermione)
- Order of the Phoenix members
- Dumbledore's Army
- Hogwarts staff and house ghosts
- Filterable by house, role, and search

### 🐍 Enemies
Comprehensive database of dark forces:
- Lord Voldemort and his Horcruxes
- Death Eaters (Bellatrix, Lucius, etc.)
- Ministry antagonists (Umbridge)
- Dark creatures (Dementors, Basilisk, etc.)
- Unforgivable Curses explained

### ⚡ Magic & Spells
Harry's complete spellbook with 30+ spells:
- Signature spells (Expelliarmus, Expecto Patronum, etc.)
- Categorized by type (Charms, Defense, Transfiguration, etc.)
- Difficulty ratings and incantations
- Wand details (Holly, Phoenix feather, 11")
- Patronus (Stag) and Parseltongue ability

### 📜 Interactive Timeline
Chronological journey from 1980–2017 with:
- 50+ major life events
- Vertical and horizontal view modes
- Filter by category (Personal, Hogwarts, Quidditch, Magic, etc.)
- Full-text search
- Expandable event details

### 🖼️ Gallery
Visual exploration of the wizarding world:
- Characters, Locations, Magical Items, Creatures
- Masonry/Grid view modes
- Modal detail view with descriptions
- Category filtering

## Tech Stack

- **Framework**: React 18 with Vite
- **Routing**: React Router v6
- **Styling**: CSS Modules with CSS Custom Properties
- **Testing**: Vitest + React Testing Library
- **Data**: Static JSON/JS modules
- **Icons**: Unicode emoji (no external dependencies)

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd harry-potter-website

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
harry-potter-website/
├── public/
│   ├── favicon.svg
│   └── og-image.jpg
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Layout/
│   │   ├── SpellCard/
│   │   ├── CharacterCard/
│   │   ├── Timeline/
│   │   ├── Quote/
│   │   └── YearAccordion/
│   ├── pages/            # Route components
│   │   ├── Home/
│   │   ├── Biography/
│   │   ├── HogwartsYears/
│   │   ├── Friends/
│   │   ├── Enemies/
│   │   ├── Magic/
│   │   ├── Timeline/
│   │   └── Gallery/
│   ├── data/             # Static data
│   │   ├── spells.js
│   │   ├── characters.js
│   │   ├── timeline.js
│   │   └── quotes.js
│   ├── hooks/            # Custom React hooks
│   │   └── index.js
│   ├── styles/           # Global styles
│   │   ├── variables.css
│   │   ├── globals.css
│   │   └── animations.css
│   ├── utils/            # Utility functions
│   │   └── helpers.js
│   ├── test/             # Test setup
│   │   └── setup.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.html
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Design System

### Color Palette
- **Background**: Dark magical theme (`#0a0a12`, `#12121f`, `#1a1a2e`)
- **Gold Accent**: Primary brand color (`#ffd700`, `#b8860b`)
- **House Colors**:
  - Gryffindor: `#740001` / `#ae0001`
  - Slytherin: `#0d6217` / `#1a7a2a`
  - Ravenclaw: `#0e1a40` / `#222f5b`
  - Hufflepuff: `#ecb939` / `#f0c75e`

### Typography
- **Primary**: Georgia, serif (body text)
- **Secondary**: Cinzel, serif (headings)
- **Monospace**: Fira Code (code/incantations)

### Animations
- Floating, sparkling, glowing effects
- Scroll reveal animations
- Reduced motion support via `prefers-reduced-motion`

## Accessibility

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Skip to main content link
- Color contrast compliance
- Reduced motion support
- Screen reader optimized

## Data Sources

All content is based on the seven Harry Potter novels by J.K. Rowling:
1. *Harry Potter and the Philosopher's Stone* (1997)
2. *Harry Potter and the Chamber of Secrets* (1998)
3. *Harry Potter and the Prisoner of Azkaban* (1999)
4. *Harry Potter and the Goblet of Fire* (2000)
5. *Harry Potter and the Order of the Phoenix* (2003)
6. *Harry Potter and the Half-Blood Prince* (2005)
7. *Harry Potter and the Deathly Hallows* (2007)

## Disclaimer

This is a fan website created for educational and entertainment purposes. Harry Potter characters, names, and all related indicia are trademarks of Warner Bros. Entertainment Inc. and J.K. Rowling. This site is not affiliated with, endorsed by, or connected to Warner Bros., J.K. Rowling, or any official Harry Potter entity.

## License

MIT License - feel free to use for learning and personal projects.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests (`npm test`)
5. Submit a pull request

## Acknowledgments

- J.K. Rowling for creating the Wizarding World
- The Harry Potter Wiki for reference data
- React, Vite, and Vitest communities