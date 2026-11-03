import { Link } from 'react-router-dom'
import { getHouseColor, getHouseLightColor } from '../../utils/helpers'
import styles from './CharacterCard.module.css'

const statusColors = {
  alive: '#2ecc71',
  deceased: '#e74c3c',
  unknown: '#f39c12'
}

export const CharacterCard = ({ character, variant = 'default' }) => {
  const houseColor = getHouseColor(character.house)
  const houseLightColor = getHouseLightColor(character.house)
  const statusColor = statusColors[character.status.toLowerCase()] || '#f39c12'

  const renderContent = () => {
    switch (variant) {
      case 'compact':
        return (
          <div className={styles.compactContent}>
            <div className={styles.compactAvatar}>
              <span className={styles.avatarPlaceholder} style={{ background: houseColor }}>
                {character.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </span>
              <span
                className={styles.statusDot}
                style={{ background: statusColor }}
                aria-label={`Status: ${character.status}`}
              />
            </div>
            <div className={styles.compactInfo}>
              <h3 className={styles.name}>{character.name}</h3>
              <div className={styles.compactMeta}>
                <span
                  className={styles.houseBadge}
                  style={{ background: `${houseColor}20`, color: houseColor, borderColor: `${houseColor}40` }}
                >
                  {character.house}
                </span>
                <span className={styles.role}>{character.role}</span>
              </div>
            </div>
          </div>
        )
      case 'featured':
        return (
          <Link to={`/characters/${character.id}`} className={styles.featuredLink}>
            <div className={styles.featuredImage} style={{ background: `linear-gradient(135deg, ${houseColor} 0%, ${houseLightColor} 100%)` }}>
              <span className={styles.avatarPlaceholder} style={{ background: 'rgba(0,0,0,0.3)' }}>
                {character.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </span>
            </div>
            <div className={styles.featuredContent}>
              <span
                className={styles.houseBadge}
                style={{ background: `${houseColor}20`, color: houseColor, borderColor: `${houseColor}40` }}
              >
                {character.house}
              </span>
              <h3 className={styles.name}>{character.name}</h3>
              <p className={styles.role}>{character.role}</p>
              <div className={styles.featuredMeta}>
                <span
                  className={styles.statusBadge}
                  style={{ background: `${statusColor}20`, color: statusColor }}
                >
                  {character.status}
                </span>
                <span className={styles.bloodStatus}>{character.bloodStatus}</span>
              </div>
            </div>
          </Link>
        )
      default:
        return (
          <Link to={`/characters/${character.id}`} className={styles.defaultLink}>
            <div className={styles.avatar} style={{ background: `linear-gradient(135deg, ${houseColor} 0%, ${houseLightColor} 100%)` }}>
              <span className={styles.avatarPlaceholder}>
                {character.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </span>
              <span
                className={styles.statusIndicator}
                style={{ background: statusColor }}
                aria-label={`Status: ${character.status}`}
              />
            </div>
            <div className={styles.content}>
              <div className={styles.header}>
                <h3 className={styles.name}>{character.name}</h3>
                {character.alias && <span className={styles.alias}>"{character.alias}"</span>}
              </div>
              <div className={styles.meta}>
                <span
                  className={styles.houseBadge}
                  style={{ background: `${houseColor}20`, color: houseColor, borderColor: `${houseColor}40` }}
                >
                  {character.house}
                </span>
                <span className={styles.bloodStatus}>{formatBloodStatus(character.bloodStatus)}</span>
              </div>
              <p className={styles.role}>{character.role}</p>
              <div className={styles.footer}>
                <span
                  className={styles.statusBadge}
                  style={{ background: `${statusColor}20`, color: statusColor }}
                >
                  {character.status}
                </span>
              </div>
            </div>
          </Link>
        )
    }
  }

  return (
    <article className={`${styles.card} ${styles[variant]} hover-lift`}>
      {renderContent()}
    </article>
  )
}

const formatBloodStatus = (status) => {
  const formats = {
    'pure-blood': 'Pure-blood',
    'half-blood': 'Half-blood',
    'muggle-born': 'Muggle-born',
    'muggle': 'Muggle',
    'werewolf': 'Werewolf',
    'house-elf': 'House-elf',
    'half-giant': 'Half-giant'
  }
  return formats[status.toLowerCase()] || status
}

export default CharacterCard