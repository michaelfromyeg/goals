#!/bin/sh

# Start listening for traffic on port 5037. Should only be used within Linux on WSL.

export WSL_HOST_IP="$(tail -1 /etc/resolv.conf | cut -d' ' -f2)"
socat TCP-LISTEN:5037,reuseaddr,fork TCP:$WSL_HOST_IP:5037
