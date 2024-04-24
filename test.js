function extractSubnetId(logLine) {
  const subnetIdMatch = logLine.match(/\/r.+/);
  return subnetIdMatch ? subnetIdMatch[0] : null;
}

// Example usage:
const logLine = "[2024-04-23T23:30:36Z INFO  ipc_cli::commands::subnet::create] created subnet actor with id: /r314159/t410f3xzhjw3ad7hsltwljqovaowcpyd5bqczbcmor7a";

const subnetId = extractSubnetId(logLine);
console.log(subnetId); 