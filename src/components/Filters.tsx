interface FiltersProps {
  venueFilter: string;
  dateFilter: string;
  uniqueVenues: string[];
  onVenueChange: (venue: string) => void;
  onDateChange: (date: string) => void;
  onReset: () => void;
}

export default function Filters({
  venueFilter,
  dateFilter,
  uniqueVenues,
  onVenueChange,
  onDateChange,
  onReset
}: FiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Filtres</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filtrer par lieu
          </label>
          <select
            value={venueFilter}
            onChange={(e) => onVenueChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-white"
          >
            <option value="">Tous les lieux</option>
            {uniqueVenues.map(venue => (
              <option key={venue} value={venue}>{venue}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filtrer par date
          </label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-white"
          />
        </div>
      </div>
      {(venueFilter || dateFilter) && (
        <button
          onClick={onReset}
          className="mt-4 text-sm text-blue-600 hover:text-blue-800"
        >
          Réinitialiser les filtres
        </button>
      )}
    </div>
  );
}
