// Google Apps Script — Contact Form Handler
// Deploy as: Web App → Execute as: Me → Who has access: Anyone
// Then paste the deployment URL into ContactSection.jsx

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var name    = data.name    || 'N/A';
    var email   = data.email   || 'N/A';
    var phone   = data.phone   || 'Not provided';
    var message = data.message || 'N/A';

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
