import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent, Button } from '../../ui';
import { Download, Maximize2, TrendingUp } from 'lucide-react';

/**
 * ChartCard - Componente de gráfico con Recharts
 * Soporta múltiples tipos: line, bar, area, pie
 */

const COLORS = ['#003598', '#fada04', '#b9d84d', '#dca8bf', '#ef4444', '#8b5cf6'];

export const ChartCard = ({
  title,
  subtitle,
  type = 'line',
  data = [],
  xKey = 'name',
  yKey = 'value',
  height = 300,
  showLegend = true,
  showGrid = true,
  onFullscreen,
  onExport,
}) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'Todo' },
    { id: '7d', label: '7 días' },
    { id: '30d', label: '30 días' },
    { id: '90d', label: '90 días' },
  ];

  const renderChart = () => {
    if (!data || data.length === 0) {
      return (
        <div className="flex items-center justify-center h-full text-gray-400">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No hay datos disponibles</p>
          </div>
        </div>
      );
    }

    const commonProps = {
      data,
      margin: { top: 5, right: 20, left: 0, bottom: 5 },
    };

    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart {...commonProps}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
              <XAxis dataKey={xKey} stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              {showLegend && <Legend />}
              <Line
                type="monotone"
                dataKey={yKey}
                stroke="#003598"
                strokeWidth={2}
                dot={{ fill: '#003598', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart {...commonProps}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
              <XAxis dataKey={xKey} stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              {showLegend && <Legend />}
              <Bar dataKey={yKey} fill="#003598" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart {...commonProps}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
              <XAxis dataKey={xKey} stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              {showLegend && <Legend />}
              <Area
                type="monotone"
                dataKey={yKey}
                stroke="#003598"
                fill="#003598"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey={yKey}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-2">
            {/* Filtros */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    activeFilter === filter.id
                      ? 'bg-white text-[#003598] shadow'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Actions */}
            {onFullscreen && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onFullscreen}
                title="Pantalla completa"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            )}

            {onExport && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onExport}
                title="Exportar"
              >
                <Download className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {renderChart()}
      </CardContent>
    </Card>
  );
};
