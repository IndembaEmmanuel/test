import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RevenueChartProps {
  data: Array<{
    name: string;
    CA: number;
    Litres: number;
  }>;
}

export default function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">CA et Litres par événement</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} stroke="#6b7280" style={{ fontSize: '12px' }} />
          <YAxis yAxisId="left" orientation="left" stroke="#10B981" style={{ fontSize: '12px' }} />
          <YAxis yAxisId="right" orientation="right" stroke="#3B82F6" style={{ fontSize: '12px' }} />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
          <Legend wrapperStyle={{ color: '#374151' }} />
          <Bar yAxisId="left" dataKey="CA" fill="#10B981" name="CA (€)" />
          <Bar yAxisId="right" dataKey="Litres" fill="#3B82F6" name="Litres (L)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
