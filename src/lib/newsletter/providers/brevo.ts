import { NewsletterProvider, NewsletterSubscriberInput } from '../provider';

export class BrevoProvider implements NewsletterProvider {
  private apiKey: string;
  
  constructor() {
    this.apiKey = process.env.BREVO_API_KEY || '';
  }

  async sendConfirmationEmail(input: NewsletterSubscriberInput): Promise<boolean> {
    if (!this.apiKey) {
      console.warn('BREVO_API_KEY is not set. Simulating confirmation email to:', input.email);
      console.log(`[Brevo Simulation] Confirmation URL: ${input.confirmationUrl}`);
      return true;
    }

    try {
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': this.apiKey,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          sender: { 
            name: "WrittenlyHub", 
            email: process.env.EMAIL_FROM || "newsletter@writtenlyhub.com" 
          },
          to: [{ 
            email: input.email, 
            name: input.firstName || "" 
          }],
          subject: "Confirm your subscription to WrittenlyHub",
          htmlContent: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Welcome to WrittenlyHub!</h2>
              <p>Thanks for subscribing. Please click the link below to confirm your email address and join the newsletter.</p>
              <p>
                <a href="${input.confirmationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #f97316; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">
                  Confirm Subscription
                </a>
              </p>
              <p style="font-size: 12px; color: #666; margin-top: 40px;">
                If you didn't request this, you can safely ignore this email.
              </p>
            </div>
          `
        })
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Brevo API Error (sendConfirmationEmail):', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error sending confirmation email via Brevo:', error);
      return false;
    }
  }

  async addSubscriber(input: NewsletterSubscriberInput): Promise<boolean> {
    if (!this.apiKey) {
      console.warn('BREVO_API_KEY is not set. Simulating adding subscriber:', input.email);
      return true;
    }

    try {
      const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'api-key': this.apiKey,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: input.email,
          attributes: {
            FIRSTNAME: input.firstName || "",
            SOURCE: input.source || ""
          },
          updateEnabled: true
          // You might want to specify listIds if using specific lists in Brevo:
          // listIds: [1] 
        })
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Brevo API Error (addSubscriber):', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error adding subscriber via Brevo:', error);
      return false;
    }
  }
}
