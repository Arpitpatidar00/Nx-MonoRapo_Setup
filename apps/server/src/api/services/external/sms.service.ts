import twilio from "twilio";

export class SmsService {
  private static instance: SmsService;
  private client: twilio.Twilio;
  private sender: string;

  private constructor(accountSid: string, authToken: string, sender: string) {
    this.client = twilio(accountSid, authToken);
    this.sender = sender;
  }

  public static getInstance(
    accountSid: string = process.env.TWILIO_ACCOUNT_SID || "AC_ur_account_sid",
    authToken: string = process.env.TWILIO_AUTH_TOKEN || "your_auth_token",
    sender: string = process.env.TWILIO_PHONE_NUMBER || "your_twilio_phone_number",
  ): SmsService {
    if (!SmsService.instance) {
      SmsService.instance = new SmsService(accountSid, authToken, sender);
    }
    return SmsService.instance;
  }

  async sendTextMessage(to: string, body: string): Promise<void> {
    try {
      await this.client.messages.create({
        body,
        from: this.sender,
        to,
      });
      console.log(`SMS sent successfully to: ${to}`);
    } catch (error: unknown) {
      const err = error as Error;
      console.error(`Failed to send SMS to ${to}:`, err.message);
      throw new Error("Failed to send SMS");
    }
  }

  async sendTemplatedMessage(
    to: string,
    template: string,
    dynamicData: Record<string, string | number>,
  ): Promise<void> {
    const messageBody = this.interpolateTemplate(template, dynamicData);
    await this.sendTextMessage(to, messageBody);
  }

  private interpolateTemplate(template: string, data: Record<string, string | number>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
      const value = data[key];
      return value !== undefined ? String(value) : "";
    });
  }
}

export default SmsService.getInstance(
  process.env.TWILIO_ACCOUNT_SID || "AC_ur_account_sid",
  process.env.TWILIO_AUTH_TOKEN || "your_auth_token",
  process.env.TWILIO_PHONE_NUMBER || "your_twilio_phone_number",
);
