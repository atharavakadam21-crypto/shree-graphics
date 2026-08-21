export interface Machine {
  id: string;
  name: string;
  slug: string;

  short_description: string | null;
  description: string | null;

  specifications: Record<string, unknown>;

  images: string[];

  featured: boolean;
  is_active: boolean;

  created_at: string;
  updated_at: string;
}

export interface SparePart {
  id: string;
  name: string;
  slug: string;

  short_description: string | null;
  description: string | null;

  category: string | null;

  machine_compatibility: string[];

  specifications: Record<string, unknown>;

  images: string[];

  featured: boolean;
  is_active: boolean;

  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  machine_id: string | null;
  status: 'new' | 'contacted' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface Admin {
  id: string;
  email: string;
  role: 'admin';
}
export interface AirShaft {
  id: string;
  name: string;
  slug: string;
  type: string | null;
  short_description: string | null;
  description: string | null;
  specifications: Record<string, unknown>;
  images: string[];
  featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}