'use client';

import { useState, useEffect, useMemo } from 'react';
import StatsCards from '@/components/StatsCards';
import Filters from '@/components/Filters';
import RevenueChart from '@/components/RevenueChart';
import VenueChart from '@/components/VenueChart';
import EventsTable from '@/components/EventsTable';

interface Event {
  id: number;
  name: string;
  date: string;
  venue: string;
  liters: number;
  revenue_eur: number;
}

interface Stats {
  total_liters: number;
  total_revenue_eur: number;
  distinct_venues: string[];
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [venueFilter, setVenueFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [eventsRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/events`),
        fetch(`${API_URL}/stats/summary`)
      ]);

      if (!eventsRes.ok || !statsRes.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }

      const eventsData = await eventsRes.json();
      const statsData = await statsRes.json();

      setEvents(eventsData);
      setStats(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesVenue = !venueFilter || event.venue.toLowerCase().includes(venueFilter.toLowerCase());
      const matchesDate = !dateFilter || event.date.includes(dateFilter);
      return matchesVenue && matchesDate;
    });
  }, [events, venueFilter, dateFilter]);

  const uniqueVenues = stats?.distinct_venues || [];

  const revenueChartData = useMemo(() => {
    return events.map(event => ({
      name: event.name.length > 15 ? event.name.substring(0, 15) + '...' : event.name,
      CA: event.revenue_eur,
      Litres: event.liters
    }));
  }, [events]);

  const venueChartData = useMemo(() => {
    const venueStats = events.reduce((acc, event) => {
      if (!acc[event.venue]) {
        acc[event.venue] = { venue: event.venue, litres: 0, ca: 0 };
      }
      acc[event.venue].litres += event.liters;
      acc[event.venue].ca += event.revenue_eur;
      return acc;
    }, {} as Record<string, { venue: string; litres: number; ca: number }>);

    return Object.values(venueStats);
  }, [events]);

  const handleResetFilters = () => {
    setVenueFilter('');
    setDateFilter('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des données...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 font-semibold text-lg mb-2">Erreur</h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchData}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Flashboard - Événements</h1>

        {stats && (
          <StatsCards
            totalLiters={stats.total_liters}
            totalRevenue={stats.total_revenue_eur}
            distinctVenuesCount={stats.distinct_venues.length}
          />
        )}

        <Filters
          venueFilter={venueFilter}
          dateFilter={dateFilter}
          uniqueVenues={uniqueVenues}
          onVenueChange={setVenueFilter}
          onDateChange={setDateFilter}
          onReset={handleResetFilters}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RevenueChart data={revenueChartData} />
          <VenueChart data={venueChartData} />
        </div>

        <EventsTable events={filteredEvents} />

        <div className="mt-6 text-sm text-gray-500 text-center">
          {filteredEvents.length} événement(s) affiché(s) sur {events.length} total
        </div>
      </div>
    </main>
  );
}
