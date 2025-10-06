import puppeteer from 'puppeteer';

export class WhatsAppService {
  private browser: puppeteer.Browser | null = null;
  private page: puppeteer.Page | null = null;

  async initialize() {
    this.browser = await puppeteer.launch({
      headless: false, // set to true if you don’t need to see the browser window
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });

    this.page = await this.browser.newPage();
    await this.page.goto('https://web.whatsapp.com');

    console.log('Please scan the QR code in the browser window...');
    await this.page.waitForSelector('div[data-testid="chat-list"]', { timeout: 0 });
    console.log('WhatsApp Web logged in successfully.');
  }

  async sendMessage(phoneNumber: string, message: string): Promise<boolean> {
    if (!this.page) {
      throw new Error('WhatsApp not initialized');
    }

    try {
      const url = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
      await this.page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

      await this.page.waitForSelector('button[data-testid="compose-btn-send"]', { timeout: 15000 });
      await this.page.click('button[data-testid="compose-btn-send"]');
      await this.page.waitForTimeout(2000);

      console.log(`Message sent to ${phoneNumber}`);
      return true;
    } catch (error) {
      console.error(`Failed to send message to ${phoneNumber}:`, error);
      return false;
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}
