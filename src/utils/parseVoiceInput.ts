export const parseVoiceInput = (text: string): { name: string; description: string } => {
  const lowerText = text.toLowerCase().trim()

  // German number words
  const numberWords: Record<string, string> = {
    'ein': '1',
    'eine': '1',
    'einen': '1',
    'zwei': '2',
    'drei': '3',
    'vier': '4',
    'fünf': '5',
    'sechs': '6',
    'sieben': '7',
    'acht': '8',
    'neun': '9',
    'zehn': '10',
  }

  // Match patterns - both "X mal Y" and "Y X mal"
  const patterns = [
    // Number at start: "3 mal Pommes", "3x Pommes", "3 Pommes"
    /^(\d+)\s*x\s+(.+)$/i,
    /^(\d+)\s+mal\s+(.+)$/i,
    /^(\d+)\s+(.+)$/i,
    // Number at end: "Pommes 3 mal", "Pommes 3x", "Pommes 3"
    /^(.+)\s+(\d+)\s*x$/i,
    /^(.+)\s+(\d+)\s+mal$/i,
    /^(.+)\s+(\d+)$/i,
  ]

  // Try number word patterns (start and end)
  for (const [word, num] of Object.entries(numberWords)) {
    const wordPatterns = [
      // At start: "drei mal Pommes", "drei Pommes"
      new RegExp(`^${word}\\s+mal\\s+(.+)$`, 'i'),
      new RegExp(`^${word}\\s+(.+)$`, 'i'),
      // At end: "Pommes drei mal", "Pommes drei"
      new RegExp(`^(.+)\\s+${word}\\s+mal$`, 'i'),
      new RegExp(`^(.+)\\s+${word}$`, 'i'),
    ]

    for (let i = 0; i < wordPatterns.length; i++) {
      const pattern = wordPatterns[i]
      const match = lowerText.match(pattern)
      if (match) {
        return {
          name: match[1].trim(),
          description: `${num}x`,
        }
      }
    }
  }

  // Try digit patterns
  for (let i = 0; i < patterns.length; i++) {
    const pattern = patterns[i]
    const match = lowerText.match(pattern)
    if (match) {
      // For patterns where number is at end (index 3-5), swap the groups
      if (i >= 3) {
        return {
          name: match[1].trim(),
          description: `${match[2]}x`,
        }
      } else {
        return {
          name: match[2].trim(),
          description: `${match[1]}x`,
        }
      }
    }
  }

  // No pattern matched, return as is
  return {
    name: text.trim(),
    description: '',
  }
}
