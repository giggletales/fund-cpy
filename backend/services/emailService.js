import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async sendEmail(to, subject, html) {
    try {
      await this.transporter.sendMail({
        from: `"${process.env.COMPANY_NAME}" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html
      });
      console.log(`Email sent to ${to}: ${subject}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async sendWelcomeEmail(user) {
    const subject = `🚀 Welcome to ${process.env.COMPANY_NAME || 'Fund8r'} - Your Trading Journey Begins!`;
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
            padding: 20px;
          }
          .email-container { 
            max-width: 650px; 
            margin: 0 auto; 
            background: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          }
          .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; 
            padding: 50px 30px; 
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          .header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: pulse 4s ease-in-out infinite;
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }
          .header h1 { 
            font-size: 32px; 
            margin-bottom: 10px;
            position: relative;
            z-index: 1;
            text-shadow: 0 2px 10px rgba(0,0,0,0.3);
          }
          .header p {
            font-size: 16px;
            opacity: 0.9;
            position: relative;
            z-index: 1;
          }
          .content { 
            padding: 40px 30px;
            background: #ffffff;
          }
          .welcome-badge {
            display: inline-block;
            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
            color: white;
            padding: 8px 20px;
            border-radius: 50px;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 20px;
            box-shadow: 0 4px 15px rgba(17, 153, 142, 0.3);
          }
          .greeting { 
            font-size: 20px; 
            color: #1a1f3a; 
            margin-bottom: 20px;
            font-weight: 600;
          }
          .intro-text {
            color: #4a5568;
            font-size: 16px;
            line-height: 1.8;
            margin-bottom: 30px;
          }
          .features-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin: 30px 0;
          }
          .feature-card {
            background: linear-gradient(135deg, #f6f8fb 0%, #e9ecef 100%);
            padding: 20px;
            border-radius: 12px;
            border-left: 4px solid #667eea;
            transition: transform 0.3s ease;
          }
          .feature-icon {
            font-size: 32px;
            margin-bottom: 10px;
          }
          .feature-title {
            font-size: 16px;
            font-weight: bold;
            color: #1a1f3a;
            margin-bottom: 5px;
          }
          .feature-desc {
            font-size: 13px;
            color: #6c757d;
          }
          .cta-button { 
            display: inline-block; 
            padding: 16px 40px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; 
            text-decoration: none; 
            border-radius: 50px; 
            margin: 30px 0;
            font-weight: bold;
            font-size: 16px;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
            transition: all 0.3s ease;
          }
          .stats-bar {
            background: linear-gradient(135deg, #1a1f3a 0%, #2d3748 100%);
            color: white;
            padding: 30px;
            border-radius: 12px;
            margin: 30px 0;
            text-align: center;
          }
          .stat-item {
            display: inline-block;
            margin: 0 20px;
          }
          .stat-number {
            font-size: 28px;
            font-weight: bold;
            color: #38ef7d;
          }
          .stat-label {
            font-size: 12px;
            opacity: 0.8;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .footer { 
            background: #f8f9fa;
            text-align: center; 
            padding: 30px; 
            color: #6c757d; 
            font-size: 13px;
            border-top: 1px solid #e9ecef;
          }
          .social-links {
            margin: 20px 0;
          }
          .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #667eea;
            text-decoration: none;
            font-weight: bold;
          }
          @media only screen and (max-width: 600px) {
            .features-grid { grid-template-columns: 1fr; }
            .stat-item { display: block; margin: 15px 0; }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>🚀 Welcome Aboard!</h1>
            <p>Your journey to becoming a funded trader starts now</p>
          </div>
          <div class="content">
            <div class="welcome-badge">✨ NEW MEMBER</div>
            <div class="greeting">Hi ${user.full_name || user.email?.split('@')[0] || 'Trader'},</div>
            <div class="intro-text">
              Welcome to <strong>${process.env.COMPANY_NAME || 'Fund8r'}</strong>! 🎉 We're thrilled to have you join our elite community of traders. You've just taken the first step toward trading with real capital and keeping up to 90% of your profits.
            </div>

            <div class="stats-bar">
              <div class="stat-item">
                <div class="stat-number">$200K+</div>
                <div class="stat-label">Max Funding</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">90%</div>
                <div class="stat-label">Profit Split</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">24/7</div>
                <div class="stat-label">Support</div>
              </div>
            </div>

            <div class="features-grid">
              <div class="feature-card">
                <div class="feature-icon">📊</div>
                <div class="feature-title">Choose Your Challenge</div>
                <div class="feature-desc">Select from multiple challenge types that fit your trading style</div>
              </div>
              <div class="feature-card">
                <div class="feature-icon">💰</div>
                <div class="feature-title">Get Funded</div>
                <div class="feature-desc">Pass the challenge and trade with our capital</div>
              </div>
              <div class="feature-card">
                <div class="feature-icon">📈</div>
                <div class="feature-title">Real-Time Tracking</div>
                <div class="feature-desc">Monitor your progress with advanced analytics</div>
              </div>
              <div class="feature-card">
                <div class="feature-icon">🎓</div>
                <div class="feature-title">Expert Resources</div>
                <div class="feature-desc">Access trading guides and educational content</div>
              </div>
            </div>

            <div style="text-align: center;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/pricing" class="cta-button">
                🚀 Browse Challenges
              </a>
            </div>

            <div style="margin-top: 30px; padding: 20px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 8px;">
              <strong>💡 Pro Tip:</strong> Start with our Rapid Fire challenge if you're an aggressive trader, or choose Classic 2-Step for a more conservative approach.
            </div>
          </div>
          <div class="footer">
            <div class="social-links">
              <a href="#">Twitter</a> • 
              <a href="#">Discord</a> • 
              <a href="#">Instagram</a>
            </div>
            <p>Need help? Reply to this email or visit our <a href="${process.env.FRONTEND_URL}/support" style="color: #667eea;">Support Center</a></p>
            <p style="margin-top: 15px; opacity: 0.7;">&copy; 2024 ${process.env.COMPANY_NAME || 'Fund8r'}. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await this.sendEmail(user.email, subject, html);
    
    // Also notify admin
    await this.notifyAdminNewSignup(user);
  }

  async sendChallengeStartedEmail(user, account) {
    const subject = 'Your Challenge Has Started!';
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .credentials { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .credential-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .warning { background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Challenge Started!</h1>
          </div>
          <div class="content">
            <p>Hi ${user.full_name || 'Trader'},</p>
            <p>Your challenge has been activated and is now live!</p>

            <div class="credentials">
              <h3>MT5 Account Credentials</h3>
              <div class="credential-row">
                <strong>Account Number:</strong>
                <span>${account.account_number}</span>
              </div>
              <div class="credential-row">
                <strong>Password:</strong>
                <span>${account.password}</span>
              </div>
              <div class="credential-row">
                <strong>Server:</strong>
                <span>${account.server}</span>
              </div>
              <div class="credential-row">
                <strong>Initial Balance:</strong>
                <span>$${account.initial_balance.toLocaleString()}</span>
              </div>
            </div>

            <div class="warning">
              <strong>Important Rules:</strong>
              <ul>
                <li>Maximum Daily Loss: ${account.challenges.max_daily_loss}%</li>
                <li>Maximum Total Loss: ${account.challenges.max_total_loss}%</li>
                <li>Profit Target: $${account.profit_target.toLocaleString()}</li>
                <li>Minimum Trading Days: ${account.challenges.min_trading_days || 'N/A'}</li>
              </ul>
            </div>

            <a href="${process.env.FRONTEND_URL}/dashboard" class="button">View Dashboard</a>

            <p>Good luck with your challenge!</p>
            <p>Best regards,<br>The ${process.env.COMPANY_NAME} Team</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await this.sendEmail(user.email, subject, html);
  }

  async sendRuleViolationEmail(account, violation) {
    const { data: user } = await supabase.from('users').select('*').eq('id', account.user_id).single();

    const subject = violation.severity === 'critical' ? 'URGENT: Rule Violation Detected' : 'Warning: Rule Violation';
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: ${violation.severity === 'critical' ? '#dc3545' : '#ffc107'}; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .violation { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid ${violation.severity === 'critical' ? '#dc3545' : '#ffc107'}; }
          .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${violation.severity === 'critical' ? 'Critical Rule Violation' : 'Rule Violation Warning'}</h1>
          </div>
          <div class="content">
            <p>Hi ${user.full_name || 'Trader'},</p>
            <p>${violation.severity === 'critical' ? 'Your account has been suspended due to a critical rule violation.' : 'A rule violation has been detected on your account.'}</p>

            <div class="violation">
              <h3>Violation Details</h3>
              <p><strong>Rule:</strong> ${violation.rule.replace('_', ' ').toUpperCase()}</p>
              <p><strong>Current Value:</strong> ${violation.value.toFixed(2)}%</p>
              <p><strong>Allowed Limit:</strong> ${violation.limit}%</p>
              <p><strong>Severity:</strong> ${violation.severity.toUpperCase()}</p>
            </div>

            ${violation.severity === 'critical' ? '<p><strong>Your account has been automatically suspended. Please contact support for more information.</strong></p>' : '<p>Please review your trading strategy to avoid further violations.</p>'}

            <a href="${process.env.FRONTEND_URL}/dashboard" class="button">View Dashboard</a>

            <p>Best regards,<br>The ${process.env.COMPANY_NAME} Team</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await this.sendEmail(user.email, subject, html);
  }

  async sendChallengePassedEmail(account) {
    const { data: user } = await supabase.from('users').select('*').eq('id', account.user_id).single();

    const subject = 'Congratulations! You Passed Your Challenge!';
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .success { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #28a745; }
          .button { display: inline-block; padding: 12px 30px; background: #28a745; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Congratulations!</h1>
          </div>
          <div class="content">
            <p>Hi ${user.full_name || 'Trader'},</p>
            <p>Fantastic news! You've successfully passed your challenge!</p>

            <div class="success">
              <h3>Challenge Results</h3>
              <p><strong>Final Balance:</strong> $${account.balance.toLocaleString()}</p>
              <p><strong>Profit Target:</strong> $${account.profit_target.toLocaleString()}</p>
              <p><strong>Total Profit:</strong> $${(account.balance - account.initial_balance).toLocaleString()}</p>
            </div>

            <p>Our team will review your account and contact you within 24-48 hours regarding the next steps.</p>

            <a href="${process.env.FRONTEND_URL}/dashboard" class="button">View Certificate</a>

            <p>Congratulations again on this achievement!</p>
            <p>Best regards,<br>The ${process.env.COMPANY_NAME} Team</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await this.sendEmail(user.email, subject, html);
  }

  async sendDailyProgressEmail(user, account, metrics) {
    const subject = 'Your Daily Trading Progress';
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .stats { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .stat-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Daily Progress Report</h1>
          </div>
          <div class="content">
            <p>Hi ${user.full_name || 'Trader'},</p>
            <p>Here's your daily trading progress:</p>

            <div class="stats">
              <div class="stat-row">
                <strong>Current Balance:</strong>
                <span>$${metrics.balance.toLocaleString()}</span>
              </div>
              <div class="stat-row">
                <strong>Today's P&L:</strong>
                <span style="color: ${metrics.profit >= 0 ? '#28a745' : '#dc3545'}">
                  ${metrics.profit >= 0 ? '+' : ''}$${metrics.profit.toFixed(2)}
                </span>
              </div>
              <div class="stat-row">
                <strong>Daily Drawdown:</strong>
                <span>${metrics.daily_drawdown.toFixed(2)}%</span>
              </div>
              <div class="stat-row">
                <strong>Max Drawdown:</strong>
                <span>${metrics.max_drawdown.toFixed(2)}%</span>
              </div>
              <div class="stat-row">
                <strong>Trading Days:</strong>
                <span>${metrics.trading_days}</span>
              </div>
              <div class="stat-row">
                <strong>Consistency Score:</strong>
                <span>${metrics.consistency_score.toFixed(1)}/100</span>
              </div>
            </div>

            <p>Keep up the great work!</p>
            <p>Best regards,<br>The ${process.env.COMPANY_NAME} Team</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await this.sendEmail(user.email, subject, html);
  }
}

export default new EmailService();
