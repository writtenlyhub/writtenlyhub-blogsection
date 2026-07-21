import { getPayload } from 'payload'
import config from '../../payload.config'

/**
 * Initializes and returns the local Payload instance for server-side operations.
 */
export const getPayloadClient = async () => {
  try {
    return await getPayload({
      config,
    })
  } catch (error: any) {
    console.error('\n❌ DATABASE CONNECTION ERROR:');
    console.error('Payload CMS failed to start because it could not connect to PostgreSQL.');
    console.error('Please ensure that PostgreSQL is running locally and that the DATABASE_URI in your .env file is correct.\n');
    console.error('Error Details:', error.message);
    
    throw new Error('Database unavailable. Please check your PostgreSQL connection.');
  }
}
