"""change name of the field is_processed to is_audio_processed

Revision ID: 54422dc1e46c
Revises: bf799e6c655b
Create Date: 2025-02-06 17:37:47.523765

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '54422dc1e46c'
down_revision = 'bf799e6c655b'
branch_labels = None
depends_on = None


def upgrade():
    # Rename the column from 'is_processed' to 'is_audio_processed'
    with op.batch_alter_table('track', schema=None) as batch_op:
        batch_op.alter_column(
            'is_processed', 
            new_column_name='is_audio_processed',
            existing_type=sa.Boolean(),
            nullable=False
        )

def downgrade():
    # Rename the column back to 'is_processed'
    with op.batch_alter_table('track', schema=None) as batch_op:
        batch_op.alter_column(
            'is_audio_processed',
            new_column_name='is_processed',
            existing_type=sa.Boolean(),
            nullable=False
        )

