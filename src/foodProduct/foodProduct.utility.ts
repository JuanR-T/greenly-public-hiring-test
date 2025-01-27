import { Repository } from "typeorm";
import { CarbonEmissionFactor } from "../carbonEmissionFactor/carbonEmissionFactor.entity";
import { IngredientDto } from "./dto/get-ingredient.dto";

export const calculateFoodProductCarbonEmission = async (
    ingredients: IngredientDto[],
    carbonEmissionFactorRepository: Repository<CarbonEmissionFactor>
): Promise<number | null> => {
    let emissionCO2eInKgPerUnit: number | null = 0;

    for (const ingredient of ingredients) {
        const ingredientEmissionFactor =
            await carbonEmissionFactorRepository.findOne({
                where: { name: ingredient.name, unit: ingredient.unit },
            });

        if (!ingredientEmissionFactor) {
            return null;
        }

        emissionCO2eInKgPerUnit +=
            ingredient.quantity *
            ingredientEmissionFactor.emissionCO2eInKgPerUnit;
    }
    return emissionCO2eInKgPerUnit;
};
