# Relay Broadcast Control

Relay Broadcast Control is a focused operations dashboard for publishing broadcast messages and monitoring their delivery across a distributed set of consumers.

The interface is designed as an internal engineering tool rather than a chat application. It emphasizes controlled message publication, delivery traceability, acknowledgement state, and concise operational feedback.

This project is a React, TypeScript, Vite, and Tailwind CSS application built for the Figma Make environment.

## Table of contents

1. [Product overview](#product-overview)
2. [Core product principles](#core-product-principles)
3. [Application structure](#application-structure)
4. [Global application shell](#global-application-shell)
5. [Sidebar navigation](#sidebar-navigation)
6. [Top application bar](#top-application-bar)
7. [Send Message page](#send-message-page)
8. [Message Records page](#message-records-page)
9. [Acknowledgement Record drawer](#acknowledgement-record-drawer)
10. [Message and acknowledgement states](#message-and-acknowledgement-states)
11. [Complete interaction flows](#complete-interaction-flows)
12. [Responsive behavior](#responsive-behavior)
13. [Visual design system](#visual-design-system)
14. [Typography](#typography)
15. [Color system](#color-system)
16. [Spacing, borders, and shape](#spacing-borders-and-shape)
17. [Icons and visual indicators](#icons-and-visual-indicators)
18. [Motion and transitions](#motion-and-transitions)
19. [Accessibility](#accessibility)
20. [Data model](#data-model)
21. [Application state and persistence](#application-state-and-persistence)
22. [Component architecture](#component-architecture)
23. [Source file responsibilities](#source-file-responsibilities)
24. [Development workflow](#development-workflow)
25. [Build and formatting](#build-and-formatting)
26. [Current prototype boundaries](#current-prototype-boundaries)
27. [Future integration guidance](#future-integration-guidance)

---

## Product overview

The dashboard supports two primary tasks:

1. Publishing a broadcast message with an explicit clearance level.
2. Reviewing delivery and acknowledgement status for previously published messages.

Every message is distributed conceptually to three consumers:

- Admin
- User
- Email

The interface can represent complete, partial, pending, and failed delivery states. Operators can move from a high-level record list into a detailed acknowledgement view for an individual message.

### Intended audience

The product is intended for:

- Infrastructure and platform engineers
- Operations teams
- Site reliability engineers
- Internal administrators
- Incident-response teams
- Developers monitoring distributed message delivery

### Product scope

The interface is intentionally limited to broadcast operations. It does not include:

- Direct or group chat
- User profiles
- Social features
- File attachments
- Analytics dashboards
- Message reactions
- Contact lists
- General-purpose notification preferences

This narrow scope keeps the primary operational workflow visible and predictable.

---

## Core product principles

### Operational clarity

The interface prioritizes message state, clearance, identifiers, timestamps, and acknowledgement counts. Decorative elements remain secondary to system information.

### Controlled publication

The message composer makes the selected clearance level and irreversible nature of publication visible before the operator sends a message.

### Traceability

Every record includes:

- A unique identifier
- The message content
- A clearance level
- A sent timestamp
- An acknowledgement total
- A route to consumer-level delivery details

### Status at a glance

Acknowledgement colors have fixed semantic meanings:

- Green: acknowledged or complete
- Yellow/orange: pending
- Red: failed

These colors are reserved for system status and are not used as general decoration.

### Progressive detail

The records table presents compact summaries. Full message content and per-consumer status appear only when an operator opens the acknowledgement drawer.

### Restrained visual language

The visual system uses a flat dark background, subtle borders, limited shadows, compact typography, and one violet-blue action color. The result resembles a cloud or developer operations console rather than a consumer application.

---

## Application structure

The application has three visible layers:

1. A persistent left navigation sidebar
2. A primary workspace containing the top bar and current page
3. An acknowledgement drawer that overlays the workspace when a record is selected

The two page-level destinations are:

- Send Message
- Message Records

The Send Message page is the default landing page.

No external router is required in the current prototype. Page selection is managed through local React state, which keeps the interaction immediate and self-contained.

---

## Global application shell

The application shell establishes the dashboard layout.

### Desktop layout

On a standard desktop viewport:

- The sidebar is fixed to the left edge.
- The sidebar is `248px` wide.
- The workspace fills the remaining viewport width.
- The top bar remains at the top of the workspace while content scrolls.
- Main content is centered with a controlled maximum width.

### Workspace sizing

The general page container has a maximum width of `1180px`.

The Send Message page uses a narrower maximum width of `1050px` so the composer does not become excessively wide on large screens.

### Background

The application uses a flat near-black background. The sidebar, workspace, cards, and input surfaces use small tonal differences to establish hierarchy without creating a heavily layered or glass-like effect.

### Scroll behavior

The workspace can scroll vertically as content grows. The acknowledgement drawer has its own vertical scrolling region, ensuring the drawer header and page behind it remain structurally independent.

---

## Sidebar navigation

The left sidebar is persistent and contains three sections:

1. Product identity
2. Primary navigation
3. System availability

### Product identity

The top of the sidebar contains:

- A compact signal-style product mark
- The name `Relay`
- The descriptor `Broadcast Control`

The mark is built from three vertical bars with different heights. It suggests message transmission or signal activity without introducing a decorative illustration.

### Navigation group

The navigation group is labeled `Workspace` and contains:

- Send Message
- Message Records

Each navigation control includes:

- A line icon
- A text label
- Hover feedback
- A persistent active state

The active destination uses:

- A low-opacity violet-blue background
- Brighter text
- An accent-colored icon

Inactive items remain neutral gray and increase in contrast on hover.

### Navigation behavior

Selecting a navigation item:

- Changes the current page
- Updates the active navigation state
- Closes any acknowledgement record that may be open

### System availability

The bottom of the sidebar displays:

- A green status dot
- `All systems operational`
- `3 consumers connected`

This information is intentionally quiet. It provides useful environmental context without competing with the page content.

### Tablet sidebar

At narrower tablet widths, the sidebar becomes a compact icon rail:

- Width reduces to `72px`
- Product text is hidden
- Navigation labels are hidden
- Navigation icons remain visible
- The connected-state text is hidden
- The green operational indicator remains visible

The navigation controls retain accessible behavior even when their visual labels are hidden by the responsive layout.

---

## Top application bar

The top bar is positioned above the current workspace page.

### Breadcrumb

On desktop, the breadcrumb shows:

- Relay
- A chevron separator
- The current page name

The current page name is either:

- Send Message
- Message Records

The breadcrumb gives the operator location context without duplicating the visual weight of the page heading.

### Environment indicator

The right side displays:

- A green dot
- `Production`

The label is intentionally compact and uppercase. It signals that the operator is working in a production environment, which is important context for a message publication action.

### Sticky behavior

The top bar uses sticky positioning. It remains visible when the main page scrolls and keeps navigation context available on content-heavy views.

### Small-screen behavior

On the narrowest layout:

- The top bar height reduces.
- The product segment and breadcrumb separator are hidden.
- The current page name remains.
- The production environment indicator remains visible.

---

## Send Message page

The Send Message page is the application’s default route and primary action surface.

### Page heading

The heading area contains:

- `SEND A MESSAGE`
- A short explanation of the broadcast action
- A consumer availability summary

The supporting copy reads:

> Publish a message to all connected consumers across the relay network.

### Consumer availability summary

The right side of the heading shows:

- A green online indicator
- `3 / 3`
- `Consumers online`

This gives the operator confidence that all intended consumers are connected before publishing.

### Message composer card

The composer is the dominant surface on the page. It contains:

1. A concise card heading
2. A message field
3. A message length counter
4. Contextual help or validation
5. A clearance selector
6. A publication note
7. The primary Send Message action

### Message payload heading

The composer header contains:

- `Message payload`
- `Compose the broadcast content and define its access level.`

The language describes the field as an operational payload instead of a conversational chat message.

### Message field

The message input is a large multiline textarea.

Its placeholder reads:

> Enter the message to broadcast across the network...

Behavior and constraints:

- Maximum length: 500 characters
- Current character count is displayed in the lower-right corner
- The field can be vertically resized
- Entered text is preserved while the operator changes clearance
- Leading and trailing whitespace is removed when the message is submitted
- A message containing only whitespace is treated as empty

### Default message state

Before interaction:

- The field is empty.
- No error is shown.
- Supporting text states that messages are immutable once published.

### Focus state

When focused, the field uses:

- A violet-blue border
- A restrained outer focus ring
- The existing dark input background

The focus treatment is visible without dramatically changing the card.

### Validation behavior

If the operator selects Send Message without entering valid content:

- The message field receives a red error border.
- A subtle red focus-style ring appears.
- The standard helper message is replaced.
- An inline error message appears:

> Enter a message before sending.

- The error includes a small circular exclamation indicator.
- Any existing success state is dismissed.

When the operator begins entering non-whitespace content, the validation error is removed.

### Character counter

The counter uses a monospaced typeface and follows this format:

`current / 500`

For example:

`128 / 500`

The counter is informational and remains visually secondary.

### Clearance Level selector

The clearance selector contains exactly two options:

- Admin
- User

Admin is selected by default.

The selector is positioned opposite a short explanation:

> Controls which audience is authorized to receive this message.

The control uses a custom visual chevron while retaining a native HTML select element for reliable keyboard and platform behavior.

### Publication footer

The lower section of the composer states:

> Publishes to Admin, User, and Email consumers

This clarifies that the clearance level and the delivery consumers are related but distinct concepts.

### Send Message button

The primary action includes:

- A send icon
- The label `Send Message`
- The application’s violet-blue action color
- High-contrast white text
- A subtle hover lift

It is the strongest action on the page.

### Successful send behavior

When a valid message is submitted:

1. A new message record is created.
2. The new record is inserted at the top of the records collection.
3. The message field is cleared.
4. Any error state is cleared.
5. A success confirmation appears above the composer.

The success confirmation reads:

> Message sent successfully.

Its secondary message reads:

> Delivery acknowledgements are now being collected.

The success confirmation automatically disappears after four seconds.

### Initial acknowledgement state for a new message

A newly sent message begins with:

- Admin Server: Acknowledged
- User Server: Pending
- Email Server: Pending

This produces an initial overall state of:

`1 / 3 Acknowledged`

The prototype therefore demonstrates that publication and complete acknowledgement are separate stages.

---

## Message Records page

The Message Records page displays the complete in-memory broadcast history.

### Page heading

The heading includes:

- `MESSAGE RECORDS`
- A short description
- A total message count

The supporting copy reads:

> Review broadcasts and acknowledgement state across all consumers.

The total count updates when a new message is sent.

### Status summary

Above the table, the page includes a consolidated three-part summary:

- Fully acknowledged
- Awaiting response
- With failures

Each segment contains:

- A semantic status dot
- A numeric count
- A descriptive label

The summary is computed from the current records collection. It updates when the collection changes.

#### Fully acknowledged

A message is counted as fully acknowledged only when all three consumers have status `acknowledged`.

#### Awaiting response

A message is counted as awaiting response when:

- It is not fully acknowledged.
- It has at least one pending consumer.
- It has no failed consumer.

#### With failures

A message is counted as having failures when any consumer has status `failed`.

Failure takes precedence over pending when deriving the record’s overall summary.

### Broadcast history table

The records table is ordered with the most recent messages first.

The columns are:

1. Message
2. Clearance
3. Sent at
4. Acknowledgements
5. Actions

### Message column

The message column contains:

- A single-line preview of the message
- A unique message ID beneath it

Long message content is truncated with an ellipsis to keep the table compact.

The full message remains available through:

- The native title tooltip on the message control
- The Acknowledgement Record drawer

The message preview itself is selectable and opens the record drawer.

### Message identifier

Prototype identifiers use this general format:

`msg_8F2A91C4`

The identifier:

- Begins with `msg_`
- Uses an uppercase hexadecimal-style suffix
- Appears in a monospaced typeface
- Is unique for the current in-memory session

### Clearance column

Clearance appears as a compact badge.

Admin clearance uses a restrained violet treatment to distinguish elevated access.

User clearance uses a neutral treatment.

### Sent timestamp column

Example records use a readable date and time format such as:

`May 24, 2025 · 10:42:28`

Newly created records use the browser’s `en-US` locale formatting and include:

- Month
- Day
- Year
- Hour
- Minute
- Second

### Acknowledgements column

The acknowledgement summary includes:

- A semantic status badge
- A numeric fraction

Examples:

- `3 / 3`
- `2 / 3`
- `1 / 3`

The badge can be:

- Acknowledged
- Pending
- Failed

### Record action

Each row includes a `View record` action with a chevron.

Selecting this action opens the detailed Acknowledgement Record drawer.

### Table overflow

On constrained widths, the records table can scroll horizontally. This preserves column readability instead of compressing every field into an unusable layout.

### Populated example data

The application starts with realistic records demonstrating:

- A fully acknowledged maintenance notification
- A deployment message with one pending acknowledgement
- An incident message containing a failed acknowledgement
- A service-status message with only one acknowledgement

This ensures the dashboard immediately communicates all major system states.

---

## Acknowledgement Record drawer

The Acknowledgement Record is presented as a dedicated drawer from the right side of the screen.

The drawer keeps the operator within the records workflow while providing enough room for complete message and consumer information.

### Opening the drawer

The drawer can be opened by selecting:

- A message preview
- The corresponding `View record` button

### Drawer width

On desktop, the drawer width is the smaller of:

- `680px`
- `84vw`

This allows the drawer to remain useful on mid-sized screens without occupying more width than necessary.

### Backdrop

When the drawer is open:

- The rest of the application is covered by a dark translucent backdrop.
- The selected record remains the visual focus.
- Selecting the backdrop closes the drawer.

### Drawer header

The header contains:

- `ACKNOWLEDGEMENT RECORD`
- A close button

The close button uses an X icon and includes an accessible label.

### Overall acknowledgement summary

The first drawer section communicates:

- The number of acknowledged consumers
- The total number of consumers
- The derived overall state
- A concise explanation of that state

Examples:

- `3 / 3 Acknowledged`
- `2 / 3 Acknowledged`
- `1 / 3 Acknowledged`

The accompanying message changes by status:

#### Complete

> Delivery complete across all consumers

#### Pending

> Waiting for remaining consumer responses

#### Failed

> One or more consumers reported a failure

The section also includes:

- A semantic icon
- A semantic status badge

### Full message payload

The complete, untruncated message appears immediately below the overall summary.

The full content uses comfortable line height and wraps naturally. This is the primary place to inspect long messages.

### Metadata

The metadata area includes:

- Message ID
- Clearance
- Sent timestamp

The ID and timestamp use monospaced typography where appropriate. The clearance uses the same badge treatment as the records table.

### Consumer responses table

The lower section lists every consumer.

The columns are:

1. Server
2. Status
3. Acknowledged at

The fixed consumers are:

- Admin Server
- User Server
- Email Server

Each server has a compact server icon.

### Consumer status

Each consumer status is one of:

- Acknowledged
- Pending
- Failed

The same semantic badge system is used throughout the application.

### Acknowledged time

When an acknowledgement time exists, it is displayed in a monospaced format such as:

`10:42:31`

Pending and failed records without a successful acknowledgement time display an em dash.

### Closing the drawer

The drawer can be closed by:

- Selecting the X close button
- Selecting the backdrop
- Navigating to another primary page

---

## Message and acknowledgement states

### Consumer-level states

Each consumer can have one of three states.

#### Acknowledged

Meaning:

- The consumer received the message.
- The consumer returned a successful acknowledgement.

Visual treatment:

- Green status dot
- Green text
- Low-opacity green background
- Low-opacity green border

#### Pending

Meaning:

- The consumer has not yet returned a final acknowledgement.

Visual treatment:

- Yellow/orange status dot
- Yellow/orange text
- Low-opacity warm background
- Low-opacity warm border

#### Failed

Meaning:

- The consumer reported or encountered an acknowledgement failure.

Visual treatment:

- Red status dot
- Red text
- Low-opacity red background
- Low-opacity red border

### Record-level state derivation

Record status is derived from all consumer acknowledgements.

Pseudocode:

```text
if acknowledged count equals consumer count:
    record status is acknowledged
else if any consumer has failed:
    record status is failed
else:
    record status is pending
```

This produces consistent summary behavior across:

- The records table
- The status summary
- The acknowledgement drawer

### Supported acknowledgement totals

With three consumers, the interface can display:

- `0 / 3`
- `1 / 3`
- `2 / 3`
- `3 / 3`

The included data currently demonstrates `1 / 3`, `2 / 3`, and `3 / 3`.

---

## Complete interaction flows

### Flow 1: Send a valid broadcast

1. Open the application.
2. The Send Message page appears.
3. Choose Admin or User clearance.
4. Enter message content.
5. Observe the character count update.
6. Select Send Message.
7. The message is trimmed and validated.
8. A new message record is created.
9. The composer is cleared.
10. A success confirmation appears.
11. The new record receives one acknowledged and two pending consumers.

### Flow 2: Attempt to send an empty broadcast

1. Open the Send Message page.
2. Leave the message field empty, or enter only spaces.
3. Select Send Message.
4. Publication is prevented.
5. The field receives an error treatment.
6. The inline validation message appears.
7. Begin entering valid content.
8. The validation state clears.

### Flow 3: Review the newly sent message

1. Send a valid message.
2. Select Message Records in the sidebar.
3. The records page appears.
4. The newly sent message is the first table row.
5. The message shows the selected clearance.
6. The acknowledgement summary shows `1 / 3`.
7. The overall state is Pending.

### Flow 4: Inspect consumer acknowledgements

1. Open Message Records.
2. Select a message preview or View record.
3. The acknowledgement drawer enters from the right.
4. Review the full message content.
5. Review message ID, clearance, and timestamp.
6. Review the overall acknowledgement count.
7. Review Admin, User, and Email consumer states.
8. Close the drawer using the close button or backdrop.

### Flow 5: Compare complete, pending, and failed states

1. Open Message Records.
2. Review the status summary counts.
3. Locate a green Acknowledged record.
4. Locate a yellow Pending record.
5. Locate a red Failed record.
6. Open each record to inspect the consumer-level cause of its overall state.

---

## Responsive behavior

The interface is designed primarily for desktop and tablet, with additional handling for narrow mobile-sized viewports.

### Above `1080px`

- Full `248px` sidebar
- Full navigation labels
- Full status badge labels
- Wide content area
- Standard page padding

### At or below `1080px`

- Sidebar reduces to `202px`
- Main page horizontal padding reduces
- Top bar horizontal padding reduces
- Status badges in the records table become compact dots
- Numeric acknowledgement counts remain visible

This breakpoint prioritizes table space while retaining the complete sidebar vocabulary.

### At or below `800px`

- Sidebar becomes a `72px` icon rail
- Product text is hidden
- Navigation labels are hidden
- Operational text is hidden
- Main workspace margin updates to match the rail
- Page top spacing decreases
- Message preview width is constrained
- The word `record` can be hidden from the row action, leaving the compact `View` label

### At or below `640px`

- Top bar height reduces
- Breadcrumb is simplified
- Page padding reduces
- Page headings stack vertically
- Consumer count spans the available width
- Status summary segments stack vertically
- Clearance field and selector stack
- Composer footer content stacks
- Send button can occupy the available row width
- Drawer width becomes the viewport width minus a small outer margin
- Drawer padding reduces
- Metadata changes from three columns to one column
- The consumer acknowledgement time column is hidden

### Responsive table strategy

The records table favors horizontal scrolling over destructive column compression. This keeps:

- Message previews readable
- Status information aligned
- Action buttons usable
- Timestamp formatting intact

---

## Visual design system

The project does not depend on an external component library. Its interface system is implemented locally in `src/index.css`.

### Visual character

The system is:

- Dark
- Compact
- Technical
- Restrained
- Status-oriented
- Slightly rounded
- Border-led rather than shadow-led

### Hierarchy strategy

Hierarchy is created with:

- Background tone changes
- Text contrast
- Font size and weight
- Spacing
- Thin borders
- Limited use of accent color

Shadows and gradients are intentionally minimized.

### Surface levels

The UI uses several closely related dark tones:

1. Application background
2. Sidebar background
3. Card background
4. Input background
5. Hover background
6. Selected or active background

The differences are subtle to keep the dashboard cohesive.

---

## Typography

### Primary font stack

The interface uses:

```css
Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

This stack provides:

- High legibility
- Familiar system rendering
- Good density for dashboards
- Reliable cross-platform fallback

### Monospaced font stack

Identifiers, counts, and timestamps use:

```css
"SFMono-Regular", Consolas, monospace
```

Monospaced text helps operators distinguish machine-oriented values from descriptive content.

### Type hierarchy

#### Page titles

- Uppercase
- Responsive size
- Tight letter spacing
- Strong but not ultra-heavy weight

#### Section headings

- Sentence case
- Compact size
- Medium-to-semibold weight

#### Body and supporting text

- Neutral gray
- Smaller than consumer-product body copy
- Increased line height where content can wrap

#### Labels

- Compact
- Medium weight
- High enough contrast to support scanning

#### Metadata labels

- Uppercase
- Small size
- Increased letter spacing
- Secondary contrast

---

## Color system

### Base colors

Representative base colors include:

| Purpose | Color |
| --- | --- |
| Root background | `#080b10` |
| Application background | `#0b0e14` |
| Sidebar background | `#0d1017` |
| Card surface | `#10141b` |
| Input surface | `#0b0e14` |
| Primary border | `#242933` |
| Primary text | `#f3f5f8` |
| Secondary text | `#7d8491` |

### Action accent

Violet-blue is the only non-status accent.

Representative values:

| Purpose | Color |
| --- | --- |
| Primary button | `#6872e5` |
| Primary button hover | `#7680ed` |
| Accent icon | `#8992ff` |
| Focus outline | `#7c86ff` |

### Status colors

| Status | Representative color |
| --- | --- |
| Acknowledged | `#46c98b` |
| Pending | `#e9a84c` |
| Failed | `#e65f6c` |

Status backgrounds and borders use transparent versions of these colors to avoid overly bright blocks.

### Color usage rules

- Violet-blue is reserved for actions, focus, and active navigation.
- Green is reserved for operational health and successful acknowledgement.
- Yellow/orange is reserved for waiting or pending state.
- Red is reserved for validation errors and failed acknowledgement.
- Neutral grays carry structural and descriptive information.

---

## Spacing, borders, and shape

### Spacing

Spacing follows a compact dashboard rhythm:

- Small gaps support metadata and labels.
- Medium gaps separate related controls.
- Larger gaps separate page-level sections.

The composer uses more internal space than table rows because composition requires sustained focus, while records favor scanning density.

### Borders

Borders are typically:

- `1px`
- Low contrast
- Cool neutral gray

They separate regions without making every item feel like a standalone card.

### Corner radii

Typical radii range from:

- `5px` for compact badges
- `7px` to `9px` for controls and small surfaces
- `11px` for major cards
- Fully rounded pills for status badges

### Shadows

Shadows are intentionally limited. The design relies primarily on border and tonal hierarchy. The primary button retains restrained depth to communicate action priority.

---

## Icons and visual indicators

All current icons are implemented as lightweight inline SVG components. No icon library dependency is required.

### Icon set

The application includes:

- Send icon
- Records/list icon
- Chevron icon
- Close icon
- Check icon
- Server glyph
- Product signal mark

### Icon behavior

- Decorative SVGs use `aria-hidden="true"`.
- Icon-only interactive controls receive explicit accessible labels.
- Icons inherit their color from surrounding text.
- Stroke weights remain consistent with the compact dashboard aesthetic.

### Status dots

Small circular dots support rapid status scanning. They always accompany another signal such as:

- A text label
- A numeric count
- A descriptive sentence

Color is not the only means of communicating state.

---

## Motion and transitions

Motion is limited and functional.

### Navigation and buttons

Hover transitions adjust:

- Background
- Border
- Text color
- Slight vertical movement for the primary action

### Success confirmation

The confirmation enters with:

- A short fade
- A small upward-to-rest translation

### Drawer

The drawer enters with:

- A short right-to-left translation
- A fade to full opacity

The backdrop fades independently.

### Motion principles

- Animations are brief.
- Motion does not block interaction.
- Motion reinforces spatial relationships.
- No looping decorative animation is used.

---

## Accessibility

The prototype includes several accessibility considerations.

### Semantic structure

The interface uses:

- `aside` for the sidebar
- `nav` for primary navigation
- `header` for the top bar
- `main` for page content
- `form` for message composition
- `table` for records and consumer responses
- `section` with `role="dialog"` for the acknowledgement drawer
- `dl`, `dt`, and `dd` for metadata

### Form labels

The message field and clearance selector have explicit labels linked through `htmlFor` and `id`.

### Validation association

The textarea uses `aria-describedby` to reference either:

- The normal helper text
- The validation error

This keeps assistive technology synchronized with the visible field state.

### Success announcement

The success confirmation uses `role="status"` so its appearance can be announced without taking focus.

### Drawer semantics

The drawer includes:

- `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby`
- A visible title
- Accessible close controls

### Focus visibility

Buttons, selects, and textareas receive a visible violet focus outline when navigating with a keyboard.

### Button types

Buttons explicitly use `type="button"` unless they are intended to submit the form. This prevents accidental form submission.

### Table labels

The unlabeled action header contains visually hidden text for screen readers.

### Color independence

Status states use:

- Color
- Text labels
- Dots or icons
- Numeric acknowledgement totals

Users do not need to rely on color alone.

### Native controls

The clearance selector remains a native select control, preserving familiar keyboard and assistive-technology behavior.

### Current accessibility limitations

The prototype does not yet include:

- Explicit focus trapping inside the open drawer
- Escape-key drawer dismissal
- Focus restoration to the element that opened the drawer
- Reduced-motion media-query overrides
- Automated accessibility test coverage

These should be added before treating the drawer as production-complete.

---

## Data model

The data model is defined in `src/App.tsx`.

### Page

```ts
type Page = "send" | "records";
```

### Clearance

```ts
type Clearance = "Admin" | "User";
```

### Acknowledgement state

```ts
type AckState = "acknowledged" | "pending" | "failed";
```

### Acknowledgement

```ts
type Acknowledgement = {
  server: "Admin" | "User" | "Email";
  status: AckState;
  acknowledgedAt?: string;
};
```

### Message record

```ts
type MessageRecord = {
  id: string;
  message: string;
  clearance: Clearance;
  sentAt: string;
  acknowledgements: Acknowledgement[];
};
```

### Summary calculation

The `getSummary` helper:

1. Counts acknowledged consumers.
2. Detects whether any failure exists.
3. Derives the overall record state.
4. Returns both the acknowledgement count and overall status.

The same function is reused across table, summary, and drawer interfaces.

---

## Application state and persistence

The prototype uses React local state.

### Root state

The root application owns:

- Current page
- Message records collection
- Selected acknowledgement record

### Composer state

The Send Message page owns:

- Current message content
- Selected clearance
- Empty-message error state
- Success confirmation state

### Record ordering

New records are prepended:

```text
new record + existing records
```

This keeps the latest broadcast at the top.

### Persistence

Records exist only in memory.

Consequences:

- New messages remain available while the application session is open.
- Navigating between the two internal pages does not remove records.
- Refreshing the browser resets the application to the included example data.
- No data is sent to a backend.
- No data is written to local storage.

### Identifier generation

New IDs are generated from a random hexadecimal-style string and converted to uppercase.

This is sufficient for prototyping but is not a production-grade identifier strategy.

### Timestamp generation

New message timestamps use the browser’s current date and time.

The first Admin acknowledgement uses the current local time in 24-hour format.

---

## Component architecture

The interface is divided into focused components inside `src/App.tsx`.

### `App`

Responsibilities:

- Own page navigation state
- Own message records
- Own selected-record state
- Create new message records
- Compose the application shell
- Conditionally render the acknowledgement drawer

### `Sidebar`

Responsibilities:

- Display product identity
- Display primary navigation
- Indicate the active page
- Display overall consumer connectivity
- Trigger page changes

### `Header`

Responsibilities:

- Display page context
- Display production environment state

### `SendPage`

Responsibilities:

- Manage composer input
- Manage clearance selection
- Validate content
- Show success feedback
- Submit valid data to the root application

### `RecordsPage`

Responsibilities:

- Calculate record summary totals
- Display the broadcast history
- Display status and acknowledgement summaries
- Open a selected record

### `AcknowledgementDrawer`

Responsibilities:

- Display full selected-message content
- Display message metadata
- Display overall acknowledgement state
- Display every consumer status
- Provide close interactions

### `StatusBadge`

Responsibilities:

- Map acknowledgement status to a human-readable label
- Apply the correct semantic class
- Display a consistent status dot

### `Icon`

Responsibilities:

- Provide a shared SVG wrapper
- Set the common view box
- Hide decorative SVG content from assistive technology
- Accept a configurable size

### Specific icon components

- `SendIcon`
- `RecordsIcon`
- `ChevronIcon`
- `CloseIcon`

These keep SVG path details out of the larger layout components.

---

## Source file responsibilities

### `src/App.tsx`

Contains:

- Type definitions
- Example data
- Icon components
- Status derivation
- Navigation shell
- Send Message page
- Message Records page
- Acknowledgement Record drawer
- All prototype interaction state

### `src/index.css`

Contains:

- Tailwind CSS import
- Root typography and colors
- Application shell styles
- Navigation styles
- Form styles
- Records table styles
- Status styles
- Drawer styles
- Responsive breakpoints
- Motion definitions
- Accessibility helper classes

Although Tailwind CSS is available, the current UI primarily uses semantic class names with centralized CSS. This makes the full visual system easy to review in one file.

### `src/main.tsx`

Responsibilities:

- Import global styles
- Mount the React application
- Wrap the application in React Strict Mode

### `index.html`

Provides:

- The root HTML document
- The React mount element
- The Vite application entry

### `vite.config.ts`

Configures:

- React
- Tailwind CSS v4
- Figma Make integration
- Source aliases
- Development and preview behavior

---

## Development workflow

### Requirements

Tool versions are managed by `.mise.toml`.

The project uses:

- Node.js
- pnpm
- React 19
- TypeScript 5.7
- Vite 8
- Tailwind CSS 4
- oxfmt

### Install dependencies

```bash
pnpm install
```

In the Figma Make environment, dependencies and the development server are typically managed automatically.

### Development server

The Figma Make development server is already running on the configured port.

Default:

```text
8443
```

Source changes are reflected through hot reload. Do not start a second development server inside the managed Figma Make environment.

### Main editing locations

For UI work, begin with:

```text
src/App.tsx
src/index.css
```

---

## Build and formatting

### Production build

```bash
pnpm build
```

This runs the Vite production build.

### Formatting

```bash
pnpm format
```

This runs oxfmt using the repository configuration.

### Available package scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Start Vite development mode outside the managed environment |
| `pnpm build` | Create a production build |
| `pnpm preview` | Preview the production build outside the managed environment |
| `pnpm format` | Format supported source files |

Do not run `pnpm dev` when working inside Figma Make because the managed development server is already active.

---

## Current prototype boundaries

This application is a high-fidelity interactive prototype. Several behaviors are intentionally simulated.

### No backend

The application does not call an API. Sending a message updates local React state only.

### No actual broker

The prototype does not connect to:

- Kafka
- RabbitMQ
- NATS
- Redis Pub/Sub
- Amazon SNS/SQS
- Google Pub/Sub
- Azure Service Bus
- Any other message broker

### No live acknowledgement updates

Pending consumers do not automatically transition to acknowledged or failed after a delay. Their initial state remains unchanged for the current session.

### No retry action

Failed acknowledgements can be inspected but not retried.

### No record filtering or search

All records are displayed in a single history table.

### No pagination

The current data set is small and rendered in full.

### No persistence

Refreshing the browser restores the original example records.

### No authentication or authorization

The clearance selector is part of message metadata. It does not verify the current operator’s permissions.

### No timezone control

New timestamps use browser locale behavior. The example data uses fixed presentation strings.

### No route URLs

The two pages do not have separate browser URLs. Page changes are local state transitions.

---

## Future integration guidance

The current interface can be retained while replacing prototype behavior with production services.

### Message publication

Replace the local `handleSend` record creation with an API request.

A production request might include:

```json
{
  "message": "Scheduled maintenance begins at 02:00 UTC.",
  "clearance": "Admin"
}
```

The service should return:

- Canonical message ID
- Server-generated timestamp
- Initial consumer delivery state

### Record retrieval

Replace `initialRecords` with data loaded from a records endpoint.

Consider supporting:

- Cursor pagination
- Search
- Clearance filters
- Status filters
- Date ranges
- Server-side sorting

These should be added only if operational needs justify them.

### Live acknowledgement updates

Acknowledgement state could be updated through:

- WebSocket events
- Server-sent events
- Polling
- Broker-to-API projections

Updates should reconcile by message ID and consumer name.

### Failure handling

Production publication should account for:

- Network failures
- Authorization failures
- Validation failures
- Broker unavailability
- Duplicate requests
- Partial publication
- Timeout behavior

The current success banner should appear only after the publication endpoint confirms acceptance.

### Idempotency

Use an idempotency key for send operations so repeated submissions do not create accidental duplicate broadcasts.

### Production identifiers

Replace the random prototype ID with a server-generated identifier such as:

- UUID
- ULID
- Broker message ID
- Domain-specific event ID

### Time handling

Use canonical server timestamps, preferably UTC, and format them for the operator’s locale. The interface should indicate timezone when ambiguity could affect incident response.

### Accessibility hardening

Before production release:

- Trap keyboard focus inside the open drawer.
- Restore focus to the opening control on close.
- Support Escape to close.
- Add reduced-motion styling.
- Test screen-reader table navigation.
- Run automated accessibility checks.
- Test contrast against WCAG requirements.

### Testing

Recommended coverage:

- Empty-message validation
- Whitespace-only validation
- Character limit behavior
- Clearance selection
- Successful record creation
- Record ordering
- Status derivation
- Drawer open and close behavior
- Responsive navigation
- Consumer-level rendering
- Keyboard interaction
- Accessibility semantics

---

## Summary

Relay Broadcast Control provides a concise end-to-end operational workflow:

1. Compose a broadcast.
2. Assign Admin or User clearance.
3. Publish the message.
4. Receive immediate success feedback.
5. Review the message in delivery history.
6. Inspect the overall acknowledgement count.
7. Open the detailed record.
8. Review Admin, User, and Email consumer status.

The UI is intentionally dark, restrained, and technical. It prioritizes confidence, traceability, and system state while avoiding unrelated product features or decorative complexity.
