#!/usr/bin/env python3
# trusted parent-side promotion: promote.py <agent-id> <rel-path> [<rel-path>...]  (per-file 1MiB, cumulative 4MiB)
import os, sys, stat
ID=sys.argv[1]; OUT='/home/jac/security-audit-skill/iron-log/run-1/agents'
PF, CUM = 1<<20, 4<<20
def walk(root_fd, parts, create=False):
    fd=os.dup(root_fd)
    for p in parts:
        if create:
            try: os.mkdir(p, 0o755, dir_fd=fd)
            except FileExistsError: pass
        n=os.open(p, os.O_RDONLY|os.O_DIRECTORY|os.O_NOFOLLOW, dir_fd=fd); os.close(fd); fd=n
    return fd
sroot=os.open(f'{OUT}/{ID}/scratch', os.O_RDONLY|os.O_DIRECTORY|os.O_NOFOLLOW)
aroot=os.open(f'{OUT}/{ID}/artifacts', os.O_RDONLY|os.O_DIRECTORY|os.O_NOFOLLOW)
tot=0
for rel in sys.argv[2:]:
    try:
        parts=rel.split('/')
        if not rel or rel.startswith('/') or any(p in ('','.','..') for p in parts): raise ValueError('bad path')
        d=walk(sroot, parts[:-1])
        f=os.open(parts[-1], os.O_RDONLY|os.O_NOFOLLOW|os.O_NONBLOCK, dir_fd=d)
        st=os.fstat(f)
        if not stat.S_ISREG(st.st_mode) or st.st_nlink!=1 or st.st_size>PF or tot+st.st_size>PF*4: raise ValueError('rejected by fstat')
        data=b''
        while len(data)<st.st_size:
            c=os.read(f, st.st_size-len(data))
            if not c: break
            data+=c
        st2=os.fstat(f)
        if (st2.st_ino,st2.st_dev,st2.st_size,st2.st_nlink)!=(st.st_ino,st.st_dev,st.st_size,st.st_nlink) or len(data)!=st.st_size: raise ValueError('changed')
        dd=walk(aroot, parts[:-1], create=True)
        o=os.open(parts[-1], os.O_WRONLY|os.O_CREAT|os.O_EXCL|os.O_NOFOLLOW, 0o644, dir_fd=dd)
        ost=os.fstat(o)
        if not stat.S_ISREG(ost.st_mode) or ost.st_nlink!=1: raise ValueError('dest')
        os.write(o, data); os.close(o); tot+=st.st_size
        print('promoted', f'agents/{ID}/artifacts/{rel}', st.st_size)
    except Exception as e:
        print('DISCARDED', rel, e)
