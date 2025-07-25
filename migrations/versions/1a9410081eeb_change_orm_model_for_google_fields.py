"""change orm model for google fields

Revision ID: 1a9410081eeb
Revises: 8c1d67686330
Create Date: 2023-11-17 16:00:39.264316

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '1a9410081eeb'
down_revision = '8c1d67686330'
branch_labels = None
depends_on = None

def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_info', schema=None) as batch_op:
        
        batch_op.alter_column('google_email', type_=sa.String(length=120), new_column_name='user_email')        
        batch_op.alter_column('google_uid', type_=sa.String(length=100), new_column_name='user_uid')  
        batch_op.alter_column('name',
               existing_type=mysql.VARCHAR(length=100),
               nullable=False)
        batch_op.create_unique_constraint(None, ['user_uid'])
        batch_op.create_unique_constraint(None, ['user_email'])
        batch_op.create_unique_constraint(None, ['name'])
        
               
        batch_op.drop_column('google_profile_pic')
        batch_op.drop_column('google_name')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_info', schema=None) as batch_op:
        batch_op.add_column(sa.Column('google_name', mysql.VARCHAR(length=100), nullable=True))
        batch_op.add_column(sa.Column('google_profile_pic', mysql.VARCHAR(length=100), nullable=True))
        batch_op.alter_column('user_email', type_=sa.String(length=120), new_column_name='google_email')        
        batch_op.alter_column('user_uid', type_=sa.String(length=100), new_column_name='google_uid')   
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_constraint(None, type_='unique')
        batch_op.alter_column('name',
               existing_type=mysql.VARCHAR(length=100),
               nullable=True)

    # ### end Alembic commands ###
