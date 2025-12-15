interface StatsCardsProps {
  totalLiters: number;
  totalRevenue: number;
  distinctVenuesCount: number;
}

export default function StatsCards({ totalLiters, totalRevenue, distinctVenuesCount }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-500 text-sm font-medium">Total Litres</h3>
        <p className="text-3xl font-bold text-blue-600 mt-2">{totalLiters.toFixed(1)} L</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-500 text-sm font-medium">Chiffre d&apos;affaires</h3>
        <p className="text-3xl font-bold text-green-600 mt-2">{totalRevenue.toLocaleString()} €</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-500 text-sm font-medium">Lieux distincts</h3>
        <p className="text-3xl font-bold text-purple-600 mt-2">{distinctVenuesCount}</p>
      </div>
    </div>
  );
}
