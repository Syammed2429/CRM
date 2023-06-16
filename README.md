# CRM Web Application

## Description
This web application is designed to manage client information and provide various functionalities for organizing and filtering client data. Users can add new clients, view client details, update client information, and perform actions like sorting, filtering, and deleting clients. The application uses React with TypeScript and Chakra UI for the frontend and utilizes local storage to persist client data. The application is also mobile responsive, providing a seamless experience across different devices.

## Features
- Add new clients: Users can enter client details, including contact information, name, organization, assigned user, and avatar URL.
- View client details: Users can click on a client card to view the detailed information of a specific client.
- Update client information: Users can change the status of the client from active to inactive and vice versa.
- Filter clients: Users can filter clients based on their status (active/inactive) and date added.
- Delete clients: Users can delete clients, and the deletion action can be confirmed through an alert dialog.

## Installation
1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd web-application`
3. Install dependencies: `npm install`

## Usage
1. Start the development server: `npm start`
2. Open your web browser and visit: `http://localhost:3000`

## Instructions
1. Once the web application is running, you will see the CRM dashboard.
2. To add a new client, click on the "Add Client" button.
3. Fill in the required fields such as contact information, name, organization, and assigned user. You can also provide an avatar URL if available.
4. Click the "Submit" button to add the client to the list.
5. To view client details, click on a client card from the list. A modal will appear with detailed information about the selected client.
6. You can update the client information by clicking on the "Edit" button within the client details modal. Make the necessary changes and click "Save" to update the client.
7. To filter clients, use the filter options available on the CRM dashboard. You can filter by client status (active/inactive) and date added.
8. To delete a client, click on the "Delete" button within the client details modal. Confirm the deletion through the alert dialog.
9. Enjoy managing and organizing your clients with the CRM web application!

## Live Demo
Click [here](https://crm-kerrybli.vercel.app/) to see the live demo of the CRM web application.

## Technologies Used
- React: A JavaScript library for building user interfaces.
- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
- Chakra UI: A simple, modular, and accessible component library for React.
- Local Storage: A web API used to store data in the browser.

## Mobile Responsiveness
This CRM web application is designed to be fully responsive, ensuring a seamless user experience across various devices, including desktops, tablets, and mobile devices.

## Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:
1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## License
This project is licensed under the [MIT License](LICENSE).
