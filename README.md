## About

Hi-Audio online platform is a collaborative web application for musicians and researchers in the MIR (Music Information Retrieval) domain, with a view to build a public database of music recordings from a wide variety of styles and different cultures. It allows:

- Creating musical compositions and collections with different levels of privacy.
- Uploading and recording audio tracks from the browser.
- Annotating audio tracks with relevant MIR information.
- Inviting collaborators to participate using different roles.

![screenshot](doc/screenshot.png)

This repo contains information relative to the server side or back-end, for the client side (web application) see **NOTE 1**.


## Local database preparation:

### Install MySQL for macOS
```bash
brew install mysql

mysql.server start

mysql -u root -p
```

### Install MySQL for Linux
```bash
sudo apt install mysql-server
sudo apt install python3-dev libmysqlclient-dev

# See NOTE 2 in case of errors

service mysql start

sudo mysql -u root -p
```

### Install MySQL for Windows
```bash
# Install MySQL server from here: 
https://dev.mysql.com/downloads/installer/

# See NOTE 3 for more info:

mysql -u root -p
```

### Create the local database
```bash
# Create a DB and add new user (mysqluser) at localhost. 
# Choose your own user name if you want to.
create database hiaudio ; 
CREATE USER 'mysqluser'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON hiaudio.* TO 'mysqluser'@'localhost';
FLUSH PRIVILEGES;

mysql > exit
```

## Run the local server. Recommended Python version 3.10

### Clone or download the repository
```bash
git clone https://github.com/idsinge/hiaudio_backend.git

cd hiaudio_backend
```
### Create and activate Python environment (Linux and macOS)
```bash
python3 -m venv venv

. venv/bin/activate
```

### Create and activate Python environment (Windows)
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
# OVH_EMAIL_PASSWD: https://www.ovh.com/manager/#/web/email_domain/
# ACOUSTIC_ID_API_KEY: https://acoustid.org/
GOOGLE_CLIENT_ID=*****
GOOGLE_CLIENT_SECRET=*****
SECRET_KEY=*****
JWT_SECRET_KEY=*****
OVH_EMAIL_PASSWD=*****
ACOUSTIC_ID_API_KEY=*****
```

### Duplicate config.py.sample and rename it to config.py
```bash
# In config.py fill the following details:
MYSQL_HOST="localhost"
MYSQL_USER="mysqluser"
MYSQL_PASS="password"
MYSQL_DB="hiaudio"

# In config.py for Mail settings go to Email provider:
MAIL_SERVER = ""
MAIL_PORT = 0
MAIL_USERNAME = ""
```

### Initialize the DB for the first time and run the app:
```bash
python initdb.py

# Run the local server 
python app.py

# Verify it's running
Open -> https://localhost:7007/
```

## To make the frontend repo work together with the backend in local DEV mode/environment


Inside backend repo clone the frontend repo:
```
git clone https://github.com/idsinge/hiaudio_webapp.git

```

Then rename the folder `hiaudio_webapp` to `webapp`

**Hint**: during development it might be useful to temporarly ignore the contents of the public directory, this can be done with

```
# ignore public/ contents for git diff, grep, status, etc.
git ls-files -z public/ | xargs -0 git update-index --skip-worktree

# track the contents of public/ again (when commiting changes to it for example)
git ls-files -z public/ | xargs -0 git update-index --no-skip-worktree
```

## COMPRESSION MODULE

In order to run the compression module locally, the env variable `COMPRESSION_MODULE_ACTIVE` at `config.py` needs to be set to `True`. It's required to execute the follwoing commands, the first for the installation of the `pydub` package (see **NOTE 4**) and the other to run the thread. 

```bash
pip install pydub

python compress_thread.py
```


## AUDIO PROCESSING MODULE

To use the [Acoustic ID API ](https://acoustid.org/) for audio identification, the environment variable `ACOUSTIC_ID_API_KEY` needs to be set at `.env`. It's required to execute the follwoing commands, for the installation of `pydub` (see **NOTE 4**) and `essentia-tensorflow` in order to run the audio processing service.

### Download the following models files and place them in the suggested locations.

1) Download and place the following models under `models/` directory:

- [genre_rosamerica-vggish-audioset-1.pb](https://essentia.upf.edu/models/classifiers/genre_rosamerica/genre_rosamerica-vggish-audioset-1.pb)


2) Download, rename the following model to `audio_mdl.pth` and place it under `process_audio_thread/pretrained_models/` directory:

- [audio_mdl.pth](https://www.dropbox.com/s/cv4knew8mvbrnvq/audioset_0.4593.pth?dl=1)


### Installation and launch

```bash
pip install -r requirements_process_audio.txt

python process_audio_thread/process_audio_thread.py
```


## NOTES:
1- [Web App Repo](https://github.com/idsinge/hiaudio_webapp)

2- In case `pip install mysqlclient` fails, try the following commands:

`sudo apt install build-essential`

`sudo apt-get install libmariadb-dev`

`sudo apt-get install pkg-config`

3- MySQL Installation on Windows: https://www.w3schools.com/mysql/mysql_install_windows.asp

4- [Install FFMPEG](https://gist.github.com/barbietunnie/47a3de3de3274956617ce092a3bc03a1). `pydub` needs either `sudo apt install ffmpeg` (Linux) or `brew install ffmpeg` (Mac) in order to function correctly.