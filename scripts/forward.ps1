# A PowerShell script to turn off your firewall and forward 8081 traffic to WSL
# This should be run from an elevated PowerShell prompt

# Disable firewall for all profiles
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False

# Read /etc/resolv.conf from WSL to find the nameserver IP
$wslIp = wsl cat /etc/resolv.conf | Select-String -Pattern 'nameserver\s+(\d+\.\d+\.\d+\.\d+)' | ForEach-Object { $_.Matches.Groups[1].Value }

# Check if an IP address was found
if ([string]::IsNullOrWhiteSpace($wslIp)) {
    Write-Error "No IP address found in /etc/resolv.conf"
    exit
}

# Set up port forwarding from port 8081 to the WSL IP address
netsh interface portproxy add v4tov4 listenport=8081 listenaddress=0.0.0.0 connectport=8081 connectaddress=$wslIp

adb -a nodaemon server start
