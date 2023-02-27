APP_ROOT = "/home/ubuntu/musicplatform_mgmt"

import sys
sys.path.insert(0, APP_ROOT)

from dotenv import load_dotenv
load_dotenv(APP_ROOT + "/.env")

from app import app as application
