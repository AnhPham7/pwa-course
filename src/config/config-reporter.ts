import {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from "@playwright/test/reporter";

export default class MyCustomerReporter implements Reporter {
  totalTest: number = 0; // Tong so test trong suite
  // Luu so test theo status result
  totalPassed: number = 0;
  totalFailed: number = 0;
  totalSkipped: number = 0;
  totalTimeOut: number = 0;
  totalInterrupt: number = 0;

  // Luu danh sach cac test theo status result (title + duration)
  passedCase: string[] = [];
  failedCase: string[] = [];
  skippedCase: string[] = [];
  timeOutCase: string[] = [];
  interruptCase: string[] = [];

  content: string[] = []; // Luu cac dong report cuoi cung

  async onBegin(config: FullConfig, suite: Suite): Promise<void> {
    this.totalTest = suite.allTests().length;
  }

  onTestBegin(test: TestCase, result: TestResult): void {}

  onTestEnd(test: TestCase, result: TestResult): void {
    switch (result.status) {
      case "passed":
        this.totalPassed++;
        this.passedCase.push(`${test.title} (${result.duration / 1000})`);
        break;
      case "failed":
        this.totalFailed++;
        this.failedCase.push(`${test.title} (${result.duration / 1000})`);
        break;
      case "timedOut":
        this.totalTimeOut++;
        this.timeOutCase.push(`${test.title} (${result.duration / 1000})`);
        break;
      case "skipped":
        this.totalSkipped++;
        this.skippedCase.push(`${test.title} (${result.duration / 1000})`);
        break;
      case "interrupted":
        this.totalInterrupt++;
        this.interruptCase.push(`${test.title} (${result.duration / 1000})`);
        break;
    }
  }

  async onEnd(
    result: FullResult
  ): Promise<void | { status?: FullResult["status"] } | undefined> {
    const reportingTime = new Date(Date.now()).toLocaleString();
    const reportChannels =
      process.env.REPORT_CHANNELS?.split(",").map((channel) =>
        channel.trim()
      ) || [];

    const reportPromises = reportChannels.map((channel) => {
      const userId = this.getUserIdForChannel(channel);
      this.buildReportContent(reportingTime, userId);

      switch (channel.toLowerCase()) {
        case "discord":
          return this.sendDiscordReport();
        case "slack":
          return this.sendSlackReport();
        case "telegram":
          return this.sendTelegramReport();
        default:
          console.warn(`Unknown report channel: ${channel}`);
          return Promise.resolve();
      }
    });

    // console.log(this.content.join("\n"));

    await Promise.allSettled(reportPromises);
    console.log("report: " + reportChannels);
  }

  private getUserIdForChannel(channel: string): string {
    switch (channel.toLowerCase()) {
      case "discord":
        return "875078633209856040";
      case "slack":
        return "U09LRD0QKFW";
      case "telegram":
        return "spacespace1410"; // Telegram does not use user mentions in the same way
      default:
        return "";
    }
  }

  private buildReportContent(reportingTime: string, userId: string): void {
    this.content = [];
    this.content.push(`Please check report: <@${userId}>`);
    this.content.push(`Reporting time: ${reportingTime}`);
    this.content.push(`- Total tests: ${this.totalTest}`);
    this.content.push(
      `- Passed tests ${this.totalPassed}/${this.totalTest} (${(
        (this.totalPassed / this.totalTest) *
        100
      ).toFixed(2)} %)`
    );
    for (let i = 0; i < this.passedCase.length; i++) {
      this.content.push(`   - ${this.passedCase[i]}`);
    }
    this.content.push(
      `- Failed tests ${this.totalFailed}/${this.totalTest} (${(
        (this.totalFailed / this.totalTest) *
        100
      ).toFixed(2)} %)`
    );
    for (let i = 0; i < this.failedCase.length; i++) {
      this.content.push(`   - ${this.failedCase[i]}`);
    }

    this.content.push(
      `- Timeout tests: ${this.totalTimeOut}/${this.totalTest} (${(
        (this.totalTimeOut / this.totalTest) *
        100
      ).toFixed(2)} %)`
    );
    for (let i = 0; i < this.timeOutCase.length; i++) {
      this.content.push(`   - ${this.timeOutCase[i]}`);
    }
  }

  private async sendDiscordReport(): Promise<void> {
    const bodyDiscord = {
      content: this.content.join("\n"),
    };
    const bodyStrDiscord = JSON.stringify(bodyDiscord);

    const webhookDiscord = process.env.WEB_HOOK_DISCORD || "";
    const responseDiscord = await fetch(webhookDiscord, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyStrDiscord,
    });
  }

  private async sendSlackReport(): Promise<void> {
    const bodySlack = {
      text: this.content.join("\n"),
    };
    const bodyStrSlack = JSON.stringify(bodySlack);

    const webhookSlack = process.env.WEB_HOOK_SLACK || "";
    const responseSlack = await fetch(webhookSlack, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyStrSlack,
    });
  }

  private async sendTelegramReport(): Promise<void> {
    const telegramToken = process.env.TELEGRAM_TOKEN || "";
    const telegramChatId = process.env.TELEGRAM_CHAT_ID || "";
    const webhookTelegram = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
    await fetch(webhookTelegram, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: this.content.join("\n"),
        parse_mode: "Markdown",
      }),
    });
  }
}
