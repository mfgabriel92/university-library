export interface AdminSideBarLink {
  img: string;
  route: string;
  text: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  isLoaned: boolean;
}

export interface BorrowStatus {
  value: string;
  label: string;
  bgColor: string;
  textColor: string;
}

export type BookCoverVariants =
  | "extraSmall"
  | "small"
  | "medium"
  | "regular"
  | "wide";

export interface FieldNames {
  fullname: string;
  email: string;
  universityId: string;
  password: string;
  universityCard: string;
}

export interface FieldTypes {
  fullname: string;
  email: string;
  universityId: string;
  password: string;
}

export interface NavigationLink {
  href: string;
  label: string;
  img?: string;
  selectedImg?: string;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface UserRole {
  value: string;
  label: string;
  bgColor: string;
  textColor: string;
}
