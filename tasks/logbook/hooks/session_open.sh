#!/bin/bash
# Stop hook — ensures today's logbook file exists at the end of each response turn
# Idempotent: only creates the file if missing

PROJECT="/home/seyrin/Documents/github/seyrin-portfolio"
LOGBOOK_DIR="$PROJECT/tasks/logbook"
TODAY=$(date +%Y-%m-%d)
LOG_FILE="$LOGBOOK_DIR/$TODAY.md"

if [ ! -f "$LOG_FILE" ]; then
    cat > "$LOG_FILE" << EOF
# Session — $TODAY

## Insights

<!-- Insights are written here by Claude during the session -->

## Changes

EOF
fi
