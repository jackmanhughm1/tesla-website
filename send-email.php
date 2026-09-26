<?php
/**
 * Tesla Website Form Submissions Handler
 * Delivers order inquiries and contact requests directly to cPanel email.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Read raw JSON or form-encoded input
$input = json_decode(file_get_contents('php://input'), true);
if (!$input || empty($input)) {
    $input = $_POST;
}

// Recipient email address on cPanel
$to = 'info@teslasmotor.com';

// Extract fields
$formType = isset($input['form_type']) ? trim($input['form_type']) : 'General Submission';
$fullName = isset($input['fullName']) ? trim($input['fullName']) : (isset($input['name']) ? trim($input['name']) : 'Not Provided');
$email = isset($input['email']) ? trim($input['email']) : 'Not Provided';
$phone = isset($input['phone']) ? trim($input['phone']) : 'Not Provided';
$zipCode = isset($input['zipCode']) ? trim($input['zipCode']) : (isset($input['zip']) ? trim($input['zip']) : 'Not Provided');
$notes = isset($input['message']) ? trim($input['message']) : (isset($input['notes']) ? trim($input['notes']) : '');

// Configuration / Product specifics
$model = isset($input['model']) ? trim($input['model']) : '';
$trim = isset($input['trim']) ? trim($input['trim']) : '';
$paint = isset($input['paint']) ? trim($input['paint']) : '';
$wheels = isset($input['wheels']) ? trim($input['wheels']) : '';
$interior = isset($input['interior']) ? trim($input['interior']) : '';
$price = isset($input['price']) ? trim($input['price']) : '';
$estDelivery = isset($input['est_delivery']) ? trim($input['est_delivery']) : '';
$systemSize = isset($input['system_size']) ? trim($input['system_size']) : '';
$quantity = isset($input['quantity']) ? trim($input['quantity']) : '';
$topic = isset($input['topic']) ? trim($input['topic']) : '';

// Generate Subject
$subject = "[New Lead] {$formType}";
if ($fullName !== 'Not Provided') {
    $subject .= " - {$fullName}";
}

// Build HTML email body
$date = date('F j, Y, g:i a e');
$ip = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';

$detailsHtml = '';
if ($model) $detailsHtml .= "<tr><td style='padding:8px 12px;font-weight:600;color:#5c5e62;border-bottom:1px solid #eee;'>Product / Model:</td><td style='padding:8px 12px;color:#171a20;border-bottom:1px solid #eee;'><strong>{$model}</strong></td></tr>";
if ($trim) $detailsHtml .= "<tr><td style='padding:8px 12px;font-weight:600;color:#5c5e62;border-bottom:1px solid #eee;'>Trim / Option:</td><td style='padding:8px 12px;color:#171a20;border-bottom:1px solid #eee;'>{$trim}</td></tr>";
if ($systemSize) $detailsHtml .= "<tr><td style='padding:8px 12px;font-weight:600;color:#5c5e62;border-bottom:1px solid #eee;'>System Size:</td><td style='padding:8px 12px;color:#171a20;border-bottom:1px solid #eee;'>{$systemSize}</td></tr>";
if ($quantity) $detailsHtml .= "<tr><td style='padding:8px 12px;font-weight:600;color:#5c5e62;border-bottom:1px solid #eee;'>Quantity:</td><td style='padding:8px 12px;color:#171a20;border-bottom:1px solid #eee;'>{$quantity}</td></tr>";
if ($paint) $detailsHtml .= "<tr><td style='padding:8px 12px;font-weight:600;color:#5c5e62;border-bottom:1px solid #eee;'>Paint Color:</td><td style='padding:8px 12px;color:#171a20;border-bottom:1px solid #eee;'>{$paint}</td></tr>";
if ($wheels) $detailsHtml .= "<tr><td style='padding:8px 12px;font-weight:600;color:#5c5e62;border-bottom:1px solid #eee;'>Wheels:</td><td style='padding:8px 12px;color:#171a20;border-bottom:1px solid #eee;'>{$wheels}</td></tr>";
if ($interior) $detailsHtml .= "<tr><td style='padding:8px 12px;font-weight:600;color:#5c5e62;border-bottom:1px solid #eee;'>Interior:</td><td style='padding:8px 12px;color:#171a20;border-bottom:1px solid #eee;'>{$interior}</td></tr>";
if ($price) $detailsHtml .= "<tr><td style='padding:8px 12px;font-weight:600;color:#5c5e62;border-bottom:1px solid #eee;'>Total Est. Price:</td><td style='padding:8px 12px;color:#171a20;border-bottom:1px solid #eee;'><strong>{$price}</strong></td></tr>";
if ($estDelivery) $detailsHtml .= "<tr><td style='padding:8px 12px;font-weight:600;color:#5c5e62;border-bottom:1px solid #eee;'>Est. Delivery:</td><td style='padding:8px 12px;color:#171a20;border-bottom:1px solid #eee;'>{$estDelivery}</td></tr>";
if ($topic) $detailsHtml .= "<tr><td style='padding:8px 12px;font-weight:600;color:#5c5e62;border-bottom:1px solid #eee;'>Interest Topic:</td><td style='padding:8px 12px;color:#171a20;border-bottom:1px solid #eee;'>{$topic}</td></tr>";
if ($notes) $detailsHtml .= "<tr><td style='padding:8px 12px;font-weight:600;color:#5c5e62;border-bottom:1px solid #eee;'>Customer Notes:</td><td style='padding:8px 12px;color:#171a20;border-bottom:1px solid #eee;'>".nl2br(htmlspecialchars($notes))."</td></tr>";

$htmlMessage = "
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <title>{$subject}</title>
</head>
<body style='font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif;background-color:#f4f4f6;padding:24px;margin:0;'>
  <div style='max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08);'>
    <div style='background-color:#171a20;padding:22px 28px;text-align:left;'>
      <h1 style='color:#ffffff;font-size:20px;letter-spacing:1.5px;margin:0;text-transform:uppercase;'>TESLA</h1>
      <p style='color:#a2a3a5;font-size:13px;margin:4px 0 0 0;'>New Website Customer Inquiry</p>
    </div>
    <div style='padding:28px;'>
      <h2 style='font-size:18px;color:#171a20;margin:0 0 16px 0;border-bottom:2px solid #3e6ae1;padding-bottom:8px;'>{$formType}</h2>
      
      <h3 style='font-size:14px;text-transform:uppercase;letter-spacing:0.5px;color:#5c5e62;margin:18px 0 8px 0;'>Customer Information</h3>
      <table style='width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px;'>
        <tr><td style='padding:8px 12px;font-weight:600;color:#5c5e62;border-bottom:1px solid #eee;width:140px;'>Full Name:</td><td style='padding:8px 12px;color:#171a20;border-bottom:1px solid #eee;'><strong>{$fullName}</strong></td></tr>
        <tr><td style='padding:8px 12px;font-weight:600;color:#5c5e62;border-bottom:1px solid #eee;'>Email:</td><td style='padding:8px 12px;color:#171a20;border-bottom:1px solid #eee;'><a href='mailto:{$email}' style='color:#3e6ae1;text-decoration:none;'>{$email}</a></td></tr>
        <tr><td style='padding:8px 12px;font-weight:600;color:#5c5e62;border-bottom:1px solid #eee;'>Phone:</td><td style='padding:8px 12px;color:#171a20;border-bottom:1px solid #eee;'><a href='tel:{$phone}' style='color:#3e6ae1;text-decoration:none;'>{$phone}</a></td></tr>
        <tr><td style='padding:8px 12px;font-weight:600;color:#5c5e62;border-bottom:1px solid #eee;'>Zip Code:</td><td style='padding:8px 12px;color:#171a20;border-bottom:1px solid #eee;'>{$zipCode}</td></tr>
      </table>

      " . ($detailsHtml ? "<h3 style='font-size:14px;text-transform:uppercase;letter-spacing:0.5px;color:#5c5e62;margin:18px 0 8px 0;'>Order / Inquiry Details</h3><table style='width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px;'>{$detailsHtml}</table>" : "") . "

      <div style='margin-top:24px;padding:12px;background:#f9f9fa;border-radius:8px;font-size:12px;color:#8e8e93;'>
        Submitted on {$date} | IP: {$ip}
      </div>
    </div>
  </div>
</body>
</html>
";

// Email Headers
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=utf-8';
if ($email && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $headers[] = "From: Tesla Website <no-reply@teslasmotor.com>";
    $headers[] = "Reply-To: {$fullName} <{$email}>";
} else {
    $headers[] = "From: Tesla Website <info@teslasmotor.com>";
}
$headers[] = 'X-Mailer: PHP/' . phpversion();

$sent = @mail($to, $subject, $htmlMessage, implode("\r\n", $headers));

// Also append to local backup log
@file_put_contents(__DIR__ . '/submissions.log', date('Y-m-d H:i:s') . " | {$formType} | {$fullName} | {$email} | {$phone} | {$zipCode}\n", FILE_APPEND);

echo json_encode([
    'success' => true,
    'message' => 'Lead received successfully',
    'mail_sent' => $sent
]);
