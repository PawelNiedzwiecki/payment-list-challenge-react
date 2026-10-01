# Solution notes

All 8 steps are implemented. The 11 provided tests pass, plus unit tests for each hook, component and util.

```bash
npm install
npm run dev            # app with MSW mocks
npx vitest run         # all tests
npm run build          # tsc -b + vite build
npm run lint
npm run format:check
```

## Structure

| Layer | File | Job |
|-------|------|-----|
| API | `src/api/payments.ts` | `fetchPayments` with axios; drops empty filters from the URL; forwards the abort signal |
| Filter state | `src/hooks/usePaymentFilters.ts` | Search draft vs applied params, page resets, clear |
| Server state | `src/hooks/usePayments.ts` | React Query wrapper; maps axios errors to `notFound` / `server` / `unknown`; derives one `view` |
| Page | `src/components/PaymentsPage.tsx` | Composes the pieces and switches on `view` |
| UI | `PaymentsSearch`, `PaymentsTable`, `Pagination`, `PaymentsError`, `PaymentsEmpty` | Presentational, props only |
| Formatting | `src/utils/format.ts` | Date, amount, status text |

## Key decisions

- **React Query** for loading/error state, request cancellation, no stale-response races, and caching of visited pages. It was already installed and wired into `App.tsx`.
- **Search applies on submit**, not on every keystroke: one request per lookup by ID. Currency applies immediately (as Step 6 expects) and takes any typed search text with it.
- **One `view` value** (`loading` → `error` → `empty` → `success`) so only one state can render, and the JSX doesn't combine flags.
- **`placeholderData: keepPreviousData`** keeps the table on screen between pages instead of flashing a spinner. The table dims and pagination is disabled until the new page arrives.
- **Typed errors**: 404 → not found, 5xx → server error, everything else (401, network, timeout) → generic message. A `Record<PaymentsErrorType, string>` makes TypeScript enforce a message per type.
- **Accessibility**: search landmark, labelled controls, `scope="col"` headers, `role="alert"` errors, `role="status"` empty state, pagination `nav` with a live "Page N" label, `:focus-visible` rings.

## Trade-offs and what I'd do next

- Filters in the URL (shareable, Back/refresh keep state).
- Retry button on errors; today an error replaces the table and pagination.
- "Page X of Y" from `total`, hide pagination on a single page.
- Currency-aware amounts via `Intl.NumberFormat` (JPY has no decimals) — the design shows 2 decimals everywhere, so I kept that.
- Runtime validation of the response (e.g. Zod) and types inferred from it.
- One styling approach instead of Tailwind + styled-components (both came with the scaffold; I didn't migrate).
- Integration tests for `usePayments` with MSW (placeholder data, view order).

## Use of AI

- **Tool(s):** Claude Code
- **What I wrote myself:** Components, functionalities, hooks, error/success states, main structure, utils
- **What AI helped with:** Drafting unit tests, reviewing accessibility, reviewing the final solution and suggesting fixes from that review (e.g. `<form role="search">` instead of `<search>`, keeping the provided test file unchanged), and drafting this document.
- **What I changed or rejected:** Some suggested unit tests were too granular and verbose. I rewrote them into fewer, simpler tests that check behaviour, not implementation details.
- **How I verified it:** I read and understand every line, ran the provided and added tests, `tsc -b`, ESLint and Biome, and checked each step manually in the browser.
