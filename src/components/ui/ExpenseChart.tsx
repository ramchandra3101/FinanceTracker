// components/ui/Chart.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface ChartProps {
  type: 'bar' | 'line' | 'pie' | 'doughnut';
  data: any[];
  options?: any;
  height?: number;
}

export const ExpenseChart: React.FC<ChartProps> = ({ 
  type, 
  data, 
  options = {}, 
  height = 300 
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<any> | null>(null);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    // Destroy the previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    
    // Prepare data for Chart.js
    const chartData = {
      labels: data.map(item => item.label),
      datasets: [
        {
          data: data.map(item => item.value || item.amount),
          backgroundColor: data.map(item => item.color || getRandomColor()),
          borderWidth: 1,
        },
      ],
    };
    
    // Create the chart
    chartInstance.current = new Chart(ctx, {
      type,
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        ...options,
      },
    });
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [type, data, options]);
  
  // Helper function to generate random colors
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  return <canvas ref={chartRef} height={height} />;
};