## General usage: 

```bash
git clone https://gitlab.telecom-paris.fr/idsinge/hiaudio/musicplatform_mgmt.git

cd musicplatform_mgmt

# create python virtualenv
python3 -m venv venv

# or (aurelien)
virtualenv -p python3 venv

# activate virtualenv
. venv/bin/activate

# or (aurelien)
source venv/bin/activate


# install requirements
pip install -r requirements.txt

# create .env file with the following content
# Google Values: https://gitlab.telecom-paris.fr/idsinge/hiaudio/musicplatform_mgmt/-/wikis/SOURCE-CODE/Google-OAuth-Setup
# SECRET_KEY is independent and can be self-elected
# JWT_SECRET_KEY: https://flask-jwt-extended.readthedocs.io/en/stable/options.html#JWT_SECRET_KEY
# OVH_EMAIL_PASSWD: https://gitlab.telecom-paris.fr/idsinge/hiaudio/musicplatform_mgmt/-/wikis/HOSTING/OVH-(domain) 
GOOGLE_CLIENT_ID=*****
GOOGLE_CLIENT_SECRET=*****
SECRET_KEY=*****
JWT_SECRET_KEY=*****
OVH_EMAIL_PASSWD=*****


# For Mac, for Linux see (4) below
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

# To initialize SQLite run:
python initdb.py

# run the server 
python app.py

# Verify it's running
Open -> https://localhost:7007/

```

## To make the frontend work together with the backend in local DEV mode/environment


Inside backend repo clone:
```
git clone https://gitlab.telecom-paris.fr/idsinge/hiaudio/beatbytebot_webapp.git

```

Then rename the folder `beatbytebot_webapp` to `webapp`

Note: in dev it might be useful to temporarly ignore the contents of the public directory, this can be done with

```
# ignore public/ contents for git diff, grep, status, etc.
git ls-files -z public/ | xargs -0 git update-index --skip-worktree

# track the contents of public/ again (when commiting changes to it for example)
git ls-files -z public/ | xargs -0 git update-index --no-skip-worktree
```



### More info:
1- https://gitlab.telecom-paris.fr/idsinge/hiaudio/beatbytebot_webapp#how-to-run-it-locally

2- [Debuggable Frontend with Backend](https://gitlab.telecom-paris.fr/idsinge/hiaudio/musicplatform_mgmt/-/wikis/SOURCE-CODE/Debuggable-Frontend-with-Backend)

3- Flask-Migrate: https://flask-migrate.readthedocs.io/en/latest/#example

4- DB setup and installation, check:
https://gitlab.telecom-paris.fr/idsinge/hiaudio/musicplatform_mgmt/-/wikis/HOSTING/Change-DB-type-to-MySQL