export interface FlowerColor {
  petal: string;
  center: string;
  leaf: string;
  name: string;
}

export const FLOWER_PALETTE: FlowerColor[] = [
  { petal: '#FFB7C5', center: '#FFE4A0', leaf: '#A8D8B9', name: 'Kirschblüte' },
  { petal: '#C4A8FF', center: '#FFE4A0', leaf: '#A8EED4', name: 'Lavendel'    },
  { petal: '#FFB899', center: '#FFF4A0', leaf: '#A8D8B9', name: 'Pfirsich'    },
  { petal: '#A8EED4', center: '#FFE4A0', leaf: '#88CCAA', name: 'Minze'       },
  { petal: '#A8D4FF', center: '#FFE4A0', leaf: '#A8D8B9', name: 'Himmel'      },
  { petal: '#FFB7E4', center: '#B8FFE4', leaf: '#A8EED4', name: 'Sakura'      },
  { petal: '#FFE4A0', center: '#FFB7C5', leaf: '#A8D8B9', name: 'Buttercup'   },
];

export function getFlowerColorForDate(date: string): FlowerColor {
  let hash = 0;
  for (const ch of date) hash = (hash * 31 + ch.charCodeAt(0)) & 0xffffff;
  return FLOWER_PALETTE[Math.abs(hash) % FLOWER_PALETTE.length];
}
