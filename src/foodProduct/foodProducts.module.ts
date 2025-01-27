import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarbonEmissionFactorsModule } from "../carbonEmissionFactor/carbonEmissionFactors.module";
import { FoodProduct } from "./foodProduct.entity";
import { FoodProductsController } from "./foodProducts.controller";
import { FoodProductsService } from "./foodProducts.service";
@Module({
    imports: [
        TypeOrmModule.forFeature([FoodProduct]),
        CarbonEmissionFactorsModule,
    ],
    providers: [FoodProductsService],
    controllers: [FoodProductsController],
})
export class FoodProductsModule {}
