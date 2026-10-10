#!/bin/bash
# usage: sbx.sh <agent-id> <cmd...>   (runs cmd in bwrap sandbox; cwd=/work, a scratch copy of tracked source)
set -eu
ID="$1"; shift
[[ "$ID" =~ ^[a-z0-9][a-z0-9_-]{0,63}$ ]] || { echo bad id; exit 2; }
OUT=/home/jac/security-audit-skill/iron-log/run-1
TARGET=/home/jac/Videos/iron-log
SCR=$OUT/agents/$ID/scratch
mkdir -p "$SCR/home" "$SCR/out" "$OUT/agents/$ID/artifacts"
if [ ! -d "$SCR/work" ]; then mkdir -p "$SCR/work"; (cd $TARGET && git archive HEAD) | tar -x -C "$SCR/work"; fi
mkdir -p "$SCR/work/node_modules"
exec timeout 180 prlimit --cpu=120 --as=34359738368 --nproc=8192 --fsize=104857600 --nofile=1024 -- \
 bwrap --unshare-all --die-with-parent --new-session \
  --ro-bind /usr /usr --symlink usr/bin /bin --symlink usr/lib /lib --symlink usr/lib64 /lib64 \
  --proc /proc --dev /dev --tmpfs /tmp \
  --bind "$SCR/work" /work --ro-bind $TARGET/node_modules /work/node_modules \
  --bind "$SCR/out" /out --bind "$SCR/home" /home/sbx \
  --clearenv --setenv HOME /home/sbx --setenv PATH /usr/bin:/bin --setenv NODE_ENV test --setenv CI 1 \
  --chdir /work "$@"
