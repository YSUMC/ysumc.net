export type BuildingTypeKey =
  | 'dorm'
  | 'lab'
  | 'gym'
  | 'live'
  | 'landmark'
  | 'building'
  | 'park'
  | 'canteen'
  | 'library'
  | 'gate'

export type MapPoint = {
  position: [number, number]
  title: string
  color?: string
  label?: string[]
  text?: string
  buildingType: BuildingTypeKey
}

export type BuildingType = { color: string; isSpecial: boolean; icon: string }
