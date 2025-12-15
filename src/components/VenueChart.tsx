import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface VenueChartProps {
  data: Array<{
    venue: string;
    litres: number;
    ca: number;
  }>;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function VenueChart({ data }: VenueChartProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Distribution par lieu</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="ca"
            nameKey="venue"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={(entry: any) => `${entry.venue}: ${entry.ca.toLocaleString()}€`}
            style={{ fontSize: '12px', fill: '#374151' }}
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number | undefined) => value ? `${value.toLocaleString()} €` : '0 €'}
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#374151' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
