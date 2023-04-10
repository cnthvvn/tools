import { CategoryType } from "@prisma/client";

export { CategoryType };

const categoryType: Record<CategoryType, string> = {
  development: "Développement Web",
  design: "Design",
  business: "Business",
  marketing: "Marketing",
};

export function getCategoryTypeLabel(type: CategoryType) {
  return categoryType[type]?.toLocaleUpperCase();
}

export function generateCategoryChoices() {
  return Object.entries(categoryType).map(([value, label]) => ({
    value,
    label,
  }));
}
