import 'dotenv/config';

import app from './app.js';
import './config/supabase.js';

const PORT = Number(process.env.PORT) || 5000;

const startServer = async (): Promise<void> => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();