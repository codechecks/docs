const { codechecks } = require("@codechecks/client");
const bytes = require("bytes");

module.exports = async function({ path }) {
  const currentSize = getSize(path);
  await codechecks.saveValue("simple-build-size-watcher", currentSize);

  const baseSize = await codechecks.getValue("simple-build-size-watcher") || 0;

  const diff = currentSize - baseSize; // ex. 1231
  const formattedBytes = bytes(diff); // "1KB"

  await codechecks.success({
    name: "Simple Build Size",
    shortDescription: `Size changed by: ${formattedBytes} Total size: ${bytes(currentSize)}`,
  });
};

const fs = require("fs");
function getSize(path) {
  const stats = fs.statSync(path);
  return stats.size;
}
