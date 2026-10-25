#!/usr/bin/env bash
echo "=== AUDITING FILE LENGTHS (MAX 250 LOC) ==="
VIOLATIONS=$(find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  ! -name "*.d.ts" ! -name "schema.prisma" ! -name "*.test.ts*" \
  -exec wc -l {} + | awk '$1 > 250 && $2 != "total" { print $1 " lines: " $2 }')

if [ -n "$VIOLATIONS" ]; then
  echo "ARCHITECTURAL VIOLATION: The following files exceed 250 LOC:"
  echo "$VIOLATIONS"
  exit 1
else
  echo "File length audit clean: Zero files exceed 250 lines."
fi
