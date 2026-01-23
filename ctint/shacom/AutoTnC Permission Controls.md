# AutoTnC Permission Controls

## Overview

The `@apps/ctint-mf-autotnc/` application uses a centralized permission system managed by the `useAutoTncPermissions` hook.

**Hook Location:** `components/_hooks/useAutoTncPermissions.ts`

---

## Permission Constants

| Key                         | Permission String                              |
| --------------------------- | ---------------------------------------------- |
| APPLICATION_VISIT           | `ctint-mf-autotnc.application.visit`           |
| PREVIOUS_RECORDS_SCOPE_MY   | `ctint-mf-autotnc.previous-records.scope-my`   |
| PREVIOUS_RECORDS_SCOPE_UNIT | `ctint-mf-autotnc.previous-records.scope-unit` |
| PREVIOUS_RECORDS_SCOPE_ALL  | `ctint-mf-autotnc.previous-records.scope-all`  |
|                             |                                                |

---

## Permission Flags from Hook

```typescript
const {
  canVisitApplication,      // APPLICATION_VISIT
  canViewTransactions,      // TRANSACTIONS_VIEW
  canConductTransactions,   // TRANSACTIONS_CONDUCT
  canViewScopeMy,           // PREVIOUS_RECORDS_SCOPE_MY
  canViewScopeUnit,         // PREVIOUS_RECORDS_SCOPE_UNIT
  canViewScopeAll,          // PREVIOUS_RECORDS_SCOPE_ALL
  availableScopeOptions,    // Computed array of permitted scopes
  defaultScope,             // First available scope
  hasPermission,            // Function to check any permission
} = useAutoTncPermissions();
```

---

## Pages & Permission-Controlled Fields

### 1. PreviousRecordsPage

**File:** `components/_features/transactions/PreviousRecordsPage/index.tsx`

| Permission | Controlled Element | Behavior |
|------------|-------------------|----------|
| `availableScopeOptions` | Scope tabs (My/Unit/All) | Only shows tabs for permitted scopes |
| `canViewTransactions` | Row click handler | Disabled when false (no navigation) |
| `canConductTransactions` | Action column menu | Affects "Conduct" option visibility |

### 2. LatestTransactionPage

**File:** `components/_features/transactions/LatestTransactionPage/index.tsx`

| Permission | Controlled Element | Behavior |
|------------|-------------------|----------|
| `canConductTransactions` | "Continue" button | Hidden when false |

### 3. TransactionDetailPage

**File:** `components/_features/transactions/TransactionDetailPage/index.tsx`

| Permission | Controlled Element | Behavior |
|------------|-------------------|----------|
| `canConductTransactions` | Call controls section | Entire section hidden when false |

---

## Components & Permission-Controlled UI

### TransactionDetailHeader

**File:** `components/_features/transactions/TransactionDetailPage/components/TransactionDetailHeader/index.tsx`

**Prop:** `canConduct?: boolean`

| Element | Behavior when `canConduct=false` |
|---------|----------------------------------|
| Phone input field | Hidden |
| "Make a call" button | Hidden |
| "End the Session" button | Hidden |
| REC recording badge | Hidden |

### LatestTransactionCard

**File:** `components/_features/transactions/LatestTransactionCard/index.tsx`

**Prop:** `canConduct?: boolean` (default: true)

| Element | Behavior when `canConduct=false` |
|---------|----------------------------------|
| "Continue" button | Hidden |

### TransactionActionMenu

**File:** `components/_features/transactions/TransactionsListingPage/TransactionActionMenu.tsx`

**Prop:** `canConduct?: boolean` (default: true)

| Element | Behavior when `canConduct=false` |
|---------|----------------------------------|
| "Conduct" menu item | Hidden |
| "Review" menu item | Always visible |

### generateColumns

**File:** `components/_features/transactions/TransactionsListingPage/generateColumns.tsx`

**Option:** `canConductTransactions?: boolean`

- Passes permission to `TransactionActionMenu` in action column

---

## Screen Wrappers

Both screen components use `AuthChecker` from design-system:

- `components/_screen/Main/index.tsx`
- `components/_screen/TransactionDetail/index.tsx`

---

## Dev Mode

**Flag:** `DEV_GRANT_ALL_PERMISSIONS = true` (in useAutoTncPermissions.ts)

When enabled, grants all permissions regardless of backend configuration.

---

## Permission Flow

```
useRole() (design-system)
    │
    ▼
userConfig.permissions[]
    │
    ▼
useAutoTncPermissions()
    │
    ├── Computes boolean flags
    ├── Computes availableScopeOptions
    │
    ▼
Components receive flags as props
    │
    ▼
Conditional rendering / disabled states
```
