export const calculateCost = (area, floors, foundation, walls, roof, options) => {
    const basePricePerSquareMeter = 5000; // Стоимость за квадратный метр (пример)
    let foundationCost = 0;
    let wallsCost = 0;
    let roofCost = 0;
    let optionsCost = 0;

    // Расчет стоимости фундамента
    switch (foundation) {
        case 'Ленточный':
            foundationCost = area * 1500;
            break;
        case 'Плитный':
            foundationCost = area * 2000;
            break;
        case 'Столбчатый':
            foundationCost = area * 1200;
            break;
        default:
            foundationCost = 0;
    }

    // Расчет стоимости стен
    switch (walls) {
        case 'Кирпич':
            wallsCost = area * 3000;
            break;
        case 'Дерево':
            wallsCost = area * 2500;
            break;
        case 'Газобетон':
            wallsCost = area * 2000;
            break;
        default:
            wallsCost = 0;
    }

    // Расчет стоимости крыши
    if (roof === 'Плоская') {
        roofCost = area * 5000;
    } else if (roof === 'Скатная') {
        roofCost = area * 6000;
    }

    // Расчет стоимости дополнительных опций
    options.forEach(option => {
        if (option === 'Балкон') optionsCost += 50000;
        if (option === 'Терраса') optionsCost += 70000;
        if (option === 'Гараж') optionsCost += 100000;
    });

    // Итоговая стоимость
    const totalCost = (area * basePricePerSquareMeter) + foundationCost + wallsCost + roofCost + optionsCost;

    return {
        totalCost,
        breakdown: {
            foundation: foundationCost,
            walls: wallsCost,
            roof: roofCost,
            options: optionsCost,
        }
    };
};
