#!/bin/sh
set -e

REPO="https://github.com/Shishir-Kc/E.L.Y.S.I.U.M"
INSTALL_DIR="$HOME/.E.L.Y.S.I.U.M"
CONFIG_DIR="$HOME/.config/E.L.Y.S.I.U.M"
LOGS_DIR="$CONFIG_DIR/Logs"
MEMORY_DIR="$CONFIG_DIR/Memory"
SKILLS="$CONFIG_DIR/Skills"
ELYSIUM_CONFIG="$CONFIG_DIR/Config"

spinner() {
  pid=$1
  msg=$2
  spin="⣾ ⣽ ⣻ ⢿ ⡿ ⣟ ⣯ ⣷"
  set -- $spin
  i=1
  n=$#
  while kill -0 "$pid" 2>/dev/null; do
    eval "c=\${$i}"
    printf "\r  %s %s" "$c" "$msg"
    i=$((i % n + 1))
    sleep 0.1
  done
  wait "$pid"
  ret=$?
  if [ "$ret" -eq 0 ]; then
    printf "\r  \xE2\x9C\x93 %s\n" "$msg"
  else
    printf "\r  \xE2\x9C\x97 %s\n" "$msg"
  fi
  return $ret
}

if ! command -v uv >/dev/null 2>&1; then
    echo "Error: 'uv' is required but not installed. Install it from https://docs.astral.sh/uv/"
    exit 1
fi

# ── Handle existing install ──────────────────────────────
if [ -d "$INSTALL_DIR" ]; then
    echo "Elysium is already installed at $INSTALL_DIR"
    printf "What would you like to do?\n"
    printf "  [R]einstall  \xE2\x80\x94 remove existing install and clone fresh\n"
    printf "  [U]pgrade    \xE2\x80\x94 pull latest changes and sync deps\n"
    printf "  [Q]uit       \xE2\x80\x94 do nothing\n"
    printf "Choice [r/R/u/U/q/Q]: "
    read -r choice
    case "$choice" in
        [Rr])
            rm -rf "$INSTALL_DIR"
            (git clone "$REPO" "$INSTALL_DIR" > /dev/null 2>&1) &
            spinner $! "Reinstalling Elysium" || exit 1
            ;;
        [Uu])
            (cd "$INSTALL_DIR" && git pull > /dev/null 2>&1) &
            spinner $! "Upgrading Elysium" || exit 1
            ;;
        [Qq])
            echo "Aborted."
            exit 0
            ;;
        *)
            echo "Invalid choice. Aborted."
            exit 1
            ;;
    esac
else
    (git clone "$REPO" "$INSTALL_DIR" > /dev/null 2>&1) &
    spinner $! "Installing Elysium" || exit 1
fi

echo ""
(cd "$INSTALL_DIR" && uv sync > /dev/null 2>&1) &
spinner $! "Syncing dependencies" || exit 1

echo ""
echo "  Creating configs"
mkdir -p "$CONFIG_DIR"
mkdir -p "$LOGS_DIR"
mkdir -p "$MEMORY_DIR"
mkdir -p "$SKILLS"
mkdir -p "$ELYSIUM_CONFIG"

echo "  Plugging E.L.Y.S.I.U.M CLI"
mkdir -p ~/.local/bin
cat > ~/.local/bin/romeo << 'EOF'
#!/bin/sh
cd "$HOME/.E.L.Y.S.I.U.M" && exec uv run python3 -m ElysiumCli.main "$@"
EOF
chmod +x ~/.local/bin/romeo

if ! grep -q '.local/bin' ~/.bashrc; then
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
fi

echo ""
echo "  Done. Run 'source ~/.bashrc' or open a new terminal, then 'romeo' will be available."
