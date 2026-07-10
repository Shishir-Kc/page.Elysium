#!/bin/sh
set -e

# ── Colors ────────────────────────────────────────────────
if [ -t 1 ]; then
  PURPLE='\033[38;5;141m'
  GREEN='\033[38;5;114m'
  BLUE='\033[38;5;110m'
  RED='\033[38;5;203m'
  DIM='\033[2m'
  BOLD='\033[1m'
  RESET='\033[0m'
else
  PURPLE=''; GREEN=''; BLUE=''; RED=''; DIM=''; BOLD=''; RESET=''
fi

ok()   { printf "${GREEN}✓${RESET} %s\n" "$1"; }
step() { printf "${BLUE}→${RESET} %s\n" "$1"; }
err()  { printf "${RED}✗${RESET} %s\n" "$1"; }

# ── Title box ─────────────────────────────────────────────
TITLE="\$ Elysium Agent Installer"
TAGLINE="A self hosted Life Agent Harness for personal Use"
WIDTH=58

hr() {
  printf "${PURPLE}%s${RESET}\n" "$(printf '─%.0s' $(seq 1 "$WIDTH"))"
}

center() {
  text="$1"
  pad=$(( (WIDTH - ${#text}) / 2 ))
  printf "${PURPLE}│${RESET}%*s${BOLD}${PURPLE}%s${RESET}%*s${PURPLE}│${RESET}\n" "$pad" "" "$text" $((WIDTH - pad - ${#text})) ""
}

left() {
  text="$1"
  printf "${PURPLE}│${RESET} %s%-*s${PURPLE}│${RESET}\n" "$text" $((WIDTH - ${#text} - 1)) ""
}

echo ""
printf "${PURPLE}╭%s╮${RESET}\n" "$(printf '─%.0s' $(seq 1 "$WIDTH"))"
center "$TITLE"
printf "${PURPLE}├%s┤${RESET}\n" "$(printf '─%.0s' $(seq 1 "$WIDTH"))"
left "  $TAGLINE"
printf "${PURPLE}╰%s╯${RESET}\n" "$(printf '─%.0s' $(seq 1 "$WIDTH"))"
echo ""

# ── Spinner ───────────────────────────────────────────────
spinner() {
  pid=$1
  msg=$2
  spin="⣾ ⣽ ⣻ ⢿ ⡿ ⣟ ⣯ ⣷"
  set -- $spin
  i=1
  n=$#
  while kill -0 "$pid" 2>/dev/null; do
    eval "c=\${$i}"
    printf "\r${BLUE}%s${RESET} %s" "$c" "$msg"
    i=$((i % n + 1))
    sleep 0.1
  done
  wait "$pid"
  ret=$?
  if [ "$ret" -eq 0 ]; then
    printf "\r${GREEN}✓${RESET} %s\n" "$msg"
  else
    printf "\r${RED}✗${RESET} %s\n" "$msg"
  fi
  return $ret
}

# ── Detect OS ─────────────────────────────────────────────
OS_NAME="unknown"
OS_VERSION=""
KERNEL="$(uname -s)"
ARCH="$(uname -m)"

case "$KERNEL" in
  Linux)
    if [ -r /etc/os-release ]; then
      . /etc/os-release
      OS_NAME="${ID:-linux}"
      OS_VERSION="${VERSION_ID:-${BUILD_ID:-rolling}}"
    else
      OS_NAME="linux"
      OS_VERSION="unknown"
    fi
    ok "Detected: linux ($OS_NAME${OS_VERSION:+ $OS_VERSION}) [$ARCH]"
    ;;
  Darwin)
    OS_NAME="macos"
    OS_VERSION="$(sw_vers -productVersion 2>/dev/null || echo unknown)"
    ok "Detected: macos $OS_VERSION [$ARCH]"
    ;;
  *)
    err "Unsupported OS: $KERNEL"
    exit 1
    ;;
esac
echo ""

# ── System requirements ──────────────────────────────
step "Checking for Omarchy"
if ! command -v omarchy >/dev/null 2>&1 && [ ! -d "$HOME/.config/omarchy" ]; then
    err "Omarchy is required but not detected."
    exit 1
fi
ok "Omarchy detected"

step "Checking desktop environment"
if [ "$XDG_CURRENT_DESKTOP" != "Hyprland" ] && [ -z "$HYPRLAND_INSTANCE_SIGNATURE" ]; then
    err "Hyprland is required but not detected."
    exit 1
fi
ok "Hyprland detected"

step "Checking RAM"
total_ram_kb=$(grep MemTotal /proc/meminfo | awk '{print $2}')
total_ram_gb=$((total_ram_kb / 1024 / 1024))
if [ "$total_ram_gb" -le 4 ]; then
    err "At least 4 GB of RAM required. Detected: ${total_ram_gb} GB"
    exit 1
fi
ok "${total_ram_gb} GB RAM detected"
echo ""

# ── Detect / install uv ──────────────────────────────────
if command -v uv >/dev/null 2>&1; then
  UV_VER="$(uv --version 2>/dev/null | awk '{print $2}')"
  ok "uv already installed (v${UV_VER:-unknown})"
else
  (curl -LsSf https://astral.sh/uv/install.sh | sh > /dev/null 2>&1) &
  spinner $! "Installing managed uv into \$HOME/.local/bin ..." || {
    err "Failed to install uv. Install it manually: https://docs.astral.sh/uv/"
    exit 1
  }
  export PATH="$HOME/.local/bin:$PATH"
  if command -v uv >/dev/null 2>&1; then
    UV_VER="$(uv --version 2>/dev/null | awk '{print $2}')"
    ok "uv installed (v${UV_VER:-unknown})"
  else
    err "uv installed but not found on PATH. Restart your shell and re-run this script."
    exit 1
  fi
fi
echo ""

# ── Elysium ASCII banner ─────────────────────────────────
cat << "EOF"
   ███████╗   ██╗░░░░░   ██╗░░░██╗   ░██████╗   ██╗   ██╗░░░██╗   ███╗░░░███╗
   ██╔════╝   ██║░░░░░   ╚██╗░██╔╝   ██╔════╝   ██║   ██║░░░██║   ████╗░████║
   █████╗░░   ██║░░░░░   ░╚████╔╝░   ╚█████╗░   ██║   ██║░░░██║   ██╔████╔██║
   ██╔══╝░░   ██║░░░░░   ░░╚██╔╝░░   ░╚═══██╗   ██║   ██║░░░██║   ██║╚██╔╝██║
   ███████╗   ███████╗   ░░░██║░░░   ██████╔╝   ██║   ╚██████╔╝   ██║░╚═╝░██║
   ╚══════╝   ╚══════╝   ░░░╚═╝░░░   ╚═════╝░   ╚═╝   ░╚═════╝░   ╚═╝░░░░░╚═╝
EOF
echo ""

REPO="https://github.com/Shishir-Kc/E.L.Y.S.I.U.M"
INSTALL_DIR="$HOME/.E.L.Y.S.I.U.M"
CONFIG_DIR="$HOME/.config/E.L.Y.S.I.U.M"
LOGS_DIR="$CONFIG_DIR/Logs"
MEMORY_DIR="$CONFIG_DIR/Memory"
SKILLS="$CONFIG_DIR/Skills"
ELYSIUM_CONFIG="$CONFIG_DIR/Config"

# ── Handle existing install ──────────────────────────────
if [ -d "$INSTALL_DIR" ]; then
    echo "Elysium is already installed at $INSTALL_DIR"
    printf "What would you like to do?\n"
    printf "  [R]einstall  \xE2\x80\x94 remove existing install and clone fresh\n"
    printf "  [U]pgrade    \xE2\x80\x94 pull latest changes and sync deps\n"
    printf "  [Q]uit       \xE2\x80\x94 do nothing\n"
    printf "Choice [r/R/u/U/q/Q]: "
    read -r choice < /dev/tty
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
    spinner $! "Cloning Elysium" || exit 1
fi
echo ""
(cd "$INSTALL_DIR" && uv sync > /dev/null 2>&1) &
spinner $! "Syncing dependencies" || exit 1
echo ""

step "Creating configs"
mkdir -p "$CONFIG_DIR" "$LOGS_DIR" "$MEMORY_DIR" "$SKILLS" "$ELYSIUM_CONFIG"

step "Plugging in romeo"
mkdir -p ~/.local/bin
cat > ~/.local/bin/romeo << 'ROMEO_EOF'
#!/bin/sh
cd "$HOME/.E.L.Y.S.I.U.M" && exec uv run python3 -m ElysiumCli.main "$@"
ROMEO_EOF
chmod +x ~/.local/bin/romeo
if ! grep -q '.local/bin' ~/.bashrc 2>/dev/null; then
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
fi

echo ""
ok "Done. Run 'source ~/.bashrc' or open a new terminal, then 'romeo' will be available."
