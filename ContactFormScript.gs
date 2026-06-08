// Google Apps Script — Contact Form Handler
// Uses doGet (not doPost) — GET requests don't get their params dropped on redirect.
//
// HOW TO DEPLOY:
// 1. Paste this code into script.google.com
// 2. Run testEmail() once manually → click Allow in the permissions dialog
// 3. Deploy → New deployment → Web app
//    Execute as: Me  |  Who has access: Anyone
// 4. Copy the /exec URL into ContactSection.jsx as SCRIPT_URL

function doGet(e) {
  try {
    var name    = e.parameter.name    || 'N/A';
    var email   = e.parameter.email   || 'N/A';
    var phone   = e.parameter.phone   || 'Not provided';
    var message = e.parameter.message || 'N/A';

    MailApp.sendEmail({
      to: 'contactspve@gmail.com',
      subject: 'New project inquiry from ' + name,
      replyTo: email,
      body: [
        'New message from your portfolio contact form.',
        '',
        'Name:    ' + name,
        'Email:   ' + email,
        'Phone:   ' + phone,
        '',
        'Message:',
        message,
        '',
        '---',
        'Sent from smirnovprod.com contact form'
      ].join('\n')
    });

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Run this manually first to authorize MailApp — required before the form will work
function testEmail() {
  MailApp.sendEmail({
    to: 'contactspve@gmail.com',
    subject: 'Test — Apps Script contact form is working',
    body: 'If you received this, the script is authorized and ready to go.'
  });
}
