## About

Hi-Audio online platform is a collaborative web application for musicians and researchers in the MIR (Music Information Retrieval) domain, with a view to build a public database of music recordings from a wide variety of styles and different cultures. It allows:

- Creating musical compositions and collections with different levels of privacy.
- Uploading and recording audio tracks from the browser.
- Annotating audio tracks with relevant MIR information.
- Inviting collaborators to participate using different roles.

![screenshot](doc/screenshot.png)

This repo contains information relative to the server side or back-end, for the client side (web application) see **NOTE 1**.


## Recommended Python version 3.10

### Clone or download the repository
```bash
git clone --recursive https://github.com/idsinge/hiaudio_backend.git

cd hiaudio_backend
```
### (Linux and macOS) Create and activate Python environment 
```bash
python3 -m venv venv

. venv/bin/activate
```

### (Windows) Create and activate Python environment 
```bash
python -m venv venv

venv\Scripts\activate
```

### Install requirements
```bash
pip install -r requirements.txt
```

### Create .env file with the following content
```bash
# Google Values: https://console.cloud.google.com/apis/credentials
# SECRET_KEY is independent and can be self-elected
# JWT_SECRET_KEY: https://flask-jwt-extended.readthedocs.io/en/stable/options.html#JWT_SECRET_KEY
GOOGLE_CLIENT_ID=*****
GOOGLE_CLIENT_SECRET=*****
SECRET_KEY=*****
JWT_SECRET_KEY=*****
```

### Duplicate `config.py.sample` and rename it to `config.py`

### Initialize the DB for the first time and run the app:
```bash
python initdb.py

# Run the local server 
python app.py

# Verify it's running
Open -> https://localhost:7007/
```

### To make the frontend repo work together with the backend in local DEV mode/environment


In a different termimal inside the current directory run the following commands:
```bash
cd hiaudio_demoapp

npm i

npm run dev
```

## NOTES:
1- [Web App Repo](https://github.com/idsinge/hiaudio_webapp)

2- For MySQL database follow these steps:

https://github.com/idsinge/hiaudio_backend/wiki/Using-MySQL-by-default-instead-of-SQLite 

3- To activate email feature:

https://github.com/idsinge/hiaudio_backend/wiki/Activate-email-exchange-feature

4- To run the audio compression module:

https://github.com/idsinge/hiaudio_backend/wiki/Audio-compression-module

5- To run the audio processing module:

https://github.com/idsinge/hiaudio_backend/wiki/Audio-processing-module

6- Ignore temporally changes in `public` folder:

https://github.com/idsinge/hiaudio_backend/wiki/Hint:-ignore-temp-changes-public-directory