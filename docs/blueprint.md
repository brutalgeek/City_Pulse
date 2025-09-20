# **App Name**: CityPulse

## Core Features:

- Issue Reporting: Allow users to report civic issues by providing a description, photo, and geolocation.
- Map Visualization: Display reported issues on a map using geolocation data.
- Image/Video Upload: Enable users to upload images or videos as proof of the reported issue.
- Crowdsourced Validation: Implement a system for users to upvote or comment on reported issues, for validation purposes.
- Issue Resolution Lifecycle Tool: Use an LLM as a tool to choose from available steps (Reported, Acknowledged, In-Progress, Resolved), in order to set the issue status appropriately and move the process to the next step. Status changes can depend on input text from the resolver.

## Style Guidelines:

- Primary color: Strong Blue (#2962FF) to convey trust and reliability in civic matters.
- Background color: Light blue (#E6F0FF), a desaturated variant of the primary, for a clean and calming backdrop.
- Accent color: Vivid Green (#69F0AE) for 'Resolved' status and important calls to action.
- Font: 'Inter', a grotesque-style sans-serif font, for both headlines and body text.
- Use simple, outlined icons from a library like FontAwesome to represent different issue categories.
- Use a card-based layout for displaying issues on the dashboard and map.
- Implement subtle transition animations when updating issue statuses or displaying notifications.