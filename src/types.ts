export type SectionId =
  | 'home'
  | 'about-us'
  | 'products'
  | 'manufacturing'
  | 'industries'
  | 'quality'
  | 'rnd'
  | 'gallery'
  | 'downloads'
  | 'careers'
  | 'contact-us';

export interface NavChild {
  label: string;
  path: string;
}

export interface NavItem {
  id: SectionId;
  label: string;
  path: string;
  children: NavChild[];
}

export interface StatItem {
  label: string;
  value: string;
}

export interface TableSpec {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export interface DownloadFile {
  name: string;
  type: string;
  size: string;
  updated: string;
  description: string;
}

export interface GalleryPhoto {
  label: string;
  caption: string;
  tone: string;
}

export interface Position {
  title: string;
  dept: string;
  loc: string;
  type: string;
}

export interface LocationInfo {
  name: string;
  lines: string[];
}

export type FormKind = 'contact' | 'inquiry' | 'rfq' | 'careers';

export interface HomeImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ContentBlock {
  type:
    | 'hero'
    | 'heading'
    | 'paragraph'
    | 'list'
    | 'steps'
    | 'table'
    | 'stats'
    | 'quote'
    | 'gallery'
    | 'downloads'
    | 'highlight'
    | 'positions'
    | 'locations'
    | 'form'
    | 'news'
    | 'links'
    | 'images';
  title?: string;
  text?: string;
  items?: string[];
  table?: TableSpec;
  stats?: StatItem[];
  photos?: GalleryPhoto[];
  files?: DownloadFile[];
  positions?: Position[];
  locations?: LocationInfo[];
  formKind?: FormKind;
  newsItems?: { date: string; title: string; text: string }[];
  links?: { label: string; path: string }[];
  images?: HomeImage[];
}

export interface PageDef {
  path: string;
  title: string;
  section: SectionId;
  sectionLabel: string;
  navLabel: string;
  breadcrumb: [string, string][];
  keywords: string[];
  summary: string;
  blocks: ContentBlock[];
}