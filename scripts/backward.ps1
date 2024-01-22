# A script to undo the changes made by scripts/forward.ps1
# This should also be run from an elevated PowerShell prompt

# Remove the port forwarding rule
netsh interface portproxy delete v4tov4 listenport=8081 listenaddress=

# Enable firewall for all profiles
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled True

adb -a nodaemon server stop
