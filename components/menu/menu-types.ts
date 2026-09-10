export type MenuItemDto = {
  id: string;
  name: string;
  description: string | null;
  price: string;
  imageUrl: string | null;
  isAvailable: boolean;
  position: number;
  categoryId: string;
};

export type MenuCategoryDto = {
  id: string;
  name: string;
  position: number;
  items: MenuItemDto[];
};
