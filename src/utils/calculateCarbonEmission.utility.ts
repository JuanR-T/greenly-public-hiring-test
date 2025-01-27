import { Repository } from "typeorm";
import { CarbonEmissionFactor } from "../carbonEmissionFactor/carbonEmissionFactor.entity";

type carbonEmissionComponent = {
    name: string;
    quantity: number;
    unit: string;
};

export const calculateCarbonEmission = async <
    T extends carbonEmissionComponent,
>(
    carbonEmissionComponents: T[],
    carbonEmissionFactorRepository: Repository<CarbonEmissionFactor>
): Promise<number | null> => {
    let emissionCO2eInKgPerUnit: number | null = 0;

    for (const carbonEmissionComponent of carbonEmissionComponents) {
        const emissionFactor = await carbonEmissionFactorRepository.findOne({
            where: {
                name: carbonEmissionComponent.name,
                unit: carbonEmissionComponent.unit,
            },
        });

        if (!emissionFactor) {
            return null;
        }

        emissionCO2eInKgPerUnit +=
            carbonEmissionComponent.quantity *
            emissionFactor.emissionCO2eInKgPerUnit;
    }

    return emissionCO2eInKgPerUnit;
};
