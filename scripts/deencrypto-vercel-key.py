#!/usr/bin/env python
# coding=utf-8

import os
import base64
BASE_PATH = os.path.split(os.path.realpath(__file__))[0]+'/..'
VERCEL_PATH = BASE_PATH + '/.vercel/project.json'

with open(VERCEL_PATH, 'r+') as f: 
    ctx = f.read()
    if 'orgId' in ctx:
        
        xorWord = lambda ss,cc: ''.join(chr(ord(s)^ord(c)) for s,c in zip(ss,cc*100))
        password = str(raw_input("encrypt password:"))
        decry = xorWord(ctx, password)
        decry = base64.b64encode(decry)
        print('locked')
        f.seek(0)
        f.truncate() 
        f.write(decry)
    else:
        ctx = base64.b64decode(ctx)
        xorWord = lambda ss,cc: ''.join(chr(ord(s)^ord(c)) for s,c in zip(ss,cc*100))
        password = str(raw_input("decrypt password (notice:@): "))
        decry = xorWord(ctx, password)
        
        if 'orgId' not in decry:
            print("password error")
        else:
            print('OK')
            f.seek(0)
            f.truncate()  
            f.write(decry)

