import { ProductResultOut } from "../entities/product.result.out.entity";

export const mapProductResult = (data: any): ProductResultOut => {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      shortDescription: data.short_description,
      ingredients: data.ingredients,
      instructions: data.instructions,
      priceLast: data.price_last,
      priceCurrent: data.price_current,
    };
  };