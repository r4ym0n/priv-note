git filter-branch --index-filter \
'git update-index --remove .vercel' 43522f101ba5e813e444d71832aa0433a7b9f96a..HEAD
git push --force --verbose --dry-run
git push --force
