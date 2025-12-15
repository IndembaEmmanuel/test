import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Données en mémoire
const events = [
  { id: 1, name: "OM vs Brest", date: "2025-06-15", venue: "Orange Vélodrome", liters: 780.5, revenue_eur: 40250 },
  { id: 2, name: "Delta J1", date: "2025-07-04", venue: "Marseille", liters: 520.2, revenue_eur: 28500 },
  { id: 3, name: "Delta J2", date: "2025-07-05", venue: "Marseille", liters: 610.0, revenue_eur: 31200 },
  { id: 4, name: "Family Piknik", date: "2025-08-24", venue: "Montpellier", liters: 230.0, revenue_eur: 11200 },
  { id: 5, name: "Match amical", date: "2025-09-02", venue: "Nantes", liters: 95.7, revenue_eur: 5100 }
];

// GET /events - Liste complète des événements
app.get('/events', (req, res) => {
  try {
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des événements' });
  }
});

// GET /stats/summary - Statistiques globales
app.get('/stats/summary', (req, res) => {
  try {
    const totalLiters = events.reduce((sum, event) => sum + event.liters, 0);
    const totalRevenue = events.reduce((sum, event) => sum + event.revenue_eur, 0);
    const distinctVenues = [...new Set(events.map(event => event.venue))];

    res.status(200).json({
      total_liters: totalLiters,
      total_revenue_eur: totalRevenue,
      distinct_venues: distinctVenues
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors du calcul des statistiques' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`API démarrée sur http://localhost:${PORT}`);
});
