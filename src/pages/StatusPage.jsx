import React from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';

const StatusPage = () => {
    const data = [
        { name: 'Income', value: 300, color: '#2ecc71' },
        { name: 'Expenses', value: 200, color: '#e74c3c' },
    ];

    const total = data.reduce((acc, current) => acc + current.value, 0);

    return (
        <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 className="title" style={{ color: '#fff', fontSize: 24, marginBottom: 20 }}>
                Financial Status
            </h2>
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                >
                    {data.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                    ))}
                </Pie>
                <Sector
                    cx={200}
                    cy={200}
                    innerRadius={60}
                    outerRadius={80}
                    startAngle={0}
                    endAngle={360}
                    fill="none"
                >
                    <text
                        x={200}
                        y={200}
                        textAnchor="middle"
                        fontSize={24}
                        fill="#fff"
                    >
                        ${total}
                    </text>
                </Sector>
            </PieChart>
            <div style={{ marginTop: 20, fontSize: 18, color: '#fff' }}>
                <p>
                    Income: <span style={{ color: '#2ecc71' }}>${data[0].value}</span>
                </p>
                <p>
                    Expenses: <span style={{ color: '#e74c3c' }}>${data[1].value}</span>
                </p>
                <p>
                    Total: <span style={{ color: '#fff' }}>${total}</span>
                </p>
            </div>
        </div>
    );
};

export default StatusPage;