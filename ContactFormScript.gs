// Google Apps Script — Contact Form Handler
// Deploy as: Web App → Execute as: Me → Who has access: Anyone
// IMPORTANT: Run this function once manually in the editor first to grant MailApp permissions.

function doPost(e) {
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

// Run this manually once in the editor to pre-authorize MailApp before any form is submitted
function testEmail() {
  MailApp.sendEmail({
    to: 'contactspve@gmail.com',
    subject: 'Test — Apps Script contact form is working',
    body: 'If you received this, the script is authorized and ready to go.'
  });
}
