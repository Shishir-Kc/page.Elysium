#!/bin/sh
set -e

REPO="https://github.com/Shishir-Kc/E.L.Y.S.I.U.M"
INSTALL_DIR="$HOME/.E.L.Y.S.I.U.M"
CONFIG_DIR="$HOME/.config/E.L.Y.S.I.U.M"
LOGS_DIR="$CONFIG_DIR/Logs"
MEMORY_DIR="$CONFIG_DIR/Memory"
SKILLS="$CONFIG_DIR/Skills"
ELYSIUM_CONFIG="$CONFIG_DIR/Config"

echo "Installing Elysium..."

if [ -d "$INSTALL_DIR" ]; then
    echo "Elysium is already installed at $INSTALL_DIR"
    exit 1
fi

git clone "$REPO" "$INSTALL_DIR"

echo "Installing E.L.Y.S.I.U.M "
echo "Almost there . . .  . "
if [ -d "$CONFIG_DIR" ]; then
  exit 1
fi
echo "Creating configs "
mkdir -p $CONFIG_DIR
mkdir -p $LOGS_DIR
mkdir -p $MEMORY_DIR
mkdir -p $SKILLS
mkdir -p $ELYSIUM_CONFIG
