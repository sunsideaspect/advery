export enum DomainType {
  PROMO = 'PROMO',
  CLEAN = 'CLEAN',
  GOOGLE = 'GOOGLE'
}

export interface Step {
  id: number;
  title: string;
  description: string;
  activeDomain: DomainType;
  highlightEdges: string[]; // IDs of edges to highlight
  showDataPacket?: {
    from: DomainType;
    to: DomainType;
    label: string;
    isSecure: boolean;
  };
}

export interface NodePosition {
  x: number;
  y: number;
  width: number;
  height: number;
}