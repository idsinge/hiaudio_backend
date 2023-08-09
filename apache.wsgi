import sys, os
from dotenv import load_dotenv

APP_ROOT = os.path.abspath(os.path.dirname(__file__))

sys.path.insert(0, APP_ROOT)

load_dotenv(os.path.join(APP_ROOT, ".env"))

from app import app as application
