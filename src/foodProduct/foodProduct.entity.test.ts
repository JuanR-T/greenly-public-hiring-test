import { dataSource, GreenlyDataSource } from "../../config/dataSource";
import { FoodProduct } from "./foodProduct.entity";

let saltedBeefFoodProduct: FoodProduct;
beforeAll(async () => {
    await dataSource.initialize();
    saltedBeefFoodProduct = new FoodProduct({
        name: "saltedBeef",
        unit: "kg",
        ingredients: [
            {
                name: "beef",
                quantity: 0.15,
                unit: "kg",
            },
            {
                name: "oliveOil",
                quantity: 0.25,
                unit: "kg",
            },
        ],
        emissionCO2eInKgPerUnit: null,
    });
});
beforeEach(async () => {
    await GreenlyDataSource.cleanDatabase();
});
describe("FoodProductEntity", () => {
    describe("constructor", () => {
        it("should create a food product", () => {
            expect(saltedBeefFoodProduct.name).toBe("saltedBeef");
        });
        it("should throw an error if the ingredients are empty", () => {
            expect(() => {
                const foodProduct = new FoodProduct({
                    name: "saltedBeef",
                    unit: "",
                    ingredients: [
                        {
                            name: "beef",
                            quantity: 0.15,
                            unit: "kg",
                        },
                        {
                            name: "oliveOil",
                            quantity: 0.25,
                            unit: "kg",
                        },
                    ],
                    emissionCO2eInKgPerUnit: null,
                });
            }).toThrow();
        });
    });
});

afterAll(async () => {
    await dataSource.destroy();
});
