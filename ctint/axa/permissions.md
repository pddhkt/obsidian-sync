# AXA Phrase List Portal - Permissions

## Permission Naming Convention

```
ctint-mf-axa.phrase-lists.{unit}.{action}
```

## Database Tables

| Table | Schema | Purpose |
|-------|--------|---------|
| `ctint_permissions` | dbo | Permission definitions |
| `ctint_role_permission_map` | dbo | Role to permission mapping |
| `BusinessUnit` | pl | Business unit definitions |
| `PhraseList` | pl | Phrase list data |

## Business Units & Phrase Limits

| Business Unit | Phrase Limit |
|---------------|--------------|
| GICC          | 100          |
| HCC           | 100          |
| LCC           | 100          |
| GENERAL       | 200          |

## Permission Matrix

| Permission String                        | Business Unit | Action | Capabilities                              |
| ---------------------------------------- | ------------- | ------ | ----------------------------------------- |
| `ctint-mf-axa.phrase-lists.gicc.view`    | GICC          | view   | View phrases, Export CSV                  |
| `ctint-mf-axa.phrase-lists.gicc.edit`    | GICC          | edit   | Create, Edit, Delete, Bulk Import phrases |
| `ctint-mf-axa.phrase-lists.hcc.view`     | HCC           | view   | View phrases, Export CSV                  |
| `ctint-mf-axa.phrase-lists.hcc.edit`     | HCC           | edit   | Create, Edit, Delete, Bulk Import phrases |
| `ctint-mf-axa.phrase-lists.lcc.view`     | LCC           | view   | View phrases, Export CSV                  |
| `ctint-mf-axa.phrase-lists.lcc.edit`     | LCC           | edit   | Create, Edit, Delete, Bulk Import phrases |
| `ctint-mf-axa.phrase-lists.general.view` | GENERAL       | view   | View phrases, Export CSV                  |
| `ctint-mf-axa.phrase-lists.general.edit` | GENERAL       | edit   | Create, Edit, Delete, Bulk Import phrases |

## Action Capabilities

| Action | Capabilities                                    |
|--------|-------------------------------------------------|
| view   | View phrases for the unit, Export CSV           |
| edit   | Create, Edit, Delete phrases, Bulk Import CSV   |

## Notes

- App access is implied by having **any** unit permission (no separate APPLICATION_VISIT required)
- Users can have permissions for multiple business units
- `edit` permission does NOT include `view` - users need both for full access

---

## SQL Scripts

### Insert GENERAL Business Unit

```sql
-- Update CHECK constraint to allow GENERAL
ALTER TABLE [pl].[BusinessUnit] DROP CONSTRAINT [CK_BusinessUnit_Code];
ALTER TABLE [pl].[BusinessUnit] ADD CONSTRAINT [CK_BusinessUnit_Code]
    CHECK ([Code] IN ('GICC', 'LCC', 'HCC', 'GENERAL'));

-- Insert GENERAL business unit
INSERT INTO [pl].[BusinessUnit] (Code, Name, Description, IsActive, CreatedBy, CreatedDate)
VALUES ('GENERAL', 'General', 'Globally used phrases across all units', 1, 'System', GETUTCDATE());

-- Verify
SELECT * FROM [pl].[BusinessUnit];
```

### Insert Permissions (dbo.ctint_permissions)

```sql
-- Insert all phrase list permissions
INSERT INTO [dbo].[ctint_permissions] (code, name, type, channel, tenant, platform, state, createTime, createBy)
VALUES
    ('ctint-mf-axa.phrase-lists.gicc.view', 'GICC Phrase List View', 'FEATURE', NULL, NULL, NULL, 'ACTIVE', GETUTCDATE(), 'System'),
    ('ctint-mf-axa.phrase-lists.gicc.edit', 'GICC Phrase List Edit', 'FEATURE', NULL, NULL, NULL, 'ACTIVE', GETUTCDATE(), 'System'),
    ('ctint-mf-axa.phrase-lists.hcc.view', 'HCC Phrase List View', 'FEATURE', NULL, NULL, NULL, 'ACTIVE', GETUTCDATE(), 'System'),
    ('ctint-mf-axa.phrase-lists.hcc.edit', 'HCC Phrase List Edit', 'FEATURE', NULL, NULL, NULL, 'ACTIVE', GETUTCDATE(), 'System'),
    ('ctint-mf-axa.phrase-lists.lcc.view', 'LCC Phrase List View', 'FEATURE', NULL, NULL, NULL, 'ACTIVE', GETUTCDATE(), 'System'),
    ('ctint-mf-axa.phrase-lists.lcc.edit', 'LCC Phrase List Edit', 'FEATURE', NULL, NULL, NULL, 'ACTIVE', GETUTCDATE(), 'System'),
    ('ctint-mf-axa.phrase-lists.general.view', 'General Phrase List View', 'FEATURE', NULL, NULL, NULL, 'ACTIVE', GETUTCDATE(), 'System'),
    ('ctint-mf-axa.phrase-lists.general.edit', 'General Phrase List Edit', 'FEATURE', NULL, NULL, NULL, 'ACTIVE', GETUTCDATE(), 'System');

-- Verify
SELECT code, name, type, state FROM [dbo].[ctint_permissions] WHERE code LIKE 'ctint-mf-axa.phrase-lists%';
```

### Connection Details (Dev)

```
Server: axahk-vtt-mssql.database.windows.net
Database: axahk-vtt-db
User: sqladmin
```
