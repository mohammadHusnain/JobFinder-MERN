// Dummy file to demonstrate sending email with SendGrid
// 1. Install SendGrid: npm install @sendgrid/mail
// 2. Replace 'YOUR_SENDGRID_API_KEY' with your actual SendGrid API key
// 3. Run this file with: node sendEmailWithSendGrid.js

const sgMail = require('@sendgrid/mail');

// TODO: Replace with your actual SendGrid API key
sgMail.setApiKey('YOUR_SENDGRID_API_KEY');

const now = new Date();
const dateString = now.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
const timeString = now.toLocaleTimeString('en-US', {
  hour: '2-digit',
  minute: '2-digit'
});

const msg = {
  to: 'husnainbhinder682@gmail.com',
  from: 'your_verified_sender@example.com', // Use a verified sender from your SendGrid account
  subject: 'Job Application - Data Scientist Position at CyberSoft',
  text: `Dear Hiring Manager,\n\nI hope this email finds you well. I am writing to express my interest in the Data Scientist position at CyberSoft.\n\nApplication Details:\n- Position: Data Scientist\n- Company: CyberSoft\n- Application Status: In Progress\n- Application Date: ${dateString}\n- Application Time: ${timeString}\n\nI am excited about the opportunity to contribute to your data science team and help drive data-informed decision-making through predictive models and machine learning solutions.\n\nI look forward to hearing from you regarding the next steps in the application process.\n\nBest regards,\n[Your Name]`,
};

sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent successfully!');
  })
  .catch((error) => {
    console.error('Error sending email:', error);
  }); 