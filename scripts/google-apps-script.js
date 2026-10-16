/**
 * Google Apps Script - Contact Form Backend
 * 
 * Instructions:
 * 1. Open Google Sheets (https://sheets.new).
 * 2. Rename the sheet/tab to "Messages" or leave as default.
 * 3. Go to: Extensions > Apps Script (Ekstensi > Apps Script).
 * 4. Replace Code.gs with this complete file.
 * 5. Click "Deploy" > "New deployment" (Terapkan > Deployment baru).
 * 6. Select type: "Web app" (Aplikasi web).
 * 7. Configuration:
 *    - Description: "Portfolio Contact Form Backend"
 *    - Execute as: "Me (your_email@gmail.com)"
 *    - Who has access: "Anyone" (Siapa saja)  <-- IMPORTANT!
 * 8. Click "Deploy", authorize permissions, and copy the Web App URL.
 * 9. Paste the URL into your portfolio .env file as:
 *    VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/.../exec
 */

// Optional: If using a Standalone Apps Script (not bound to the sheet),
// paste your Spreadsheet ID below. Leave empty if bound via Extensions > Apps Script.
var SPREADSHEET_ID = "";

// Sheet/tab name where messages will be stored
var SHEET_NAME = "Messages";

/**
 * Handle HTTP GET requests (health check / browser direct visit)
 */
function doGet(e) {
  return createJsonResponse({
    status: "active",
    message: "Portfolio Contact API is running. Please send POST requests."
  }, 200);
}

/**
 * Handle HTTP POST requests from the portfolio contact form
 */
function doPost(e) {
  // Concurrency lock to prevent race conditions during simultaneous writes
  var lock = LockService.getScriptLock();
  var lockAcquired = false;

  try {
    lockAcquired = lock.tryLock(10000); // Wait up to 10 seconds
    if (!lockAcquired) {
      return createJsonResponse({
        status: "error",
        message: "Server is temporarily busy. Please try again in a moment."
      }, 429);
    }

    // 1. Parse incoming payload (supports JSON in postData.contents or form-encoded parameter)
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        return createJsonResponse({
          status: "error",
          message: "Invalid payload format. Expected JSON."
        }, 400);
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    } else {
      return createJsonResponse({
        status: "error",
        message: "No request data received."
      }, 400);
    }

    // 2. Honeypot check (Bot detection)
    // If the hidden field is filled, silently succeed without writing to sheet.
    // Note: Honeypot catches naive scrapers; it does not stop all advanced bots.
    var honeypot = String(data._hp || data.website || "").trim();
    if (honeypot !== "") {
      // Fake success response to prevent bots from retrying with different payloads
      return createJsonResponse({
        status: "success",
        message: "Message received successfully."
      }, 200);
    }

    // 3. Extract and trim inputs
    var name = String(data.name || "").trim();
    var email = String(data.email || "").trim();
    var message = String(data.message || "").trim();

    // 4. Server-Side Validation
    // Reject empty fields
    if (!name || !email || !message) {
      return createJsonResponse({
        status: "error",
        message: "All fields (Name, Email, and Message) are required."
      }, 400);
    }

    // Length validation
    if (name.length < 2 || name.length > 100) {
      return createJsonResponse({
        status: "error",
        message: "Name must be between 2 and 100 characters."
      }, 400);
    }

    // Email format & length validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length > 100 || !emailRegex.test(email)) {
      return createJsonResponse({
        status: "error",
        message: "Please provide a valid email address."
      }, 400);
    }

    if (message.length < 5 || message.length > 2000) {
      return createJsonResponse({
        status: "error",
        message: "Message must be between 5 and 2000 characters."
      }, 400);
    }

    // 5. Formula Injection (CSV Injection) Mitigation
    // If input starts with =, +, -, @, \t, or \r, prefix with a single quote (')
    // so Google Sheets treats it as plain text rather than executing a formula.
    var sanitizedName = sanitizeForSpreadsheet(name);
    var sanitizedEmail = sanitizeForSpreadsheet(email);
    var sanitizedMessage = sanitizeForSpreadsheet(message);

    // 6. Access Google Sheet
    var sheet = getTargetSheet();
    if (!sheet) {
      console.error("Target sheet could not be opened.");
      return createJsonResponse({
        status: "error",
        message: "Failed to access spreadsheet database."
      }, 500);
    }

    // Initialize header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      var headers = ["Timestamp", "Name", "Email", "Message"];
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#f3f4f6");
      sheet.setFrozenRows(1);
    }

    // 7. Append row to spreadsheet
    // Timestamp formatted in ISO 8601 string
    var timestamp = new Date().toISOString();
    sheet.appendRow([timestamp, sanitizedName, sanitizedEmail, sanitizedMessage]);

    // 8. Return success response
    return createJsonResponse({
      status: "success",
      message: "Thank you! Your message has been saved successfully."
    }, 200);

  } catch (err) {
    // Log internal error safely in Google Apps Script console (View > Executions)
    console.error("Unhandled error in doPost:", err);

    // Return generic error without exposing stack trace or internal details
    return createJsonResponse({
      status: "error",
      message: "An internal server error occurred. Please try again later."
    }, 500);

  } finally {
    if (lockAcquired) {
      try {
        lock.releaseLock();
      } catch (e) {
        console.error("Error releasing lock:", e);
      }
    }
  }
}

/**
 * Sanitize string to prevent Formula / CSV Injection in Google Sheets.
 * Characters like =, +, -, @, \t, \r at the beginning of a cell can trigger formulas.
 */
function sanitizeForSpreadsheet(val) {
  if (typeof val !== "string") return val;
  var dangerousChars = ["=", "+", "-", "@", "\t", "\r"];
  if (val.length > 0 && dangerousChars.indexOf(val.charAt(0)) !== -1) {
    return "'" + val;
  }
  return val;
}

/**
 * Helper to obtain the active sheet (container-bound) or by ID (standalone)
 */
function getTargetSheet() {
  var ss;
  if (SPREADSHEET_ID && SPREADSHEET_ID.trim() !== "") {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID.trim());
  } else {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }

  if (!ss) return null;

  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    // If named sheet does not exist, use or create it
    sheet = ss.getActiveSheet() || ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

/**
 * Helper to construct JSON response with ContentService
 */
function createJsonResponse(dataObj, httpStatus) {
  var output = ContentService.createTextOutput(JSON.stringify(dataObj));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

