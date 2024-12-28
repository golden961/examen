import React, { useState } from 'react';
import { calculateCost } from './calculateCost';
import './Calculator.css';


const CalculatorPage = () => {
    const [area, setArea] = useState('');
    const [floors, setFloors] = useState(1);
    const [foundation, setFoundation] = useState('Ленточный');
    const [walls, setWalls] = useState('Кирпич');
    const [roof, setRoof] = useState('Плоская');
    const [options, setOptions] = useState([]);
    const [result, setResult] = useState(null);
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const calculationResult = calculateCost(area, floors, foundation, walls, roof, options);
        setResult(calculationResult);
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        // Здесь отправка данных на email через backend (например, через API)
        fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, result }),
        })
            .then(response => response.json())
            .then(data => {
                alert('Результаты отправлены на ваш email!');
            })
            .catch(error => {
                console.error('Ошибка при отправке email:', error);
            });
    };

    return (
        <div className="calculator-page">
            <h1>Калькулятор стоимости строительства</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Площадь (кв. м.):</label>
                    <input
                        type="number"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Количество этажей:</label>
                    <select value={floors} onChange={(e) => setFloors(e.target.value)}>
                        {[1, 2, 3, 4, 5].map((floor) => (
                            <option key={floor} value={floor}>
                                {floor}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Тип фундамента:</label>
                    <select value={foundation} onChange={(e) => setFoundation(e.target.value)}>
                        <option value="Ленточный">Ленточный</option>
                        <option value="Плитный">Плитный</option>
                        <option value="Столбчатый">Столбчатый</option>
                    </select>
                </div>

                <div>
                    <label>Материал стен:</label>
                    <select value={walls} onChange={(e) => setWalls(e.target.value)}>
                        <option value="Кирпич">Кирпич</option>
                        <option value="Дерево">Дерево</option>
                        <option value="Газобетон">Газобетон</option>
                    </select>
                </div>

                <div>
                    <label>Тип крыши:</label>
                    <select value={roof} onChange={(e) => setRoof(e.target.value)}>
                        <option value="Плоская">Плоская</option>
                        <option value="Скатная">Скатная</option>
                    </select>
                </div>

                <div>
                    <label>Дополнительные опции:</label>
                    <div>
                        <input
                            type="checkbox"
                            value="Балкон"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setOptions([...options, e.target.value]);
                                } else {
                                    setOptions(options.filter(option => option !== e.target.value));
                                }
                            }}
                        />
                        <label>Балкон</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value="Терраса"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setOptions([...options, e.target.value]);
                                } else {
                                    setOptions(options.filter(option => option !== e.target.value));
                                }
                            }}
                        />
                        <label>Терраса</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value="Гараж"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setOptions([...options, e.target.value]);
                                } else {
                                    setOptions(options.filter(option => option !== e.target.value));
                                }
                            }}
                        />
                        <label>Гараж</label>
                    </div>
                </div>

                <button type="submit">Рассчитать стоимость</button>
            </form>

            {result && (
                <div className="result">
                    <h2>Итоговая стоимость строительства</h2>
                    <p>Общая стоимость: {result.totalCost} руб.</p>
                    <h3>Разбивка по статьям расходов:</h3>
                    <ul>
                        <li>Фундамент: {result.breakdown.foundation} руб.</li>
                        <li>Материалы для стен: {result.breakdown.walls} руб.</li>
                        <li>Крыша: {result.breakdown.roof} руб.</li>
                        <li>Дополнительные опции: {result.breakdown.options} руб.</li>
                    </ul>
                </div>
            )}

            <form onSubmit={handleEmailSubmit}>
                <div>
                    <label>Ваш email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Отправить расчет на email</button>
            </form>
        </div>
    );
};

export default CalculatorPage;
