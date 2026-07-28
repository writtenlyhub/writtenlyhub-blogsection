export interface NewsletterSubscriberInput {
  email: string;
  firstName?: string;
  source?: string;
  confirmationUrl?: string; // used for double opt-in email
}

export interface NewsletterProvider {
  /**
   * Send the double opt-in confirmation email to the user.
   */
  sendConfirmationEmail(input: NewsletterSubscriberInput): Promise<boolean>;

  /**
   * Subscribe a user directly to the external newsletter platform.
   * This is typically called after they click the confirmation link.
   */
  addSubscriber(input: NewsletterSubscriberInput): Promise<boolean>;
}

/**
 * Factory to get the active newsletter provider.
 */
export async function getNewsletterProvider(): Promise<NewsletterProvider> {
  const providerType = process.env.EMAIL_PROVIDER || 'brevo';
  
  if (providerType === 'brevo') {
    const { BrevoProvider } = await import('./providers/brevo');
    return new BrevoProvider();
  }

  // Fallback / unimplemented providers can throw or be stubbed
  throw new Error(`Email provider ${providerType} is not supported yet.`);
}
