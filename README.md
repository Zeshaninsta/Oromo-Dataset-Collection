# Oromo Dataset Collection

A web application designed to collect and manage a dataset for the Afaan Oromoo language. This project enables users to submit incorrect and corrected sentences in Afaan Oromoo, which are stored in a CSV file. The application provides real-time updates on the number of entries in the dataset and allows users to download the dataset.

## Features

- **Data Collection:** Users can submit incorrect and corrected sentences in Afaan Oromoo.
- **Real-time Dataset Count:** The number of entries in the dataset is displayed and updated in real-time.
- **Downloadable Dataset:** The collected data can be downloaded as a CSV file.
- **Cultural Design:** The UI reflects Oromo culture, providing a more engaging user experience.

## Technologies Used

- **Frontend:** React, Tailwind CSS
- **Backend:** Flask, Python
- **Data Storage:** CSV file

## Getting Started

### Prerequisites

- Node.js and npm installed
- Python and pip installed

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/Oromo-Dataset-Collection.git
   cd Oromo-Dataset-Collection
```
2. **Install frontend dependencies:**
```bash
cd frontend
npm install
```
3. **Install backend dependencies:**
```bash
cd ../backend
pip install -r requirements.txt
```
## Running the Application
1. **Start the Flask backend:**
```bash
cd backend
flask run
```
2. **Start the React frontend:**
```bash
cd ../frontend
npm run dev
```
3. **Open the application:**
```bash
Go to http://localhost:3000 in your web browser.
```

## API Endpoints
```bash
- GET /api/dataset-count: Returns the current count of entries in the dataset.
- POST /api/add-data: Adds a new entry to the dataset.
- GET /api/download-dataset: Downloads the dataset as a CSV file.
```

## Project Structure
```bash
Oromo-Dataset-Collection/
├── backend/                # Flask backend
│   ├── app.py              # Main Flask application
│   └── dataset/            # Directory for storing the dataset
├── frontend/               # React frontend
│   ├── public/             # Static assets
│   └── src/                # React components and styles
├── README.md               # Project documentation
└── .gitignore              # Ignored files
```
## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.

## Acknowledgments

- Special thanks to the developers and contributors who made this project possible.
- Inspired by the need to promote and support the Afaan Oromoo language in technology.


