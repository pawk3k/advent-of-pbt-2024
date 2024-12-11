declare type MarketMap = boolean[][];
declare type RequestedSize = { width: number; height: number };
declare type Location = { x: number; y: number };
declare function findPlaceForSanta(
  map: MarketMap,
  requestedArea: RequestedSize
): Location | undefined;
