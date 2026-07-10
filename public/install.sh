#!/bin/sh
set -e

REPO="https://github.com/Shishir-Kc/E.L.Y.S.I.U.M"
INSTALL_DIR="$HOME/.E.L.Y.S.I.U.M"
CONFIG_DIR="$HOME/.config/E.L.Y.S.I.U.M"
LOGS_DIR="$CONFIG_DIR/Logs"
MEMORY_DIR="$CONFIG_DIR/Memory"
SKILLS="$CONFIG_DIR/Skills"
ELYSIUM_CONFIG="$CONFIG_DIR/Config"

if ! command -v uv >/dev/null 2>&1; then
    echo "Error: 'uv' is required but not installed. Install it from https://docs.astral.sh/uv/"
    exit 1
fi

echo "Installing Elysium..."

if [ -d "$INSTALL_DIR" ]; then
    echo "Elysium is already installed at $INSTALL_DIR"
    exit 1
fi

git clone "$REPO" "$INSTALL_DIR"

echo "Syncing dependencies with uv"
cd "$INSTALL_DIR" && uv sync

echo "Installing E.L.Y.S.I.U.M"
echo "Almost there . . . ."

echo "Creating configs"
mkdir -p "$CONFIG_DIR"
mkdir -p "$LOGS_DIR"
mkdir -p "$MEMORY_DIR"
mkdir -p "$SKILLS"
mkdir -p "$ELYSIUM_CONFIG"

echo "Plugging E.L.Y.S.I.U.M CLI"
mkdir -p ~/.local/bin
cat > ~/.local/bin/romeo << 'EOF'
#!/bin/sh
cd "$HOME/.E.L.Y.S.I.U.M" && exec uv run python3 -m ElysiumCli.main "$@"
EOF
chmod +x ~/.local/bin/romeo

if ! grep -q '.local/bin' ~/.bashrc; then
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
fi

echo "Done. Run 'source ~/.bashrc' or open a new terminal, then 'romeo' will be available."
