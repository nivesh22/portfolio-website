const EMAIL_PROTECTION_SCRIPT = `(function () {
  var hash = (self.location && self.location.hash ? self.location.hash : "").replace(/^#/, "");
  if (!hash) {
    console.warn("Missing email hash for /cdn-cgi/l/email-protection");
    return;
  }

  var decode = function (hex) {
    if (!hex || hex.length < 4 || hex.length % 2 === 1) {
      return null;
    }

    var key = parseInt(hex.substring(0, 2), 16);
    if (Number.isNaN(key)) {
      return null;
    }

    var decoded = "";
    for (var i = 2; i < hex.length; i += 2) {
      var byte = parseInt(hex.substring(i, i + 2), 16);
      if (Number.isNaN(byte)) {
        return null;
      }

      decoded += String.fromCharCode(byte ^ key);
    }

    return decoded;
  };

  var result = decode(hash);
  if (!result) {
    console.warn("Unable to decode Cloudflare email hash.");
    return;
  }

  var target = result.toLowerCase().indexOf("mailto:") === 0 ? result : "mailto:" + result;
  try {
    self.location.replace(target);
  } catch (err) {
    console.error("Redirect failed for /cdn-cgi/l/email-protection", err);
  }
})();`;

export function GET() {
  return new Response(EMAIL_PROTECTION_SCRIPT, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
