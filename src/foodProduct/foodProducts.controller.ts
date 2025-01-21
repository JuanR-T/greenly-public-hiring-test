import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { CreateFoodProductDto } from "./dto/create-foodProduct.dto";
import { FoodProduct } from "./foodProduct.entity";
import { FoodProductsService } from "./foodProducts.service";

@Controller("food-products")
export class FoodProductsController {
    constructor(private readonly foodProductService: FoodProductsService) {}

    @Get()
    getFoodProducts(): Promise<FoodProduct[]> {
        Logger.log(
            `[food-products] [GET] FoodProduct: getting all FoodProducts`
        );
        return this.foodProductService.findAll();
    }

    @Post()
    createFoodProducts(
        @Body() foodProducts: CreateFoodProductDto
    ): Promise<FoodProduct | null> {
        ``;
        Logger.log(
            `[food-products] [POST] FoodProduct: ${foodProducts} created`
        );
        return this.foodProductService.save(foodProducts);
    }
}
