import sgMail from "@sendgrid/mail";

export class EmailService {
  private static instance: EmailService;
  private apiKey: string;

  private constructor(apiKey: string) {
    this.apiKey = apiKey;
    sgMail.setApiKey(this.apiKey);
  }

  /**
   * Get the singleton instance of EmailService.
   */
  public static getInstance(apiKey: string = process.env.SENDGRID_API_KEY || "your_sendgrid_api_key"): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService(apiKey);
    }
    return EmailService.instance;
  }

  /**
   * Sends a plain text email.
   * @param to Recipient email address.
   * @param subject Email subject.
   * @param text Plain text content.
   */
  async sendPlainTextEmail(to: string, subject: string, text: string): Promise<void> {
    const msg = {
      to,
      from: process.env.SENDGRID_SENDER_EMAIL || "noreply@example.com",
      subject,
      text,
    };

    await this.sendEmail(msg);
  }

  /**
   * Sends an HTML email.
   * @param to Recipient email address.
   * @param subject Email subject.
   * @param html HTML content of the email.
   */
  async sendHtmlEmail(to: string, subject: string, html: string): Promise<void> {
    const msg = {
      to,
      from: process.env.SENDGRID_SENDER_EMAIL || "noreply@example.com",
      subject,
      html,
    };

    await this.sendEmail(msg);
  }

  /**
   * Sends an email with attachments.
   * @param to Recipient email address.
   * @param subject Email subject.
   * @param text Optional plain text content.
   * @param html Optional HTML content.
   * @param attachments List of attachments.
   */
  async sendEmailWithAttachments(
    to: string,
    subject: string,
    text?: string,
    html?: string,
    attachments?: Array<{ content: string; filename: string; type: string; disposition: string }>,
  ): Promise<void> {
    const msg: sgMail.MailDataRequired = {
      to,
      from: process.env.SENDGRID_SENDER_EMAIL || "noreply@example.com",
      subject,
      text,
      html,
      content: [
        {
          type: "",
          value: "",
        },
      ],
      attachments: attachments?.map((attachment) => ({
        content: attachment.content,
        filename: attachment.filename,
        type: attachment.type,
        disposition: attachment.disposition,
      })),
    };

    await this.sendEmail(msg);
  }

  /**
   * Sends a templated email.
   * @param to Recipient email address.
   * @param templateId SendGrid template ID.
   * @param dynamicTemplateData Dynamic data for the template.
   */
  async sendTemplatedEmail(
    to: string,
    templateId: string,
    dynamicTemplateData: Record<string, unknown>,
  ): Promise<void> {
    const msg = {
      to,
      from: process.env.SENDGRID_SENDER_EMAIL || "noreply@example.com",
      templateId,
      dynamicTemplateData,
    };

    await this.sendEmail(msg);
  }

  /**
   * Common function to send an email.
   * @param msg Email message object.
   */
  private async sendEmail(msg: sgMail.MailDataRequired): Promise<void> {
    try {
      const result = await sgMail.send(msg);
    } catch (error) {
      const err = error as Error;
      console.error("Error sending email:", err.message);
      throw new Error("Failed to send email");
    }
  }
}

export default EmailService.getInstance(process.env.SENDGRID_API_KEY || "your_sendgrid_api_key");
