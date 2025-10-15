#!/bin/bash
# Baixar recursos do cdn1.valuegaia.com.br
grep -ohr 'https://cdn1.valuegaia.com.br/[^"'\'']*' . | sort -u | while read url; do
    wget -P cdn1.valuegaia.com.br -x -nH --cut-dirs=0 "$url" 2>/dev/null
done

# Baixar recursos do imgs.kenlo.io
grep -ohr 'https://imgs.kenlo.io/[^"'\'']*' . | grep -v '<meta' | sort -u | while read url; do
    wget -P imgs.kenlo.io -x -nH --cut-dirs=0 "$url" 2>/dev/null
done
