const fs = require("fs");
const path = "./bin/wisecommit.js";

if (!fs.existsSync(path)) {
  console.error("❌ File not found:", path);
  process.exit(1);
}

const data = fs.readFileSync(path);
const shebang = "#!/usr/bin/env node\n";

if (data.toString().startsWith(shebang)) {
  console.log("✅ Shebang already present.");
} else {
  fs.writeFileSync(path, shebang + data);
  console.log("✅ Shebang added to wisecommit.js");
}
