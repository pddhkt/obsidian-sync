
=================

1. Create an annotated tag:
   git tag -a v1.0.0 -m "Release version 1.0.0"

2. Push the tag to origin:
   git push origin v1.0.0

3. Or push all tags at once:
   git push origin --tags

---

VARIATIONS:

- Tag a specific commit:
  git tag -a v1.0.0 <commit-hash> -m "Release version 1.0.0"

- Create lightweight tag (no annotation):
  git tag v1.0.0

- List all tags:
  git tag

- Delete a tag locally:
  git tag -d v1.0.0

- Delete a tag from remote:
  git push origin --delete v1.0.0

