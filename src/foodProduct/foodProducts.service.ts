import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CarbonEmissionFactor } from "../carbonEmissionFactor/carbonEmissionFactor.entity";
import { CreateFoodProductDto } from "./dto/create-foodProduct.dto";
import { FoodProduct } from "./foodProduct.entity";
import { calculateFoodProductCarbonEmission } from "./foodProduct.utility";

@Injectable()
export class FoodProductsService {
    constructor(
        @InjectRepository(FoodProduct)
        private foodProductRepository: Repository<FoodProduct>,

        @InjectRepository(CarbonEmissionFactor)
        private readonly carbonEmissionFactorRepository: Repository<CarbonEmissionFactor>
    ) {}

    findAll(): Promise<FoodProduct[]> {
        return this.foodProductRepository.find();
    }

    async save(foodProduct: CreateFoodProductDto): Promise<FoodProduct> {
        const { name, unit, ingredients } = foodProduct;
        const emissionCO2eInKgPerUnit =
            await calculateFoodProductCarbonEmission(
                ingredients,
                this.carbonEmissionFactorRepository
            );

        const newfoodProduct = this.foodProductRepository.create({
            name,
            unit,
            emissionCO2eInKgPerUnit,
            ingredients,
        });

        return this.foodProductRepository.save(newfoodProduct);
    }
}
