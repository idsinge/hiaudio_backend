Usage: 

```bash
# create python virtualenv
virtualenv -p python3 venv

or 

python3 -m venv venv

# activate virtualenv
source venv/bin/activate

or 

. venv/bin/activate

# install requirements
pip install -r requirements.txt
pip install python-dotenv

# create .env file with
GOOGLE_CLIENT_ID=*****
GOOGLE_CLIENT_SECRET=*****
SECRET_KEY=*****

# init DB
pythonn initdb.py

# run the server 
python app.py

# Verify it's running
Open -> https://127.0.0.1:7007/

or

Open -> http://localhost:7007/

```