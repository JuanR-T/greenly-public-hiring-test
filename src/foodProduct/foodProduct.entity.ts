import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IngredientDto } from "./dto/get-ingredient.dto";

@Entity("food_products")
export class FoodProduct extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    name: string;

    @Column({
        nullable: false,
    })
    unit: string;

    @Column({
        type: "float",
        nullable: true,
    })
    emissionCO2eInKgPerUnit: number | null;

    @Column({
        type: "json",
        nullable: false,
    })
    ingredients: IngredientDto[];

    constructor(props: {
        name: string;
        unit: string;
        ingredients: IngredientDto[];
        emissionCO2eInKgPerUnit: number;
    }) {
        super();

        this.name = props?.name;
        this.unit = props?.unit;
        this.emissionCO2eInKgPerUnit = props?.emissionCO2eInKgPerUnit;
        this.ingredients = props?.ingredients;
    }
}
