## General usage:

### Recommended Python version 3.10


```bash
git clone https://gitlab.telecom-paris.fr/idsinge/hiaudio/musicplatform_mgmt.git

cd musicplatform_mgmt

# create python virtualenv
python3 -m venv venv

# activate virtualenv
. venv/bin/activate

# install requirements
pip install -r requirements.txt

# create .env file with the following content
# Google Values: https://gitlab.telecom-paris.fr/idsinge/hiaudio/musicplatform_mgmt/-/wikis/SOURCE-CODE/Google-OAuth-Setup
# SECRET_KEY is independent and can be self-elected
# JWT_SECRET_KEY: https://flask-jwt-extended.readthedocs.io/en/stable/options.html#JWT_SECRET_KEY
# OVH_EMAIL_PASSWD: https://gitlab.telecom-paris.fr/idsinge/hiaudio/musicplatform_mgmt/-/wikis/HOSTING/OVH-(domain) 
# ACOUSTIC_ID_API_KEY: https://acoustid.org/
GOOGLE_CLIENT_ID=*****
GOOGLE_CLIENT_SECRET=*****
SECRET_KEY=*****
JWT_SECRET_KEY=*****
OVH_EMAIL_PASSWD=*****
ACOUSTIC_ID_API_KEY=*****


# For Mac, for Linux see (Note 2) below
# More info about DB migration in Note 3.
brew install mysql

# Start MySQL server
mysql.server start

# Login as root
mysql -u root -p

# Then create DB and add new user (ubuntu) at localhost
create database hiaudio ; 
CREATE USER 'ubuntu'@'localhost' IDENTIFIED BY 'hiaudio';
GRANT ALL PRIVILEGES ON hiaudio.* TO 'ubuntu'@'localhost';
FLUSH PRIVILEGES;

mysql > exit

# When finished MySQL setup then run
pip install mysqlclient

# Duplicate config.py.sample and rename it to config.py

# At config.py check default option for MySQL connection is:
DB_CNX = f"mysql://{MYSQL_USER}:{MYSQL_PASS}@{MYSQL_HOST}/{MYSQL_DB}"

# In config.py fill the following details:
MYSQL_HOST="localhost"
MYSQL_USER="ubuntu"
MYSQL_PASS="hiaudio"
MYSQL_DB="hiaudio"

# In config.py for Mail settings go to Email provider: 
# https://gitlab.telecom-paris.fr/idsinge/hiaudio/musicplatform_mgmt/-/wikis/HOSTING/OVH-(domain) 
MAIL_SERVER = ""
MAIL_PORT = 0
MAIL_USERNAME = ""

# To initialize the DB:
python initdb.py

# run the server 
python app.py

# Verify it's running
Open -> https://localhost:7007/

```

## To make the frontend repo work together with the backend in local DEV mode/environment


Inside backend repo clone (see **NOTE 1**):
```
git clone https://gitlab.telecom-paris.fr/idsinge/hiaudio/beatbytebot_webapp.git

```

Then rename the folder `beatbytebot_webapp` to `webapp`

**Hint**: during development it might be useful to temporarly ignore the contents of the public directory, this can be done with

```
# ignore public/ contents for git diff, grep, status, etc.
git ls-files -z public/ | xargs -0 git update-index --skip-worktree

# track the contents of public/ again (when commiting changes to it for example)
git ls-files -z public/ | xargs -0 git update-index --no-skip-worktree
```

## COMPRESSION MODULE

In order to run the compression module locally, the env variable `COMPRESSION_MODULE_ACTIVE` at `config.py` needs to be set to `True` (https://gitlab.telecom-paris.fr/idsinge/hiaudio/musicplatform_mgmt/-/blob/main/config.py.sample?ref_type=heads#L9). It's required to execute the follwoing commands, the first for the installation of the `pydub` package (see **NOTE 4**) and the other to run the thread. More info about setting a python script as a service in **Note 6**.

```bash
pip install pydub

python compress_thread.py
```


## AUDIO PROCESSING MODULE

To use the [Acoustic ID API ](https://acoustid.org/) for audio identification, the environment variable `ACOUSTIC_ID_API_KEY` needs to be set at `.env`. It's required to execute the follwoing commands, for the installation of `pytdub` (see **NOTE 4**) and `essentia-tensorflow` (see **NOTE 5**) in order to run the audio processing service. More info about setting a python script as a service in **Note 6**.

```bash
pip install pydub

pip install essentia-tensorflow

python process_audio_thread/process_audio_thread.py
```



## NOTES:
1- [Web App Repo](https://gitlab.telecom-paris.fr/idsinge/hiaudio/beatbytebot_webapp#how-to-run-it-locally)

2- [MySQL DB setup and installation, check](https://gitlab.telecom-paris.fr/idsinge/hiaudio/musicplatform_mgmt/-/wikis/SOURCE-CODE/DB/Change-DB-type-to-MySQL)

3- Flask-Migrate: https://flask-migrate.readthedocs.io/en/latest/#example

4- [Install FFMPEG](https://gist.github.com/barbietunnie/47a3de3de3274956617ce092a3bc03a1). `pydub` needs either `sudo apt install ffmpeg` (Linux) or `brew install ffmpeg` (Mac) in order to function correctly. 

5- In order to make essentia python library to work in the backend this is required: `pip install "numpy<2.0"`.

6- [Setup a python script as a service through systemctl and systemd](https://gitlab.telecom-paris.fr/idsinge/hiaudio/musicplatform_mgmt/-/wikis/HOSTING/Setup-a-python-script-as-a-service-through-systemctl-and-systemd)