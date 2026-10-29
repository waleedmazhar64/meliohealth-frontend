# MelioHealth — Healthcare application frontend

An Angular 17.3 / TypeScript client for the [MelioHealth API](https://github.com/waleedmazhar64/meliohealth-backend), covering account flows, patient and admin areas, notes and support.

## Repository tour

| Area | Source |
| --- | --- |
| Public navigation and lazy-loaded feature modules | [Routing](src/app/app-routing.module.ts) |
| Account screens | [Auth](src/app/auth) |
| Patient workflows | [Patient module](src/app/patient) |
| Admin screens | [Admin module](src/app/admin) |
| HTTP integrations | [Services](src/app/services) |
| API base URLs | [App config](src/app/app.config.ts) |

The package manifest includes Bootstrap, RxJS, Toastr, a spinner component and Angular SSR tooling. Installed tooling alone does not prove a working server-rendered deployment.

## Local setup

```bash
git clone https://github.com/waleedmazhar64/meliohealth-frontend.git
cd meliohealth-frontend
npm ci
```

Use a Node/npm version compatible with Angular 17.3. Set `apiUrl` and `authUrl` in [src/app/app.config.ts](src/app/app.config.ts), then start the paired backend.

```bash
npm start
npm run build
npm test
```

The development server normally uses port 4200. These commands come from [package.json](package.json); they were not executed in this documentation pass.

## Scope

This is an application prototype. The previous README listed live-video conferencing, Stripe payments and UI libraries that were not substantiated by the inspected source and dependencies; those claims have been removed.

Use synthetic data. The backend requires further access-control and data-handling work before a real healthcare or payment deployment.

## Author

[Waleed Mazhar — Senior Software Engineer](https://github.com/waleedmazhar64)
