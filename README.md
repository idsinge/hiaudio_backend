## General usage: 

```bash
git clone https://gitlab.telecom-paris.fr/idsinge/hiaudio/musicplatform_mgmt.git

cd musicplatform_mgmt

# create python virtualenv
virtualenv -p python3 venv

# or 

python3 -m venv venv

# activate virtualenv
source venv/bin/activate

# or

. venv/bin/activate

# install requirements
pip install -r requirements.txt

# create .env file with the following content
# Google Values: https://gitlab.telecom-paris.fr/idsinge/hiaudio/musicplatform_mgmt/-/wikis/SOURCE-CODE/Google-OAuth-Setup
# SECRET_KEY is independent and can be self-elected 
GOOGLE_CLIENT_ID=*****
GOOGLE_CLIENT_SECRET=*****
SECRET_KEY=*****

# For DB setup and installation, check:
https://gitlab.telecom-paris.fr/idsinge/hiaudio/musicplatform_mgmt/-/wikis/HOSTING/Change-DB-type-to-MySQL

# When finished MySQL setup then run
pip install mysqlclient

# Option 1: init DB to work with SQLite
# In config.py choose:
DB_FILE = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'database.db')
DB_CNX = 'sqlite:///' +  DB_FILE

# To initialize SQLite run:
python initdb.py

# Option 2: init DB to work with MySQL
# In config.py choose and fill the details:
DB_CNX = f"mysql://{MYSQL_USER}:{MYSQL_PASS}@{MYSQL_HOST}/{MYSQL_DB}"

MYSQL_HOST="localhost"
MYSQL_USER="ubuntu"
MYSQL_PASS="hiaudio"
MYSQL_DB="hiaudio"

# To initialize MySQL run:
mysql -u ubuntu -p hiaudio < mysql.initdb.sql

# TO CONFIRM: to add a migrations folder to your application. The contents of this folder need to be added to version control along with other source files.
flask db init

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

### More info:
- https://gitlab.telecom-paris.fr/idsinge/hiaudio/beatbytebot_webapp#how-to-run-it-locally

- [Debuggable Frontend with Backend](https://gitlab.telecom-paris.fr/idsinge/hiaudio/musicplatform_mgmt/-/wikis/SOURCE-CODE/Debuggable-Frontend-with-Backend)

- Flask-Migrate: https://flask-migrate.readthedocs.io/en/latest/#example
