fixmate_project/admin/ADMIN_IMPLEMENTATION.md
```

This file defines **exactly what the Admin dashboard must implement**.  
If anything here is skipped or “simplified”, the admin app is incomplete.

---

# FixMate Admin Dashboard – Implementation Specification

## Purpose

The Admin Dashboard is the **control plane** of FixMate.  
It exists to **govern**, **audit**, and **protect** the platform — not to “manage UI data”.

Admin actions directly affect:
- money
- trust
- legal exposure

Therefore, **every admin feature must be explicit, auditable, and role-protected**.

---

## 1. Admin Authentication & Access Control

### Requirements
- Admin uses **separate login UI**
- Admin authentication via API (`/auth/login`)
- Admin role **must be validated server-side**
- Token expiration must force logout

### Must Implement
- Login page
- Route protection middleware
- Auto-logout on 401 / 403
- No access to dashboard without valid ADMIN role

### Must NOT
- Share auth state with customer/technician apps
- Trust frontend role checks alone

---

## 2. Dashboard Overview (Read-only)

### Purpose
Provide a **high-level system health view**.

### Required Metrics (API-driven only)
- Total users
- Active technicians
- Jobs today
- Jobs failed to match
- Pending disputes
- Pending technician verifications

### Rules
- No client-side calculations
- No editable data
- Read-only widgets only

---

## 3. User Management

### Features
- List all users
- View user details
- Suspend user
- Ban user

### Rules
- Every destructive action requires:
  - confirmation modal
  - mandatory reason
- Action must be logged server-side
- UI must warn about consequences

### Admin CANNOT
- Edit user passwords
- Impersonate users
- Delete users permanently

---

## 4. Technician Verification (CRITICAL)

### Features
- View pending technician applications
- View uploaded documents
- Approve technician
- Reject technician (with reason)

### Rules
- No bulk approval
- Approval is irreversible without admin override
- Rejection reason is mandatory
- Unverified technicians must NEVER be matchable

### Failure Impact
If this is weak → fake technicians → platform dies.

---

## 5. Service & Category Management

### Features
- List services
- Create service
- Edit service
- Enable / disable service

### Rules
- Soft delete only
- Disable requires confirmation
- Service pricing rules come from API

### Admin CANNOT
- Modify historical job prices
- Edit completed jobs

---

## 6. Job Monitoring (Read-only)

### Features
- List jobs
- Filter by status
- View job lifecycle (state history)
- View assigned technician & customer

### Rules
- Admin cannot change job state directly
- Admin cannot assign technicians manually
- Admin can only observe and escalate

### Purpose
Transparency and debugging — not control.

---

## 7. Payments & Refunds

### Features
- View payments
- View payment breakdown
- Issue refunds

### Rules
- Refund requires:
  - confirmation
  - mandatory reason
- Refund action must be logged
- UI must show platform fee vs technician earnings

### Admin CANNOT
- Edit payment amounts
- Modify completed earnings manually

---

## 8. Dispute Resolution

### Features
- List open disputes
- View dispute details
- Resolve dispute

### Rules
- Resolution is immutable
- Resolution reason required
- Admin decision is final

### Purpose
Legal and financial protection.

---

## 9. Notifications & System Awareness

### Features
- View notification logs (optional)
- See failed system events (optional)

### Rules
- Admin does not send notifications manually
- Admin does not trigger matching manually

---

## 10. Audit Awareness (UI Responsibility)

### UI Must Always
- Warn before destructive actions
- Show clear confirmation messages
- Assume all actions are logged

### UI Must NEVER
- Perform silent actions
- Auto-save destructive changes
- Hide errors

---

## 11. Error Handling & UX Safety

### Must Implement
- Global error handler
- Clear error messages
- Loading states
- Empty states

### Rules
- No silent failures
- 403 = “Access Denied”
- 401 = forced logout

---

## 12. Integration Rules

- All data comes from API
- All requests go through a single API client
- No direct `fetch()` in pages
- Enums must match backend enums exactly

---

## 13. What Admin MUST NOT Do (Hard No)

- ❌ Change job lifecycle directly  
- ❌ Bypass verification rules  
- ❌ Modify matching logic  
- ❌ Edit user-generated data silently  
- ❌ Perform unlogged actions  

Any of the above = security and legal risk.

---

## Completion Criteria

Admin Dashboard is considered **complete** only if:

- Admin-only access enforced
- All critical flows implemented
- All destructive actions confirmed
- No business logic in UI
- API is the single source of truth

If it “looks done” but violates these rules → it is NOT done.
