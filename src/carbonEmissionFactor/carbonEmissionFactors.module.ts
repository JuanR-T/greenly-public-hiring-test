import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarbonEmissionFactor } from "./carbonEmissionFactor.entity";
import { CarbonEmissionFactorsController } from "./carbonEmissionFactors.controller";
import { CarbonEmissionFactorsService } from "./carbonEmissionFactors.service";

@Module({
    imports: [TypeOrmModule.forFeature([CarbonEmissionFactor])],
    exports: [TypeOrmModule],
    providers: [CarbonEmissionFactorsService],
    controllers: [CarbonEmissionFactorsController],
})
export class CarbonEmissionFactorsModule {}
