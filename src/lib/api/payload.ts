import { getPayload } from 'payload'
import config from '../../payload.config'

/**
 * Initializes and returns the local Payload instance for server-side operations.
 */
export const getPayloadClient = async () => {
  return await getPayload({
    config,
  })
}
