import type { IPal } from "../src/common/interfaces";
import type { IBreedingResult } from "./interfaces";

// Load data files
const palsData = await Bun.file("src/pals.json").json() as IPal[];
const breedingData = await Bun.file("src/breeding.json").json() as Record<string, string[][]>;

// Create lookup maps for performance
const palsByKey = new Map<string, IPal>();
palsData.forEach(pal => palsByKey.set(pal.key, pal));

/**
 * Special breeding combinations that don't follow the standard formula
 * Format: "parent1Key+parent2Key": "childKey"
 */
const SPECIAL_COMBINATIONS: Record<string, string> = {
  // From the README.md
  "085+007": "085B", // Relaxaurus + Sparkit = Relaxaurus Lux
  "042+086": "061",  // Arsox + Broncherry = Kitsun
  "026+013": "066",  // Direhowl + Gumoss = Maraith
  "101+107": "097",  // Jormuntide + Shadowbeak = Helzephyr
  "097+107": "083",  // Helzephyr + Shadowbeak = Cryolinx
  "102+085": "098",  // Suzaku + Relaxaurus = Astegon
  "011+072": "100",  // Penking + Bushi = Anubis
  "040+066": "040B", // Incineram + Maraith = Incineram Noct
  "024+010": "024B", // Mau + Pengullet = Mau Cryst
  "071+057": "071B", // Vanwyrm + Foxcicle = Vanwyrm Cryst
  "037+032": "037B", // Eikthyrdeer + Hangyu = Eikthyrdeer Terra
  "080+065": "080B", // Elphidran + Surfent = Elphidran Aqua
  "058+075": "058B", // Pyrin + Katress = Pyrin Noct
  "090+091": "090B", // Mammorest + Wumpo = Mammorest Cryst
  "033+103": "033B", // Mossanda + Grizzbolt = Mossanda Lux
  "064+060": "064B", // Dinossom + Rayhound = Dinossom Lux
  "012+010": "012B", // Jolthog + Pengullet = Jolthog Cryst
  "110+097": "110B", // Frostallion + Helzephyr = Frostallion Noct
  "089+059": "089B", // Kingpaca + Reindrix = Kingpaca Cryst
  "104+099": "104B", // Lyleen + Menasting = Lyleen Noct
  "045+070": "045B", // Leezpunk + Flambelle = Leezpunk Ignis
  "084+094": "084B", // Blazehowl + Felbat = Blazehowl Noct
  "048+022": "048B", // Robinquill + Fuddler = Robinquill Terra
  "086+006": "086B", // Broncherry + Fuack = Broncherry Aqua
  "065+043": "065B", // Surfent + Dumud = Surfent Terra
  "031+009": "031B", // Gobfin + Rooby = Gobfin Ignis
  "102+101": "102B", // Suzaku + Jormuntide = Suzaku Aqua
  "088+057": "088B", // Reptyro + Foxcicle = Reptyro Cryst
  "032+053": "032B", // Hangyu + Swee = Hangyu Cryst
  "033+087": "104",  // Mossanda + Petallia = Lyleen
  "071+100": "105",  // Vanwyrm + Anubis = Faleris
  "033+060": "103",  // Mossanda + Rayhound = Grizzbolt
  "103+085": "106",  // Grizzbolt + Relaxaurus = Orserk
  "061+098": "107",  // Kitsun + Astegon = Shadowbeak
  "072+042": "084"   // Bushi + Arsox = Blazehowl
};

/**
 * Calculate breeding result between two Pals
 */
export function calculateBreeding(parent1Key: string, parent2Key: string): IBreedingResult | null {
  const parent1 = palsByKey.get(parent1Key);
  const parent2 = palsByKey.get(parent2Key);
  
  if (!parent1 || !parent2) {
    return null;
  }

  // Check for special combinations (both directions)
  const specialKey = SPECIAL_COMBINATIONS[`${parent1Key}+${parent2Key}`] || 
                     SPECIAL_COMBINATIONS[`${parent2Key}+${parent1Key}`];
  
  if (specialKey) {
    const child = palsByKey.get(specialKey);
    if (child) {
      return {
        child,
        probability: 1.0,
        specialCombination: true
      };
    }
  }

  // Standard breeding calculation
  const parent1Rank = parent1.breed.rank;
  const parent2Rank = parent2.breed.rank;
  const childRank = Math.floor((parent1Rank + parent2Rank + 1) / 2);

  // Find Pal with closest rank
  let closestPal: IPal | null = null;
  let closestDistance = Infinity;

  for (const pal of palsData) {
    // Skip if not eligible as child
    if (!pal.breed.child_eligble) continue;

    const distance = Math.abs(pal.breed.rank - childRank);
    
    if (distance < closestDistance || 
        (distance === closestDistance && pal.breed.order < (closestPal?.breed.order ?? Infinity))) {
      closestPal = pal;
      closestDistance = distance;
    }
  }

  if (!closestPal) {
    return null;
  }

  return {
    child: closestPal,
    probability: 1.0,
    specialCombination: false
  };
}

/**
 * Get all possible breeding combinations that produce a specific Pal
 */
export function getBreedingCombinations(targetPalKey: string): Array<[IPal, IPal]> {
  const combinations: Array<[IPal, IPal]> = [];
  
  // Check if this Pal exists in breeding.json
  const directCombinations = breedingData[targetPalKey];
  if (directCombinations) {
    for (const [parent1Key, parent2Key] of directCombinations) {
      const parent1 = palsByKey.get(parent1Key);
      const parent2 = palsByKey.get(parent2Key);
      if (parent1 && parent2) {
        combinations.push([parent1, parent2]);
      }
    }
  }

  // Also check special combinations
  for (const [combo, childKey] of Object.entries(SPECIAL_COMBINATIONS)) {
    if (childKey === targetPalKey) {
      const [p1Key, p2Key] = combo.split('+');
      const parent1 = palsByKey.get(p1Key);
      const parent2 = palsByKey.get(p2Key);
      if (parent1 && parent2) {
        combinations.push([parent1, parent2]);
      }
    }
  }

  return combinations;
}

/**
 * Get all Pals from the data
 */
export function getAllPals(): IPal[] {
  return palsData;
}