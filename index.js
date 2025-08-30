const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

// If NODE_ENV isn't set, assume development locally to avoid accidental production checks.
if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = 'development';
	console.warn('NODE_ENV not set — defaulting to "development" for local runs.');
}

const app = express();
app.use(express.json());

// CORS configuration: allow origins from environment variable (comma separated) or allow Vercel hosts
const allowedEnv = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
// Also allow Vercel runtime vars if present
const vercelOrigins = [];
if (process.env.VERCEL_URL) vercelOrigins.push(`https://${process.env.VERCEL_URL}`);
if (process.env.VERCEL_BRANCH_URL) vercelOrigins.push(`https://${process.env.VERCEL_BRANCH_URL}`);

const allowed = Array.from(new Set([...allowedEnv, ...vercelOrigins]));

if (allowed.length > 0) {
	app.use(cors({ origin: function(origin, cb) {
		// allow server-to-server (no origin) requests
		if (!origin) return cb(null, true);
		if (allowed.indexOf(origin) !== -1) return cb(null, true);
		cb(new Error('CORS policy: This origin is not allowed'));
	}}));
	console.log('CORS allowed origins:', allowed);
} else {
	// If no ALLOWED_ORIGINS configured, allow all origins in development only
	if (process.env.NODE_ENV === 'development') {
		app.use(cors());
		console.warn('ALLOWED_ORIGINS not set — allowing all origins in development. Set ALLOWED_ORIGINS for production.');
	} else {
		// If Vercel env vars present, allow them; else fail fast
		if (vercelOrigins.length > 0) {
			app.use(cors({ origin: function(origin, cb) {
				if (!origin) return cb(null, true);
				if (vercelOrigins.indexOf(origin) !== -1) return cb(null, true);
				cb(new Error('CORS policy: This origin is not allowed'));
			}}));
			console.log('CORS allowed Vercel origins:', vercelOrigins);
		} else {
			// For easier deployments (e.g. if backend is deployed separately and ALLOWED_ORIGINS
			// wasn't configured), allow all origins but log a loud warning. It's strongly
			// recommended to set ALLOWED_ORIGINS in production to restrict which frontends
			// may call this API.
			console.warn('ALLOWED_ORIGINS not set and no VERCEL_* variables detected. Allowing all origins for now — set ALLOWED_ORIGINS in production to restrict access.');
			app.use(cors());
		}
	}
}

// Connect DB
connectDB();

// Routes
app.get('/', (req, res) => res.send({ ok: true, message: 'E-Suvidha Backend' }));
app.use('/api/tenders', require('./routes/tenderRoutes'));
app.use('/api/bids', require('./routes/bidRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
