Usage: 

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
pip install python-dotenv

# create .env file with the following content
# Google Values: https://gitlab.telecom-paris.fr/idsinge/hiaudio/musicplatform_mgmt/-/wikis/SOURCE-CODE/Google-OAuth-Setup
# SECRET_KEY is independent and can be self-elected 
GOOGLE_CLIENT_ID=*****
GOOGLE_CLIENT_SECRET=*****
SECRET_KEY=*****

# init DB
python initdb.py

# run the server 
python app.py

# Verify it's running
Open -> https://localhost:7007/

# To make the frontend work together with the backend
# in local DEV mode/environment


# Inside backend repo clone:
git clone https://gitlab.telecom-paris.fr/idsinge/hiaudio/beatbytebot_webapp.git

rename "beatbytebot_webapp" to "webapp"

# follow below instructions at:
https://gitlab.telecom-paris.fr/idsinge/hiaudio/beatbytebot_webapp#how-to-run-it-locally
```