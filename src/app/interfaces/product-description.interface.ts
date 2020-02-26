export interface ProductDescription {
  categoria: string;
  subtitulo: string;
  tipos: Tipo[];
  url: string;
}

interface Tipo {
  desc: string;
  producto: string;
  url: string;
}
