export interface FlowerColor {
  petal: string;
  center: string;
  leaf: string;
  name: string;
}

export const FLOWER_PALETTE: FlowerColor[] = [
  { petal: '#FF8FAB', center: '#FFD166', leaf: '#52C77F', name: 'Rose' },
  { petal: '#C084FC', center: '#FCD34D', leaf: '#4ADE80', name: 'Lavendel' },
  { petal: '#FB923C', center: '#FEF08A', leaf: '#52C77F', name: 'Koralle' },
  { petal: '#34D399', center: '#FDE68A', leaf: '#22C55E', name: 'Minze' },
  { petal: '#60A5FA', center: '#FCD34D', leaf: '#52C77F', name: 'Himmel' },
  { petal: '#F472B6', center: '#A7F3D0', leaf: '#4ADE80', name: 'Sakura' },
  { petal: '#FBBF24', center: '#FDE68A', leaf: '#52C77F', name: 'Sonne' },
];

export function getFlowerColorForDate(date: string): FlowerColor {
  let hash = 0;
  for (const ch of date) hash = (hash * 31 + ch.charCodeAt(0)) & 0xffffff;
  return FLOWER_PALETTE[Math.abs(hash) % FLOWER_PALETTE.length];
}
