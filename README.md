
---

# 🔹 Frontend (Angular) README.md  

```markdown
# MelioHealth – Frontend (Angular)

## Overview
This is the **frontend client** for MelioHealth, a digital healthcare platform enabling patients to manage symptoms and interact with healthcare providers.  
The Angular app consumes the Laravel backend APIs and provides an intuitive, responsive interface.

## Features
- **Patient Dashboard**: View and manage symptoms  
- **Doctor/Provider Dashboard**: Manage patients, appointments, and communication  
- **Live Video Conferencing**: Real-time consultation using Socket.io  
- **Payments**: Stripe integration for subscriptions and billing  
- **Admin Panel**: Role-based dashboards with analytics and reporting  
- **Responsive UI**: Built with Material UI and Bootstrap for cross-device compatibility  

## Technologies
- **Framework:** Angular (v14+)  
- **Languages:** TypeScript, JavaScript, HTML5, SCSS  
- **UI Libraries:** Material UI, Bootstrap, ng-bootstrap, RxJS  
- **APIs:** REST APIs from Laravel backend  
- **Deployment:** DigitalOcean, CI/CD pipelines  
- **Other Tools:** Git, Bitbucket, Jenkins  

## Installation & Setup
1. Clone the repository:  
   ```bash
   git clone https://github.com/waleedmazhar64/meliohealth-frontend.git
   cd meliohealth-frontend
2. Install dependencies:
 ```bash
  npm install
3. Configure API base URL in environment.ts (point to backend).

4. Run the app:
```bash
  ng serve --open


**Folder Structure**

/src/app/modules → Feature modules (dashboard, appointments, admin, etc.)

/src/app/services → API service integrations

/src/app/components → Reusable components


