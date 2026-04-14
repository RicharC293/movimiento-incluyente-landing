export type BuroRolFijo =
  | 'coordinador'
  | 'subcoordinador'
  | 'secretaria'
  | 'responsable-economico'
  | 'vocal-1'
  | 'vocal-2'
  | 'vocal-3'

export const ROLES_FIJOS: BuroRolFijo[] = [
  'coordinador',
  'subcoordinador',
  'secretaria',
  'responsable-economico',
  'vocal-1',
  'vocal-2',
  'vocal-3',
]

export const LABELS_FIJOS: Record<BuroRolFijo, string> = {
  coordinador:             'Coordinador provincial',
  subcoordinador:          'Subcoordinador',
  secretaria:              'Secretaria',
  'responsable-economico': 'Resp. Económico',
  'vocal-1':               'Vocal 1',
  'vocal-2':               'Vocal 2',
  'vocal-3':               'Vocal 3',
}

export interface BuroMember {
  id: string
  nombre?: string
  profesion?: string
  frase?: string
  foto?: string
  iniciales?: string
  tipo: 'fijo' | 'dinamico'
  rolFijo?: BuroRolFijo     // solo cuando tipo === 'fijo'
  cargo?: string            // solo cuando tipo === 'dinamico' — cargo libre
  orden: number
  visible: boolean
}

export const CANTONES_COTOPAXI = [
  { id: 'latacunga', nombre: 'Latacunga' },
  { id: 'salcedo',   nombre: 'Salcedo'   },
  { id: 'pujili',    nombre: 'Pujilí'    },
  { id: 'saquisili', nombre: 'Saquisilí' },
  { id: 'pangua',    nombre: 'Pangua'    },
  { id: 'la-mana',   nombre: 'La Maná'   },
  { id: 'sigchos',   nombre: 'Sigchos'   },
]

export interface Canton {
  id: string
  nombre: string
  coordinador?: {
    nombre: string
    profesion: string
    frase: string
    foto?: string
    iniciales: string
  } | null
}

export interface Principio {
  id: string
  titulo: string
  descripcion: string
  icono: 'inclusion' | 'honradez' | 'trabajo' | string
  orden: number
}

export interface Historia {
  titulo: string
  texto: string
  imagen?: string
}

export interface Hero {
  lema: string
  sublemas: string[]
  cta: string
}

export interface GaleriaItem {
  id: string
  url: string
  descripcion?: string
  orden: number
  fecha: string
}

export interface Documento {
  id: string
  titulo: string
  tipo: 'regimen-organico' | 'propuesta' | 'otro'
  url: string
  fecha: string
}
