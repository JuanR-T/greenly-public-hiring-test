import { IngredientDto } from "./get-ingredient.dto";

export class CreateFoodProductDto {
    name: string;
    unit: string;
    emissionCO2eInKgPerUnit: number | null;
    ingredients: IngredientDto[];
}
