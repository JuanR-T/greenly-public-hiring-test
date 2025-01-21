import { dataSource, GreenlyDataSource } from "../../config/dataSource";
import { CarbonEmissionFactor } from "../carbonEmissionFactor/carbonEmissionFactor.entity";
import { getTestFoodProduct } from "../seed-dev-data";
import { FoodProduct } from "./foodProduct.entity";
import { FoodProductsService } from "./foodProducts.service";

let foodProductService: FoodProductsService;
let saltedBeefFoodProduct = getTestFoodProduct("saltedBeef");
let saltedTomatoBeefFoodProduct = getTestFoodProduct("saltedTomatoBeef");
beforeAll(async () => {
    await dataSource.initialize();
    foodProductService = new FoodProductsService(
        dataSource.getRepository(FoodProduct),
        dataSource.getRepository(CarbonEmissionFactor)
    );
});
beforeEach(async () => {
    await GreenlyDataSource.cleanDatabase();
    await dataSource.getRepository(FoodProduct).save(saltedBeefFoodProduct);
});

describe("FoodProducts.service", () => {
    it("should save new foodProduct", async () => {
        await foodProductService.save(saltedTomatoBeefFoodProduct);
        const retrieveSaltedTomatoBeefFoodProduct = await dataSource
            .getRepository(FoodProduct)
            .findOne({ where: { name: "saltedTomatoBeef" } });
        expect(retrieveSaltedTomatoBeefFoodProduct?.name).toBe(
            "saltedTomatoBeef"
        );
    });
    it("should retrieve emission Factors", async () => {
        const foodProducts = await foodProductService.findAll();
        expect(foodProducts).toHaveLength(1);
    });
});
