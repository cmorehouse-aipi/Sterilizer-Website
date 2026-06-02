"""Fix double-encoded UTF-8 (CP1252 mojibake) in source files."""
import os

files_to_fix = [
    r'c:\Users\Stephen\Documents\GitHub\Sterilizer-Website\app\technology\page.tsx',
]

replacements = [
    (b'\xc3\xa2\xe2\x82\xac\xe2\x80\x9d', '—'.encode('utf-8')),  # — em dash
    (b'\xc3\xa2\xe2\x82\xac\xe2\x80\x9c', '–'.encode('utf-8')),  # – en dash
    (b'\xc3\xa2\xe2\x80\xb0\xc2\xa5',     '≥'.encode('utf-8')),  # >= sign
    (b'\xc3\x82\xc2\xb2',                 '²'.encode('utf-8')),  # superscript 2
    (b'\xc3\x82\xc2\xb0',                 '°'.encode('utf-8')),  # degree
    (b'\xc3\xa2\xe2\x82\xac\xe2\x84\xa2', '’'.encode('utf-8')),  # right single quote
    (b'\xc3\x82\xc2\xb7',                 '·'.encode('utf-8')),  # middle dot
]

for fpath in files_to_fix:
    with open(fpath, 'rb') as fh:
        raw = fh.read()
    fixed = raw
    for bad, good in replacements:
        count = fixed.count(bad)
        if count:
            print("  %s: fixed %dx U+%04X" % (os.path.basename(fpath), count, ord(good.decode('utf-8')[0])))
        fixed = fixed.replace(bad, good)
    with open(fpath, 'wb') as fh:
        fh.write(fixed)

print("Done.")